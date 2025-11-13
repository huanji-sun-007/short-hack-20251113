# 🧪 Lab 2: Build Your Own MCP Server with FastMCP

In this lab, you'll create a **Model Context Protocol (MCP)** server using **[FastMCP](https://gofastmcp.com/getting-started/welcome)**. This server exposes tools to access Codebeamer through the Codebeamer REST APIs, including:

- **List projects** - Get all projects from your Codebeamer instance
- **List trackers in a project** - Get all trackers for a specific project
- **List tracker items** - Get all items within a tracker
- **Get tracker item** - Retrieve details of a specific tracker item
- **List comments** - Get all comments on a tracker item
- **Post comment** - Add a new comment to a tracker item

By the end of this lab, you'll have a fully functional MCP server that can be used with GitHub Copilot Chat or integrated into Semantic Kernel agents.

---

## 📁 Source Code

The full reference code for this lab is located in the following files:

**Codebeamer API Interface:**

```
/servers/codebeamer_interface.py
```

This file contains async functions that wrap the Codebeamer REST API endpoints using `httpx`.

**MCP Server Definition:**

```
/servers/mcp_server.py
```

This file defines the MCP tools using FastMCP decorators and runs the HTTP server.

You can modify and run these files directly from your dev container or workspace.

---

## ✅ Prerequisites

Before starting this lab, ensure you have:

1. **Completed Lab 1** - Familiarity with MCP concepts
2. **Codebeamer credentials** - Set up your `.env` file with:
   - `CODEBEAMER_BASE_URL` - Your Codebeamer instance URL
   - `CODEBEAMER_USERNAME` - Your username
   - `CODEBEAMER_PASSWORD` - Your password

## 🧩 Code Walkthrough

### 1️⃣ MCP Tool Definition

Define an MCP tool using the `@mcp.tool()` decorator. Make sure to define the arguments and return types clearly. The docstring is important as it helps the AI agent understand what the tool does.

```python
@mcp.tool()
async def mcp_get_projects() -> Dict[str, Any]:
    """
    Get projects from Codebeamer using the /v3/projects API endpoint.

    Returns:
        Dictionary containing the API response with projects list or error information
    """
    return await get_projects()
```

**Example:**

```python
@mcp.tool()
async def mcp_get_tracker_items(tracker_id: int) -> Dict[str, Any]:
    """
    Get tracker items within a tracker from Codebeamer using the /v3/trackers/{trackerId}/items API endpoint.

    Args:
        tracker_id: The ID of the tracker to retrieve

    Returns:
        Dictionary containing the tracker items or error information
    """
    return await get_tracker_items(tracker_id)
```

**Key points:**

- Use `@mcp.tool()` decorator to expose the function as an MCP tool
- Provide clear docstrings explaining parameters and return values
- Type hints help the AI understand the expected data types

---

### 2️⃣ MCP Server Setup

Initialize and configure the FastMCP server:

```python
mcp = FastMCP("server", stateless_http=True, port=8080, host="0.0.0.0")
```

**Configuration options:**

- `"server"` - Name of your MCP server
- `stateless_http=True` - Enables HTTP transport mode
- `port=8080` - Port number for the HTTP server
- `host="0.0.0.0"` - Listen on all network interfaces

Run the server:

```python
mcp.run(transport="streamable-http")
```

FastMCP supports two transport modes:

- **`stdio`** - Standard input/output transport for local tools like GitHub Copilot Chat
- **`streamable-http`** - HTTP endpoint using uvicorn and starlette for browser or network access

---

### 3️⃣ Start Your MCP Server

Run the MCP server from your terminal:

```bash
python servers/mcp_server.py
```

You should see output indicating the server is running on `http://0.0.0.0:8080`.

## 🚀 Try It Out with GitHub Copilot Chat

Now that your MCP server is running, you can use it as a plugin in GitHub Copilot Chat (Agent Mode).

### ➤ Step-by-Step Guide:

**1. Make sure your MCP server is running**

Ensure the server is running in a terminal:

```bash
python servers/mcp_server.py
```

**2. Configure VS Code MCP settings**

Open or create `.vscode/mcp.json` and add the following configuration:

```json
{
  "servers": {
    "local-mcp-server": {
      "url": "http://localhost:8080/mcp",
      "type": "http"
    }
  }
}
```

**3. Enable Agent Mode in GitHub Copilot Chat**

Make sure GitHub Copilot Chat is in **Agent Mode** to access MCP tools.

**4. Enable your MCP server**

In the Copilot Chat interface, verify that the `local-mcp-server` is enabled and connected.

**5. Try these example prompts:**

```
@local-mcp-server Help me retrieve all projects.
```

```
@local-mcp-server Get the trackers for project ID: 12345
```

```
@local-mcp-server Get items from tracker ID: 5001
```

```
@local-mcp-server Get comments of item ID: 5881865
```

```
@local-mcp-server Post a new comment on item ID: 5881865 with text "Great work on this feature!"
```

Or simply ask general questions like:

```
What projects are available in Codebeamer?
```

Copilot will automatically detect when to use your MCP server tools!

---

## 🧠 Understanding the Architecture

Here's how the pieces fit together:

```
┌─────────────────────────────────────┐
│  GitHub Copilot Chat (Agent Mode)   │
└────────────┬────────────────────────┘
             │ HTTP (MCP Protocol)
             │
┌────────────▼────────────────────────┐
│  FastMCP Server (mcp_server.py)     │
│  ├─ @mcp.tool() decorators          │
│  └─ HTTP endpoint (:8080/mcp)       │
└────────────┬────────────────────────┘
             │ Function calls
             │
┌────────────▼────────────────────────┐
│  Codebeamer Interface               │
│  (codebeamer_interface.py)          │
│  ├─ HTTP Client (httpx)             │
│  └─ API wrappers                    │
└────────────┬────────────────────────┘
             │ REST API calls
             │
┌────────────▼────────────────────────┐
│  Codebeamer REST API (v3)           │
└─────────────────────────────────────┘
```

---

## 🔧 Troubleshooting

### Server won't start

- Check if port 8080 is already in use
- Verify your `.env` file has correct credentials
- Check the terminal for error messages

### Copilot can't connect to the server

- Ensure the server is running (`python servers/mcp_server.py`)
- Verify `.vscode/mcp.json` has the correct URL
- Restart VS Code if needed

### API calls fail

- Check your Codebeamer credentials in `.env`
- Verify your Codebeamer instance is accessible
- Check the server logs for detailed error messages

---

## 🎯 Challenge: Build Your Own Tools!

Now that you understand how to create MCP tools, try extending the server with your own functionality:

1. Add a new function to `mcp_server.py`
2. Decorate it with `@mcp.tool()`
3. Restart your MCP server
4. Test it with GitHub Copilot Chat!

---

## 🎓 What You Learned

✅ How to define MCP tools using FastMCP decorators  
✅ How to set up an HTTP-based MCP server  
✅ How to integrate external APIs into MCP tools  
✅ How to connect custom MCP servers to GitHub Copilot Chat  
✅ Best practices for tool documentation and type hints

**Next:** In **Lab 3**, you'll learn how to use this MCP server as a plugin in a Semantic Kernel agent!
