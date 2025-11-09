# Copyright (c) Microsoft. All rights reserved.

import asyncio
from random import randint
from typing import Annotated

from agent_framework.azure import AzureOpenAIResponsesClient
from azure.identity import AzureCliCredential
from pydantic import Field

"""
Azure OpenAI Responses Client Basic Example of streaming responses
"""
from dotenv import load_dotenv
load_dotenv()

async def main() -> None:
    agent = AzureOpenAIResponsesClient(credential=AzureCliCredential()).create_agent(
        instructions="You are a car designer",
    )

    query = "Write a specification for a futuristic electric car using 500 words"
    print(f"User: {query}")
    print("Agent (non-streaming): ", end="", flush=True)
    result = await agent.run(query)
    print(f"Result: {result}\n")
    input("Press any key to see how streaming results work...")

    print(f"User: {query}")
    print("Agent (streaming): ", end="", flush=True)
    async for chunk in agent.run_stream(query):
        if chunk.text:
            print(chunk.text, end="", flush=True)
    print("\n")


if __name__ == "__main__":
    asyncio.run(main())
