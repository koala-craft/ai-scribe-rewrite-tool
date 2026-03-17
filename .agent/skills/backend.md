---
description: Enforce backend development standards for the AI Rewriting Tool, including API design, validation, database access, service structure, and external integrations.
globs:
  - "**/controllers/**/*.{ts,js,py,go,java,rs}"
  - "**/services/**/*.{ts,js,py,go,java,rs}"
  - "**/domain/**/*.{ts,js,py,go,java,rs}"
  - "**/repositories/**/*.{ts,js,py,go,java,rs}"
  - "**/infrastructure/**/*.{ts,js,py,go,java,rs}"
  - "**/middleware/**/*.{ts,js,py,go,java,rs}"
  - "**/api/**/*.{ts,js,py,go,java,rs}"
alwaysApply: false
---

# Backend Development Rules for AI Rewriting Tool

This skill enforces backend standards for API design, service architecture, validation, and external integrations.

---

# 1. Backend Philosophy

Backend code must prioritize:

1. Reliability
2. Readability
3. Maintainability
4. Type safety
5. Observability

Avoid clever or unpredictable implementations. Use clear, consistent patterns.

---

# 2. Responsibility of the Backend

Backend handles:

- Core business logic (text rewriting, normalization, validation)
- Request validation
- Authentication & authorization (if any)
- External API calls (Gemini API)
- Logging and monitoring

Never trust client input.

---

# 3. API Design Rules

- Use RESTful patterns
- Use nouns in route paths, not verbs
- Keep endpoints predictable and consistent

Good examples:

```
POST /rewrite
GET /history
```

Bad examples:

```
/doRewrite
/fetchHistory
```

---

# 4. Request Validation

All incoming data must be validated:

- Type validation
- Required fields
- Value constraints
- Format validation

Reject invalid requests immediately.

---

# 5. Business Logic Placement

- Controllers and API routes handle request parsing, validation, and response formatting only
- All rewriting logic, normalization, and mode handling → service or domain layer
- Avoid placing core logic in controllers

---

# 6. Database / Storage Interaction

If persistence is used (e.g., history):

- Isolate queries in repositories
- Services call repositories
- Controllers do not access database directly

Example flow:

```
controller → service → repository → database
```

---

# 7. Transactions

- Use transactions when multiple records are updated
- Ensure partial updates do not corrupt data
- Clearly scope transactional boundaries

---

# 8. Error Handling

- No silent failures
- All errors must be logged and returned clearly

Example error response:

```
{
  "error": "ValidationError",
  "message": "Input text must be at least 5 characters"
}
```

---

# 9. Logging

- Log API requests, external API calls, and system errors
- Structure logs when possible
- Never log sensitive info (API keys, personal data)

---

# 10. External API Calls

- Wrap Gemini API calls in service modules
- Handle timeouts and retries
- Log failures
- Do not scatter API calls across codebase

---

# 11. Authentication and Authorization

- If applicable, verify identity and permissions on backend
- Never trust client-supplied identity
- Enforce authorization for sensitive endpoints

---

# 12. Configuration Management

- Store environment-specific values in `.env` or configuration files
- Examples: API keys, service endpoints
- Never hardcode secrets

---

# 13. Performance Considerations

Avoid:

- N+1 queries
- Blocking long operations
- Redundant API calls

Prefer:

- Batching
- Async processing
- Caching where appropriate

---

# 14. Security Practices

- Sanitize all inputs
- Protect against injection, XSS, and authentication bypass
- Always assume hostile inputs

---

# 15. Background Jobs

- Long-running operations (email, reports, analytics) should not block API
- Use background workers or queues

---

# 16. Code Organization

Recommended structure:

```
src/
  controllers/
  services/
  domain/
  repositories/
  infrastructure/
  middleware/
```

Each module has a clear responsibility.

---

# 17. Testing Expectations

- Unit tests for domain/service logic
- Integration tests for API endpoints
- Mock external services (Gemini API)
- Avoid tightly coupled code that is hard to test

---

# 18. AI Behavior

When generating backend code:

1. Follow layered architecture rules
2. Place logic in the correct layer (controller, service, domain, repository, infrastructure)
3. Reuse existing modules and utilities
4. Avoid duplicating functionality
5. Propose minimal design before implementation if unsure