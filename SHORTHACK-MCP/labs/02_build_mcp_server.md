# 🧪 Lab 3: Creating an MCP Server with Fast MCP

In this lab, you'll create a **Model Context Protocol (MCP)** server using **Fast MCP**. This server exposes a chat-based agent that can answer questions about restaurant menus, including:

- 🏢 Listing available restaurants
- 🥗 Recommending daily specials
- 💰 Checking prices for menu items

---

## 📁 Source Code

The full reference code for this lab is located at:

```
/servers/mcp_server.py
```

You can modify and run these files directly from your dev container or workspace.

## 🧩 Code Walkthrough

### 1 MCP Tool Definition

Define a mcp tool by using @mcp.tool() annotation. Make sure degine the args and returns accordinglly.

```python
@mcp.tool()
def mcp_return_sum(a: int, b: int) -> int:
    """

    Returns the sum of two integers.
    Args:
        a: The first integer to add.
        b: The second integer to add.
    Returns:
        The sum of a and b.
    """
    return a + b
```

This lets the server work either through standard input/output (for tools like GitHub Copilot Chat) or over HTTP (for browser-based testing).

### 2 MCP Server Setup

The agent is exposed as an MCP server using:

```python
mcp = FastMCP("server", stateless_http=True, port=8080, host="0.0.0.0")
mcp.run(transport="streamable-http")
```

Depending on the selected transport:

- If --transport stdio: it uses mcp.server.stdio to integrate with tools like GitHub Copilot Chat.
- If --transport streamable-http: it uses uvicorn and starlette to expose an HTTP endpoint (at /sse) for browser or local network interaction.

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
   - “What's the result of 100+300?”

## 🔁 Try to build your own tools!

Add your own tools and try to use it through Github Copilot Agent Mode.
