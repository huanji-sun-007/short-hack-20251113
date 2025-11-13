```instructions
---
applyTo: "**"
---

Refer to /.github/engineering-fundamentals.md for secure coding, observability, testing, and code quality requirements that must be followed in all implementations.

# Product Backlog Item (PBI) Implementation Guidelines
- Document PBI details in `.copilot-tracking/pbi/` with a file named after the PBI ID (e.g., `pbi-1234.md`).
- Each PBI must have a corresponding plan document in `.copilot-tracking/plans/` with the same ID (e.g., `plan-1234.md`).
- When asked to create a PBI, lookup the issue in Github Issues based on the ID provided in the prompt.
- After creating a PBI, DO NOT create any further documents or files until instructed.

# Planning and Research Context
- Always refer to the plan document in `.copilot-tracking/plans/` for the current PBI to understand the implementation phases and tasks.
- Consult the research file in `.copilot-tracking/research/` related to the current PBI for relevant findings about project structure and patterns.
- Follow the task sequence and success criteria defined in the plan document.
- Update plan task completion status as work progresses.

# Implementation Process
- Always create a project folder with an appropriate name first if the folder does not exist yet (e.g., `fruit_price_api/`, `my_service/`). All source code should be organized under this project folder.
- Follow the project's established patterns using Python (pytest) for backend and TypeScript/Node.js for frontend components.
- All coding and execution must follow the defined plan phases and task sequence.
- All coding phases in the plan must have a task for creating and running tests.
- As each task is completed:
  - Update the plan file.
  - Mark the corresponding task as complete.
  - Tests must pass before marking any task that involves testing as complete.
- No task should be skipped or reordered unless justified in an ADR and reflected in the plan.
- Do not ignore Build warnings or errors; they must be addressed before proceeding.

# Architecture Design Records (ADR)
- ADR should be created in docs/adr/ for any significant architectural decisions made during the implementation.
- If a PBI requires an ADR, it must be created before any implementation work begins.
- ADRs must be stored in the `/docs/adr/` directory of the project.
- ADR filenames should follow the format: adr-###-title.md (e.g., adr-001-initial-architecture.md).
- Use the following template for ADRs:
  - Title
  - Status (Proposed, Accepted, Deprecated, Superseded)
  - Context
  - Decision
  - Consequences
- ADRs must be referenced in the related plan document.
- Each significant architectural or technical decision requires an ADR.
```
