import base64
import logging
import os
from typing import Any, Dict

import httpx
from dotenv import load_dotenv

logging.basicConfig(
    level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)


def _get_codebeamer_credentials():
    """Load and return Codebeamer credentials from environment variables."""
    load_dotenv()
    return {
        "base_url": os.getenv("CODEBEAMER_BASE_URL", ""),
        "username": os.getenv("CODEBEAMER_USERNAME", ""),
        "password": os.getenv("CODEBEAMER_PASSWORD", ""),
    }


async def _make_codebeamer_request(
    endpoint: str, method: str = "GET", payload: Dict[str, Any] | None = None
) -> Dict[str, Any]:
    """Make a generic HTTP request to Codebeamer API with error handling (async)."""
    credentials = _get_codebeamer_credentials()
    try:
        # Construct the full API URL
        api_url = f"{credentials['base_url'].rstrip('/')}/v3/{endpoint}"

        # Create basic auth header
        auth_string = f"{credentials['username']}:{credentials['password']}"
        encoded_credentials = base64.b64encode(auth_string.encode()).decode()

        headers = {
            "Authorization": f"Basic {encoded_credentials}",
            "Accept": "application/json",
            "Content-Type": "application/json",
        }

        async with httpx.AsyncClient(timeout=30.0) as client:
            if method.upper() == "GET":
                response = await client.get(api_url, headers=headers)
            elif method.upper() == "POST":
                response = await client.post(api_url, headers=headers, json=payload)
            elif method.upper() == "PUT":
                response = await client.put(api_url, headers=headers, json=payload)
            elif method.upper() == "DELETE":
                response = await client.delete(api_url, headers=headers)
            else:
                return {
                    "error": "Unsupported HTTP method",
                    "details": f"Method {method} is not supported",
                }

            # Return only the data if successful, otherwise return error info
            if response.status_code in [200, 201]:
                data = (
                    response.json()
                    if response.content
                    and response.headers.get("content-type", "").startswith(
                        "application/json"
                    )
                    else response.text
                )
                return {"result": data}
            else:
                return {
                    "status_code": response.status_code,
                    "error": (
                        response.json()
                        if response.content
                        and response.headers.get("content-type", "").startswith(
                            "application/json"
                        )
                        else response.text
                    ),
                }
    except httpx.TimeoutException:
        return {
            "error": "Request timeout",
            "details": "The request to the Codebeamer API timed out",
        }
    except httpx.ConnectError:
        return {
            "error": "Connection error",
            "details": "Could not connect to the Codebeamer instance",
        }
    except Exception as e:
        return {"error": "Unexpected error", "details": str(e)}


async def get_projects() -> Dict[str, Any]:
    """
    Get projects from Codebeamer using the /v3/projects API endpoint.

    Returns:
        Dictionary containing the API response with projects list or error information
    """
    return await _make_codebeamer_request("projects")


async def get_trackers_by_project_id(project_id: int) -> Dict[str, Any]:
    """
    Get trackers for a specific project from Codebeamer using the /v3/projects/{projectId}/trackers API endpoint.

    Args:
        project_id: The ID of the project to retrieve trackers for

    Returns:
        Dictionary containing the trackers list or error information
    """
    return await _make_codebeamer_request(f"projects/{project_id}/trackers")


async def get_tracker_items(tracker_id: int) -> Dict[str, Any]:
    """
    Get tracker items within a tracker from Codebeamer using the /v3/trackers/{trackerId}/items API endpoint.

    Args:
        tracker_id: The ID of the tracker to retrieve items for

    Returns:
        Dictionary containing the tracker information or error information
    """
    return await _make_codebeamer_request(f"trackers/{tracker_id}/items")


async def get_tracker_item(
    item_id: int, version: int | None = None, baseline_id: int | None = None
) -> Dict[str, Any]:
    """
    Get a specific tracker item from Codebeamer using the /v3/items/{itemId} API endpoint.

    Args:
        item_id: The ID of the tracker item to retrieve
        version: Optional version of the tracker item (optional)
        baseline_id: Optional baseline ID (optional)

    Returns:
        Dictionary containing the tracker item information or error information
    """
    # Build the endpoint with query parameters
    endpoint = f"items/{item_id}"

    # Add query parameters if provided
    query_params = []
    if version is not None:
        query_params.append(f"version={version}")
    if baseline_id is not None:
        query_params.append(f"baselineId={baseline_id}")

    if query_params:
        endpoint += "?" + "&".join(query_params)

    return await _make_codebeamer_request(endpoint)


async def get_tracker_item_comments(item_id: int) -> Dict[str, Any]:
    """
    Get comments of tracker item by item id

    Args:
        item_id: The ID of the tracker item to retrieve comments for

    Returns:
        Dictionary containing the comments or error information
    """
    endpoint = f"items/{item_id}/comments"
    return await _make_codebeamer_request(endpoint)


async def post_tracker_item_comment(
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
    credentials = _get_codebeamer_credentials()
    api_url = f"{credentials['base_url'].rstrip('/')}/v3/items/{item_id}/comments"
    auth_string = f"{credentials['username']}:{credentials['password']}"
    encoded_credentials = base64.b64encode(auth_string.encode()).decode()
    headers = {
        "Authorization": f"Basic {encoded_credentials}",
        "accept": "application/json",
        # Do NOT set Content-Type, httpx will set it with boundary
    }
    files = {"comment": (None, comment_text), "commentFormat": (None, comment_format)}
    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(api_url, headers=headers, files=files)
            if response.status_code in [200, 201]:
                data = (
                    response.json()
                    if response.content
                    and response.headers.get("content-type", "").startswith(
                        "application/json"
                    )
                    else response.text
                )
                return {"result": data}
            else:
                return {
                    "status_code": response.status_code,
                    "error": (
                        response.json()
                        if response.content
                        and response.headers.get("content-type", "").startswith(
                            "application/json"
                        )
                        else response.text
                    ),
                }
    except httpx.TimeoutException:
        return {
            "error": "Request timeout",
            "details": "The request to the Codebeamer API timed out",
        }
    except httpx.ConnectError:
        return {
            "error": "Connection error",
            "details": "Could not connect to the Codebeamer instance",
        }
    except Exception as e:
        return {"error": "Unexpected error", "details": str(e)}
