# Copyright (c) Microsoft. All rights reserved.

import asyncio

from random import randint
from agent_framework import ChatAgent, MCPStreamableHTTPTool
from agent_framework.azure import AzureAIAgentClient
from azure.identity.aio import AzureCliCredential

"""
Azure AI Agent with remote HTTP MCP Example
"""

async def main() -> None:
    async with (
        AzureCliCredential() as credential,
        AzureAIAgentClient(async_credential=credential).create_agent(
            name=f"DocsAgent-{randint(1000, 9999)}",
            instructions="You are a helpful assistant that can help with microsoft documentation questions.",
            tools=MCPStreamableHTTPTool(  # Tools defined at agent creation
                name="Microsoft Learn MCP",
                url="https://learn.microsoft.com/api/mcp",
            ),
        ) as agent,
    ):
        query = "What is Microsoft Agent Framework?"
        print(f"User: {query}")
        result = await agent.run(query)
        print(f"{agent.name}: {result}\n")


if __name__ == "__main__":
    asyncio.run(main())
