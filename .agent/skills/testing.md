---
description: Enforce testing standards across the project, including unit tests, integration tests, edge cases, and structured test organization.
globs:
  - "**/*.test.{ts,tsx,js,jsx,py,go,java,rs}"
  - "**/*.spec.{ts,tsx,js,jsx,py,go,java,rs}"
  - "**/tests/**/*.{ts,tsx,js,jsx,py,go,java,rs}"
  - "**/test/**/*.{ts,tsx,js,jsx,py,go,java,rs}"
alwaysApply: false
---

# Testing Rules for AI Rewriting Tool

Testing is mandatory. Every critical behavior must be verified.

---

# 1. Testing Philosophy

Testing ensures system correctness and stability during changes.

Priorities:

1. Correctness
2. Reliability
3. Maintainability
4. Clear intent

Tests should be easy to read and understand.

---

# 2. Coverage Requirements

Tests must cover:

- business logic
- critical workflows
- edge cases
- error handling
- API behavior

Simple UI rendering or trivial code does not require exhaustive tests.

---

# 3. Types of Tests

### Unit Tests
- Test individual functions and domain logic
- Avoid external dependencies
- Mock external interactions

### Integration Tests
- Test module interactions
- Test API endpoints
- Include DB interactions if necessary

### End-to-End Tests (if applicable)
- Simulate real user workflows
- Test critical system paths

---

# 4. Unit Test Guidelines

- Test one behavior per test
- Run quickly
- Avoid network or DB calls
- Mock external dependencies

Example:

```
service → mocked repository
```

---

# 5. Test Structure

Follow Arrange → Act → Assert pattern.

Example:

```
Arrange: prepare inputs and mocks
Act: execute function
Assert: verify expected result
```

---

# 6. Naming Conventions

- Test names must clearly describe behavior

Good:

```
shouldCreateUserWhenInputIsValid
shouldRejectRequestWhenEmailIsInvalid
shouldReturn404WhenUserDoesNotExist
```

Bad:

```
test1
userTest
worksCorrectly
```

---

# 7. Edge Case Testing

Include edge cases:

- empty input
- null values
- invalid formats
- boundary values
- large datasets

Edge cases are often the source of bugs.

---

# 8. Error Handling Tests

Verify error paths:

- database failures
- API timeouts
- validation errors

Tests must confirm errors are correctly handled.

---

# 9. Test Isolation

- Tests must be independent
- Do not rely on execution order
- Do not share state
- Each test creates its own data

---

# 10. Test Data

- Keep test data minimal and explicit
- Avoid large unnecessary datasets or complex fixtures

---

# 11. Mocking

- Mock external dependencies as needed:
  - APIs
  - database repositories
  - file systems
  - third-party services

- Mock only necessary parts; avoid over-mocking

---

# 12. Maintainability

- Avoid duplicated test logic
- Use helper functions
- Keep tests short and focused
- Tests must not be harder to maintain than production code

---

# 13. Test Performance

- Tests must run quickly
- Favor unit tests
- Limit heavy integration tests
- Avoid slow external dependencies

---

# 14. Regression Protection

- When fixing bugs:
  1. Write a test reproducing the bug
  2. Implement the fix
  3. Ensure the test passes

Prevents regressions.

---

# 15. AI Behavior

When generating or modifying code:

- Determine if tests are required
- Add tests for new functionality
- Update tests when behavior changes
- Do not introduce functionality without verification