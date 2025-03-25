# Instructions for Cline

Hello Cline! These are instructions to help deploy the Kanteeno UI Screen Viewer to Render.

## Project Overview

This is a static site that displays UI screens for the Kanteeno project. The site is built with HTML, CSS, and JavaScript, and uses the `serve` package to serve the static files.

## Files Structure

- `index.html`: The main HTML file that displays the UI screens
- `docs/charts/`: Directory containing all the image files (SVG and JPG) used in the UI screens
- `package.json`: Contains dependencies and scripts for the project
- `.gitignore`: Specifies files to ignore in Git

## Deployment Steps

1. **Push to GitHub**
   - Help the user push this repository to GitHub if needed
   - The repository should be at: https://github.com/RoyalNordics/Kanteeno_ui_viewer

2. **Deploy to Render**
   - Guide the user to create a new Static Site on Render
   - Connect to the GitHub repository: RoyalNordics/Kanteeno_ui_viewer
   - Configure the following settings:
     - Build Command: `npm install`
     - Publish Directory: `.` or `./` (the root directory)
   - Click "Create Static Site"

3. **Troubleshooting**
   - If a 404 error appears, check:
     - That all files were pushed to GitHub correctly
     - That the Publish Directory is set to "." or "./"
     - That the Build Command is set to "npm install"
     - The deployment logs on Render for any errors

## Testing

After deployment, the site should be accessible at:
https://kanteeno-ui-viewer.onrender.com

The site should display UI screens for the Kanteeno project, with tabs for:
- Guest App UI
- Admin Portal UI
- Chef's Magic UI
- React Implementation

## Additional Notes

- The site uses the `serve` package to serve the static files
- All images are stored in the `docs/charts/` directory
- The site is configured to use SVG files from the `docs/charts/` directory for better quality
