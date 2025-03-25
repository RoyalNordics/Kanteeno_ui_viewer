# Zip Upload Guide for Kanteeno UI Viewer

This guide explains how to prepare and upload UI components to the Kanteeno UI Viewer using the zip upload feature.

## Zip File Structure

Your zip file should follow this structure:

```
components/
  user-app/
    login-screen.tsx
    menu-browser.tsx
    ...
  chefs-magic/
    kitchen-dashboard.tsx
    ...
  admin/
    analytics-dashboard.tsx
    ...
public/
  thumbnails/
    user-app/
      login-screen.svg
      ...
    chefs-magic/
      ...
    admin/
      ...
metadata.json
```

## metadata.json Format

The `metadata.json` file is required and should follow this format:

```json
{
  "components": [
    {
      "id": "login-screen",
      "name": "Login Screen",
      "description": "User authentication screen with social login options",
      "category": "user-app",
      "thumbnail": "thumbnails/user-app/login-screen.svg"
    },
    {
      "id": "menu-browser",
      "name": "Menu Browser",
      "description": "Browse restaurant menu items with filtering",
      "category": "user-app",
      "thumbnail": "thumbnails/user-app/menu-browser.svg"
    }
  ]
}
```

## Component Categories

Components must belong to one of these categories:
- `user-app` - User-facing application components
- `chefs-magic` - Chef-facing application components
- `admin` - Admin portal components

## Thumbnail Images

- Thumbnails should be SVG or PNG files
- Recommended size: 300x200 pixels
- Path in metadata.json should be relative to the public directory

## Component Files

- Component files should be React components in TypeScript (.tsx)
- Each component should export a default function with the same name as the file
- Components should use the UI components from the Kanteeno UI library

## Example

You can download a [sample metadata.json](/sample-metadata.json) file to use as a template.

## Using v0 to Generate Components

1. Design your UI components in v0
2. Export the components as React components
3. Organize them according to the structure above
4. Create a metadata.json file
5. Zip everything up
6. Upload using the "Upload Components" button in the UI viewer

## Troubleshooting

If you encounter issues with your upload:

1. Check that your metadata.json file is valid JSON
2. Ensure all paths in metadata.json are correct
3. Verify that all referenced files exist in the zip
4. Make sure component categories are one of: user-app, chefs-magic, admin
