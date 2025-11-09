# Copyright (c) Microsoft. All rights reserved.

import asyncio

from agent_framework import ChatAgent, MCPStdioTool
from agent_framework.azure import AzureAIAgentClient
from azure.identity.aio import AzureCliCredential

"""
Azure AI Agent with Local Stdio MCP Server

This sample demonstrates integration of Azure AI Agents with a local Model Context Protocol (MCP)
server running via stdio transport. The MCP server must be started separately.

Prerequisites:
1. Start the MCP server in a separate terminal:
   python labs/09-azure_ai_stdio_mcp_server.py

2. Run this lab:
   python labs/09-azure_ai_stdio_mcp_agent.py

The lab shows two patterns:
- Tools defined at agent creation (agent-level)
- Tools defined when running the agent (run-level)
"""

async def main() -> None:
    async with (
        AzureCliCredential() as credential,
        AzureAIAgentClient(async_credential=credential).create_agent(
            name="WeatherAgent",
            instructions="You are a helpful weather assistant that can provide weather information for locations.",
            tools=MCPStdioTool(  # Tools defined at agent creation
                name="Weather MCP Server",
                command="python",
                args=["labs/08-azure_ai_stdio_mcp_server.py"],
            ),
        ) as agent,
    ):
        query = "What's the weather like in Paris?"
        print(f"User: {query}")
        result = await agent.run(query)
        print(f"{agent.name}: {result}\n")


if __name__ == "__main__":
    asyncio.run(main())
