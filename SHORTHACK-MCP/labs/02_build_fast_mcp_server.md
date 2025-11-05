# 🧪 Lab 3: Creating an MCP Server with Fast MCP

In this lab, you'll create a **Model Context Protocol (MCP)** server using **[FastMCP](https://gofastmcp.com/getting-started/welcome)**. This server exposes tools to access Codebeamer through the Codebeamer APIs, including:

- List projects
- List trackers in a projects
- List tracker items in a projects
- List comments in a tracker item
- Post comment on a tracker item
  ...

---

## 📁 Source Code

The full reference code for this lab is located at:

Codebeamer API calls

```
/servers/codebeamer_interface.py
```

Define MCP tools

```
/servers/mcp_server.py
```

You can modify and run these files directly from your dev container or workspace.

## 🧩 Code Walkthrough

### 1 MCP Tool Definition

Define a mcp tool by using @mcp.tool() annotation. Make sure degine the args and returns accordinglly.

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

### 2 MCP Server Setup

```python
mcp = FastMCP("server", stateless_http=True, port=8080, host="0.0.0.0")
mcp.run(transport="streamable-http")
```

Depending on the selected transport:

- If --transport stdio: it uses mcp.server.stdio to integrate with tools like GitHub Copilot Chat.
- If --transport streamable-http: it uses uvicorn and starlette to expose an HTTP endpoint (at /sse) for browser or local network interaction.

Run the MCP server:

```bash
python3 servers/mcp_server.py
```

## 🚀 Try It Out! (with GitHub Copilot Chat)

You can run this server as a plugin inside GitHub Copilot Chat (Agent Mode).

### ➤ Step-by-step:

1. Open .vscode/mcp.json.

2. Add the following entry:

```
{
	"servers": {
		"local-mcp-server": {
			"url": "http://localhost:8080/mcp",
			"type": "http"
		},
	}
}
```

3. ✅ Ensure GitHub Copilot Chat is in Agent Mode.
4. Ask Copilot questions like:
   - Help me retrieve all projects.
   - Get the trackers for this project.
   - Get items from trcker ID: xxxx.
   - Get comments of item ID: 5881865.
   - Post a new commenton item ID: 5881865.
     ...

## 🔁 Try to build your own tools!

Add your own tools and try to use it through Github Copilot Agent Mode.
