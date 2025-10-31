# Agent Framework Training Workshop

Welcome to the **Microsoft Agent Framework Training Workshop**! This repository provides a hands-on, interactive learning experience using Python lab exercises to master building AI agents with the [Microsoft Agent Framework](https://github.com/microsoft/agent-framework).

## 🎯 Workshop Overview

This training is designed to take you from zero to building sophisticated multi-agent systems in approximately **3 hours**. Through progressive, hands-on exercises, you'll learn to create, configure, and orchestrate AI agents that can solve complex tasks.

### What You'll Learn

- **Lab 01**: Agent Fundamentals - Create and run your first agent
- **Lab 02**: Function Tools - Extend agent capabilities with custom tools
- **Lab 03**: Multi-Agent Orchestration - Build collaborative agent systems
- **Lab 04**: Thread Management - Handle conversations and state management

## 📚 Training Structure

Each lab is contained in a separate directory under `labs/` with Python files and exercises:

```
labs/
├── 01/          # Agent Fundamentals
├── 02/          # Function Tools
├── 03/          # Multi-Agent Orchestration
└── 04/          # Thread Management
```

### Lab Breakdown

| Lab | Topic | Duration | Key Concepts |
|-----|-------|----------|--------------|
| 01 | Agent Fundamentals | ~45 min | Creating agents, basic configuration, running simple tasks |
| 02 | Function Tools | ~45 min | Adding custom tools, function calling, tool integration |
| 03 | Multi-Agent Orchestration | ~45 min | Agent collaboration, orchestration patterns, agent teams |
| 04 | Thread Management | ~45 min | Conversation threads, state management, context handling |

## 🚀 Getting Started

### Prerequisites

- **Docker** installed and running
- **VS Code** with the Dev Containers extension
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

4. **(Optional) Deploy AI Foundry Resources**
   - If you don't already have access to Azure OpenAI or AI connection details, run:
   ```bash
   ./deploy.sh
   ```
   - This will deploy AI Foundry resources and configure environment variables automatically
   - Skip this step if you already have AI connection details and prefer to configure them manually

5. **Start Learning!**
   - Navigate to the `labs/01/` folder
   - Run the Python files using `python labs/01/<filename>.py`
   - Follow the instructions and comments in each Python file
   - Progress through labs 01 → 02 → 03 → 04

## 📖 Workshop Flow

### Recommended Approach

1. **Sequential Learning**: Complete labs in order (Lab 01 → 02 → 03 → 04)
2. **Hands-On Practice**: Run all Python files and experiment with modifications
3. **Challenge Exercises**: Each lab includes practice exercises
4. **Build Projects**: Apply learned concepts to create your own agents

### Self-Paced Learning

- Each lab is self-contained with explanations and examples
- Python files are ready to run with clear outputs and comments
- Exercises range from guided to open-ended
- Solutions and best practices are provided

## 🛠️ Environment

This project uses a pre-configured Dev Container with:

- **Python 3.11**
- **Microsoft Agent Framework** pre-installed
- **VS Code** with integrated terminal support
- **Azure SDK** for cloud services integration
- **Common Python libraries** for development

See [.devcontainer/README.md](.devcontainer/README.md) for detailed environment information.

## 📦 Key Resources

### Official Documentation

- [Agent Framework GitHub](https://github.com/microsoft/agent-framework)
- [Agent Framework Documentation](https://learn.microsoft.com/en-us/agent-framework/)
- [Agent Framework API Reference](https://microsoft.github.io/agent-framework/)

### Additional Learning

- [Azure OpenAI Service](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [Semantic Kernel](https://learn.microsoft.com/en-us/semantic-kernel/) (related framework)
- [LangChain Documentation](https://python.langchain.com/) (alternative framework)

## 🎓 Learning Outcomes

By the end of this workshop, you will be able to:

- ✅ Create and configure AI agents with various capabilities
- ✅ Implement custom function tools to extend agent functionality
- ✅ Design and orchestrate multi-agent systems for complex tasks
- ✅ Manage conversation threads and maintain state across interactions
- ✅ Apply best practices for agent development and deployment
- ✅ Build production-ready agent applications

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
- Use the challenge exercises for group discussions

### For Learners

- Don't just run code—read and understand the implementation
- Experiment by modifying parameters and approaches
- Complete all exercises before moving to the next lab
- Join community forums to discuss and share learnings

## 🐛 Troubleshooting

### Common Issues

**Container fails to build**
- Ensure Docker is running
- Check Docker has sufficient resources (4GB+ RAM recommended)
- Try rebuilding: `Dev Containers: Rebuild Container`

**Python execution issues**
- Ensure you're in the correct directory when running Python files
- Use `python labs/01/<filename>.py` to run lab files
- Check that the Python environment is properly configured

**Agent Framework import errors**
- Verify container is fully built
- Check that `agent-framework` is in requirements.txt
- Rebuild container if necessary

**API/Authentication errors**
- Ensure you have valid Azure OpenAI credentials
- Check environment variables are properly configured
- Review Azure service quotas and limits

## 📄 License

This project is provided as educational material. Please refer to the repository license for usage terms.

## 🌟 Acknowledgments

Built with the [Microsoft Agent Framework](https://github.com/microsoft/agent-framework) - a powerful toolkit for creating AI agents.

---

**Ready to build amazing AI agents?** Navigate to `labs/01/` and run your first Python file to get started! 🚀
