---
description: Enforce development workflow standards, including commit messages, documentation, and task tracking.
globs:
  - "**/*"
alwaysApply: true
---

# Development Workflow Rules

## 1. Documentation
- **Specs First**: Update `docs/アプリ仕様書.md` or `技術選定.md` before significant changes.
- **Task Tracking**: Maintain `task.md` within the brain directory to track current progress and next steps.
- **Inline Comments**: Document "why" rather than "what" for complex logic.

## 2. Git Standards
- **Commit Messages**: Use Conventional Commits (e.g., `feat:`, `fix:`, `docs:`, `chore:`).
- **Japanese Descriptions**: In this project, use Japanese for commit descriptions if requested, else default to English.

## 3. Task Management
- **Atomic Changes**: Keep PRs/Commits focused on a single task or fix.
- **Verification**: Always run existing tests and add new ones before finishing a task.

## 4. AI Interaction
- **Plan Review**: Always get approval on `implementation_plan.md` for non-trivial changes.
- **Walkthrough**: Provide a `walkthrough.md` after completion to summarize changes and test results.
