# GitHub Copilot Instructions - Agent Framework Training Workshop

## Project Purpose

This repository is a **hands-on training asset** for teaching developers how to use the **Microsoft Agent Framework** (https://github.com/microsoft/agent-framework, https://learn.microsoft.com/en-us/agent-framework/) with **Azure AI Foundry** integration.

## Project Structure

### Training Format
- **Medium**: Numbered Python files in the `labs/` directory (010-130)
- **Duration**: Approximately 4-5 hours total
- **Labs**: 12 progressive learning modules with executable Python examples
- **Approach**: Self-paced, hands-on, with exercises
- **Infrastructure**: Azure AI Foundry project with automated deployment

### Learning Labs Overview

Labs are numbered sequentially (010-130) in the `labs/` directory. The curriculum covers:

**Foundation (010-050)**: Azure OpenAI basics, Responses API, custom function tools, streaming
**Advanced Features (060-090)**: Code interpreter, multimodal inputs, Azure AI hosted agents, thread management
**MCP Integration (100-120)**: Stdio MCP, HTTP MCP, remote MCP services
**Orchestration (130)**: Sub-workflows and agent coordination

Three labs include hands-on exercises:
- **031-exercise.py** - Function tools practice
- **071-exercise.py** - Multimodal inputs practice  
- **121-exercise.py** - Remote MCP practice

Labs 100 and 110 require running separate MCP servers from the `resources/` directory.

## Target Audience

- Developers learning to build AI agents
- Engineers exploring Microsoft Agent Framework
- Teams wanting to implement agent-based solutions with Azure AI Foundry
- Workshop participants in training sessions

## Technical Environment

- **Container**: Dev Container with Python 3.11
- **Framework**: Microsoft Agent Framework (pre-installed)
- **Interface**: Python files executed via VS Code terminal
- **Cloud Integration**: 
  - Azure AI Foundry project
  - Azure OpenAI services
  - Azure CLI authentication
- **Infrastructure**: Bicep-based deployment with automated setup
- **Additional Tools**: Azure SDK, FastMCP, Pydantic, python-dotenv

## When Providing Assistance

### For Lab Development
- Create self-contained, progressive Python lessons
- Include clear docstrings and inline comments
- Provide well-structured, executable code examples
- Add exercises with varying difficulty levels
- Include example outputs in comments or print statements

### For Code Examples
- Use Microsoft Agent Framework APIs correctly
- Follow Python best practices and PEP 8
- Include error handling and edge cases
- Demonstrate real-world patterns
- Keep examples practical and relevant

### For Agent Concepts
- Explain concepts clearly for beginners
- Build complexity gradually
- Connect to real-world use cases
- Reference official documentation appropriately
- Highlight best practices and common pitfalls

### For Exercise Design
- Start with guided exercises
- Progress to independent challenges
- Include solution hints or approaches
- Encourage experimentation and modification
- Relate exercises to practical scenarios

## Key Technologies

- **Microsoft Agent Framework**: Core framework for building agents
- **Model Context Protocol (MCP)**: Universal protocol for connecting AI assistants to data sources
- **Azure OpenAI**: Language model backend
- **Python 3.11**: Programming language
- **VS Code**: IDE with integrated terminal support

## Success Criteria

Learners completing this workshop should be able to:
- Create and configure AI agents using Azure OpenAI
- Implement function tools with proper parameter validation
- Use streaming and multimodal capabilities
- Manage conversation state with threads
- Deploy and use Azure AI Foundry hosted agents
- Integrate agents with MCP servers (stdio and HTTP transports)
- Connect to remote MCP services
- Design sub-workflows for complex orchestration
- Apply agent patterns to real-world problems

## Important Notes

- Python files should be runnable without external dependencies (beyond what's in the container)
- Each lab builds on previous concepts but can also stand alone
- Include both theory and practice in balanced proportions
- Emphasize hands-on experimentation over passive reading
- Provide resources for continued learning

## Assistance Guidelines

When helping with this project:
1. Maintain the progressive learning structure
2. Keep explanations clear and accessible
3. Ensure code examples are production-quality
4. Balance completeness with workshop time constraints
5. Focus on practical, applicable knowledge
6. Reference official Agent Framework documentation
7. Support both instructor-led and self-paced learning
