# Setup with DevContainer

This guide will help you set up the Model Context Protocol (MCP) Lab environment using a DevContainer, which provides a consistent, pre-configured development environment with all tools and dependencies.

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
- **Storage**: At least 10GB free space for container images and dependencies
- **Internet**: Stable connection for downloading container images and dependencies

### Azure & Codebeamer Requirements

- **Azure Subscription** with an Azure OpenAI resource
  - Deployed Chat Completion Model (e.g., `gpt-4o`)
- **Codebeamer Instance** with valid API credentials (for Labs 2 and 3)

## Environment Setup

### Step 1: Clone the Repository

Open your terminal and run:

```bash
git clone https://github.com/huanji-sun-007/short-hack-20251113.git
cd short-hack-20251113/SHORTHACK-MCP
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

1. **Check Python version**:
   ```bash
   python --version
   ```
   Expected output: `Python 3.13.x`

2. **Check installed packages**:
   ```bash
   pip list | grep semantic-kernel
   pip list | grep mcp
   ```
   You should see `semantic-kernel` and `mcp` packages listed

3. **Check Azure CLI**:
   ```bash
   az --version
   ```

## Configuration

### Step 1: Configure Environment Variables

Once the container is ready, create your environment configuration file:

1. **Copy the template file**:
   ```bash
   cp .envtemplate .env
   ```

2. **Edit the `.env` file** with your credentials:
   ```bash
   # Open in VS Code editor
   code .env
   ```

3. **Fill in the required values**:
   ```bash
   # Azure OpenAI Configuration
   AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com/
   AZURE_OPENAI_API_KEY=your-api-key
   AZURE_OPENAI_DEPLOYMENT_NAME=gpt-4o
   AZURE_OPENAI_API_VERSION=2025-03-01-preview
   
   # Codebeamer Configuration (for Labs 2 and 3)
   CODEBEAMER_URL=https://your-codebeamer-instance.com
   CODEBEAMER_API_KEY=your-codebeamer-api-key
   ```

### Step 2: Start the Labs

1. **Open the labs folder** in VS Code Explorer
2. **Start with the first lab**: `labs/01_connecting_to_an_mcp_server.md`
3. Follow the instructions to configure MCP with GitHub Copilot Chat
4. Continue with Lab 2 and Lab 3


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

### MCP Server connection issues

**Issue**: GitHub Copilot Chat can't connect to MCP server
- **Solution**: 
  1. Verify `.vscode/mcp.json` configuration is correct
  2. Ensure MCP server is running
  3. Check environment variables in `.env`
  4. Restart VS Code

## 📚 Next Steps

Once your environment is set up:

1. ✅ Complete Lab 1: Integrate Wikipedia MCP Server with Copilot Chat
2. ✅ Complete Lab 2: Build your own MCP server with FastMCP
3. ✅ Complete Lab 3: Use MCP as a plugin in Semantic Kernel

## 🔗 Additional Resources

- [DevContainer Documentation](https://code.visualstudio.com/docs/devcontainers/containers)
- [Model Context Protocol Documentation](https://modelcontextprotocol.io/introduction)
- [Semantic Kernel Documentation](https://learn.microsoft.com/semantic-kernel/)
- [FastMCP Documentation](https://gofastmcp.com/getting-started/welcome)
- [Docker Documentation](https://docs.docker.com/)

---

**Ready to start?** Open `labs/01_connecting_to_an_mcp_server.md` and begin your MCP journey! 🚀
