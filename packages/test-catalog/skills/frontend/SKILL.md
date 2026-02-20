---
name: frontend
description: When doing frontend, use typescript.
license: MIT
compatibility: opencode
metadata:
  tags: frontend, typescript, react
---

## What I do

I help you build modern frontend applications using TypeScript and React best practices.

## When to use me

Use this skill when:
- Building new React components
- Setting up TypeScript configurations
- Implementing frontend features
- Need guidance on React hooks and patterns

## Instructions

When building frontend applications:

1. **Always use TypeScript** - Never use plain JavaScript
2. **Functional components** - Use functional components with hooks, not class components
3. **Type safety** - Define proper interfaces for all props and state
4. **Modern practices** - Use React 18+ features like Suspense and concurrent rendering
5. **Code organization** - Keep components small and focused on single responsibility

### TypeScript Best Practices

- Use `interface` for object types, `type` for unions/intersections
- Avoid `any` - use `unknown` if type is truly unknown
- Enable strict mode in tsconfig.json
- Use const assertions for literal types

### React Patterns

- Custom hooks for reusable logic
- Context API for global state
- Memoization (useMemo, useCallback) only when needed
- Error boundaries for graceful error handling
