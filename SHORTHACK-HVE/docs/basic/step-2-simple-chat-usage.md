## Step 2: Using GitHub Copilot Chat

### Overview
In Step 2, we'll build on what you learned in Step 1 by focusing on GitHub Copilot Chat. Copilot Chat is an interactive AI assistant within VS Code that can answer questions, explain code, and perform tasks in your project. Target time: 10–20 minutes.

### Prerequisites
Make sure you have completed:

- **Step 1** (GitHub Copilot installed and signed in)
- **Basic coding knowledge** (familiarity with at least one programming language)
- **VS Code basics** (opening files, editing code)

### What You'll Learn
By the end of this step, you'll know how to:

- Open and use the Copilot Chat panel
- Use slash commands (`/`) for quick actions
- Use chat participants (`@`) for domain-specific help
- Use chat variables (`#`) for context
- Switch between AI models for better responses
- Leverage Agent mode for multi-step tasks
- Configure and manage Copilot's tools

### Quick Flow
1. Access Copilot Chat
2. Ask questions in Chat mode
3. Use slash commands (/)
4. Use chat participants (@)
5. Use chat variables (#)
6. Switch between AI models
7. Use Agent mode and tools

---

## Detailed Steps

### 1. Accessing GitHub Copilot Chat

Before using Copilot Chat, ensure you have completed Step 1 (GitHub Copilot extension installed and signed in).

1-1. **Click the Copilot Chat icon** in the VS Code sidebar (looks like the Copilot logo)

   - Alternatively: Press `Ctrl+Shift+I` (Windows/Linux) or `Cmd+Shift+I` (macOS)

1-2. **Verify the chat panel is open**

   - You should see a chat interface with a text input box at the bottom
   - The placeholder text might say "Ask me anything…"
   - A mode dropdown should be visible (likely defaulting to "Ask" or "Chat")

### 2. Asking Questions in Chat (Ask Mode)

By default, Copilot Chat opens in **Ask mode** for interactive Q&A without modifying your code directly.

2-1. **(Optional) Select code** in your editor that you want to discuss

2-2. **Type your question** in the Copilot Chat input box

   Example questions:
   - `What does this function do and how could I improve it?`
   - `How do I merge two sorted lists in Python?`
   - `Explain what this error message means`

2-3. **Press Enter** to send your question

2-4. **Read the response** from Copilot

   - Copilot will explain the code's functionality
   - It may suggest improvements or best practices
   - It provides answers based on open files and project context

> **Tip**: Ask mode only reads your code and provides suggestions; it won't automatically change files.

### 3. Using Slash Commands (/)

Slash commands are quick shortcuts for common tasks. Type `/` in the chat input to see available commands.

**Common slash commands:**
- `/list` – Lists available tools
- `/explain` – Explains selected code or error messages
- `/fix` – Proposes a fix for selected code problems
- `/clear` – Starts a new chat session (clears context)
- ...

**How to use:**

3-1. **(Optional) Select relevant text** in the editor

3-2. **Type `/` followed by the command** (e.g., `/help`)

   - Pick from the suggestions that appear after typing `/`

3-3. **Press Enter** to execute the command

   - For `/help`: Copilot lists available commands

> **Note**: Slash commands save time by eliminating the need for full natural language questions.

### 4. Using Chat Participants (@)

Chat participants are specialized assistants for specific domains. Type `@` to bring expertise into the conversation.

**Useful @ participants:**

- `@workspace` – Expert on your current project's codebase
  - Example: `@workspace summarize the purpose of this project`
  
- `@vscode` – Expert on Visual Studio Code settings and commands
  - Example: `@vscode change the font size bigger`
  
- `@terminal` – Familiar with shell commands and terminal operations
  - Example: `@terminal search for "HVE" under the current directory`
  
- `@azure` – Cloud-specific participants (if enabled)
  - Example: `@azure how many resource groups do I have now?`

**How to use:**

4-1. **Type `@`** in the chat input

   - A drop-down list of available participants appears

4-2. **Select a participant** (or continue typing to filter)

   Example: `@workspace`

4-3. **Type your query** after the participant name

   Example: `@workspace find any TODO comments in the project`

4-4. **Press Enter**

   - The response uses that participant's specialized knowledge

> **Tip**: Using @participants tells Copilot which context to emphasize for more accurate answers.

### 5. Using Chat Variables (#)

Chat variables inject specific context into your prompts. Type `#` to see available variables.

**Common # variables:**

- `#file` – Inserts current file content
- `#selection` – Inserts currently selected text
- `#function`, `#class`, `#line` – Inserts code under cursor
- `#block` – Inserts current code block
- `#terminal` – Refers to terminal output

**How to use:**

5-1. **Type `#`** in the chat box

   - Suggestions appear similar to slash and @ commands

5-2. **Choose the appropriate context variable**

   Example: `Rewrite the following function with better names: #selection`

5-3. **Press Enter**

   - Copilot replaces `#selection` with actual selected code
   - No need to manually copy/paste code

> **Tip**: Combine special prefixes for powerful queries:
> - `/explain` (slash command) for quick actions
> - `@terminal` (participant) for domain expertise  
> - `#selection` (variable) for precise context

### 6. Switching Between AI Models

Copilot Chat allows you to switch between different AI models (e.g., GPT-3.5, GPT-4) for different needs.

**Why switch models?**

- Smaller models: Faster responses, less detail
- Larger models (GPT-4): More accurate, elaborate answers (may be slower)

**How to switch:**

6-1. **Locate the model selector** in the Copilot Chat panel

   - Usually a drop-down menu near the top showing current model (e.g., "GPT-4")

6-2. **Click the model name/drop-down**

   - A list of available models appears (GPT-4, GPT-3.5, Claude, etc.)

6-3. **Select the model** you want to use

   - Subsequent responses will use the selected model

> **Note**: Model availability depends on your Copilot subscription (Individual vs. Business) and organizational settings.

### 7. Using Agent Mode (and Tools)

Agent mode is Copilot's most powerful feature, allowing it to perform multi-step actions autonomously.

**What is Agent mode?**

- **Ask mode**: Provides suggestions and explanations only
- **Agent mode**: Can edit files, run commands, and iterate automatically

**How to enable Agent mode:**

7-1. **Locate the mode dropdown** in Copilot Chat panel (default: "Ask")

7-2. **Click and select "Agent"** mode

   - UI may change to indicate Agent mode is active

**What Agent mode does:**

- Analyzes your request and plans steps
- Opens/reads multiple files in your project
- Writes or modifies code automatically
- Runs tests or terminal commands
- Shows progress in the chat

**Example request in Agent mode:**

```
Create a Python calculator app with add, subtract, multiply, and divide functions under `calculator_app` folder. Add unit tests and run them to verify everything works.
```

**Agent mode will:**

- Create the project folder structure
- Create `calculator.py` with the four math functions
- Create `test_calculator.py` with unit tests
- Run the tests automatically using pytest
- Show test results in the chat
- Fix any errors if tests fail and re-run them

**Managing Tools in Agent Mode:**

7-3. **Click "Tools" or "Manage Tools"** button (visible in Agent mode)

   - See available tools: Read File, Write File, Terminal, Test Runner, etc.

7-4. **Toggle tools on/off** as needed

   - Disable Terminal tool if you don't want Copilot running commands
   - Disable Write File for read-only mode

7-5. **Review and approve actions**

   - Copilot asks for confirmation before destructive actions
   - Example: `"I will run npm run test. Proceed? (y/n)"`
   - Review diffs before applying file changes

**Try Agent mode with simple tasks:**

- `Create a new Python file that prints 'Hello World'`
- `Refactor this function to use better variable names`

7-6. **Switch back to Ask mode** when done

   - Click the mode dropdown and select "Ask" or "Edit"

> **Important**: Agent mode is powerful but can be unpredictable. Start with small tasks and always review proposed changes before approving them.

---

### Summary

You've mastered GitHub Copilot Chat! You can now use slash commands (`/`), chat participants (`@`), and variables (`#`) to get context-aware help, switch AI models for different needs, and leverage Agent mode for automated tasks.

### Next

Proceed to [Step 3: Customizing GitHub Copilot](./step-3-chat-customization.md) to create custom instructions and chat modes for your project.
