---
description: Enforce modular layered architecture for the AI Rewriting Tool, respecting frontend/backend separation and correct placement of business, application, and infrastructure logic.
globs:
  - "frontend/**/*.ts"
  - "frontend/**/*.tsx"
  - "frontend/**/*.js"
  - "frontend/**/*.jsx"
  - "backend/**/*.py"
alwaysApply: true
---

# AI Rewriting Tool Architecture Rules

This skill ensures the AI respects the project's layered architecture and separation of concerns when generating or modifying code.

---

# 1. Architecture Philosophy

The system must be **modular**, with clear separation of concerns between frontend and backend.

Priorities:

1. Simplicity
2. Clear boundaries
3. Testability
4. Maintainability
5. Layer adherence

Avoid tightly coupled systems, especially between frontend and backend.

---

# 2. Layered Architecture

```
Frontend: Components / Hooks / Pages
         ↓
Backend: API Routes / Services
         ↓
Domain / Business Logic
         ↓
Infrastructure (DB, External APIs, Gemini API)
```

Each layer has defined responsibilities.

---

# 3. Layer Responsibilities

### Frontend (UI Layer)

Responsible for:

- React components
- Next.js pages / layout
- Hooks for state management
- Fetching API and displaying results
- Input validation and user feedback

Rules:

- No business logic beyond UI orchestration
- Only interacts with backend through API routes

---

### Backend Application / Service Layer

Responsible for:

- FastAPI endpoints
- Request parsing
- Service orchestration (e.g., calling Gemini API)
- Input/output transformation

Rules:

- Can call domain layer
- Should not contain core business rules
- Avoid framework-specific code in domain logic

---

### Domain Layer

Responsible for:

- Core AI processing logic
- Text normalization
- Validation and business rules
- Rewriting modes (polite, short, clear, casual)

Rules:

- Framework independent
- No external API calls
- Pure logic preferred

---

### Infrastructure Layer

Responsible for:

- Gemini API integration
- File I/O
- Logging
- Environment/configuration access

Rules:

- Implements interfaces for domain
- No business logic here

---

# 4. Dependency Direction

- Frontend → Backend API → Domain → Infrastructure
- Domain and infrastructure must never depend on UI
- Backend services may depend on domain and infrastructure
- Avoid circular dependencies

---

# 5. Folder Structure

```
frontend/
  components/
  hooks/
  pages/
  lib/
backend/
  api/
  services/
  models/
  utils/
  config/
```

Rules:

- Business logic → `backend/models` and `backend/utils/text_cleaner.py`
- Service orchestration → `backend/services`
- API handling → `backend/api`
- UI logic → `frontend/components` / `frontend/hooks`

---

# 6. Business Logic Placement

- Rewriting algorithms, text normalization, validation → domain layer (`backend/models` or `utils`)
- Mode-specific logic → domain layer
- Avoid placing in API routes or frontend

---

# 7. Interface Driven Design

- External services (Gemini API) accessed via interfaces in `services/`
- Domain interacts only through defined service interfaces
- Allows mocking for tests

---

# 8. Stateless Design

- Services and domain logic should be stateless
- State (e.g., request metadata, API keys) passed explicitly

---

# 9. Cross-Cutting Concerns

Handle consistently:

- Logging (use `loguru`)
- Error handling
- Input validation
- Configuration (via `.env` and `pydantic-settings`)

Do not duplicate logic across layers.

---

# 10. Scalability Principles

- Each layer and module should be independently testable
- Safe to extend rewriting modes or add new features
- Frontend and backend decoupled via API

---

# 11. Code Organization Rules

- Clear responsibility per module
- Minimal public interface
- Explicit dependencies only
- No circular references

---

# 12. AI Behavior

When generating or modifying code:

1. Respect layer boundaries (frontend, backend, domain, infrastructure)
2. Place logic in correct layer
3. Avoid mixing responsibilities
4. Prefer extending existing modules rather than rewriting
5. Propose design before adding complex logic