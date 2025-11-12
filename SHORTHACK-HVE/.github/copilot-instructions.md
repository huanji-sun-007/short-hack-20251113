---
applyTo: "**"
---

# GitHub Copilot Instructions - HVE Hands-On Lab

## Project Purpose

This is a **hands-on training repository** for learning GitHub Copilot and Hypervelocity Engineering practices. The focus is on understanding how to maximize AI-assisted development productivity.

## Code Style

- Always add comments to explain complex logic
- Use descriptive variable names
- Follow language-specific style guides (PEP 8 for Python, etc.)
- Write meaningful commit messages

## Documentation

- Add docstrings to all functions and classes
- Include examples in docstrings when helpful
- Keep README files up to date

## Python Guidelines

- Use type hints for function parameters and return values
- Prefer list comprehensions over loops when appropriate
- Use f-strings for string formatting
- Add docstrings with Args, Returns, and Example sections

## JavaScript/TypeScript Guidelines

- Use `const` by default, `let` only when reassignment is needed
- Prefer arrow functions for callbacks
- Use async/await instead of promise chains
- Add JSDoc comments for functions

---
applyTo: "tests/**"
---

# Testing Guidelines

- Use pytest for Python tests
- Use Jest/Vitest for JavaScript/TypeScript tests
- Name test files with `test_` prefix or `.test.` extension
- Use descriptive test function names
- Include both positive and negative test cases
- Aim for high code coverage

---
applyTo: "docs/**"
---

# Documentation Guidelines

- Use clear, concise language
- Include code examples where appropriate
- Keep documentation synchronized with code changes
- Use proper markdown formatting
- Add diagrams for complex concepts
