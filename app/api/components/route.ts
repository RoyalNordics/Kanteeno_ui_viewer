import { NextResponse } from 'next/server';
import * as fs from 'fs';
import * as path from 'path';

// Define the data directory where we'll store components data
const DATA_DIR = path.join(process.cwd(), 'data');
const COMPONENTS_FILE = path.join(DATA_DIR, 'components.json');

// Load components data
async function loadComponents() {
  try {
    // Create data directory if it doesn't exist
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    
    // Create components.json if it doesn't exist
    if (!fs.existsSync(COMPONENTS_FILE)) {
      fs.writeFileSync(COMPONENTS_FILE, JSON.stringify({ components: [] }, null, 2));
      return { components: [] };
    }
    
    const data = await fs.promises.readFile(COMPONENTS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading components:', error);
    return { components: [] };
  }
}

export async function GET() {
  try {
    const data = await loadComponents();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching components:', error);
    return NextResponse.json({ error: 'Error fetching components' }, { status: 500 });
  }
}
