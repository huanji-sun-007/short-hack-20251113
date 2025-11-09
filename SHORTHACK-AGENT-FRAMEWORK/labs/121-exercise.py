# Copyright (c) Microsoft. All rights reserved.

import asyncio
from random import randint
from typing import Annotated

from agent_framework.azure import AzureOpenAIResponsesClient
from azure.identity import AzureCliCredential
from pydantic import Field

"""
Exercise: Write agent for storing notes remotely.

The agent needs an HTTP MCP server for storing and retrieving notes in-memory by title.
"""
from dotenv import load_dotenv
load_dotenv()

async def main() -> None:
    pass

if __name__ == "__main__":
    asyncio.run(main())
