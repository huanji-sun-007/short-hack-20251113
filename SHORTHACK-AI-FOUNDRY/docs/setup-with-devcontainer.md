# Setup with DevContainer

This guide will help you set up the Azure AI Foundry Workshop environment using a DevContainer, which provides a consistent, pre-configured development environment with all tools and dependencies.

## 📋 Prerequisites

### Required Software

1. **Visual Studio Code**
   - Download from [code.visualstudio.com](https://code.visualstudio.com/)
   - Version 1.75 or later recommended

2. **Dev Containers Extension**
   - Install from VS Code Marketplace: [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
   - Or install via command palette: `Extensions: Install Extensions` → Search for "Dev Containers"

3. **Docker Desktop**
   - **Windows**: [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop/) with WSL2 backend
     - **Alternative**: If you can't use Docker Desktop, try WSL2 + Docker Engine. See [this blog](https://qiita.com/oya_tadashi/items/3e3b026c161658484aba) for setup instructions
   - **macOS**: [Docker Desktop for Mac](https://www.docker.com/products/docker-desktop/)
   - **Linux**: [Docker Engine](https://docs.docker.com/engine/install/) or Docker Desktop
   - Ensure Docker is running before proceeding
4. **Git**
   - Usually included with VS Code
   - Or download from [git-scm.com](https://git-scm.com/)

### System Requirements

- **Operating System**:
  - Windows 10/11 (with WSL2 enabled)
  - macOS 10.14 or later
  - Linux (most modern distributions)
- **RAM**: 8GB minimum, 16GB recommended
- **Storage**: At least 10GB free space for container images and dependencies
- **Internet**: Stable connection for downloading container images and dependencies

## 🚀 Step-by-Step Setup

### Step 1: Clone the Repository

Open your terminal and run:

```bash
git clone https://github.com/huanji-sun-007/short-hack-20251113.git
cd cd short-hack-20251113/SHORTHACK-AI-FOUNDRY
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

### Step 4: Wait for Container Setup

The first time you open the DevContainer, it will:

1. **Pull the base Docker image** (~2-3 GB)
   - Python 3.11 with Debian Bullseye
   
2. **Install features**:
   - Azure CLI
   - Git
   - GitHub CLI
   - Node.js 18

3. **Install VS Code extensions**:
   - Python, Pylance, Jupyter
   - Azure Account and Resource Groups
   - Markdown and YAML tools
   - Code formatters (Black, isort, flake8)

4. **Run post-create scripts**:
   - Install Python dependencies from `requirements.txt`
   - Configure environment

**Expected time**: 5-15 minutes (depending on your internet connection)

You can monitor progress in the VS Code terminal window at the bottom of the screen.

### Step 5: Configure Azure Credentials

Once the container is ready, create your environment configuration file:

1. **Copy the template file**:
   ```bash
   cp .env.template .env
   ```

2. **Edit the `.env` file** with your Azure details:
   ```bash
   # Open in VS Code editor
   code .env
   ```

3. **Fill in the required values**:
   ```bash
   # Azure Subscription and Tenant Information
   SUBSCRIPTION_ID="your-subscription-id"
   TENANT_ID="your-tenant-id"
   
   # Azure AI Foundry Project Configuration
   AIPROJECT_ENDPOINT="your-ai-project-endpoint"
   
   # Azure OpenAI Configuration
   MODEL_DEPLOYMENT_NAME="gpt-4o"
   ```

### Step 6: Verify Installation

1. **Check Python version**:
   ```bash
   python3.11 --version
   ```
   Expected output: `Python 3.11.x`

2. **Check installed packages**:
   ```bash
   pip list | grep azure
   ```
   You should see Azure AI packages listed

3. **Check Azure CLI**:
   ```bash
   az --version
   ```

### Step 7: Start the Workshop

1. **Open the notebooks folder** in VS Code Explorer
2. **Start with the first notebook**: `notebooks/1-authentication.ipynb`
3. **Select the Python kernel** when prompted (should be `/usr/local/bin/python`)
4. **Run the cells** to authenticate and verify your setup

## 🔧 DevContainer Features

Your DevContainer comes pre-configured with:

### Development Tools
- ✅ Python 3.11
- ✅ Azure CLI
- ✅ Git & GitHub CLI
- ✅ Node.js 18

### VS Code Extensions
- ✅ Python language support (Pylance)
- ✅ Jupyter notebooks
- ✅ Azure Account integration
- ✅ Code formatting (Black, isort, flake8)
- ✅ Markdown support

### Python Packages
- ✅ Azure AI Foundry SDK
- ✅ Azure Identity & Authentication
- ✅ Jupyter & JupyterLab
- ✅ Development tools (Black, isort, flake8)

### Port Forwarding
- ✅ Port 8888 (Jupyter)
- ✅ Port 5000 (Flask Dev Server)
- ✅ Port 8000 (HTTP Server)

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

## 📚 Next Steps

Once your environment is set up:

1. ✅ Verify authentication: Open `notebooks/1-authentication.ipynb`
2. ✅ Configure environment: Open `notebooks/2-environment_setup.ipynb`
3. ✅ Build your first AI app: Open `notebooks/3-quick-start.ipynb`
4. ✅ Explore AI agents: Continue with notebooks 4 and 5

## 🔗 Additional Resources

- [DevContainer Documentation](https://code.visualstudio.com/docs/devcontainers/containers)
- [Azure AI Foundry Documentation](https://learn.microsoft.com/azure/ai-studio/)
- [Docker Documentation](https://docs.docker.com/)

---

**Ready to start?** Open `notebooks/1-authentication.ipynb` and begin your AI journey! 🚀
