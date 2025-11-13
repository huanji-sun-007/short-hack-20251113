# Architecture Diagram Chat Mode Guide

This guide explains how to use the **Architecture Diagram** chat mode (`ArchDiagram.chatmode.md`) to generate accurate, environment‑specific Mermaid architecture diagrams directly from existing Terraform (IaC) code. It parallels the Planner guide style, but focuses on infrastructure visualization rather than implementation planning.

> Purpose: Turn real Terraform resources (modules, resources, data sources) into up‑to‑date diagrams with zero manual drawing.

## 🧭 Overview

Architecture Diagram mode analyzes Terraform (`.tf`) files and produces Mermaid diagrams (ELK layout) showing overall and layered infrastructure views (overview, networking, security, application, etc.). It performs change detection so diagrams are only regenerated when structural changes occur.

## ✅ Prerequisites

- Terraform code present in the repo (e.g. `infra/terraform/.../main.tf`)
- Clear environment path or module path (e.g. `infra/terraform/environment/dev/`)
- Existing diagrams (optional) in `docs/diagrams/` (will be compared if present)
- Basic understanding of your IaC folder layout

## 🔐 When to Use This Mode

Use Architecture Diagram chat mode when you want:
- First‑time generation of environment diagrams
- To update diagrams after infrastructure changes
- Focused views (networking/security/application layers)
- A quick validation that existing diagrams are still current (no change scenario)

Do NOT use it for creating Terraform code or planning features—that belongs to Planner or Agent modes.

## ⚡ Quick Start

1. Switch to Architecture Diagram chat mode
2. Provide path or target file: `Create arch diagram for #infra/terraform/environment/dev/main.tf`
3. The mode will:
	 - Discover related `.tf` files
	 - Detect existing diagram files
	 - Compare IaC vs documented state
	 - Generate/update diagrams if changes found
4. Review generated files in `docs/diagrams/`

Minimal command example:
```
Create arch diagram for #infra/terraform/environment/dev/main.tf
```

If focusing on a module:
```
Create arch diagram for #infra/terraform/modules/network/main.tf
```