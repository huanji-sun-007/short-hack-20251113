# GitHub Copilot Instructions - Agent Framework Training Workshop

## Project Purpose

This repository is a **hands-on training asset** for teaching developers how to use the **Microsoft Agent Framework** (https://github.com/microsoft/agent-framework, https://learn.microsoft.com/en-us/agent-framework/) with **Azure AI Foundry** integration.

## Project Structure

### Training Format
- **Medium**: Numbered Python files in the `labs/` directory
- **Duration**: Approximately 3-4 hours total
- **Labs**: 8 progressive learning modules with executable Python examples
- **Approach**: Self-paced, hands-on, with exercises
- **Infrastructure**: Azure AI Foundry project with automated deployment

### Learning Labs

Labs are numbered sequentially in the `labs/` directory as Python files:

1. **01-azure_open_ai_chat_api.py** - Azure OpenAI Chat Basics
   - Basic Azure OpenAI Chat client
   - Simple agent creation
   - Running queries with agents
   - Understanding agent responses

2. **02-azure_open_ai_responses_api.py** - Responses API
   - Using Azure OpenAI Responses API
   - Advanced response handling
   - Response formatting and parsing

3. **03-azure_open_ai_responses_api_tools.py** - Function Tools
   - Adding custom function tools to agents
   - Function calling and tool integration
   - Tool parameter handling with Pydantic
   - **03-exercise.py** - Practice exercises

4. **04-azure_open_ai_responses_api_streaming.py** - Streaming Responses
   - Streaming API responses
   - Real-time response handling
   - Token-by-token output

5. **05-azure_open_ai_responses_api_code_interpreter.py** - Code Interpreter
   - Using built-in code interpreter tool
   - Dynamic code execution
   - Data analysis capabilities
   
   **05-azure_open_ai_responses_api_threads.py** - Thread Management
   - Managing conversation threads
   - State management across interactions
   - Context handling and persistence

6. **06-azure_open_ai_responses_api_multimodal.py** - Multimodal Inputs
   - Processing images and text
   - Multimodal agent capabilities
   - Vision-enabled agents

7. **07-azure_ai_hosted_agent.py** - Azure AI Foundry Hosted Agents
   - Using Azure AI Foundry project
   - Hosted agent deployment
   - Cloud-based agent execution
   - Azure CLI authentication

8. **08-sub_workflow_basics.py** - Sub-Workflows
   - Creating sub-workflows
   - Agent orchestration patterns
   - Complex multi-step workflows

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
- **Additional Tools**: Azure SDK, Pydantic, python-dotenv

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
