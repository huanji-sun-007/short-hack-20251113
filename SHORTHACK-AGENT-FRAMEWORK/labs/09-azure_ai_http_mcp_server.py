# Copyright (c) Microsoft. All rights reserved.

"""
HTTP MCP Server with Weather Tool using FastMCP

This is a standalone MCP server that exposes a weather tool via HTTP transport.
Run this server separately before running the 09-azure_ai_http_mcp.py lab.

To run this server:
    python labs/09-azure_ai_http_mcp_server.py

The server will start an HTTP endpoint at http://localhost:8000/mcp
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
    print("Starting Weather MCP Server on http://localhost:8000/mcp")
    mcp.run(transport="streamable-http")
