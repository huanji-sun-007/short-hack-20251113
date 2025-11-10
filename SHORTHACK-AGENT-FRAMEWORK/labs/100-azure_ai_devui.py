# Copyright (c) Microsoft. All rights reserved.

from random import randint

from agent_framework.azure import AzureAIAgentClient
from azure.identity.aio import AzureCliCredential
from agent_framework.devui import serve

"""
Basic example of devui with a hosted Azure AI Agent
"""

def main() -> None:
    agent = AzureAIAgentClient(async_credential=AzureCliCredential()).create_agent(
        name=f"HelpfulAgent-{randint(1000, 9999)}",
        instructions="You are a helpful agent."
    )
    serve(entities=[agent], port=8090, auto_open=True)

if __name__ == "__main__":
    main()
