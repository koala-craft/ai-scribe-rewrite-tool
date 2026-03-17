---
description: Enforce frontend development standards for the AI Rewriting Tool, including component architecture, state management, UI patterns, and API communication.
globs:
  - "**/components/**/*.{ts,tsx,js,jsx}"
  - "**/pages/**/*.{ts,tsx,js,jsx}"
  - "**/hooks/**/*.{ts,tsx,js,jsx}"
  - "**/services/**/*.{ts,tsx,js,jsx}"
  - "**/utils/**/*.{ts,tsx,js,jsx}"
  - "**/styles/**/*.{css,scss,ts,tsx}"
alwaysApply: false
---

# Frontend Development Rules for AI Rewriting Tool

This skill enforces frontend standards for components, state, API handling, styling, and accessibility.

---

# 1. Frontend Philosophy

Frontend code must prioritize:

1. Simplicity
2. Readability
3. Maintainability
4. Predictable state management
5. Performance

Avoid complex UI logic; prefer clear, maintainable structures.

---

# 2. Responsibilities of the Frontend

Frontend handles:

- Rendering interfaces
- Handling user interactions
- Managing UI state
- Communicating with backend APIs
- Input validation
- Displaying errors and loading states

Business logic should remain minimal; core rules belong in backend/domain.

---

# 3. Component Design

- Components should be small, reusable, and focused
- Prefer composition over monolithic components
- Avoid components longer than ~200 lines

---

# 4. Component Structure

Typical component:

- UI rendering
- Minimal state logic
- Event handlers

Extract complex logic into:

- Hooks
- Utilities
- Service modules

---

# 5. State Management

- Keep state close to usage
- Avoid unnecessary global state
- Derive values instead of storing duplicates
- Avoid deeply nested state objects

---

# 6. API Communication

- Centralize API calls
- Do not call APIs directly in UI components
- Use service/API modules
- Handle loading and error states

Example flow:

```
component → service/api module → backend API
```

---

# 7. Error Handling

- Provide user-friendly error messages
- Include fallback UI
- Implement retry mechanisms as needed
- Never leave UI broken

---

# 8. Loading States

- All async operations must show loading feedback
- Examples: spinners, skeletons, disabled buttons
- Users should always know system status

---

# 9. Form Handling

- Include input validation
- Show clear error messages
- Disable submit during processing
- Prefer controlled inputs
- Validate on submit (optionally during input)

---

# 10. Styling Guidelines

- Use consistent styling conventions
- Avoid inline styles
- Prefer reusable patterns
- Maintain spacing and typography consistency
- Follow design system if available

---

# 11. Accessibility

- Use semantic HTML
- Proper labels for inputs
- Ensure keyboard navigation
- Accessible error messages
- Avoid UI patterns that exclude assistive tech

---

# 12. Performance Practices

- Avoid unnecessary re-renders and large trees
- Avoid heavy synchronous work
- Use memoization, lazy loading, and component splitting
- Optimize only when performance issues arise

---

# 13. Code Organization

Example modular structure:

```
src/
  components/
  pages/
  hooks/
  services/
  utils/
  styles/
```

- Each module has a clear purpose
- Avoid mixing unrelated logic

---

# 14. Reusability

- Extract common UI patterns into reusable components:
  - Buttons
  - Modals
  - Input fields
  - Layout components
- Avoid duplicating UI logic across pages

---

# 15. Security Considerations

- Treat all external data as untrusted
- Avoid injecting raw HTML
- Sanitize user content if needed
- Never expose secrets
- Sensitive logic remains in backend

---

# 16. Testing Expectations

- Unit tests for UI logic
- Component tests
- Integration tests for critical flows
- Avoid tightly coupled components

---

# 17. AI Behavior

When generating frontend code:

1. Create small, reusable components
2. Separate UI from complex logic
3. Centralize API communication
4. Avoid duplicating existing components
5. Propose simple structure if unclear before implementing