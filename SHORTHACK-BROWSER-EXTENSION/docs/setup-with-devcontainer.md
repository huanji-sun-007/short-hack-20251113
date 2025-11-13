# Setup with DevContainer

This guide will help you set up the Browser Extension development environment using a DevContainer, which provides a consistent, pre-configured development environment with all tools and dependencies.

## 📋 Prerequisites

### Required Software

1. **Visual Studio Code**
   - Download from [code.visualstudio.com](https://code.visualstudio.com/)
   - Version 1.75 or later recommended

2. **Dev Containers Extension**
   - Install from VS Code Marketplace: [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
   - Or install via command palette: `Extensions: Install Extensions` → Search for "Dev Containers"

3. **Docker**
   - **Windows**: [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop/) with WSL2 backend
     - **Alternative**: If you can't use Docker Desktop, try WSL2 + Docker Engine. See [this blog](https://qiita.com/oya_tadashi/items/3e3b026c161658484aba) for setup instructions
   - **Linux**: [Docker Engine](https://docs.docker.com/engine/install/) or Docker Desktop
   - Ensure Docker is running before proceeding

4. **Git**
   - Usually included with VS Code
   - Or download from [git-scm.com](https://git-scm.com/)

### System Requirements

- **Operating System**:
  - Windows 11 (with WSL2 enabled)
  - macOS 10.14 or later
  - Linux (most modern distributions)
- **RAM**: 8GB minimum, 16GB recommended
- **Storage**: At least 5GB free space for container images and dependencies
- **Internet**: Stable connection for downloading container images and dependencies

## Environment Setup

### Step 1: Clone the Repository

Open your terminal and run:

```bash
git clone https://github.com/huanji-sun-007/short-hack-20251113.git
cd short-hack-20251113/SHORTHACK-BROWSER-EXTENSION
```

### Step 2: Open in Visual Studio Code

```bash
code .
```

Alternatively, you can:
- Open VS Code
- Go to `File` → `Open Folder`
- Navigate to the cloned repository folder

### Step 3: Open in DevContainer

When VS Code opens, you should see a popup notification in the bottom-right corner:

> **Folder contains a Dev Container configuration file. Reopen folder to develop in a container.**

Click **"Reopen in Container"**.

**If you don't see the popup:**

1. Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (macOS)
2. Type and select: **"Dev Containers: Reopen in Container"**
3. Press Enter

**Expected time**: 5-10 minutes (depending on your internet connection)

You can monitor progress in the VS Code terminal window at the bottom of the screen.

### Step 4: Verify Installation

1. **Check Node.js version**:
   ```bash
   node --version
   ```
   Expected output: `v18.x.x` or higher

2. **Check npm version**:
   ```bash
   npm --version
   ```
   Expected output: `9.x.x` or higher

3. **Install dependencies**:
   ```bash
   npm install
   ```

## Configuration

### Step 1: Build the Extension

Once the container is ready and dependencies are installed, build the extension:

```bash
npm run build
```

For development with hot reload:

```bash
npm start
```

### Step 2: Load Extension in Browser

Since the DevContainer runs in a containerized environment, you'll need to load the extension in your host browser:

**For Chrome:**
1. Open Chrome on your host machine
2. Navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top-right corner)
4. Click "Load unpacked"
5. Select the `build/` folder from your project directory

**For Edge:**
1. Open Edge on your host machine
2. Navigate to `edge://extensions/`
3. Enable "Developer mode" (toggle in left sidebar)
4. Click "Load unpacked"
5. Select the `build/` folder from your project directory

### Step 3: Start Development

1. **Open the project files** in VS Code Explorer
2. **Review the labs** in the `labs/` directory
3. **Make changes** to the code in `src/`
4. **See updates** automatically when running `npm start`


## 🛠️ Common Tasks

### Rebuilding the Container

If you need to rebuild the container (e.g., after updating `devcontainer.json`):

1. Press `Ctrl+Shift+P` / `Cmd+Shift+P`
2. Select: **"Dev Containers: Rebuild Container"**

### Stopping the Container

1. Press `Ctrl+Shift+P` / `Cmd+Shift+P`
2. Select: **"Dev Containers: Reopen Folder Locally"**

Or simply close VS Code.

## ❓ Troubleshooting

### Container fails to start

**Issue**: Docker is not running
- **Solution**: Start Docker Desktop and wait for it to fully initialize

### Slow performance

**Issue**: Container is slow on Windows
- **Solution**: Ensure you're using WSL2 backend in Docker Desktop settings
- Store repository files in WSL2 filesystem (not Windows filesystem)

**Issue**: High memory usage
- **Solution**: Increase Docker memory limit in Docker Desktop settings (Preferences → Resources)

### Extensions not loading

**Issue**: VS Code extensions not installed
- **Solution**: Rebuild the container:
  - `Ctrl+Shift+P` / `Cmd+Shift+P` → "Dev Containers: Rebuild Container"

### npm install fails

**Issue**: Errors during `npm install`
- **Solution**: 
  1. Rebuild the container to get a fresh environment
  2. Clear npm cache in container: `npm cache clean --force`
  3. Try installing again: `npm install`

### Extension not loading in browser

**Issue**: Extension doesn't appear in browser
- **Solution**: 
  1. Ensure you ran `npm run build` in the container
  2. Check that the `build/` folder exists and has files
  3. Load the extension from the correct project path on your host machine
  4. Check browser console for errors (F12 → Console)

## 📚 Next Steps

Once your environment is set up:

1. ✅ Explore the project structure in `src/`
2. ✅ Review the labs in the `labs/` directory
3. ✅ Start the development server: `npm start`
4. ✅ Load the extension in your browser and test it

## 🔗 Additional Resources

- [DevContainer Documentation](https://code.visualstudio.com/docs/devcontainers/containers)
- [Chrome Extension Development Guide](https://developer.chrome.com/docs/extensions/)
- [React Documentation](https://react.dev/)
- [Webpack Documentation](https://webpack.js.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Docker Documentation](https://docs.docker.com/)

---

**Ready to start?** Run `npm install`, then `npm start`, and load the extension in your browser! 🚀
