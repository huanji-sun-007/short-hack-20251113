# Copyright (c) Microsoft. All rights reserved.

import asyncio
from random import randint
from typing import Annotated

from agent_framework.azure import AzureOpenAIResponsesClient
from azure.identity import AzureCliCredential
from pydantic import Field

"""
Exercise: Write an agent showing content of the current directory using a tool
"""
from dotenv import load_dotenv
load_dotenv()

async def main() -> None:
    pass

if __name__ == "__main__":
    asyncio.run(main())
