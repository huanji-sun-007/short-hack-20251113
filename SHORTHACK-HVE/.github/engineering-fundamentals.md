# Engineering Fundamentals

This document outlines the core engineering practices, standards, and requirements that must be followed in all implementations within this project.

## Code Quality Standards

### Code Formatting and Linting
- **Python**: Use `black` for code formatting with default settings
- **Linting**: Use `flake8` for linting with `pylint` for additional checks
- **Import Sorting**: Use `isort` to maintain consistent import ordering
- **Type Checking**: Use `mypy` for static type checking
- All code must pass linting checks before commit
- Configure pre-commit hooks to enforce formatting standards

### Code Review Requirements
- All code changes must be reviewed before merging
- Code must pass all automated quality checks
- No build warnings or errors are acceptable
- Documentation must be updated for any API or architectural changes

## Testing Standards

### Test Coverage Requirements
- **Minimum Coverage**: 100% code coverage required for all Python modules
- Use `pytest-cov` to measure and enforce coverage
- Coverage reports must be generated for every PR
- No code may be merged with coverage below 100%

### Test Execution
- **Framework**: Use `pytest` as the primary testing framework
- All tests must pass before merging
- Run tests using: `pytest tests/ -v --cov=src --cov-report=html --cov-report=term`
- Tests should run in CI/CD pipeline on every commit

### Test Structure
- Place all tests in the `tests/` directory
- Mirror the source code structure in test directory
- Use `conftest.py` for shared fixtures
- Follow naming convention: `test_*.py` for test files
- Test functions must start with `test_`
- Use descriptive test names that explain what is being tested
- Implement unit tests, integration tests, and API endpoint tests

## Security Requirements

### Dependency Management
- **Package Management**: Use `requirements.txt` for production dependencies
- Maintain separate `requirements-dev.txt` for development dependencies
- Pin all package versions for reproducible builds
- Use `pip-audit` to scan for known vulnerabilities
- Regularly update dependencies and review security advisories
- Use virtual environments for isolated dependency management

### Environment Configuration
- Use environment variables for configuration, never hardcode secrets
- Follow the principle of least privilege for all service accounts
- Validate all inputs and sanitize outputs

### Access Control
- Implement proper authentication and authorization
- Use role-based access control where applicable
- Log security-relevant events

## Observability Standards

### Logging
- Use structured logging with appropriate log levels
- Include correlation IDs for request tracing
- Log errors with sufficient context for debugging

### Monitoring
- Implement health checks for all services
- Monitor key performance indicators (KPIs)
- Set up alerts for critical failures and performance degradation

### Documentation
- Maintain up-to-date API documentation (OpenAPI/Swagger)
- Document architectural decisions in ADRs
- Keep README files current with setup and usage instructions

## Development Workflow

### Branch Management
- Follow branch naming conventions as defined in `docs/team_process/branch_naming.md`
- Use feature branches for all development work
- Merge only after code review and all checks pass

### Build and Deployment
- **Docker**: Use provided Dockerfiles for consistent environments
- **Make**: Use Makefiles for common development tasks
- **CI/CD**: All builds must be reproducible and automated

### Project Structure
```
<project-name>/
├── src/                    # Source code
│   ├── api/               # Flask API routes
│   ├── models/            # Data models
│   ├── services/          # Business logic
│   └── utils/             # Utility functions
├── tests/                 # Test files (mirrors src/ structure)
├── infra/                 # Terraform infrastructure code
├── requirements.txt       # Production dependencies
├── requirements-dev.txt   # Development dependencies
├── .flake8               # Flake8 configuration
├── pyproject.toml        # Black and other tool configs
└── pytest.ini            # Pytest configuration
```

## Technology Stack Standards

### Backend
- **Framework**: Flask for API development
- **Python Version**: Python 3.13 or higher
- **API Design**: Follow RESTful principles
- **Request Validation**: Use `flask-pydantic` or similar for request/response validation
- **Error Handling**: Implement consistent error response format with proper HTTP status codes
- **Blueprints**: Organize Flask routes using blueprints for modularity
- **Configuration**: Use Flask's config system with environment-based settings
- **Logging**: Use Python's `logging` module with structured logging

### Infrastructure
- **IaC Tool**: Terraform for all infrastructure provisioning
- **Terraform Version**: Use Terraform 1.0 or higher
- **State Management**: Store Terraform state locally
- **Module Structure**: Organize Terraform code in reusable modules
- **Variable Management**: Use `.tfvars` files for environment-specific configurations
- **Security**: Never commit `.tfvars` files with sensitive data; use secret management services
- **Documentation**: Include README in `infra/` directory explaining module usage and variables

## Documentation Requirements

### Code Documentation
- Document public APIs with clear examples
- Include inline comments for complex business logic
- Maintain changelog for breaking changes

### Architecture Documentation
- Create ADRs for significant architectural decisions
- Document system architecture and component interactions
- Keep deployment and operational guides current

## Compliance and Standards

### Coding Compliance
- Follow PEP 8 style guide for Python code
- Use type hints for function signatures and class attributes
- Maximum line length: 88 characters (Black default)
- Write docstrings for all public modules, functions, classes, and methods (NumPy style)
- Maintain code complexity at acceptable levels (cyclomatic complexity < 10)

### Code Standards
- Write self-documenting code with clear naming conventions
- Follow language-specific best practices and idioms
- Implement proper error handling and recovery mechanisms

## Performance Requirements

### Response Times
- API endpoints should respond within acceptable time limits
- Implement appropriate caching strategies
- Monitor and optimize database queries

### Resource Usage
- Optimize memory and CPU usage
- Implement proper resource cleanup
- Use connection pooling and other efficiency patterns

This document serves as the foundation for all engineering practices within this project and should be referenced for any implementation work.
