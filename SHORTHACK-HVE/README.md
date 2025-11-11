# GitHub Copilot HVE (Hypervelocity Engineering) Hands-On Lab

## 🧠 Introduction

This project provides hands-on labs to explore **GitHub Copilot** and **Hypervelocity Engineering** and learn how to maximize AI-assisted development productivity. You'll learn how to customize GitHub Copilot with project-specific instructions, use advanced chat modes, and implement real-world development workflows.

By the end of these labs, you'll be able to:

- Set up and configure GitHub Copilot in VS Code
- Use slash commands, chat participants, variables, and Agent mode effectively
- Create custom instructions and chat modes for your project

## ✅ Pre-requisites

Before you begin, ensure you have:

- **Visual Studio Code** installed
- **GitHub Copilot** subscription
- Basic knowledge of software development concepts
- Familiarity with your project's technology stack

## 🛠️ Setup Instructions

1. **Fork or Clone this repository.**

2. **Open the project in Visual Studio Code.**

## 📁 Project Structure

```
├── .copilot-tracking/      # Sample PBIs for hands-on exercises
│   └── pbi/
│       ├── pbi-001.md      # Create a Daily Fruit Prices API
│       └── pbi-002.md      # Create the IaC with Terraform
├── .github/         # GitHub Copilot configuration templates
├── docs/                   # Lab instructions and guides
│   └── basic/              # Beginner tutorials
│       ├── step-1-setup.md
│       ├── step-2-simple-chat-usage.md
│       └── step-3-chat-customization.md
└── README.md              # This file
```

## 🚀 Quick Start

1. Open the project in VS Code
2. Finish the following labs

## 🧪 Lab Descriptions

### 🔹 Lab 1: Getting Started with GitHub Copilot

Master the fundamentals of GitHub Copilot through three progressive steps:

**Step 1: Set Up GitHub Copilot**  
Install and configure GitHub Copilot in VS Code, understand the available features, and prepare your development environment.

**Step 2: Using GitHub Copilot Chat**  
Master slash commands, chat participants, variables, and Agent mode. Understand how to effectively communicate with GitHub Copilot to get the best results.

**Step 3: Customizing GitHub Copilot**  
Create custom instructions and chat modes tailored to your project needs. Learn how to enhance Copilot's context awareness for your specific development scenarios.

**Step 4: Set Up Project-Specific Copilot Configuration**  
Define your own `copilot-instructions.md` and `engineering-fundamentals.md` files in the `.github` directory.

> **Note:** See the [microsoft/edge-ai](https://github.com/microsoft/edge-ai) repository. See the [prompt-builder.chatmode.md](https://github.com/microsoft/edge-ai/blob/main/.github/chatmodes/prompt-builder.chatmode.md) for the builder tool.

**📄 Lab Files:**
- [`docs/basic/step-1-setup.md`](docs/basic/step-1-setup.md)
- [`docs/basic/step-2-simple-chat-usage.md`](docs/basic/step-2-simple-chat-usage.md)
- [`docs/basic/step-3-chat-customization.md`](docs/basic/step-3-chat-customization.md)

### 🔹 Lab 2: Implement Daily Fruit Prices API

Try to create a chat mode which can generate actionable implementation plans from a Product Backlog Item (PBI) and then implement the solution.

**What you'll do:**
1. Review the PBI requirements for a Daily Fruit Prices API
2. Use a chat mode to create a detailed implementation plan
3. Follow the plan to implement the API
4. Test and validate the implementation

**📄 Lab Files:**
- [`.copilot-tracking/pbi/pbi-001.md`](.copilot-tracking/pbi/pbi-001.md) - PBI requirements

### 🔹 Lab 3: Implement Terraform Infrastructure 

Create a chat mode to visualize the architecture.

**What you'll do:**
1. Review the PBI requirements for Terraform infrastructure
2. Use the chat mode defined in Lab 2 to create an implementation plan
3. Implement the Terraform code following the plan
4. Use a chat mode to generate architecture diagrams from your Terraform code
5. Document and review the infrastructure design

**📄 Lab Files:**
- [`.copilot-tracking/pbi/pbi-002.md`](.copilot-tracking/pbi/pbi-002.md) - PBI requirements

## 📚 References

- [GitHub Copilot Documentation](https://docs.github.com/en/copilot)
- [GitHub Copilot in VS Code](https://code.visualstudio.com/docs/copilot/overview)
- [GitHub Copilot Chat](https://docs.github.com/en/copilot/using-github-copilot/asking-github-copilot-questions-in-your-ide)
- [Prompt Engineering for GitHub Copilot](https://docs.github.com/en/copilot/using-github-copilot/prompt-engineering-for-github-copilot)

---
