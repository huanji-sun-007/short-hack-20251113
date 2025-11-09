# Short Hack Browser Extension

This project is designed for teaching how to build a browser extension, specifically for Microsoft Edge. It demonstrates the core concepts and development workflow for creating modern browser extensions.

## Getting Started

### Initial Setup and Build

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Build the extension:**
   ```bash
   npm run build
   ```

   This command will compile the extension and create a production-ready build in the `build/` directory.

### Loading the Extension in Edge

1. Open Microsoft Edge and navigate to `edge://extensions/`
2. Enable **Developer mode** (toggle in the bottom-left corner)
3. Click **Load unpacked**
4. Select the `build/` directory from this project

### Development with Hot Reload

For active development with automatic reloading:

```bash
npm start
```

This command starts a development server with hot reload enabled. Any changes you make to the source files will automatically trigger a rebuild, and the extension will reload in your browser.

## Project Structure

- `src/` - Source code for the extension
  - `pages/Background/` - Background service worker
  - `pages/Content/` - Content scripts
  - `pages/Sidepanel/` - Side panel UI components
  - `services/` - API and service integrations
- `build/` - Compiled extension (generated after build)

## Learn More

This extension serves as a practical example for understanding:
- Extension manifest configuration
- Background scripts and content scripts
- Side panel implementation
- Communication between different extension components
- Development workflow and tooling
