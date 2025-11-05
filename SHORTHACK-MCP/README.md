# Model Context Protocol (MCP) Hands-On Lab

## 🧠 Introduction

This project provides hands-on labs to explore the **Model Context Protocol (MCP)** and learn how to extend AI agents with real-world capabilities. You'll learn how to integrate **external MCP servers** into GitHub Copilot Chat and build custom **Semantic Kernel agents** that can invoke MCP tools.

By the end of these labs, you'll be able to:

- Use MCP servers within GitHub Copilot Chat
- Build your own MCP server powered by FastMCP
- Connect MCP tools as plugins to Semantic Kernel agents

## ✅ Pre-requisites

Before you begin, ensure you have:

- **Visual Studio Code** with the **Dev Containers extension**
- **Docker** installed and running
- A valid **Azure Subscription** with the following resources provisioned (for Lab 3):
  - Azure OpenAI resource with a deployed **Chat Completion Model** (e.g., `gpt-4o`, `gpt-5-mini`)
- Access to a **Codebeamer instance** with valid API credentials (for Labs 2 and 3)

## 🛠️ Setup Instructions

1. **Clone this repository.**

2. **Open the project in Visual Studio Code** and reopen it inside the provided **Dev Container**.  
   All required dependencies will be installed automatically.

3. **Configure environment variables**:  
   Use the `.envtemplate` file as a guide to create a `.env` file with your Azure OpenAI credentials and Codebeamer configuration.

   ```bash
   cp .envtemplate .env
   # Edit .env with your actual credentials
   ```

## � Project Structure

```
├── .devcontainer/          # Dev container configuration
├── .vscode/                # VS Code settings and MCP configuration
├── images/                 # Screenshots and images for documentation
├── labs/                   # Lab instructions and notebooks
│   ├── 01_connecting_to_an_mcp_server.md
│   ├── 02_build_fast_mcp_server.md
│   └── 03_mcp_as_sk_plugin.ipynb
├── servers/                # MCP server implementation
│   ├── codebeamer_interface.py  # Codebeamer API wrapper
│   └── mcp_server.py            # FastMCP server definition
├── .envtemplate            # Environment variables template
├── requirements.txt        # Python dependencies
└── README.md              # This file
```

## �🚀 Quick Start

1. Open the project in VS Code and reopen in the Dev Container
2. Install the Wikipedia MCP server: `pip install wikipedia-mcp`
3. Configure `.vscode/mcp.json` (see Lab 1 for details)
4. Start exploring MCP with GitHub Copilot Chat!

## 🧪 Lab Descriptions

### 🔹 Lab 1: Integrate the Wikipedia MCP Server with GitHub Copilot Chat

Learn how to install and configure the **Wikipedia MCP server** and connect it to **GitHub Copilot Chat** through `.vscode/mcp.json`. Interact with Wikipedia using natural language prompts in Copilot Chat.

**📄 Lab File:** [`labs/01_connecting_to_an_mcp_server.md`](labs/01_connecting_to_an_mcp_server.md)

### 🔹 Lab 2: Build Your Own MCP Server with FastMCP

Create a custom MCP server powered by **FastMCP** that exposes Codebeamer APIs. Run the server locally and use it in **GitHub Copilot Chat** to interact with Codebeamer projects, trackers, and items.

**📄 Lab File:** [`labs/02_build_fast_mcp_server.md`](labs/02_build_fast_mcp_server.md)

### 🔹 Lab 3: Use MCP as a Plugin in Semantic Kernel

Build a **Semantic Kernel agent** that connects to your custom Codebeamer MCP server as a plugin. Learn how to create tool-augmented AI workflows by treating external MCP servers as powerful extensions to the agent's reasoning capabilities.

**📄 Lab File:** [`labs/03_mcp_as_sk_plugin.ipynb`](labs/03_mcp_as_sk_plugin.ipynb)

## 📚 References

- [Introduction to the Model Context Protocol (MCP)](https://modelcontextprotocol.io/introduction)
- [Model Context Protocol: Specification and Reference](https://modelcontextprotocol.info/)
- [Model Context Protocol Servers - Official Integrations](https://github.com/modelcontextprotocol/servers?tab=readme-ov-file#%EF%B8%8F-official-integrations)
- [Semantic Kernel MCP Sample Codes](https://github.com/microsoft/semantic-kernel/tree/44f1253460191e4945abc75ddbba1dd7ba964a32/python/samples/concepts/mcp)
- [FastMCP Documentation](https://gofastmcp.com/getting-started/welcome)
- [Wikipedia MCP Server](https://github.com/rudra-ravi/wikipedia-mcp)

---
