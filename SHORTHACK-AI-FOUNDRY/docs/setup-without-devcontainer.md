# Setup without DevContainer

This guide will help you set up the Azure AI Foundry Workshop environment on your local machine without using a DevContainer. This approach gives you more control over your development environment.

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

### Azure Requirements

- **Azure Subscription** - [Create a free account](https://azure.microsoft.com/free/)
- **Azure AI Foundry Project** - Created through [Azure AI Foundry Portal](https://ai.azure.com)
- **Azure OpenAI Deployment** - GPT-4o model deployment

## 🚀 Step-by-Step Setup

### Step 1: Clone the Repository

Open your terminal and run:

```bash
git clone <repository-url>
cd SHORTHACK-AI-FOUNDRY
```

### Step 2: Verify Python Installation

Check that Python 3.11 or later is installed:

```bash
python --version
# or on some systems:
python3 --version
```

Expected output: `Python 3.11.x` or higher

**Note**: If you have multiple Python versions installed, you may need to use `python3.11` instead of `python` throughout this guide.

### Step 3: Create a Virtual Environment

Creating a virtual environment isolates your project dependencies:

**Windows (PowerShell):**
```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
```

**Windows (Command Prompt):**
```cmd
python -m venv venv
venv\Scripts\activate.bat
```

**macOS/Linux:**
```bash
python3 -m venv venv
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
- Azure AI Foundry SDK and related packages
- Jupyter and JupyterLab
- Development tools (Black, isort, flake8)
- Python utilities (python-dotenv)

**Expected time**: 3-10 minutes depending on your internet connection

### Step 6: Install VS Code Extensions

Open Visual Studio Code and install these recommended extensions:

**Required Extensions:**
1. **Python** (ms-python.python)
2. **Pylance** (ms-python.vscode-pylance)
3. **Jupyter** (ms-toolsai.jupyter)

**Recommended Extensions:**
4. **Azure Account** (ms-vscode.azure-account)
5. **Azure Resources** (ms-azuretools.vscode-azureresourcegroups)
6. **Black Formatter** (ms-python.black-formatter)
7. **isort** (ms-python.isort)
8. **Markdown All in One** (yzhang.markdown-all-in-one)

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
code --install-extension ms-vscode.azure-account
code --install-extension ms-azuretools.vscode-azureresourcegroups
code --install-extension ms-python.black-formatter
code --install-extension ms-python.isort
```

### Step 7: Configure Python Interpreter in VS Code

1. Open the project folder in VS Code:
   ```bash
   code .
   ```

2. Open the Command Palette: `Ctrl+Shift+P` / `Cmd+Shift+P`

3. Type and select: **"Python: Select Interpreter"**

4. Choose the interpreter from your virtual environment:
   - Should show path like `./venv/bin/python` or `.\venv\Scripts\python.exe`
   - May be labeled as `Python 3.11.x ('venv')`

### Step 8: Configure Azure Credentials

Create your environment configuration file:

1. **Copy the template file**:
   
   **Windows (PowerShell):**
   ```powershell
   Copy-Item .env.template .env
   ```
   
   **macOS/Linux:**
   ```bash
   cp .env.template .env
   ```

2. **Edit the `.env` file**:
   ```bash
   code .env
   ```

3. **Fill in your Azure details**:
   ```bash
   # Azure Subscription and Tenant Information
   SUBSCRIPTION_ID="your-subscription-id"
   TENANT_ID="your-tenant-id"
   
   # Azure AI Foundry Project Configuration
   AIPROJECT_ENDPOINT="your-ai-project-endpoint"
   
   # Azure OpenAI Configuration
   MODEL_DEPLOYMENT_NAME="gpt-4o"
   ```

**Where to find these values:**
- Go to [Azure AI Foundry Portal](https://ai.azure.com)
- Select your project
- Navigate to **Settings** → **Project properties**
- Copy the Subscription ID, Tenant ID, and Project Connection String

### Step 9: Verify Installation

1. **Check virtual environment is active**:
   ```bash
   which python  # macOS/Linux
   where python  # Windows
   ```
   Should point to your `venv` directory

2. **Verify installed packages**:
   ```bash
   pip list | grep azure  # macOS/Linux
   pip list | findstr azure  # Windows
   ```
   You should see packages like `azure-ai-projects`, `azure-identity`, etc.
   
   Also verify Jupyter is installed:
   ```bash
   pip list | grep jupyter  # macOS/Linux
   pip list | findstr jupyter  # Windows
   ```

3. **Test Jupyter installation**:
   ```bash
   jupyter --version
   ```

4. **Optional - Verify Azure CLI** (if installed):
   ```bash
   az --version
   ```

### Step 10: Start the Workshop

1. **Open the notebooks folder** in VS Code Explorer
2. **Open the first notebook**: `notebooks/1-authentication.ipynb`
3. **Select the Python kernel** when prompted:
   - Click "Select Kernel" in the top-right corner
   - Choose your virtual environment interpreter
4. **Run the cells** to authenticate and verify your setup

## 🔧 Optional: Install Azure CLI

The Azure CLI is helpful for managing Azure resources from the command line:

**Windows:**
```powershell
# Using winget
winget install -e --id Microsoft.AzureCLI

# Or download MSI from:
# https://aka.ms/installazurecliwindows
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

### Running Jupyter Lab

If you prefer JupyterLab over VS Code's notebook interface:

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
    "python.formatting.blackArgs": ["--line-length=100"],
    "python.linting.enabled": true,
    "python.linting.flake8Enabled": true,
    "python.linting.flake8Args": ["--max-line-length=100", "--ignore=E203,W503"],
    "python.sortImports.args": ["--profile", "black"],
    "jupyter.askForKernelRestart": false,
    "files.associations": {
        "*.ipynb": "jupyter-notebook"
    }
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

Sort imports using isort:
```bash
isort .
```

Check code quality with flake8:
```bash
flake8 .
```

## ❓ Troubleshooting

### Python command not found

**Issue**: `python: command not found`
- **Windows**: Reinstall Python and check "Add Python to PATH"
- **macOS/Linux**: Try `python3` instead of `python`, or add alias:
  ```bash
  echo "alias python=python3" >> ~/.zshrc  # macOS with zsh
  echo "alias python=python3" >> ~/.bashrc  # Linux with bash
  source ~/.zshrc  # or ~/.bashrc
  ```

### Virtual environment not activating

**Issue**: Permission errors on Windows
- **Solution**: Run PowerShell as Administrator and execute:
  ```powershell
  Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
  ```

**Issue**: Virtual environment not found
- **Solution**: Recreate the virtual environment:
  ```bash
  rm -rf venv  # macOS/Linux
  rmdir /s venv  # Windows
  python -m venv venv
  ```

### Package installation errors

**Issue**: Pip install fails with compilation errors
- **Solution**: Install Visual C++ Build Tools (Windows) or build-essential (Linux)
  - **Windows**: [Visual Studio Build Tools](https://visualstudio.microsoft.com/downloads/#build-tools-for-visual-studio-2022)
  - **Linux**: `sudo apt install build-essential python3-dev`

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

### Azure authentication issues

**Issue**: Authentication fails in notebooks
- **Solution**: 
  1. Verify `.env` file has correct values
  2. Login via Azure CLI: `az login`
  3. Check Azure subscription: `az account show`
  4. Restart the notebook kernel

## 📚 Next Steps

Once your environment is set up:

1. ✅ Verify authentication: Open `notebooks/1-authentication.ipynb`
2. ✅ Configure environment: Open `notebooks/2-environment_setup.ipynb`
3. ✅ Build your first AI app: Open `notebooks/3-quick-start.ipynb`
4. ✅ Explore AI agents: Continue with notebooks 4 and 5

## 🔗 Additional Resources

- [Python Virtual Environments Guide](https://docs.python.org/3/tutorial/venv.html)
- [VS Code Python Tutorial](https://code.visualstudio.com/docs/python/python-tutorial)
- [Azure AI Foundry Documentation](https://learn.microsoft.com/azure/ai-studio/)
- [Jupyter Documentation](https://jupyter.org/documentation)

## 💡 Tips

- **Always activate your virtual environment** before working on the project
- **Keep your dependencies updated** regularly with `pip install --upgrade -r requirements.txt`
- **Use `.gitignore`** to avoid committing your `venv` folder and `.env` file
- **Consider using pyenv** for managing multiple Python versions on the same machine

---

**Ready to start?** Activate your virtual environment, open VS Code, and begin with `notebooks/1-authentication.ipynb`! 🚀
