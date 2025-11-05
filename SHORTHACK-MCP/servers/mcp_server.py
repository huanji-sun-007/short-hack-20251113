import logging
import sys
from typing import Any, Dict

from mcp.server.fastmcp import FastMCP

from servers.codebeamer_interface import (
    get_projects,
    get_tracker_item,
    get_tracker_item_comments,
    get_tracker_items,
    get_trackers_by_project_id,
    post_tracker_item_comment,
)

logging.basicConfig(
    level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)
logger.info("Starting MCP Server...")

mcp = FastMCP("server", stateless_http=True, port=8080, host="0.0.0.0")


@mcp.tool()
async def mcp_get_projects() -> Dict[str, Any]:
    """
    Get projects from Codebeamer using the /v3/projects API endpoint.

    Returns:
        Dictionary containing the API response with projects list or error information
    """
    return await get_projects()


@mcp.tool()
async def mcp_get_trackers_by_project_id(project_id: int) -> Dict[str, Any]:
    """
    Get trackers for a specific project from Codebeamer using the /v3/projects/{projectId}/trackers API endpoint.

    Args:
        project_id: The ID of the project to retrieve trackers for

    Reads credentials from environment variables:
    - CODEBEAMER_BASE_URL: The base URL of the Codebeamer instance
    - CODEBEAMER_USERNAME: Username for basic authentication
    - CODEBEAMER_PASSWORD: Password for basic authentication

    Returns:
        Dictionary containing the trackers list or error information
    """
    return await get_trackers_by_project_id(project_id)


@mcp.tool()
async def mcp_get_tracker_items(tracker_id: int) -> Dict[str, Any]:
    """
    Get tracker items within a tracker from Codebeamer using the /v3/trackers/{trackerId}/items API endpoint.

    Args:
        tracker_id: The ID of the tracker to retrieve

    Reads credentials from environment variables:
    - CODEBEAMER_BASE_URL: The base URL of the Codebeamer instance
    - CODEBEAMER_USERNAME: Username for basic authentication
    - CODEBEAMER_PASSWORD: Password for basic authentication

    Returns:
        Dictionary containing the tracker information or error information
    """
    return await get_tracker_items(tracker_id)


@mcp.tool()
async def mcp_get_tracker_item(item_id: int) -> Dict[str, Any]:
    """
    Get a specific tracker from Codebeamer using the /v3/trackers/{trackerId} API endpoint.

    Args:
        tracker_id: The ID of the tracker to retrieve

    Reads credentials from environment variables:
    - CODEBEAMER_BASE_URL: The base URL of the Codebeamer instance
    - CODEBEAMER_USERNAME: Username for basic authentication
    - CODEBEAMER_PASSWORD: Password for basic authentication

    Returns:
        Dictionary containing the tracker information or error information
    """
    return await get_tracker_item(item_id)


@mcp.tool()
async def mcp_get_tracker_item_comments(item_id: int) -> Dict[str, Any]:
    """
    Get comments of tracker item by item id
    Args:
        item_id: The ID of the tracker item to retrieve comments for
    Returns:
        Dictionary containing the comments or error information
    """
    return await get_tracker_item_comments(item_id)


@mcp.tool()
async def mcp_post_tracker_item_comment(
    item_id: int, comment_text: str, comment_format: str = "PlainText"
) -> Dict[str, Any]:
    """
    Post a comment to a tracker item
    Args:
        item_id: The ID of the tracker item to post the comment to
        comment_text: The text of the comment
        comment_format: The format of the comment, either "PlainText" or "HTML" (default: "PlainText")
    Returns:
        Dictionary containing the result of the comment posting or error information
    """
    return await post_tracker_item_comment(item_id, comment_text, comment_format)


if __name__ == "__main__":
    try:
        logger.info("Starting MCP server in HTTP mode on 0.0.0.0:8080")
        mcp.run(transport="streamable-http")
    except Exception as e:
        logging.error(f"An error occurred while running the MCP server: {e}")
        sys.exit(1)
