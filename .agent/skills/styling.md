---
description: Enforce styling standards using Tailwind CSS 4.0, focusing on modern CSS features and design consistency.
globs:
  - "frontend/**/*.{css,ts,tsx}"
alwaysApply: false
---

# Tailwind CSS 4.0 & Styling Rules

## 1. Tailwind 4.0 Standards
- **Zero-config Engine**: Leverage the new CSS-first engine. Avoid legacy `tailwind.config.js` unless specific overrides are needed.
- **Theme Definition**: Use the `@theme` directive in CSS to define custom variables and tokens.
- **Container Queries**: Use `@container` classes for responsive layouts based on parent size rather than viewport.

## 2. Design Consistency
- **Color Palette**: Use semantic tokens (e.g., `primary`, `secondary`, `error`) defined in `@theme`.
- **Spacing**: Follow a strict scale (e.g., multiples of 4px) to maintain rhythm.
- **Typography**: Use standard weights and sizes defined in the design system.

## 3. Advanced Utilities
- **Glassmorphism**: Use `backdrop-blur` and semi-transparent backgrounds for modern UI.
- **Transitions**: Apply `transition-all` and appropriate durations for smooth micro-interactions.
- **Directives**: Prefer utility classes in HTML/JSX over `@apply` in CSS files unless creating a base component class.
