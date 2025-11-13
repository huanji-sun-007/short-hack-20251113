# Setup with DevContainer

This guide will help you set up the Agent Framework training environment using a DevContainer, which provides a consistent, pre-configured development environment with all tools and dependencies.

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

### Azure Requirements

- **Azure Subscription** with Azure AI Foundry access
  - Azure OpenAI resource with deployed Chat Completion Model (e.g., `gpt-4o`)
  - Azure AI Foundry project (can be deployed via included script)

## Environment Setup

### Step 1: Clone the Repository

Open your terminal and run:

```bash
git clone https://github.com/huanji-sun-007/short-hack-20251113.git
cd short-hack-20251113/SHORTHACK-AGENT-FRAMEWORK
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
   pip list | grep agent-framework
   ```
   You should see `agent-framework` in the list

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
   
   **Option A: If you deployed your own Azure resources**
   - Run the deployment script: `./deploy.sh`
   - The script will automatically generate the `.env` file
   
   **Option B: If using shared resources**
   - Obtain `.env` file from your instructor
   - Or manually fill in the values:
   ```bash
   # Azure OpenAI Configuration
   AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com/
   AZURE_OPENAI_MODEL_DEPLOYMENT_NAME=gpt-4o
   
   # Azure AI Foundry Configuration
   AZURE_AI_PROJECT_ENDPOINT=https://your-project.services.ai.azure.com/
   AZURE_AI_PROJECT_NAME=your-project-name
   AZURE_AI_MODEL_DEPLOYMENT_NAME=gpt-4o
   ```

### Step 2: Authenticate with Azure

Before running the labs, authenticate with Azure CLI:

```bash
az login
```

If using shared resources, authenticate with the correct tenant:
```bash
az login --tenant <tenant-id>
```

Verify you're logged in:
```bash
az account show
```

### Step 3: Start the Labs

1. **Open the labs folder** in VS Code Explorer
2. **Start with the first lab**: `labs/010-azure_open_ai_chat_api.py`
3. Run labs sequentially from 010 through 170
4. Execute Python files directly:
   ```bash
   python labs/010-azure_open_ai_chat_api.py
   ```


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

### Azure authentication issues

**Issue**: Authentication errors when running labs
- **Solution**: 
  1. Ensure you're logged in with Azure CLI: `az login`
  2. For shared resources, verify correct tenant: `az account show`
  3. Check that `.env` file exists with all required variables
  4. Verify you have proper role assignments (Azure AI Developer, Cognitive Services OpenAI User)
  5. Try logging out and back in: `az logout` then `az login`

## 📚 Next Steps

Once your environment is set up:

1. ✅ Run Lab 010: Azure OpenAI Chat API basics
2. ✅ Progress through labs sequentially (010 → 170)
3. ✅ Complete exercises in labs 031, 081, 111, and 141
4. ✅ Experiment with building your own AI agents

## 🔗 Additional Resources

- [DevContainer Documentation](https://code.visualstudio.com/docs/devcontainers/containers)
- [Microsoft Agent Framework Documentation](https://learn.microsoft.com/en-us/agent-framework/)
- [Microsoft Agent Framework GitHub](https://github.com/microsoft/agent-framework)
- [Azure AI Foundry Documentation](https://learn.microsoft.com/en-us/azure/ai-foundry/)
- [Azure OpenAI Service](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [Docker Documentation](https://docs.docker.com/)

---

**Ready to start?** Authenticate with Azure CLI and begin with `python labs/010-azure_open_ai_chat_api.py`! 🚀
