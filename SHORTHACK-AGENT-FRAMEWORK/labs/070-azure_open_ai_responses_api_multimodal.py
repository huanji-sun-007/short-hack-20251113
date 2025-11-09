# Copyright (c) Microsoft. All rights reserved.

import asyncio
from pathlib import Path

from agent_framework import ChatMessage, DataContent, Role, TextContent
from agent_framework.azure import AzureOpenAIResponsesClient
from azure.identity import AzureCliCredential

RESOURCES_DIR = Path(__file__).parent.parent.resolve() / "resources"

def load_sample_pdf() -> bytes:
    """Read the bundled sample PDF for tests."""
    pdf_path = RESOURCES_DIR / "sample.pdf"
    return pdf_path.read_bytes()

def load_sample_image() -> bytes:
    """Read the bundled sample image for tests."""
    image_path = RESOURCES_DIR / "sample.png"
    return image_path.read_bytes()

async def test_pdf() -> None:
    """Test PDF document analysis with Azure OpenAI Responses API."""
    client = AzureOpenAIResponsesClient(credential=AzureCliCredential())

    pdf_bytes = load_sample_pdf()
    message = ChatMessage(
        role=Role.USER,
        contents=[
            TextContent(text="What information can you extract from this document?"),
            DataContent(
                data=pdf_bytes,
                media_type="application/pdf",
                additional_properties={"filename": "sample.pdf"},
            ),
        ],
    )

    response = await client.get_response(message)
    print(f"PDF Response: {response}")

async def test_image() -> None:
    """Test image analysis with Azure OpenAI Responses API."""
    client = AzureOpenAIResponsesClient(credential=AzureCliCredential())

    image_bytes = load_sample_image()
    message = ChatMessage(
        role=Role.USER,
        contents=[
            TextContent(text="What information can you extract from this image?"),
            DataContent(
                data=image_bytes,
                media_type="image/png",
                additional_properties={"filename": "sample.png"},
            ),
        ],
    )

    response = await client.get_response(message)
    print(f"PDF Response: {response}")

async def main() -> None:
    print("=== Testing Azure OpenAI Responses API Multimodal ===")
    print("The Responses API supports both images AND PDFs")
    await test_image()
    await test_pdf()

if __name__ == "__main__":
    asyncio.run(main())
