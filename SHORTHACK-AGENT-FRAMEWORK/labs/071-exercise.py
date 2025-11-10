# Copyright (c) Microsoft. All rights reserved.

import asyncio
from random import randint
from typing import Annotated

from agent_framework.azure import AzureOpenAIResponsesClient
from azure.identity import AzureCliCredential
from pydantic import Field

"""
Exercise: Write agent which checks if car specification document complies with regulations.
Example regulation is in file resources/regulation.pdf.
Complying specification is in file resources/specification1.pdf, and non-complying specification is in file resources/specificaiton2.pdf
The agent should use 2 tools, one for reading specifications, and one for reading regulations.
User should ask the agent for compliance check for given specification number.
"""
from dotenv import load_dotenv
load_dotenv()

async def main() -> None:
    pass

if __name__ == "__main__":
    asyncio.run(main())
