---
description: Enforce standards for Next.js 15 and React 19, including Server/Client Components, App Router patterns, and new React hooks.
globs:
  - "frontend/app/**/*.{ts,tsx}"
  - "frontend/components/**/*.{ts,tsx}"
alwaysApply: false
---

# Next.js 15 & React 19 Development Rules

## 1. Server & Client Components
- **Server Components by Default**: All components in the `app` directory are Server Components unless marked with `'use client'`.
- **Client Components**: Use only when necessary for interactivity (hooks, event listeners, browser-only APIs).
- **Data Fetching**: Prefer fetching data in Server Components (Server-side) to minimize client-side bundle size.

## 2. React 19 Features
- **useActionState**: Use for handling form states and server actions.
- **useOptimistic**: Implement for immediate UI feedback during async operations.
- **Ref forwarding**: Use the new simplified ref prop instead of `forwardRef` (React 19 native support).

## 3. App Router Patterns
- **Layouts**: Use `layout.tsx` for shared UI across routes.
- **Loading UI**: Implement `loading.tsx` for granular loading states.
- **Error Handling**: Use `error.tsx` for route-level error boundaries.

## 4. Performance
- **Image Optimization**: Always use `next/image` with proper alt text and dimensions.
- **Server Actions**: Use `useServer` for secure and direct server-side mutations.
