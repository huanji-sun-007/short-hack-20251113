# GitHub Copilot Instructions - Agent Framework Training Workshop

## Project Purpose

This repository is a **hands-on training asset** for teaching developers how to use the **Microsoft Agent Framework** (https://github.com/microsoft/agent-framework, https://learn.microsoft.com/en-us/agent-framework/).

## Project Structure

### Training Format
- **Medium**: Python files in lab directories
- **Duration**: Approximately 3 hours total
- **Labs**: Progressive learning labs with executable Python examples
- **Approach**: Self-paced, hands-on, with exercises

### Learning Labs

Each lab is contained in a separate directory under `labs/` with Python files and exercises:

1. **Lab 01: Agent Fundamentals** (~45 minutes)
   - Creating agents from scratch
   - Basic agent configuration
   - Running simple agent tasks
   - Understanding agent responses

2. **Lab 02: Function Tools** (~45 minutes)
   - Adding custom function tools to agents
   - Function calling and tool integration
   - Tool parameter handling
   - Error handling in tools

3. **Lab 03: Multi-Agent Orchestration** (~45 minutes)
   - Running multiple agents together
   - Agent collaboration patterns
   - Orchestration strategies
   - Agent team workflows

4. **Lab 04: Thread Management** (~45 minutes)
   - Managing conversation threads
   - State management across interactions
   - Context handling and persistence
   - Thread lifecycle management

## Target Audience

- Developers learning to build AI agents
- Engineers exploring Microsoft Agent Framework
- Teams wanting to implement agent-based solutions
- Workshop participants in training sessions

## Technical Environment

- **Container**: Dev Container with Python 3.11
- **Framework**: Microsoft Agent Framework (pre-installed)
- **Interface**: Python files executed via VS Code terminal
- **Cloud Integration**: Azure OpenAI services support
- **Additional Tools**: Azure SDK, common Python libraries

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
- Create and configure AI agents independently
- Add custom tools to extend agent capabilities
- Design multi-agent systems for complex tasks
- Manage conversation state and threads effectively
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
