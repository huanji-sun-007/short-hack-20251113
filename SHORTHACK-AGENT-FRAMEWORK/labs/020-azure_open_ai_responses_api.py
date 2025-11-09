# Copyright (c) Microsoft. All rights reserved.

import asyncio
from random import randint
from typing import Annotated

from agent_framework.azure import AzureOpenAIResponsesClient
from azure.identity import AzureCliCredential
from pydantic import Field

"""
Azure OpenAI Responses Client Basic Example
"""
from dotenv import load_dotenv
load_dotenv()

async def main() -> None:
    agent = AzureOpenAIResponsesClient(credential=AzureCliCredential()).create_agent(
        instructions="You are a helpful agent.",
    )

    query = "What is capital of Japan?"
    print(f"User: {query}")
    result = await agent.run(query)
    print(f"Result: {result}\n")


if __name__ == "__main__":
    asyncio.run(main())
