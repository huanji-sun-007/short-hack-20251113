# Copyright (c) Microsoft. All rights reserved.

from random import randint
from typing import Annotated

from pydantic import Field
from agent_framework.azure import AzureAIAgentClient
from azure.identity.aio import AzureCliCredential
from agent_framework.devui import serve

"""
Basic example of devui with a hosted Azure AI Agent
"""
def get_weather(
    location: Annotated[str, Field(description="The location to get the weather for.")],
) -> str:
    """Get the weather for a given location."""
    conditions = ["sunny", "cloudy", "rainy", "stormy"]
    return f"The weather in {location} is {conditions[randint(0, 3)]} with a high of {randint(10, 30)}°C."

def main() -> None:
    agent = AzureAIAgentClient(async_credential=AzureCliCredential()).create_agent(
        name=f"HelpfulAgent-{randint(1000, 9999)}",
        instructions="You are a helpful agent.",
        tools=get_weather
    )
    serve(entities=[agent], port=8090, auto_open=True)

if __name__ == "__main__":
    main()
