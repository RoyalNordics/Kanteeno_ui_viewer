# Kanteeno UI Viewer

A static site that displays UI screens for the Kanteeno project.

## Overview

This UI viewer allows you to browse and view UI screens for different parts of the Kanteeno project:
- Guest App UI
- Admin Portal UI
- Chef's Magic UI
- React Implementation

## Project Structure

- `index.html`: The main HTML file that displays the UI screens
- `docs/charts/`: Directory containing all the image files (SVG and JPG) used in the UI screens
- `package.json`: Contains dependencies and scripts for the project
- `.gitignore`: Specifies files to ignore in Git

## Local Development

To run the project locally:

1. Install dependencies:
```
npm install
```

2. Start the development server:
```
npm start
```

3. Open your browser and navigate to `http://localhost:3000`

## Adding UI Screens

To add new UI screens to the viewer:

1. Place your image files (preferably SVG) in the appropriate subdirectory under `docs/charts/`:
   - Guest App UI: `docs/charts/guest-app/`
   - Admin Portal UI: `docs/charts/admin-portal/`
   - Chef's Magic UI: `docs/charts/chefs-magic/`
   - React Implementation: `docs/charts/react-impl/`

2. The UI viewer will automatically detect and display the images.

## Deployment

This project is deployed on Render at:
https://kanteeno-ui-viewer.onrender.com
