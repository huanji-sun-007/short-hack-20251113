## Step 3: Customizing GitHub Copilot

### Overview
In Step 3, we'll learn how to customize GitHub Copilot's behavior. You'll discover how to create custom instructions for your project and set up reusable chat modes for specialized assistance. Target time: 10–20 minutes.

### Prerequisites
Make sure you have completed:

- **Step 1** (GitHub Copilot installed and signed in)
- **Step 2** (Familiar with Copilot Chat basics)
- **VS Code basics** (opening files, editing code, creating folders)

### What You'll Learn
By the end of this step, you'll know how to:

- Create custom instruction files for your project
- Write effective instructions for Copilot
- Create reusable chat modes for specific tasks
- Switch between different chat modes

### Quick Flow
1. Create custom instructions file
2. Write and test instructions
3. Create custom chat modes
4. Test and use chat modes

---

## Detailed Steps

### 1. Understanding Custom Instructions

GitHub Copilot can read custom instructions from a special file in your project. These instructions help Copilot understand:
- Your coding style and preferences
- Project-specific conventions
- Rules to follow when generating code
- Documentation requirements

The instructions file is named `copilot-instructions.md` and lives in the `.github` folder of your project.

### 2. Creating the Instructions File

2-1. **Create the `.github` folder** (if it doesn't exist)

   - In VS Code Explorer, right-click on your project root
   - Select "New Folder"
   - Name it `.github`

2-2. **Create the instructions file**

   - Right-click on the `.github` folder
   - Select "New File"
   - Name it `copilot-instructions.md`

   Your file path should be: `.github/copilot-instructions.md`

### 3. Writing Simple Custom Instructions

Now let's add some basic instructions to guide Copilot's behavior.

3-1. **Add the frontmatter header**

   At the top of `copilot-instructions.md`, add:
   ```markdown
   ---
   applyTo: "**"
   ---
   ```

   - The `applyTo: "**"` means these instructions apply to all files in the project
   - You can also specify specific file patterns like `"*.py"` for Python files only

3-2. **Write your first instruction**

   Below the frontmatter, add a simple instruction:
   ```markdown
   # Project Coding Guidelines

   ## Code Style
   - Always add comments to explain complex logic
   - Use descriptive variable names
   - Follow PEP 8 style guide for Python code
   - Use meaningful commit messages

   ## Documentation
   - Add docstrings to all functions and classes
   - Include examples in docstrings when helpful
   ```

   Feel free to customize these based on your preferences!

3-3. **Add language-specific instructions** (optional)

   You can add instructions for specific programming languages:
   ```markdown
   ## Python Guidelines
   - Use type hints for function parameters and return values
   - Prefer list comprehensions over loops when appropriate
   - Use f-strings for string formatting

   ## JavaScript/TypeScript Guidelines
   - Use `const` by default, `let` only when reassignment is needed
   - Prefer arrow functions for callbacks
   - Use async/await instead of promise chains
   ```

3-4. **Save the file**

   - Press `Ctrl+S` (Windows/Linux) or `Cmd+S` (macOS)
   - Copilot will automatically detect and use these instructions

### 4. Testing Your Custom Instructions

Let's verify that Copilot is following your custom instructions.

4-1. **Create a new Python file**

   - Create a file named `test_example.py`
   - Start typing a function:
   ```python
   def calculate
   ```

4-2. **Observe Copilot's suggestions**

   - Copilot should now suggest code that follows your instructions
   - Look for: type hints, docstrings, descriptive names, comments

4-3. **Test with Copilot Chat**

   - Open Copilot Chat (`Ctrl+Shift+I` or `Cmd+Shift+I`)
   - Ask: "Create a function to add two numbers"
   - Copilot should generate code following your custom instructions

4-4. **Verify the output**

   Expected result (based on the example instructions above):
   ```python
   def add_numbers(a: int, b: int) -> int:
       """
       Add two numbers together.
       
       Args:
           a: The first number
           b: The second number
           
       Returns:
           The sum of a and b
           
       Example:
           >>> add_numbers(2, 3)
           5
       """
       return a + b
   ```

   Notice:
   - Type hints (`int`)
   - Docstring with description, args, returns, and example
   - Descriptive parameter names

### 5. Advanced: Scoped Instructions

You can create different instructions for different parts of your project.

5-1. **Create scoped instruction sections**

   Add to your `copilot-instructions.md`:
   ```markdown
   ---
   applyTo: "tests/**"
   ---

   # Testing Guidelines
   - Use pytest for all tests
   - Name test files with `test_` prefix
   - Use descriptive test function names
   - Include both positive and negative test cases
   ```

5-2. **Multiple scope blocks**

   You can have multiple `---` sections in the same file:
   ```markdown
   ---
   applyTo: "**"
   ---
   # General guidelines for all files

   ---
   applyTo: "*.py"
   ---
   # Python-specific guidelines

   ---
   applyTo: "docs/**"
   ---
   # Documentation-specific guidelines
   ```

### 6. Best Practices for Custom Instructions

**Keep it simple:**
- Start with 3-5 basic rules
- Add more instructions as needed
- Be specific and clear

**Be consistent:**
- Align instructions with your team's coding standards
- Update instructions when standards change

**Test regularly:**
- Verify Copilot follows your instructions
- Adjust wording if Copilot misinterprets rules

**Common instruction topics:**
- Code style and formatting
- Naming conventions
- Documentation requirements
- Error handling patterns
- Testing approaches
- Security considerations

### 7. Creating Custom Chat Modes

Chat modes are reusable personas for Copilot Chat. Unlike custom instructions (which affect code generation), chat modes control how Copilot Chat responds to your questions.

7-1. **Open chat modes configuration**

   - Open the Copilot Chat panel
   - Click on the settings icon (usually represented by a gear)
   - Navigate to the "Modes" section in the dropdown menu

7-2. **Create a new mode**

   - Click "Add New Mode" 
   - Choose a path
   - Input a name

7-3. **Name and describe the mode**

   VS Code opens a Markdown file with a template:
   ```markdown
   ---
   name: 
   description: 
   ---

   # New Mode
   ```

   Fill in the details:
   - **Name**: `Code Reviewer`
   - **Description**: `Provides code review feedback instead of direct answers`

7-4. **Define the mode's instructions**

   Below the header, add your instructions:
   ```markdown
   You are a strict code review assistant. When the user provides code, analyze it and respond with constructive feedback on style, correctness, and best practices.
   
   - Point out any potential bugs or inefficiencies
   - Suggest improvements, but DO NOT rewrite the code unless asked
   - Use bullet points for each issue
   ```

   - Write in plain, clear language
   - Be specific about the behavior you want

7-5. **Save the mode file**

   - Press `Ctrl+S` (Windows/Linux) or `Cmd+S` (macOS)
   - VS Code registers the new chat mode
   - It now appears in the mode selector dropdown

### 8. Testing Your Custom Chat Mode

8-1. **Activate the new mode**

   - In the Copilot Chat panel, find the mode selector
   - Switch to your chat mode (e.g., `Code Reviewer`)

8-2. **Provide sample code for review**

   Example code:
   ```python
   # Sample code to review
   def add_numbers(a, b):
       result = a + b
       print("The result is", result)
       return result
   ```

   - Paste this into the chat input
   - Send it as a code block

8-3. **Ask for a review**

   Type: `Please review the code above for any issues or improvements.`

8-4. **Observe the code review response**

   Copilot should respond as a reviewer, for example:
   - Points out unnecessary `print()` statement in a library function
   - Suggests adding a docstring
   - Recommends type hints or input validation
   - Notes missing edge case handling

8-5. **Test with additional queries**

   While in Code Reviewer mode:
   - Paste different code snippets
   - Ask "What could be improved?"
   - Compare with responses in normal "Ask" mode

> **Tip**: Switch between modes to see different response styles. Your custom modes are saved and available anytime.

---

### Summary

You've mastered GitHub Copilot customization! You can now create custom instructions in `.github/copilot-instructions.md` to guide code generation, and set up reusable chat modes for specialized assistance in Copilot Chat.

### Next

Continue exploring GitHub Copilot features and experiment with different instruction patterns and chat modes to find what works best for your projects!
