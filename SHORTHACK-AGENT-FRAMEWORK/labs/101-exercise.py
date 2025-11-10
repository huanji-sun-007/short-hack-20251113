# Copyright (c) Microsoft. All rights reserved.

import asyncio
from random import randint
from typing import Annotated

from agent_framework.azure import AzureOpenAIResponsesClient
from azure.identity import AzureCliCredential
from pydantic import Field

"""
Exercise: Write a conversational agent using devui, with conversation state maintained in AI Foundry, preserved across executions.
"""
from dotenv import load_dotenv
load_dotenv()

async def main() -> None:
    pass

if __name__ == "__main__":
    asyncio.run(main())
