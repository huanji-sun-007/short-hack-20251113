# Setup without DevContainer

This guide will help you set up the Browser Extension development environment on your local machine without using a DevContainer. This approach gives you more control over your development environment.

## 📋 Prerequisites

### Required Software

1. **Node.js 18 or later**
   - **Windows**: Download from [nodejs.org](https://nodejs.org/)
     - ⚠️ Install the LTS version
   - **macOS**: 
     ```bash
     brew install node
     ```
     Or download from [nodejs.org](https://nodejs.org/)
   - **Linux**:
     ```bash
     sudo apt update
     sudo apt install nodejs npm
     ```

2. **Visual Studio Code**
   - Download from [code.visualstudio.com](https://code.visualstudio.com/)
   - Version 1.75 or later recommended

3. **Git**
   - **Windows**: Download from [git-scm.com](https://git-scm.com/)
   - **macOS**: Usually pre-installed, or use `brew install git`
   - **Linux**: Usually pre-installed, or use `sudo apt install git`

4. **Chrome or Edge Browser**
   - Required for testing the browser extension
   - Download from [google.com/chrome](https://www.google.com/chrome/) or [microsoft.com/edge](https://www.microsoft.com/edge)

### System Requirements

- **Operating System**: Windows 10/11, macOS 10.14+, or modern Linux
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: At least 1GB free space for dependencies
- **Internet**: Stable connection for package downloads

## 🚀 Step-by-Step Setup

### Step 1: Clone the Repository

Open your terminal and run:

```bash
git clone https://github.com/huanji-sun-007/short-hack-20251113.git
cd short-hack-20251113/SHORTHACK-BROWSER-EXTENSION
```

### Step 2: Verify Node.js Installation

Check that Node.js 18 or later is installed:

```bash
node --version
npm --version
```

Expected output: `v18.x.x` or higher for Node.js, and `9.x.x` or higher for npm

### Step 3: Install Dependencies

Install all required npm packages:

```bash
npm install
```

This will install:
- React and React DOM
- Webpack and build tools
- TypeScript and Babel
- All development dependencies listed in `package.json`

**Expected time**: 2-5 minutes depending on your internet connection

### Step 4: Install VS Code Extensions

Open Visual Studio Code and install these recommended extensions:

**Required Extensions:**
1. **ESLint** (dbaeumer.vscode-eslint)
2. **Prettier - Code formatter** (esbenp.prettier-vscode)

**Recommended Extensions:**
3. **JavaScript and TypeScript Nightly** (ms-vscode.vscode-typescript-next)
4. **React Developer Tools** (msjsdiag.vscode-react-native)
5. **Path Intellisense** (christian-kohler.path-intellisense)

**To install extensions:**
- Open VS Code
- Press `Ctrl+Shift+X` (Windows/Linux) or `Cmd+Shift+X` (macOS)
- Search for each extension by name
- Click "Install"

Or install via command line:
```bash
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
```

### Step 5: Build the Extension

Build the extension for the first time:

```bash
npm run build
```

This will create the `build/` directory with the compiled extension files.

For development with auto-reload:

```bash
npm start
```

This starts a development server with hot module replacement.

### Step 6: Load Extension in Browser

**For Chrome:**
1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top-right corner)
3. Click "Load unpacked"
4. Select the `build/` folder from your project directory

**For Edge:**
1. Open Edge and navigate to `edge://extensions/`
2. Enable "Developer mode" (toggle in left sidebar)
3. Click "Load unpacked"
4. Select the `build/` folder from your project directory

### Step 7: Verify Installation

1. **Check the extension is loaded**:
   - You should see the extension in your browser's extensions list
   - The extension icon should appear in the browser toolbar

2. **Test the extension**:
   - Click the extension icon
   - The side panel should open
   - Verify the UI loads correctly

## 🛠️ Common Tasks

### Running Development Server

Start the development server with hot reload:

```bash
npm start
```

### Building for Production

Create an optimized production build:

```bash
npm run build
```

### Formatting Code

Format all code files with Prettier:

```bash
npm run prettier
```

### Updating Dependencies

Update all npm packages:

```bash
npm update
```

## ❓ Troubleshooting

### Node.js command not found

**Issue**: `node: command not found`
- **Windows**: Reinstall Node.js from [nodejs.org](https://nodejs.org/) and restart your terminal
- **macOS**: Install Node.js with `brew install node` and ensure it's in your PATH
- **Linux**: Install Node.js with `sudo apt install nodejs npm`

### npm install fails

**Issue**: Errors during `npm install`
- **Solution**: 
  1. Clear npm cache: `npm cache clean --force`
  2. Delete `node_modules/` folder and `package-lock.json`
  3. Run `npm install` again

### Extension not loading in browser

**Issue**: Extension doesn't appear after loading
- **Solution**: 
  1. Ensure you ran `npm run build` first
  2. Check that you selected the correct `build/` folder
  3. Check browser console for errors (F12 → Console)
  4. Try reloading the extension (click the reload button in extensions page)

### Hot reload not working

**Issue**: Changes not appearing when running `npm start`
- **Solution**: 
  1. Stop the dev server (Ctrl+C)
  2. Clear browser cache
  3. Reload the extension in browser
  4. Restart dev server: `npm start`

### Build errors

**Issue**: TypeScript or webpack errors during build
- **Solution**: 
  1. Check the error message in the terminal
  2. Ensure all dependencies are installed: `npm install`
  3. Check for syntax errors in your code
  4. Try deleting `build/` folder and rebuilding

## 📚 Next Steps

Once your environment is set up:

1. ✅ Explore the project structure in `src/`
2. ✅ Review the labs in the `labs/` directory
3. ✅ Start the development server: `npm start`
4. ✅ Make changes and see them live in the browser

## 🔗 Additional Resources

- [Chrome Extension Development Guide](https://developer.chrome.com/docs/extensions/)
- [React Documentation](https://react.dev/)
- [Webpack Documentation](https://webpack.js.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [npm Documentation](https://docs.npmjs.com/)

---

**Ready to start?** Run `npm install`, then `npm start`, and load the extension in your browser! 🚀
