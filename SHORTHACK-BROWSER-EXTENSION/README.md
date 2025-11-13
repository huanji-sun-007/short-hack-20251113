# DOM Monitor Browser Extension

A simple Chrome/Edge browser extension that monitors DOM changes on web pages and displays the DOM size in a side panel.

## Features

- **Real-time DOM monitoring**: Tracks DOM changes on any web page
- **Side panel interface**: Clean UI showing DOM statistics
- **Auto-updates**: Automatically refreshes when switching tabs or when DOM changes
- **Character count**: Displays total DOM size in characters

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Chrome or Microsoft Edge browser

### Installation

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Build the extension:**

   ```bash
   npm run build
   ```

   This creates a production-ready build in the `build/` directory.

### Loading the Extension

**For Chrome:**

1. Navigate to `chrome://extensions/`
2. Enable **Developer mode** (toggle in top-right)
3. Click **Load unpacked**
4. Select the `build/` directory

**For Microsoft Edge:**

1. Navigate to `edge://extensions/`
2. Enable **Developer mode** (toggle in bottom-left)
3. Click **Load unpacked**
4. Select the `build/` directory

### Development Mode

For active development with hot reload:

```bash
npm start
```

This starts a webpack dev server on port 3000 with:

- Hot module replacement for instant updates
- File watching with polling (devcontainer compatible)
- Automatic rebuild on file changes

**Note:** In development mode, you need to manually reload the extension in your browser after the first build completes.

## Project Structure

```
src/
├── pages/
│   ├── Background/         # Background service worker
│   │   └── index.js       # Message routing between content and sidepanel
│   ├── Content/           # Content script injected into web pages
│   │   └── index.js       # DOM monitoring and mutation observer
│   └── Sidepanel/         # Side panel UI
│       ├── index.jsx      # React app entry point
│       ├── Sidepanel.jsx  # Main component
│       ├── Sidepanel.css  # Component styles
│       └── index.css      # Global styles
├── assets/
│   └── img/               # Extension icons
└── manifest.json          # Extension configuration

build/                     # Compiled output (generated)
utils/                     # Build scripts
```

## How It Works

### Architecture

The extension uses Chrome Extension Manifest V3 with three main components:

1. **Content Script** (`src/pages/Content/index.js`)

   - Injected into all web pages (`<all_urls>`)
   - Uses MutationObserver to detect DOM changes
   - Sends DOM data to background script

2. **Background Service Worker** (`src/pages/Background/index.js`)

   - Acts as message router between content script and sidepanel
   - Handles tab switching and updates
   - Forwards DOM data to sidepanel

3. **Sidepanel** (`src/pages/Sidepanel/`)
   - React-based UI showing DOM statistics
   - Displays: DOM size, current URL, last update time
   - Auto-refreshes on tab changes

### Message Flow

```
Web Page DOM Change
    ↓
Content Script (MutationObserver)
    ↓ chrome.runtime.sendMessage({ type: 'dom_updated' })
Background Script
    ↓ chrome.runtime.sendMessage({ type: 'dom_data' })
Sidepanel (React UI updates)
```

## Available Scripts

- `npm install` - Install dependencies
- `npm run build` - Production build with minification
- `npm start` - Development server with hot reload
- `npm run prettier` - Format code with Prettier

## Technologies Used

- **React 18.2** - UI framework
- **Webpack 5** - Module bundler
- **Babel** - JavaScript transpiler
- **Chrome Extension APIs** - Browser extension functionality
- **CSS3** - Styling

## Build Configuration

- **Production builds**: Minified with Terser, optimized for size
- **Development builds**: Source maps enabled, hot reload active
- **Devcontainer support**: File watching uses polling for Docker compatibility
- **Error handling**: Build fails on syntax errors with detailed messages

## Browser Compatibility

- Chrome (Manifest V3)
- Microsoft Edge (Manifest V3)
- Other Chromium-based browsers supporting Manifest V3

## License

MIT

## Development Notes

### Devcontainer Setup

The project is configured to work in VS Code devcontainers with:

- Webpack polling enabled for file watching
- Dev server bound to `0.0.0.0` for host access
- Port 3000 exposed for hot reload WebSocket connection

### Permissions

The extension requires:

- `sidePanel` - To display the side panel UI
- `tabs` - To detect tab switches and get tab URLs
- Content scripts on `<all_urls>` - To monitor DOM on any page
