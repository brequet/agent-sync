---
name: backend-api
description: Build REST APIs with Node.js, Express, and TypeScript
license: MIT
compatibility: opencode
metadata:
  tags: backend, api, nodejs, express, typescript
---

## What I do

I help you build robust REST APIs using Node.js, Express, and TypeScript with best practices.

## When to use me

Use this skill when:
- Building REST API endpoints
- Setting up Express servers
- Implementing authentication and authorization
- Designing API routes and middleware
- Working with databases in Node.js

## Instructions

When building backend APIs:

1. **TypeScript First** - All backend code should use TypeScript
2. **Express Framework** - Use Express for routing and middleware
3. **Error Handling** - Implement centralized error handling
4. **Validation** - Validate all input data
5. **Security** - Follow OWASP security best practices

### Project Structure

```
src/
├── routes/          # API route handlers
├── controllers/     # Business logic
├── middleware/      # Custom middleware
├── models/          # Data models
├── services/        # Service layer
└── utils/           # Utility functions
```

### API Design Principles

- RESTful conventions (GET, POST, PUT, DELETE)
- Consistent response formats
- Proper HTTP status codes
- API versioning (e.g., /api/v1/)
- Clear error messages

### Security Checklist

- Input validation and sanitization
- Rate limiting
- CORS configuration
- Helmet.js for security headers
- Environment variables for secrets
- JWT or session-based authentication
