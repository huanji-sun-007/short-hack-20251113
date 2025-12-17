---
title: "ADR-0001: AI Framework Selection for Multi-Component Training Project"
status: "Proposed"
date: "2025-12-17"
authors: "Architecture Team, Training Workshop Contributors"
tags: ["architecture", "decision", "ai-framework", "azure", "python"]
supersedes: ""
superseded_by: ""
---

# ADR-0001: AI Framework Selection for Multi-Component Training Project

## Status

**Proposed**

## Context

This multi-component training repository contains several AI-focused workshops and hands-on labs designed to educate developers on building AI-powered applications and agents. The project currently includes:

1. **SHORTHACK-AGENT-FRAMEWORK**: A comprehensive training workshop focused on the Microsoft Agent Framework with Python labs covering Azure OpenAI integration, Azure AI Foundry, function tools, streaming, multimodal inputs, thread management, MCP integration, and workflow orchestration.

2. **SHORTHACK-AI-FOUNDRY**: An Azure AI Foundry workshop featuring Jupyter notebooks on authentication, environment setup, building AI applications, and multi-agent systems.

3. **SHORTHACK-MCP**: Model Context Protocol labs demonstrating integration with GitHub Copilot Chat, building custom MCP servers with FastMCP, and using MCP as a plugin in Semantic Kernel.

4. **SHORTHACK-HVE**: GitHub Copilot Hypervelocity Engineering hands-on labs for maximizing AI-assisted development productivity.

5. **SHORTHACK-BROWSER-EXTENSION**: Browser extension component for enhancing AI workflows.

The project faces several architectural challenges:

- **Fragmented AI frameworks**: Different components use varying approaches (Microsoft Agent Framework, Semantic Kernel, direct Azure OpenAI SDK calls)
- **Inconsistent patterns**: Training materials demonstrate multiple ways to accomplish similar tasks
- **Maintenance complexity**: Supporting multiple frameworks increases cognitive load and maintenance burden
- **Integration challenges**: Ensuring seamless interoperability between components requires additional abstraction layers
- **Learning curve**: Students must understand multiple frameworks to work across components
- **Azure ecosystem alignment**: Need for tight integration with Azure AI services (Azure OpenAI, Azure AI Foundry)
- **Enterprise requirements**: Production-grade features including error handling, authentication, observability, and scalability
- **MCP protocol support**: Requirement to demonstrate Model Context Protocol integration patterns
- **Multi-agent orchestration**: Need for complex workflow and agent coordination capabilities

### Technical Constraints

- **Language**: Python 3.11+ as the primary development language
- **Cloud Platform**: Azure as the exclusive cloud provider (Azure OpenAI, Azure AI Foundry)
- **Authentication**: Azure CLI and Azure Identity SDK for credential management
- **Development Environment**: VS Code with Dev Containers for consistent environments
- **Model Context Protocol**: Must support MCP integration via stdio and HTTP transports
- **Training Focus**: Code must be educational, demonstrative, and well-documented

### Business Requirements

- **Educational Excellence**: Framework must facilitate clear, progressive learning paths
- **Production Readiness**: Demonstrate enterprise-grade patterns and best practices
- **Community Support**: Strong documentation, active maintenance, and community resources
- **Azure Integration**: Native support for Azure services without extensive custom code
- **Scalability**: Support for both simple demos and complex multi-agent systems
- **Maintainability**: Reduce long-term maintenance burden through standardization

## Decision

We will standardize on the **Microsoft Agent Framework** as the primary AI framework for this training project across all components where agent-based patterns are applicable.

### Rationale

1. **Azure-First Design**: The Microsoft Agent Framework is purpose-built for Azure AI services with native support for Azure OpenAI and Azure AI Foundry, eliminating integration complexity.

2. **Comprehensive Feature Set**: Provides built-in support for all required capabilities including function tools, streaming, multimodal inputs, thread management, code interpreter, file search, and workflow orchestration.

3. **Educational Clarity**: The framework's high-level abstractions and clean API design make it ideal for training materials, allowing students to focus on concepts rather than implementation details.

4. **MCP Integration**: Demonstrated support for Model Context Protocol via stdio and HTTP transports, enabling seamless integration with external tools and services.

5. **Multi-Agent Workflows**: Native support for sequential and concurrent agent orchestration patterns through WorkflowBuilder, SequentialBuilder, and ConcurrentBuilder abstractions.

6. **Enterprise Readiness**: Built-in support for Azure authentication, error handling, observability, and deployment patterns that align with production requirements.

7. **Active Development**: As a Microsoft-maintained project, it receives regular updates, security patches, and feature enhancements aligned with Azure AI roadmap.

8. **Consistency**: Adopting a single framework across all components reduces fragmentation, simplifies maintenance, and creates a cohesive learning experience.

9. **Community and Documentation**: Backed by Microsoft with comprehensive documentation, samples, and enterprise support channels.

10. **Future-Proof**: Aligned with Microsoft's strategic direction for AI agent development on Azure.

### Implementation Approach

- **Primary Use**: Microsoft Agent Framework for all agent-based training modules
- **Complementary Tools**: Azure AI Foundry SDK for infrastructure and project management
- **Protocol Support**: FastMCP for building custom MCP servers
- **Alternative Patterns**: Direct Azure OpenAI SDK calls only when demonstrating low-level concepts or framework limitations

## Consequences

### Positive

- **POS-001**: **Unified Learning Path** - Students learn one comprehensive framework instead of multiple competing approaches, reducing cognitive load and accelerating mastery.

- **POS-002**: **Reduced Maintenance Burden** - Standardization on a single framework decreases code complexity, eliminates duplicate implementations, and simplifies dependency management across all components.

- **POS-003**: **Seamless Azure Integration** - Native Azure support eliminates custom integration code, reduces authentication complexity, and ensures compatibility with Azure AI service updates.

- **POS-004**: **Enterprise-Grade Patterns** - Built-in support for production requirements (error handling, observability, authentication) teaches students industry-standard practices from the beginning.

- **POS-005**: **Scalable Architecture** - Framework supports progression from simple single-agent demos to complex multi-agent workflows without architectural rewrites, enabling incremental learning.

- **POS-006**: **MCP Ecosystem Alignment** - First-class MCP support enables integration with a growing ecosystem of external tools and services, future-proofing the training content.

- **POS-007**: **Consistent Documentation** - Single framework reduces documentation fragmentation, making it easier to maintain comprehensive guides and troubleshoot issues.

- **POS-008**: **Improved Collaboration** - Team members can more easily contribute across different components when using consistent patterns and abstractions.

### Negative

- **NEG-001**: **Framework Lock-In** - Tight coupling to Microsoft Agent Framework creates dependency on Microsoft's roadmap and support lifecycle, limiting flexibility to adopt alternative approaches.

- **NEG-002**: **Abstraction Overhead** - High-level abstractions may obscure underlying concepts for students who need deep understanding of LLM interaction patterns and API mechanics.

- **NEG-003**: **Limited Portability** - Azure-centric design makes it difficult to demonstrate multi-cloud patterns or migrate to other platforms (AWS, GCP), restricting use cases.

- **NEG-004**: **Framework Maturity Risk** - As a relatively new framework, it may undergo breaking changes, lack certain features, or have undiscovered bugs that impact training reliability.

- **NEG-005**: **Migration Effort** - Existing components using Semantic Kernel or direct SDK calls require refactoring to align with the new standard, consuming development time and resources.

- **NEG-006**: **Learning Curve Prerequisites** - Students must learn framework-specific concepts and patterns before understanding general AI agent principles, potentially limiting transferability to other frameworks.

- **NEG-007**: **Community Size** - Smaller community compared to more established frameworks may result in fewer third-party resources, plugins, and community support for troubleshooting.

- **NEG-008**: **Debugging Complexity** - Additional abstraction layers can make debugging more difficult when issues occur deep in the framework or Azure service integration.

## Alternatives Considered

### Semantic Kernel

- **ALT-001**: **Description**: Microsoft's open-source SDK for integrating LLMs with conventional programming languages, supporting multiple AI services and providers with a plugin-based architecture.

- **ALT-002**: **Rejection Reason**: While mature and well-documented, Semantic Kernel focuses on lower-level LLM integration rather than high-level agent abstractions. It requires significantly more boilerplate code to achieve similar functionality, making it less suitable for educational content where clarity and simplicity are priorities. The framework's multi-cloud approach, while valuable for portability, introduces unnecessary complexity for an Azure-focused training program.

### LangChain

- **ALT-003**: **Description**: Popular open-source framework for building LLM applications with extensive community support, providing chains, agents, and memory abstractions across multiple LLM providers.

- **ALT-004**: **Rejection Reason**: LangChain's Python implementation is extensive and feature-rich but suffers from high complexity, frequent breaking changes, and inconsistent API design. Its provider-agnostic approach requires custom integration code for Azure services, undermining the Azure-first educational goal. Additionally, the framework's rapid evolution makes it challenging to maintain stable training materials, and its abstractions can obscure rather than clarify core concepts for learners.

### Direct Azure OpenAI SDK

- **ALT-005**: **Description**: Using the Azure OpenAI Python SDK directly without additional framework abstractions, providing low-level control over API interactions, request/response handling, and error management.

- **ALT-006**: **Rejection Reason**: While direct SDK usage offers maximum flexibility and transparency, it requires extensive boilerplate code for common patterns like function calling, conversation management, streaming, and agent orchestration. This approach shifts focus from AI concepts to implementation mechanics, increases code duplication across components, and fails to demonstrate enterprise-grade patterns that production applications require. For training materials, the lack of higher-level abstractions creates unnecessary cognitive load.

### AutoGen

- **ALT-007**: **Description**: Microsoft Research's multi-agent conversation framework enabling complex agent interactions with built-in conversation patterns, code execution, and human-in-the-loop capabilities.

- **ALT-008**: **Rejection Reason**: AutoGen excels at research-oriented multi-agent scenarios but lacks the production-grade infrastructure integration and Azure service alignment needed for enterprise training. Its focus on autonomous agent conversations rather than deterministic workflows makes it less suitable for teaching controlled, predictable agent patterns. The framework's research-oriented design and limited Azure AI Foundry integration create friction for students learning production deployment practices.

### Haystack

- **ALT-009**: **Description**: Open-source NLP framework focused on building search and question-answering systems with retrieval-augmented generation (RAG) pipelines and document processing capabilities.

- **ALT-010**: **Rejection Reason**: Haystack's strength lies in RAG and document processing pipelines rather than general-purpose agent development. Its architecture is optimized for search use cases, making it overly specialized for a broad AI training curriculum. The framework's limited native support for Azure services and agent orchestration patterns makes it unsuitable as a comprehensive foundation for this multi-component project.

## Implementation Notes

### Migration Strategy

- **IMP-001**: **Phased Rollout** - Migrate components to Microsoft Agent Framework incrementally, starting with SHORTHACK-AGENT-FRAMEWORK (already aligned), followed by SHORTHACK-AI-FOUNDRY and SHORTHACK-MCP. Maintain backward compatibility during transition periods to avoid disrupting active training sessions.

- **IMP-002**: **Documentation Updates** - Create comprehensive migration guides documenting framework-specific patterns, common pitfalls, and best practices. Update all README files, inline code comments, and workshop materials to reflect the standardized approach.

- **IMP-003**: **Training Module Alignment** - Restructure lab exercises to follow a progressive learning path: basic agent creation → function tools → streaming → multimodal → thread management → MCP integration → workflow orchestration. Ensure each module builds on previous concepts.

- **IMP-004**: **Code Quality Standards** - Establish coding standards specific to Microsoft Agent Framework usage including error handling patterns, authentication practices, logging conventions, and testing approaches. Implement linting rules and CI checks to enforce consistency.

- **IMP-005**: **Dependency Management** - Pin Microsoft Agent Framework and related Azure SDK versions in requirements.txt to ensure reproducible environments. Document version upgrade procedures and breaking change handling strategies.

### Monitoring and Success Criteria

- **IMP-006**: **Developer Feedback** - Collect feedback from workshop participants regarding framework learnability, documentation clarity, and exercise effectiveness. Adjust materials based on common pain points and questions.

- **IMP-007**: **Code Maintainability Metrics** - Track code duplication rates, average lines of code per feature, and time required for common modifications. Success criteria: 30% reduction in boilerplate code and 50% reduction in framework-related maintenance issues.

- **IMP-008**: **Integration Reliability** - Monitor Azure service integration success rates, authentication failures, and API error patterns. Establish alerting for framework-specific issues affecting student environments.

- **IMP-009**: **Learning Outcomes** - Measure student comprehension through exercise completion rates, time-to-completion metrics, and post-workshop assessments. Target: 90% of students successfully complete all exercises without framework-related blockers.

- **IMP-010**: **Framework Updates** - Establish quarterly review cycles to assess Microsoft Agent Framework updates, evaluate breaking changes, and plan migration strategies. Maintain a framework changelog tracking version updates and their impact on training materials.

### Rollback Plan

- **IMP-011**: **Version Control Strategy** - Maintain separate branches for legacy framework implementations during migration period. If critical issues emerge with Microsoft Agent Framework, rollback to previous stable versions is possible within 1 sprint cycle.

- **IMP-012**: **Alternative Framework Readiness** - Document procedures for migrating to Semantic Kernel as a fallback option if Microsoft Agent Framework proves unsuitable. Maintain evaluation criteria for triggering alternative framework consideration.

## References

- **REF-001**: [Microsoft Agent Framework GitHub Repository](https://github.com/microsoft/agent-framework) - Official framework source code and documentation

- **REF-002**: [Microsoft Agent Framework Documentation](https://learn.microsoft.com/en-us/agent-framework/) - Official Microsoft Learn documentation

- **REF-003**: [Azure AI Foundry Documentation](https://learn.microsoft.com/en-us/azure/ai-foundry/) - Azure AI platform documentation

- **REF-004**: [Azure OpenAI Service Documentation](https://learn.microsoft.com/en-us/azure/ai-services/openai/) - Azure OpenAI service reference

- **REF-005**: [Model Context Protocol Specification](https://modelcontextprotocol.io/) - MCP protocol specification and guidelines

- **REF-006**: [FastMCP Documentation](https://gofastmcp.com/) - FastMCP framework for building MCP servers

- **REF-007**: [Semantic Kernel Documentation](https://learn.microsoft.com/en-us/semantic-kernel/) - Alternative framework for reference

- **REF-008**: Internal repository documentation at `/SHORTHACK-AGENT-FRAMEWORK/README.md` - Current implementation reference

- **REF-009**: Internal repository documentation at `/SHORTHACK-AI-FOUNDRY/README.md` - AI Foundry workshop reference

- **REF-010**: Internal repository documentation at `/SHORTHACK-MCP/README.md` - MCP integration patterns reference

---

**Document Metadata**
- Version: 1.0
- Last Updated: 2025-12-17
- Next Review Date: 2026-03-17
- Reviewers: Architecture Team, Training Workshop Contributors, Azure AI SMEs
