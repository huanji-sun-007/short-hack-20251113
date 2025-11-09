# Copyright (c) Microsoft. All rights reserved.

import asyncio

from agent_framework import ChatAgent, MCPStreamableHTTPTool
from agent_framework.azure import AzureAIAgentClient
from azure.identity.aio import AzureCliCredential

"""
Azure AI Agent with Local HTTP MCP Server

This sample demonstrates integration of Azure AI Agents with a local Model Context Protocol (MCP)
server running via HTTP transport. The MCP server must be started separately.

Prerequisites:
1. Start the MCP server in a separate terminal:
   python resources/http_mcp_server.py

2. Run this lab:
   python labs/09-azure_ai_http_mcp_agent.py
"""

async def main() -> None:
    async with (
        AzureCliCredential() as credential,
        AzureAIAgentClient(async_credential=credential).create_agent(
            name="WeatherAgent",
            instructions="You are a helpful weather assistant that can provide weather information for locations.",
            tools=MCPStreamableHTTPTool(  # Tools defined at agent creation
                name="Weather MCP Server",
                url="http://localhost:8000/mcp",
            ),
        ) as agent,
    ):
        query = "What's the weather like in Tokyo?"
        print(f"User: {query}")
        result = await agent.run(query)
        print(f"{agent.name}: {result}\n")   

if __name__ == "__main__":
    asyncio.run(main())
