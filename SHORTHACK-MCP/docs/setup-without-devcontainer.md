# Setup without DevContainer

This guide will help you set up the Model Context Protocol (MCP) Lab environment on your local machine without using a DevContainer. This approach gives you more control over your development environment.

## 📋 Prerequisites

### Required Software

1. **Python 3.11 or later**
   - **Windows**: Download from [python.org](https://www.python.org/downloads/)
     - ⚠️ Check "Add Python to PATH" during installation
   - **macOS**: 
     ```bash
     brew install python@3.11
     ```
     Or download from [python.org](https://www.python.org/downloads/)
   - **Linux**:
     ```bash
     sudo apt update
     sudo apt install python3.11 python3.11-venv python3-pip
     ```

2. **Visual Studio Code**
   - Download from [code.visualstudio.com](https://code.visualstudio.com/)
   - Version 1.75 or later recommended

3. **Git**
   - **Windows**: Download from [git-scm.com](https://git-scm.com/)
   - **macOS**: Usually pre-installed, or use `brew install git`
   - **Linux**: Usually pre-installed, or use `sudo apt install git`

4. **Azure CLI** (Optional but recommended)
   - Follow installation instructions at [Microsoft Docs](https://learn.microsoft.com/cli/azure/install-azure-cli)

### System Requirements

- **Operating System**: Windows 10/11, macOS 10.14+, or modern Linux
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: At least 2GB free space for dependencies
- **Internet**: Stable connection for package downloads

### Azure & Codebeamer Requirements

- **Azure Subscription** with an Azure OpenAI resource
  - Deployed Chat Completion Model (e.g., `gpt-4o`, `gpt-4o-mini`)
- **Codebeamer Instance** with valid API credentials (for Labs 2 and 3)

## 🚀 Step-by-Step Setup

### Step 1: Clone the Repository

Open your terminal and run:

```bash
git clone https://github.com/huanji-sun-007/short-hack-20251113.git
cd short-hack-20251113/SHORTHACK-MCP
```

### Step 2: Verify Python Installation

Check that Python 3.11 or later is installed:

**Windows:**
```powershell
python --version
# or
py -3.11 --version
```

**macOS/Linux:**
```bash
python3.11 --version
```

Expected output: `Python 3.11.x` or higher

**Note**: This guide uses `python3.11` throughout all commands to ensure Python 3.11 is used. This avoids conflicts if you have multiple Python versions installed.

### Step 3: Create a Virtual Environment

Creating a virtual environment isolates your project dependencies:

**Windows:**
```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
```

**macOS/Linux:**
```bash
python3.11 -m venv venv
source venv/bin/activate
```

You should see `(venv)` at the beginning of your terminal prompt, indicating the virtual environment is active.

### Step 4: Upgrade pip

Ensure you have the latest version of pip:

```bash
pip install --upgrade pip
```

### Step 5: Install Python Dependencies

Install all required packages from `requirements.txt`:

```bash
pip install -r requirements.txt
```

This will install:
- Semantic Kernel with MCP support
- MCP SDK (v1.20.0+)

**Expected time**: 2-5 minutes depending on your internet connection

### Step 6: Install Wikipedia MCP Server (Lab 1)

For Lab 1, install the Wikipedia MCP server:

```bash
pip install wikipedia-mcp
```

### Step 7: Install VS Code Extensions

Open Visual Studio Code and install these recommended extensions:

**Required Extensions:**
1. **Python** (ms-python.python)
2. **Pylance** (ms-python.vscode-pylance)
3. **Jupyter** (ms-toolsai.jupyter)

**Recommended Extensions:**
4. **Black Formatter** (ms-python.black-formatter)
5. **Ruff** (charliermarsh.ruff)
6. **Prettier - Code formatter** (esbenp.prettier-vscode)
7. **Markdown All in One** (yzhang.markdown-all-in-one)

**To install extensions:**
- Open VS Code
- Press `Ctrl+Shift+X` (Windows/Linux) or `Cmd+Shift+X` (macOS)
- Search for each extension by name
- Click "Install"

Or install via command line:
```bash
code --install-extension ms-python.python
code --install-extension ms-python.vscode-pylance
code --install-extension ms-toolsai.jupyter
code --install-extension ms-python.black-formatter
code --install-extension charliermarsh.ruff
code --install-extension esbenp.prettier-vscode
```

### Step 8: Configure Python Interpreter in VS Code

1. Open the project folder in VS Code:
   ```bash
   code .
   ```

2. Open the Command Palette: `Ctrl+Shift+P` / `Cmd+Shift+P`

3. Type and select: **"Python: Select Interpreter"**

4. Choose the interpreter from your virtual environment:
   - Should show path like `./venv/bin/python` or `.\venv\Scripts\python.exe`
   - May be labeled as `Python 3.11.x ('venv')`

### Step 9: Configure Environment Variables

Create your environment configuration file:

1. **Copy the template file**:
   
   **Windows (PowerShell):**
   ```powershell
   Copy-Item .envtemplate .env
   ```
   
   **macOS/Linux:**
   ```bash
   cp .envtemplate .env
   ```

2. **Edit the `.env` file**:
   ```bash
   code .env
   ```

3. **Fill in your credentials**:
   ```bash
   # Azure OpenAI Configuration
   AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com/
   AZURE_OPENAI_API_KEY=your-api-key
   AZURE_OPENAI_DEPLOYMENT_NAME=gpt-4o
   AZURE_OPENAI_API_VERSION=2024-02-01
   
   # Codebeamer Configuration (for Labs 2 and 3)
   CODEBEAMER_URL=https://your-codebeamer-instance.com
   CODEBEAMER_API_KEY=your-codebeamer-api-key
   ```

### Step 10: Verify Installation

1. **Check virtual environment is active**:
   ```bash
   which python  # macOS/Linux
   where python  # Windows
   ```
   Should point to your `venv` directory

2. **Verify installed packages**:
   ```bash
   pip list | grep semantic-kernel  # macOS/Linux
   pip list | findstr semantic-kernel  # Windows
   
   pip list | grep mcp  # macOS/Linux
   pip list | findstr mcp  # Windows
   ```
   You should see packages like `semantic-kernel`, `mcp`, etc.

3. **Test Python installation**:
   ```bash
   python -c "import semantic_kernel; print('Semantic Kernel version:', semantic_kernel.__version__)"
   ```

### Step 11: Install Additional Tools (Optional)

#### UV Package Manager (Faster Python package installation)

**macOS/Linux:**
```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

**Windows (PowerShell):**
```powershell
powershell -c "irm https://astral.sh/uv/install.ps1 | iex"
```

After installation, you can use `uv pip install` instead of `pip install` for faster installations.

#### Azure CLI

The Azure CLI is helpful for managing Azure resources:

**Windows:**
```powershell
# Using winget
winget install -e --id Microsoft.AzureCLI
```

**macOS:**
```bash
brew update && brew install azure-cli
```

**Linux:**
```bash
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash
```

After installation, login to Azure:
```bash
az login
az account set --subscription "your-subscription-id"
```

### Step 12: Start the Labs

1. **Open the labs folder** in VS Code Explorer
2. **Start with the first lab**: `labs/01_connecting_to_an_mcp_server.md`
3. Follow the instructions to configure MCP with GitHub Copilot Chat
4. Continue with Lab 2 and Lab 3

## 🛠️ Common Tasks

### Activating Virtual Environment

You'll need to activate the virtual environment each time you open a new terminal:

**Windows (PowerShell):**
```powershell
.\venv\Scripts\Activate.ps1
```

**macOS/Linux:**
```bash
source venv/bin/activate
```

### Installing Additional Packages

With virtual environment activated:

```bash
pip install package-name
```

To persist packages, add them to `requirements.txt`:
```bash
pip freeze > requirements.txt
```

### Updating Dependencies

```bash
pip install --upgrade -r requirements.txt
```

### Running MCP Server

To run the custom Codebeamer MCP server:

```bash
python servers/mcp_server.py
```

The server should start and listen for MCP client connections.

### Running Jupyter Notebooks

If you prefer JupyterLab over VS Code's notebook interface:

1. Install JupyterLab:
   ```bash
   pip install jupyterlab
   ```

2. Start JupyterLab:
   ```bash
   jupyter lab
   ```

This will open JupyterLab in your default browser at `http://localhost:8888`

### Deactivating Virtual Environment

When you're done working:

```bash
deactivate
```

## 📝 Development Environment Configuration

### VS Code Settings (Optional)

Create or update `.vscode/settings.json` in your project folder:

```json
{
    "python.defaultInterpreterPath": "${workspaceFolder}/venv/bin/python",
    "python.formatting.provider": "black",
    "python.formatting.blackArgs": ["--line-length=120"],
    "python.linting.enabled": true,
    "python.linting.ruffEnabled": true,
    "python.linting.ruffArgs": [
        "--line-length",
        "120",
        "--extend-select",
        "I"
    ],
    "[python]": {
        "editor.defaultFormatter": "ms-python.black-formatter"
    },
    "[markdown]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[yaml]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[json]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "editor.formatOnSave": true,
    "jupyter.askForKernelRestart": false
}
```

### Code Formatting

Format your Python code using Black:

```bash
# Format a single file
black your_file.py

# Format entire project
black .
```

Check code quality with Ruff:
```bash
ruff check .
```

## 🔧 MCP Configuration

### Configuring MCP for GitHub Copilot Chat

Create `.vscode/mcp.json` to configure MCP servers for GitHub Copilot Chat:

```json
{
  "mcpServers": {
    "wikipedia": {
      "command": "python",
      "args": ["-m", "wikipedia_mcp"]
    }
  }
}
```

For the custom Codebeamer MCP server (Lab 2):

```json
{
  "mcpServers": {
    "codebeamer": {
      "command": "python",
      "args": ["servers/mcp_server.py"]
    }
  }
}
```

**Note**: Make sure to use absolute paths or ensure the commands are accessible from your virtual environment.

## ❓ Troubleshooting

### Python command not found

**Issue**: `python3.11: command not found`
- **Windows**: Reinstall Python 3.11 and check "Add Python to PATH"
- **macOS**: Install Python 3.11 with `brew install python@3.11` and ensure it's in your PATH
- **Linux**: Install Python 3.11 with `sudo apt install python3.11`

### Virtual environment not activating

**Issue**: Permission errors on Windows
- **Solution**: Run PowerShell as Administrator and execute:
  ```powershell
  Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
  ```

**Issue**: Virtual environment not found
- **Solution**: Recreate the virtual environment:
  
  **Windows:**
  ```powershell
  Remove-Item -Recurse -Force venv
  python -m venv venv
  ```
  
  **macOS/Linux:**
  ```bash
  rm -rf venv
  python3.11 -m venv venv
  ```

### Package installation errors

**Issue**: Pip install fails with compilation errors
- **Solution**: Install build tools
  - **Windows**: [Visual Studio Build Tools](https://visualstudio.microsoft.com/downloads/#build-tools-for-visual-studio-2022)
  - **Linux**: `sudo apt install build-essential python3-dev`
  - **macOS**: `xcode-select --install`

**Issue**: SSL certificate errors
- **Solution**: Update pip and certificates:
  ```bash
  pip install --upgrade pip certifi
  ```

### Jupyter kernel not found

**Issue**: VS Code can't find Python kernel
- **Solution**: 
  1. Install ipykernel in your virtual environment:
     ```bash
     pip install ipykernel
     python -m ipykernel install --user --name=venv
     ```
  2. Reload VS Code window: `Ctrl+Shift+P` → "Developer: Reload Window"
  3. Reselect the kernel in the notebook

### Import errors in notebooks

**Issue**: `ModuleNotFoundError` when running notebook cells
- **Solution**: Ensure correct kernel is selected:
  1. Click kernel selector in top-right of notebook
  2. Choose the venv interpreter
  3. Restart kernel and run cells again

### MCP Server connection issues

**Issue**: GitHub Copilot Chat can't connect to MCP server
- **Solution**: 
  1. Verify `.vscode/mcp.json` configuration is correct
  2. Ensure MCP server is running
  3. Check environment variables in `.env`
  4. Verify Python path in MCP config points to virtual environment
  5. Restart VS Code

**Issue**: MCP server fails to start
- **Solution**:
  1. Check if all dependencies are installed
  2. Verify environment variables are set correctly
  3. Run the server manually to see error messages:
     ```bash
     python servers/mcp_server.py
     ```

### Semantic Kernel issues

**Issue**: Azure OpenAI authentication fails
- **Solution**: 
  1. Verify `.env` file has correct values
  2. Check Azure OpenAI endpoint and API key
  3. Ensure deployment name matches your Azure OpenAI deployment
  4. Login via Azure CLI: `az login`

## 📚 Next Steps

Once your environment is set up:

1. ✅ Complete Lab 1: Integrate Wikipedia MCP Server with Copilot Chat
2. ✅ Complete Lab 2: Build your own MCP server with FastMCP
3. ✅ Complete Lab 3: Use MCP as a plugin in Semantic Kernel

## 🔗 Additional Resources

- [Python Virtual Environments Guide](https://docs.python.org/3/tutorial/venv.html)
- [VS Code Python Tutorial](https://code.visualstudio.com/docs/python/python-tutorial)
- [Model Context Protocol Documentation](https://modelcontextprotocol.io/introduction)
- [Semantic Kernel Documentation](https://learn.microsoft.com/semantic-kernel/)
- [FastMCP Documentation](https://gofastmcp.com/getting-started/welcome)
- [Jupyter Documentation](https://jupyter.org/documentation)

## 💡 Tips

- **Always activate your virtual environment** before working on the project
- **Keep your dependencies updated** regularly with `pip install --upgrade -r requirements.txt`
- **Use `.gitignore`** to avoid committing your `venv` folder and `.env` file
- **Consider using pyenv** for managing multiple Python versions on the same machine
- **Use UV** for faster package installations: `uv pip install package-name`

---

**Ready to start?** Activate your virtual environment, open VS Code, and begin with `labs/01_connecting_to_an_mcp_server.md`! 🚀
