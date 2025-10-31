# DevContainer Setup

This devcontainer is configured for Python development with:
- **Jupyter Notebooks** support via VS Code extensions
- **Microsoft Agent Framework** pre-installed
- Python 3.11
- Common data science libraries

## Getting Started

1. Make sure you have Docker installed and running
2. Install the "Dev Containers" extension in VS Code
3. Open this folder in VS Code
4. When prompted, click "Reopen in Container" (or use Command Palette: `Dev Containers: Reopen in Container`)

## What's Included

### VS Code Extensions
- Python
- Pylance
- Jupyter
- GitHub Copilot (if you have access)

### Python Packages
- `agent-framework` - Microsoft Agent Framework
- `jupyter`, `jupyterlab`, `ipykernel` - Jupyter notebook support
- Azure SDK packages for AI services
- Common data science libraries (numpy, pandas, matplotlib)
- Code quality tools (black, flake8, pytest)

### Features
- Git and GitHub CLI
- Port forwarding for Jupyter (8888) and web apps (8000)
- Azure credentials mounted from host machine

## Using Jupyter Notebooks

1. Create a new `.ipynb` file or open an existing one
2. VS Code will automatically detect the Python kernel
3. Click "Select Kernel" and choose the Python 3.11 environment
4. Start coding!

## Using Agent Framework

Install additional models or packages as needed:
```bash
pip install <package-name>
```

Example Agent Framework usage:
```python
from agent_framework import Agent

# Your agent code here
```

## Customization

- Add more Python packages to `.devcontainer/requirements.txt`
- Modify VS Code settings in `devcontainer.json`
- Add more VS Code extensions in the `extensions` array
