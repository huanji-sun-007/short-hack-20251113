# Agent Framework Training Workshop

Welcome to the **Microsoft Agent Framework Training Workshop**! This repository provides a hands-on, interactive learning experience using Python lab exercises to master building AI agents with the [Microsoft Agent Framework](https://github.com/microsoft/agent-framework) integrated with [Azure AI Foundry](https://learn.microsoft.com/en-us/azure/ai-foundry/).

## 🎯 Workshop Overview

This training is designed to take you from zero to building sophisticated AI agent systems in approximately **4-5 hours**. Through progressive, hands-on exercises, you'll learn to create, configure, and orchestrate AI agents that can solve complex tasks using Azure OpenAI, Azure AI Foundry, and the Model Context Protocol (MCP).

### What You'll Learn

- **Lab 010**: Azure OpenAI Chat API Basics - Basic Azure OpenAI Chat client and simple agent creation
- **Lab 020**: Responses API - Advanced response handling and formatting with Azure OpenAI Responses API
- **Lab 030**: Function Tools - Custom function tools with Pydantic parameter validation (includes exercises)
- **Lab 050**: Streaming Responses - Real-time streaming API responses and token-by-token output
- **Lab 060**: Code Interpreter - Built-in code interpreter tool and dynamic code execution
- **Lab 070**: Multimodal Inputs - Processing images and text with vision-enabled agents (includes exercises)
- **Lab 080**: Thread Management - Managing conversation threads and state persistence with automatic and explicit thread creation
- **Lab 090**: Azure AI Hosted Agents - Cloud-based agent deployment and execution with Azure AI Foundry
- **Lab 100**: File Search - Using file search tools with vector stores to answer questions from documents
- **Lab 110**: Dev UI - Interactive development UI for testing and debugging Azure AI agents
- **Lab 120**: Stdio MCP Integration - Integrating agents with local MCP servers via stdio transport (includes exercises)
- **Lab 130**: HTTP MCP Integration - Integrating agents with local MCP servers via HTTP transport
- **Lab 140**: Remote HTTP MCP - Connecting to remote MCP services like Microsoft Learn MCP (includes exercises)
- **Lab 150**: Sub-Workflows - Agent orchestration patterns and complex multi-step workflows

## 📚 Training Structure

All lab files are Python scripts in the `labs/` directory, numbered sequentially (010-130):

```
labs/
├── 010-azure_open_ai_chat_api.py
├── 020-azure_open_ai_responses_api.py
├── 030-azure_open_ai_responses_api_tools.py
├── 031-exercise.py
├── 050-azure_open_ai_responses_api_streaming.py
├── 060-azure_open_ai_responses_api_code_interpreter.py
├── 070-azure_open_ai_responses_api_multimodal.py
├── 081-exercise.py
├── 080-azure_open_ai_responses_api_threads.py
├── 090-azure_ai_hosted_agent.py
├── 100-azure_ai_file_search.py
├── 110-azure_ai_devui.py
├── 111-exercise.py
├── 120-azure_ai_stdio_mcp_agent.py
├── 130-azure_ai_http_mcp_agent.py
├── 140-azure_ai_remote_http_mcp.py
├── 141-exercise.py
└── 150-sub_workflow_basics.py
```

### Lab Breakdown

| Lab | Topic | Key Concepts |
|-----|-------|--------------|
| 010 | Azure OpenAI Chat API | Basic Azure OpenAI client, agent creation, running queries |
| 020 | Responses API | Azure OpenAI Responses API, advanced response handling |
| 030 | Function Tools | Custom tools, function calling, Pydantic validation (with exercises) |
| 050 | Streaming | Streaming responses, real-time output, token handling |
| 060 | Code Interpreter | Built-in code execution, dynamic Python code running, data analysis |
| 070 | Multimodal | Image processing, vision capabilities, multimodal agents (with exercises) |
| 080 | Thread Management | Conversation threads, state persistence, automatic vs explicit thread creation |
| 090 | Azure AI Hosted Agents | Azure AI Foundry projects, cloud deployment, Azure CLI auth |
| 100 | File Search | Vector stores, file upload, document-based Q&A, retrieval-augmented generation |
| 110 | Dev UI | Interactive web UI, agent testing, real-time debugging, browser-based chat |
| 120 | Stdio MCP Integration | Local MCP servers, stdio transport, agent-MCP communication (with exercises) |
| 130 | HTTP MCP Integration | Local HTTP MCP servers, HTTP transport, streamable connections |
| 140 | Remote HTTP MCP | Remote MCP services, Microsoft Learn MCP integration (with exercises) |
| 150 | Sub-Workflows | Workflow orchestration, multi-step patterns, agent coordination |

## 🚀 Getting Started

### Prerequisites

- **Docker** installed and running
- **VS Code** with the Dev Containers extension
- **Azure tenant access** (either through your own subscription OR shared credentials from instructor)
- Basic Python knowledge
- (Optional) GitHub Copilot for enhanced coding assistance

**For deploying your own infrastructure (Option A):**
- Azure subscription with Contributor access
- Sufficient quotas for Azure OpenAI and Azure AI Foundry

**For using shared resources (Option B):**
- `.env` file and tenant ID from your instructor or team lead
- No Azure subscription required

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

4. **Configure Azure AI Foundry Access**

   You have two options to set up your environment:

   **Option A: Deploy Your Own Azure AI Foundry Resources (Requires Azure Subscription)**
   
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

   **Option B: Use Shared Azure AI Foundry Resources (No Azure Subscription Required)**
   
   - Obtain `.env` file with credentials from your instructor or team lead
   - The `.env` file should contain:
     - `AZURE_OPENAI_ENDPOINT`
     - `AZURE_OPENAI_MODEL_DEPLOYMENT_NAME`
     - `AZURE_AI_PROJECT_ENDPOINT`
     - `AZURE_AI_PROJECT_NAME`
     - `AZURE_AI_MODEL_DEPLOYMENT_NAME`
   - Copy the `.env` file to the repository root directory
   - Authenticate with Azure CLI using the correct tenant:
     ```bash
     az login --tenant <tenant-id>
     ```
     (Replace `<tenant-id>` with the tenant ID provided by your instructor)
   - Verify authentication:
     ```bash
     az account show
     ```

5. **Verify Setup**
   - Check that `.env` file exists in the repository root with all required variables
   - Ensure you're logged into the correct Azure tenant: `az account show`

6. **Start Learning!**
   - Run labs sequentially starting with Lab 010:
   ```bash
   python labs/010-azure_open_ai_chat_api.py
   ```
   - Follow the instructions and comments in each Python file
   - Progress through labs 010 → 130

## 📖 Workshop Flow

### Recommended Approach

1. **Sequential Learning**: Complete labs in order (010 → 020 → 030 → ... → 150)
2. **Hands-On Practice**: Run all Python files and experiment with modifications
3. **Challenge Exercises**: Labs 031, 081, 111, and 141 include practice exercises
4. **MCP Server Setup**: Labs 120 and 130 require running separate MCP servers from the `resources/` directory
5. **Build Projects**: Apply learned concepts to create your own agents

### Self-Paced Learning

- Each lab is self-contained with explanations and examples
- Python files are ready to run with clear outputs and comments
- Exercises range from guided to open-ended (labs 031, 081, 111, 141)
- Solutions and best practices are provided inline

## 🛠️ Environment

This project uses a pre-configured Dev Container with:

- **Python 3.11**
- **Microsoft Agent Framework** pre-installed
- **Azure SDK** for Azure OpenAI and Azure AI Foundry
- **Azure CLI** for authentication and resource management
- **FastMCP** for Model Context Protocol server implementation
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
- ✅ Integrate agents with MCP servers (stdio and HTTP transports)
- ✅ Connect to remote MCP services
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
- Complete exercises in labs 031, 081, 111, and 141 before moving forward
- For labs 120 and 130, start the MCP servers in separate terminals first:
  - Lab 120: `python resources/stdio_mcp_server.py`
  - Lab 130: `python resources/http_mcp_server.py`
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
- If using shared resources (Option B), skip deployment and use the provided `.env` file instead

**Wrong tenant / authentication issues**
- If using shared resources, ensure you logged in with the correct tenant: `az login --tenant <tenant-id>`
- Verify you're in the right tenant: `az account show` (check the `tenantId` field)
- If needed, log out and log back in: `az logout` then `az login --tenant <tenant-id>`

**Python execution issues**
- Ensure you're running from the workspace root: `python labs/010-azure_open_ai_chat_api.py`
- Check that `.env` file exists with all required variables
- Verify Python environment is properly configured in the container

**Agent Framework import errors**
- Verify container is fully built
- Check that `agent-framework` is installed: `pip list | grep agent-framework`
- Rebuild container if necessary

**API/Authentication errors**
- Ensure Azure CLI is authenticated: `az account show`
- If using shared resources, verify you're logged into the correct tenant (check `tenantId` in output)
- Check that `.env` file exists and contains all required variables
- For Option A (own deployment): Check that role assignments were created during deployment
- For Option B (shared resources): Verify the `.env` values are correct and up-to-date
- Verify Azure OpenAI endpoint and model deployment name in `.env`
- Review Azure AI Foundry project permissions in Azure Portal
- For Lab 080, ensure `AZURE_AI_PROJECT_ENDPOINT` points to correct project endpoint

**Permission errors when running Lab 090**
- Verify you have "Azure AI Developer" and "Cognitive Services OpenAI User" roles
- For Option A (own deployment): Re-run deployment script to ensure role assignments: `./deploy.sh`
- For Option B (shared resources): Contact your instructor to verify your account has proper role assignments
- Check that `AZURE_PRINCIPAL_ID` environment variable is set (if using Option A)
- Ensure you're authenticated with the correct tenant: `az account show`

**MCP Server issues (Labs 120, 130)**
- Ensure the MCP server is running in a separate terminal before running the agent
- For Lab 120: Start `python resources/stdio_mcp_server.py` first
- For Lab 130: Start `python resources/http_mcp_server.py` first, verify it's listening on http://localhost:8000/mcp
- Check that FastMCP is installed: `pip list | grep fastmcp`
- Review server logs for any errors

## 📄 License

This project is provided as educational material. Please refer to the repository license for usage terms.

## 🌟 Acknowledgments

Built with:
- [Microsoft Agent Framework](https://github.com/microsoft/agent-framework) - Powerful toolkit for creating AI agents
- [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) - Universal protocol for connecting AI assistants to data sources
- [Azure AI Foundry](https://azure.microsoft.com/en-us/products/ai-foundry) - Enterprise AI platform
- [Azure OpenAI Service](https://azure.microsoft.com/en-us/products/ai-services/openai-service) - Enterprise-grade OpenAI models

---

**Ready to build amazing AI agents?** Run `python labs/010-azure_open_ai_chat_api.py` to get started! 🚀
