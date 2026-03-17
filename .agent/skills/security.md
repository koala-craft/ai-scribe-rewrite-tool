---
description: Enforce strict security practices across all code in the AI Rewriting Tool, including input validation, authentication, authorization, secret management, and secure coding.
globs:
  - "**/*.ts"
  - "**/*.tsx"
  - "**/*.js"
  - "**/*.jsx"
  - "**/*.py"
  - "**/*.go"
  - "**/*.java"
  - "**/*.rs"
alwaysApply: true
---

# Security Policy for AI Rewriting Tool

All code must follow strict security practices. Security rules are mandatory and cannot be bypassed. 

Assume:

- All input is untrusted
- Attackers attempt to exploit every boundary
- Sensitive data must always be protected
- Systems must fail safely

Follow a **Zero Trust security model**.

---

# 1. Input Validation

- Validate all external input: HTTP requests, query params, headers, cookies, env variables, uploaded files, external API responses, database values.
- Validate type, format, length, and reject unexpected fields.
- Never trust user input directly.

Example:

Bad:

```
const userId = req.query.id
```

Good:

```
const userId = validateUUID(req.query.id)
```

---

# 2. Injection Prevention

Protect against:

- SQL / NoSQL injection
- Command injection
- Template injection

Rules:

- Use parameterized queries
- Escape shell arguments
- Never execute user-provided code

Bad:

```
db.query("SELECT * FROM users WHERE id=" + id)
```

Good:

```
db.query("SELECT * FROM users WHERE id = ?", [id])
```

---

# 3. Cross-Site Scripting (XSS)

- Treat all user content as unsafe
- Escape HTML output
- Use safe rendering APIs
- Avoid innerHTML; prefer textContent

Bad:

```
element.innerHTML = userInput
```

Good:

```
element.textContent = userInput
```

---

# 4. Authentication

- Use token-based auth
- Never store plaintext passwords
- Use strong hashing (bcrypt, argon2) with salts
- Session tokens must be random, secure, short-lived

---

# 5. Authorization

- Verify permissions server-side
- Never rely on client-side checks
- Validate resource ownership

Example:

```
if (!currentUser.isAdmin) {
  throw new ForbiddenError()
}
```

---

# 6. Secret Management

- Never hardcode secrets
- Use environment variables or secret managers
- Rotate secrets regularly

Bad:

```
const API_KEY = "abc123"
```

Good:

```
const API_KEY = process.env.API_KEY
```

---

# 7. Sensitive Data Protection

- Protect data in storage, logs, and network
- Never log passwords, tokens, PII, or payment info
- Encrypt in transit (HTTPS)

---

# 8. Secure Error Handling

- Do not expose internal details in messages
- Detailed errors only in internal logs

Bad:

```
Database connection failed: password incorrect
```

Good:

```
Internal server error
```

---

# 9. Dependency Security

- Avoid outdated dependencies
- Monitor for vulnerabilities
- Use lock files
- Audit dependencies regularly (npm audit, pip audit, dependabot, Snyk)

---

# 10. File Upload Security

- Treat uploaded files as potentially malicious
- Validate type and size
- Sanitize file names
- Store outside public directories
- Never execute uploaded files

---

# 11. Rate Limiting

- Protect public endpoints with:
  - Rate limits
  - IP throttling
  - CAPTCHA
  - Request quotas

---

# 12. HTTPS Enforcement

- All external communication must use HTTPS
- Never transmit credentials, tokens, or personal data over HTTP

---

# 13. Principle of Least Privilege

- Components operate with minimal permissions
- Examples: restricted DB roles, limited API tokens, sandboxed processes

---

# 14. Secure Defaults

- Secure by default: deny-by-default auth, disabled debug in production, strict input validation

---

# 15. Logging and Monitoring

- Log security-relevant events: login attempts, permission failures, suspicious activity
- Logs must support monitoring and auditing

---

# 16. AI Code Generation Constraints

- Follow all security rules
- Avoid unsafe libraries and insecure patterns
- Prioritize safe implementations
- Treat vulnerabilities as critical
- Prefer security over convenience