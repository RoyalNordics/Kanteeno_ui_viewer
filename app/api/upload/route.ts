import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import * as fs from 'fs';
import * as path from 'path';
import * as util from 'util';
import * as stream from 'stream';
import * as AdmZip from 'adm-zip';

const pipeline = util.promisify(stream.pipeline);

// Define the data directory where we'll store components data
const DATA_DIR = path.join(process.cwd(), 'data');
const COMPONENTS_FILE = path.join(DATA_DIR, 'components.json');
const PUBLIC_DIR = path.join(process.cwd(), 'public');
const THUMBNAILS_DIR = path.join(PUBLIC_DIR, 'thumbnails');
const COMPONENTS_DIR = path.join(process.cwd(), 'components', 'library');

// Ensure directories exist
async function ensureDirectories() {
  try {
    // Create data directory if it doesn't exist
    if (!fs.existsSync(DATA_DIR)) {
      await mkdir(DATA_DIR, { recursive: true });
    }
    
    // Create thumbnails directory if it doesn't exist
    if (!fs.existsSync(THUMBNAILS_DIR)) {
      await mkdir(THUMBNAILS_DIR, { recursive: true });
      await mkdir(path.join(THUMBNAILS_DIR, 'user-app'), { recursive: true });
      await mkdir(path.join(THUMBNAILS_DIR, 'chefs-magic'), { recursive: true });
      await mkdir(path.join(THUMBNAILS_DIR, 'admin'), { recursive: true });
    }
    
    // Create components library directory if it doesn't exist
    if (!fs.existsSync(COMPONENTS_DIR)) {
      await mkdir(COMPONENTS_DIR, { recursive: true });
      await mkdir(path.join(COMPONENTS_DIR, 'user-app'), { recursive: true });
      await mkdir(path.join(COMPONENTS_DIR, 'chefs-magic'), { recursive: true });
      await mkdir(path.join(COMPONENTS_DIR, 'admin'), { recursive: true });
    }
    
    // Create components.json if it doesn't exist
    if (!fs.existsSync(COMPONENTS_FILE)) {
      await writeFile(COMPONENTS_FILE, JSON.stringify({ components: [] }, null, 2));
    }
  } catch (error) {
    console.error('Error ensuring directories:', error);
    throw error;
  }
}

// Load existing components data
async function loadComponents() {
  try {
    if (fs.existsSync(COMPONENTS_FILE)) {
      const data = await fs.promises.readFile(COMPONENTS_FILE, 'utf8');
      return JSON.parse(data);
    }
    return { components: [] };
  } catch (error) {
    console.error('Error loading components:', error);
    return { components: [] };
  }
}

// Save components data
async function saveComponents(data: any) {
  try {
    await writeFile(COMPONENTS_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error saving components:', error);
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    // Ensure directories exist
    await ensureDirectories();
    
    // Get the form data from the request
    const formData = await request.formData();
    const zipFile = formData.get('zipFile') as File;
    
    if (!zipFile) {
      return NextResponse.json({ error: 'No zip file provided' }, { status: 400 });
    }
    
    // Create a temporary file to store the uploaded zip
    const tempZipPath = path.join(DATA_DIR, 'temp.zip');
    const buffer = Buffer.from(await zipFile.arrayBuffer());
    await writeFile(tempZipPath, buffer);
    
    // Extract the zip file
    const zip = new AdmZip(tempZipPath);
    const zipEntries = zip.getEntries();
    
    // Look for metadata.json
    let metadata = null;
    for (const entry of zipEntries) {
      if (entry.entryName === 'metadata.json') {
        metadata = JSON.parse(entry.getData().toString('utf8'));
        break;
      }
    }
    
    if (!metadata) {
      return NextResponse.json({ error: 'metadata.json not found in zip file' }, { status: 400 });
    }
    
    // Process the components
    const existingData = await loadComponents();
    const newComponents = [];
    
    for (const component of metadata.components) {
      // Extract thumbnail
      const thumbnailEntry = zipEntries.find(entry => 
        entry.entryName === component.thumbnail || 
        entry.entryName === `public/${component.thumbnail}`
      );
      
      if (thumbnailEntry) {
        const thumbnailPath = path.join(PUBLIC_DIR, component.thumbnail);
        const thumbnailDir = path.dirname(thumbnailPath);
        
        // Ensure thumbnail directory exists
        if (!fs.existsSync(thumbnailDir)) {
          await mkdir(thumbnailDir, { recursive: true });
        }
        
        // Write thumbnail file
        await writeFile(thumbnailPath, thumbnailEntry.getData());
      }
      
      // Extract component code
      const componentPath = `components/${component.category}/${component.id}.tsx`;
      const componentEntry = zipEntries.find(entry => 
        entry.entryName === componentPath || 
        entry.entryName === `components/${component.category}/${component.id}.tsx`
      );
      
      if (componentEntry) {
        const libPath = path.join(COMPONENTS_DIR, component.category, `${component.id}.tsx`);
        const libDir = path.dirname(libPath);
        
        // Ensure component directory exists
        if (!fs.existsSync(libDir)) {
          await mkdir(libDir, { recursive: true });
        }
        
        // Write component file
        await writeFile(libPath, componentEntry.getData());
      }
      
      // Add component to the list
      newComponents.push({
        id: component.id,
        name: component.name,
        description: component.description,
        category: component.category,
        thumbnail: `/${component.thumbnail}`,
        componentPath: `/components/library/${component.category}/${component.id}.tsx`
      });
    }
    
    // Update components data
    existingData.components = [
      ...existingData.components,
      ...newComponents
    ];
    
    await saveComponents(existingData);
    
    // Clean up temporary zip file
    fs.unlinkSync(tempZipPath);
    
    return NextResponse.json({ 
      success: true, 
      message: `Successfully processed ${newComponents.length} components` 
    });
    
  } catch (error) {
    console.error('Error processing zip file:', error);
    return NextResponse.json({ error: 'Error processing zip file' }, { status: 500 });
  }
}
