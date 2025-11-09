# Agent Framework Training Workshop

Welcome to the **Microsoft Agent Framework Training Workshop**! This repository provides a hands-on, interactive learning experience using Python lab exercises to master building AI agents with the [Microsoft Agent Framework](https://github.com/microsoft/agent-framework) integrated with [Azure AI Foundry](https://learn.microsoft.com/en-us/azure/ai-foundry/).

## 🎯 Workshop Overview

This training is designed to take you from zero to building sophisticated AI agent systems in approximately **3-4 hours**. Through progressive, hands-on exercises, you'll learn to create, configure, and orchestrate AI agents that can solve complex tasks using Azure OpenAI and Azure AI Foundry.

### What You'll Learn

- **Lab 01**: Azure OpenAI Chat API Basics - Basic Azure OpenAI Chat client and simple agent creation
- **Lab 02**: Responses API - Advanced response handling and formatting with Azure OpenAI Responses API
- **Lab 03**: Function Tools - Custom function tools with Pydantic parameter validation (includes exercises)
- **Lab 04**: Streaming Responses - Real-time streaming API responses and token-by-token output
- **Lab 05**: Code Interpreter & Threads - Built-in code interpreter tool and conversation thread management
- **Lab 06**: Multimodal Inputs - Processing images and text with vision-enabled agents
- **Lab 07**: Azure AI Foundry Hosted Agents - Cloud-based agent deployment and execution
- **Lab 08**: Sub-Workflows - Agent orchestration patterns and complex multi-step workflows

## 📚 Training Structure

All lab files are Python scripts in the `labs/` directory, numbered sequentially:

```
labs/
├── 01-azure_open_ai_chat_api.py
├── 02-azure_open_ai_responses_api.py
├── 03-azure_open_ai_responses_api_tools.py
├── 03-exercise.py
├── 04-azure_open_ai_responses_api_streaming.py
├── 05-azure_open_ai_responses_api_code_interpreter.py
├── 05-azure_open_ai_responses_api_threads.py
├── 06-azure_open_ai_responses_api_multimodal.py
├── 07-azure_ai_hosted_agent.py
└── 08-sub_workflow_basics.py
```

### Lab Breakdown

| Lab | Topic | Key Concepts |
|-----|-------|--------------|
| 01 | Azure OpenAI Chat API | Basic Azure OpenAI client, agent creation, running queries |
| 02 | Responses API | Azure OpenAI Responses API, advanced response handling |
| 03 | Function Tools | Custom tools, function calling, Pydantic validation (with exercises) |
| 04 | Streaming | Streaming responses, real-time output, token handling |
| 05 | Code Interpreter & Threads | Built-in code execution, conversation threads, state management |
| 06 | Multimodal | Image processing, vision capabilities, multimodal agents |
| 07 | Azure AI Hosted Agents | Azure AI Foundry projects, cloud deployment, Azure CLI auth |
| 08 | Sub-Workflows | Workflow orchestration, multi-step patterns, agent coordination |

## 🚀 Getting Started

### Prerequisites

- **Docker** installed and running
- **VS Code** with the Dev Containers extension
- **Azure subscription** with access to Azure OpenAI and Azure AI Foundry
- Basic Python knowledge
- (Optional) GitHub Copilot for enhanced coding assistance

### Setup Instructions

1. **Clone this repository**
   ```bash
   git clone <repository-url>
   cd SHORTHACK-AGENT-FRAMEWORK
   ```

2. **Open in VS Code**
   ```bash
   code .
   ```

3. **Reopen in Container**
   - When prompted, click "Reopen in Container"
   - Or use Command Palette (Ctrl+Shift+P / Cmd+Shift+P): `Dev Containers: Reopen in Container`
   - Wait for the container to build (first time may take a few minutes)

4. **Deploy Azure AI Foundry Resources**
   - Authenticate with Azure CLI:
   ```bash
   az login
   ```
   - Run the automated deployment script:
   ```bash
   ./deploy.sh
   ```
   - This will:
     - Deploy Azure AI Foundry project and Azure OpenAI resources
     - Configure GPT-4o model deployment
     - Set up role assignments for local development
     - Generate `.env` file with all connection details

5. **Verify Setup**
   - Check that `.env` file was created with these variables:
     - `AZURE_OPENAI_ENDPOINT`
     - `AZURE_OPENAI_MODEL_DEPLOYMENT_NAME`
     - `AZURE_AI_PROJECT_ENDPOINT`
     - `AZURE_AI_PROJECT_NAME`
     - `AZURE_AI_MODEL_DEPLOYMENT_NAME`

6. **Start Learning!**
   - Run labs sequentially starting with Lab 01:
   ```bash
   python labs/01-azure_open_ai_chat_api.py
   ```
   - Follow the instructions and comments in each Python file
   - Progress through labs 01 → 08

## 📖 Workshop Flow

### Recommended Approach

1. **Sequential Learning**: Complete labs in order (01 → 02 → 03 → 04 → 05 → 06 → 07 → 08)
2. **Hands-On Practice**: Run all Python files and experiment with modifications
3. **Challenge Exercises**: Lab 03 includes practice exercises (`03-exercise.py`)
4. **Build Projects**: Apply learned concepts to create your own agents

### Self-Paced Learning

- Each lab is self-contained with explanations and examples
- Python files are ready to run with clear outputs and comments
- Exercises range from guided to open-ended
- Solutions and best practices are provided inline

## 🛠️ Environment

This project uses a pre-configured Dev Container with:

- **Python 3.11**
- **Microsoft Agent Framework** pre-installed
- **Azure SDK** for Azure OpenAI and Azure AI Foundry
- **Azure CLI** for authentication and resource management
- **Pydantic** for parameter validation
- **python-dotenv** for environment variable management
- **VS Code** with integrated terminal support

## 📦 Key Resources

### Official Documentation

- [Microsoft Agent Framework GitHub](https://github.com/microsoft/agent-framework)
- [Microsoft Agent Framework Docs](https://learn.microsoft.com/en-us/agent-framework/)
- [Azure AI Foundry Documentation](https://learn.microsoft.com/en-us/azure/ai-foundry/)
- [Azure OpenAI Service](https://learn.microsoft.com/en-us/azure/ai-services/openai/)

### Infrastructure

- Bicep templates for Azure deployment in `infra/`
- Automated deployment via Azure Developer CLI (azd)

## 🎓 Learning Outcomes

By the end of this workshop, you will be able to:

- ✅ Create and configure AI agents using Azure OpenAI
- ✅ Implement custom function tools with proper parameter validation
- ✅ Use streaming and multimodal capabilities in agents
- ✅ Manage conversation state with threads
- ✅ Deploy and use Azure AI Foundry hosted agents
- ✅ Design sub-workflows for complex orchestration
- ✅ Apply agent patterns to real-world problems with Azure integration

## 🤝 Contributing

This training material is designed to be improved over time. Contributions are welcome!

- Report issues or suggest improvements via GitHub Issues
- Submit pull requests with enhancements or fixes
- Share your success stories and use cases

## 📝 Workshop Tips

### For Instructors

- Each lab can be taught as a standalone session
- Live coding demonstrations work well with these Python files
- Encourage participants to experiment beyond the exercises
- Use Lab 03 exercises for group discussions
- Ensure all participants have Azure subscriptions and proper access

### For Learners

- Don't just run code—read and understand the implementation
- Experiment by modifying parameters and approaches
- Complete Lab 03 exercises before moving to Lab 04
- Join community forums to discuss and share learnings
- Review the deployed Azure resources in Azure Portal to understand infrastructure

## 🐛 Troubleshooting

### Common Issues

**Container fails to build**
- Ensure Docker is running
- Check Docker has sufficient resources (4GB+ RAM recommended)
- Try rebuilding: `Dev Containers: Rebuild Container`

**Deployment script fails**
- Ensure you're logged into Azure CLI: `az login`
- Verify you have Contributor access to the subscription
- Check Azure subscription has available quotas for Azure OpenAI
- Review `deploy.sh` logs for specific error messages

**Python execution issues**
- Ensure you're running from the workspace root: `python labs/01-azure_open_ai_chat_api.py`
- Check that `.env` file exists with all required variables
- Verify Python environment is properly configured in the container

**Agent Framework import errors**
- Verify container is fully built
- Check that `agent-framework` is installed: `pip list | grep agent-framework`
- Rebuild container if necessary

**API/Authentication errors**
- Ensure Azure CLI is authenticated: `az account show`
- Check that role assignments were created during deployment
- Verify Azure OpenAI endpoint and model deployment name in `.env`
- Review Azure AI Foundry project permissions in Azure Portal
- For Lab 07, ensure `AZURE_AI_PROJECT_ENDPOINT` points to correct project endpoint

**Permission errors when running Lab 07**
- Verify you have "Azure AI Developer" and "Cognitive Services OpenAI User" roles
- Re-run deployment script to ensure role assignments: `./deploy.sh`
- Check that `AZURE_PRINCIPAL_ID` environment variable is set

## 📄 License

This project is provided as educational material. Please refer to the repository license for usage terms.

## 🌟 Acknowledgments

Built with:
- [Microsoft Agent Framework](https://github.com/microsoft/agent-framework) - Powerful toolkit for creating AI agents
- [Azure AI Foundry](https://azure.microsoft.com/en-us/products/ai-foundry) - Enterprise AI platform
- [Azure OpenAI Service](https://azure.microsoft.com/en-us/products/ai-services/openai-service) - Enterprise-grade OpenAI models

---

**Ready to build amazing AI agents?** Run `python labs/01-azure_open_ai_chat_api.py` to get started! 🚀
