---
description: Enforce state management standards using Zustand for client state and React Query for server state.
globs:
  - "frontend/hooks/use-*.ts"
  - "frontend/store/*.ts"
alwaysApply: false
---

# State Management Rules

## 1. Separation of Concerns
- **Zustand (Client State)**: Use for UI-only state (e.g., sidebar open/close, dark mode, draft text).
- **React Query (Server State)**: Use for any data fetched from the API (e.g., rewrite history, saved templates).

## 2. Zustand Implementation
- **Slice Pattern**: Split large stores into manageable slices.
- **Selectors**: Always use selectors when consuming state to avoid unnecessary re-renders.
- **Actions**: Define mutation logic within the store (actions) rather than in components.

## 3. React Query Implementation
- **Custom Hooks**: Wrap every `useQuery` or `useMutation` in a custom hook (e.g., `useRewriteMutation`).
- **Caching**: Configure reasonable `staleTime` and `gcTime` based on data volatility.
- **Loading/Error States**: Consistently handle `isLoading` and `isError` in UI components.

## 4. Best Practices
- **Persistence**: Use Zustand `persist` middleware for states that should survive page refreshes (e.g., settings).
- **Derived State**: Compute values during render (or via selectors) instead of syncing multiple states.
