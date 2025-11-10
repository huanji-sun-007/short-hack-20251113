# Copyright (c) Microsoft. All rights reserved.

import asyncio

from agent_framework.azure import AzureOpenAIChatClient
from azure.identity import AzureCliCredential

"""
Most basic agent example using Azure OpenAI Chat API
"""
from dotenv import load_dotenv
load_dotenv()

async def main() -> None:
    agent = AzureOpenAIChatClient(credential=AzureCliCredential()).create_agent(
        instructions="You are a helpful agent.",
    )

    query = "What is capital of Japan?"
    print(f"User: {query}")
    result = await agent.run(query)
    print(f"Result: {result}\n")

if __name__ == "__main__":
    asyncio.run(main())
