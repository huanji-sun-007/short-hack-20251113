# Agent Framework Training Workshop

Welcome to the **Microsoft Agent Framework Training Workshop**! This repository provides a hands-on, interactive learning experience using Jupyter Notebooks to master building AI agents with the [Microsoft Agent Framework](https://github.com/microsoft/agent-framework).

## 🎯 Workshop Overview

This training is designed to take you from zero to building sophisticated multi-agent systems in approximately **3 hours**. Through progressive, hands-on exercises, you'll learn to create, configure, and orchestrate AI agents that can solve complex tasks.

### What You'll LearnX

- **Phase 1**: Agent Fundamentals - Create and run your first agent
- **Phase 2**: Function Tools - Extend agent capabilities with custom tools
- **Phase 3**: Multi-Agent Orchestration - Build collaborative agent systems
- **Phase 4**: Thread Management - Handle conversations and state management

## 📚 Training Structure

Each phase is contained in a separate Jupyter Notebook in the `notebooks/` directory:

```
notebooks/
├── phase1_agent_fundamentals.ipynb
├── phase2_function_tools.ipynb
├── phase3_multi_agent_orchestration.ipynb
└── phase4_thread_management.ipynb
```

### Phase Breakdown

| Phase | Topic | Duration | Key Concepts |
|-------|-------|----------|--------------|
| 1 | Agent Fundamentals | ~45 min | Creating agents, basic configuration, running simple tasks |
| 2 | Function Tools | ~45 min | Adding custom tools, function calling, tool integration |
| 3 | Multi-Agent Orchestration | ~45 min | Agent collaboration, orchestration patterns, agent teams |
| 4 | Thread Management | ~45 min | Conversation threads, state management, context handling |

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

4. **Start Learning!**
   - Navigate to the `notebooks/` folder
   - Open `phase1_agent_fundamentals.ipynb`
   - Select the Python kernel when prompted
   - Follow the instructions in each notebook

## 📖 Workshop Flow

### Recommended Approach

1. **Sequential Learning**: Complete notebooks in order (Phase 1 → 2 → 3 → 4)
2. **Hands-On Practice**: Run all code cells and experiment with modifications
3. **Challenge Exercises**: Each phase includes practice exercises
4. **Build Projects**: Apply learned concepts to create your own agents

### Self-Paced Learning

- Each notebook is self-contained with explanations and examples
- Code cells are ready to run with clear outputs
- Exercises range from guided to open-ended
- Solutions and best practices are provided

## 🛠️ Environment

This project uses a pre-configured Dev Container with:

- **Python 3.11**
- **Microsoft Agent Framework** pre-installed
- **Jupyter Notebooks** fully integrated with VS Code
- **Azure SDK** for cloud services integration
- **Common Python libraries** (numpy, pandas, matplotlib, etc.)

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

- Each phase can be taught as a standalone session
- Live coding demonstrations work well with these notebooks
- Encourage participants to experiment beyond the exercises
- Use the challenge exercises for group discussions

### For Learners

- Don't just run cells—read and understand the code
- Experiment by modifying parameters and approaches
- Complete all exercises before moving to the next phase
- Join community forums to discuss and share learnings

## 🐛 Troubleshooting

### Common Issues

**Container fails to build**
- Ensure Docker is running
- Check Docker has sufficient resources (4GB+ RAM recommended)
- Try rebuilding: `Dev Containers: Rebuild Container`

**Kernel not found**
- Select the Python 3.11 kernel from the kernel picker
- Restart VS Code if the kernel doesn't appear

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

**Ready to build amazing AI agents?** Open `notebooks/phase1_agent_fundamentals.ipynb` and let's get started! 🚀
