# Kanteeno UI Viewer V2

A modern UI component viewer for the Kanteeno project built with Next.js and Tailwind CSS.

## Features

- Browse UI components by category (User App, Chefs Magic, Admin App)
- Preview components with code view
- Download component code
- Search functionality
- Modern, responsive design

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

## Deployment to Render

This project is configured for easy deployment to Render:

1. Fork or clone this repository to your GitHub account
2. Log in to [Render](https://render.com)
3. Click "New" and select "Web Service"
4. Connect your GitHub repository
5. Use the following settings:
   - Name: kanteeno-ui-viewer-v2 (or your preferred name)
   - Environment: Node
   - Build Command: `npm install --legacy-peer-deps && npm run build`
   - Start Command: `npm start`
6. Click "Create Web Service"

The application will be deployed and available at your Render URL.

## Adding New Components

To add new UI components:

1. Update the mockComponents object in `components/component-grid.tsx`
2. Add actual component code to replace the mockReactCode in `components/component-card.tsx`
3. Add actual UI designs as SVG or PNG files in the `public` directory

## License

ISC
