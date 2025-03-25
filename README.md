# Kanteeno UI Viewer

A modern UI component viewer for the Kanteeno project built with Next.js and Tailwind CSS.

## Features

- Browse UI components by category (User App, Chefs Magic, Admin App)
- Preview components with code view
- Download component code
- Search functionality
- Modern, responsive design

## Project Structure

- `app/`: Next.js app directory containing pages and layouts
- `components/`: React components including UI components
- `public/`: Static assets
- `styles/`: Global CSS styles
- `lib/`: Utility functions
- `hooks/`: Custom React hooks

## Local Development

To run the project locally:

1. Install dependencies:
```bash
npm install --legacy-peer-deps
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:3000`

## Legacy Static Viewer

The original static HTML viewer is still available:

```bash
npm run serve-static
```

This will serve the static HTML version at `http://localhost:3000`.

## Adding New Components

To add new UI components:

1. Update the mockComponents object in `components/component-grid.tsx`
2. Add actual component code to replace the mockReactCode in `components/component-card.tsx`
3. Add actual UI designs as SVG or PNG files in the `public` directory

## Deployment

This project is deployed on Render at:
https://kanteeno-ui-viewer.onrender.com
