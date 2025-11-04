import logging
import sys

from mcp.server.fastmcp import FastMCP

logging.basicConfig(
    level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)
logger.info("Starting MCP Server...")

mcp = FastMCP("server", stateless_http=True, port=8080, host="0.0.0.0")


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


if __name__ == "__main__":
    try:
        logger.info("Starting MCP server in HTTP mode on 0.0.0.0:8080")
        mcp.run(transport="streamable-http")
    except Exception as e:
        logging.error(f"An error occurred while running the MCP server: {e}")
        sys.exit(1)
