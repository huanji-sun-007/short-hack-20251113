# Copyright (c) Microsoft. All rights reserved.

"""
MCP Server with Weather Tool using FastMCP

This is a standalone MCP server that exposes a weather tool via stdio transport.
Run this server separately before running the 09-azure_ai_stdio_mcp.py lab.

To run this server:
    python 09-azure_ai_stdio_mcp_server.py

The server will listen on stdio and respond to MCP protocol messages.
"""

from random import randint
from typing import Annotated

from mcp.server.fastmcp import FastMCP
from pydantic import Field


# Create the FastMCP server instance
mcp = FastMCP("Weather Server")

@mcp.tool()
def get_weather(
    location: Annotated[str, Field(description="The location to get the weather for.")],
) -> str:
    """Get the weather for a given location."""
    conditions = ["sunny", "cloudy", "rainy", "stormy"]
    temperature = randint(10, 30)
    return f"The weather in {location} is {conditions[randint(0, 3)]} with a high of {temperature}°C."


if __name__ == "__main__":
    mcp.run()
