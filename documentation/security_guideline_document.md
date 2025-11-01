# Flumberico Landing Page Security Guidelines

This document outlines security best practices tailored to the Flumberico Next.js landing page codebase. It aligns with core security principles—Security by Design, Least Privilege, Defense in Depth, and Secure Defaults—and provides actionable guidance for implementation, review, and ongoing maintenance.

---

## 1. Secure Architecture & Defaults

- **Next.js Secure Defaults**
  - Leverage Next.js’s built-in security headers (e.g., `X-Content-Type-Options`, `X-Frame-Options`, `Strict-Transport-Security`). Extend them via `next.config.mjs` / custom middleware if needed.
  - Enforce **HTTPS** for all routes. On Vercel, set `redirectHttpToHttps: true`.
- **Least Privilege**
  - Restrict IAM permissions on Vercel projects and associated services (e.g., headless CMS, AI API) to only necessary operations.
  - Use scoped environment variables (`NEXT_PUBLIC_` vs. server‐only) appropriately.
- **Defense in Depth**
  - Combine client‐side input validation (React) with server‐side validation (API routes or edge functions).
  - Implement rate limiting or throttling on any API endpoints powering onboarding or AI match requests.

---

## 2. Authentication & Access Control

While the public landing page has no user login, it still handles user input and referrals:  

- **Future-Proofing for Authentication**
  - If introducing user accounts or portals, adopt NextAuth or custom JWT flows with strong algorithms (avoid "none").
  - Enforce role checks on any new server‐side routes (e.g., admin dashboards).
- **Referral & Waitlist Endpoints**
  - Protect referral links against parameter tampering by validating IDs/signatures server‐side.
  - Implement CSRF protection on form submissions (e.g., use `csrf` tokens in API routes or synchronize tokens in cookies).

---

## 3. Input Handling & Validation

### Onboarding & Contact Forms

- **Server-Side Validation**
  - Never trust client `useState` values alone. Validate with a schema library (e.g., Zod, Yup) in API routes or Next.js `app/api` handlers.
  - Check string lengths, email formats, allowed job‐type values, and numeric ranges for step inputs.
- **Sanitization & Encoding**
  - Escape/render all user‐supplied content using React's default escaping. Avoid `dangerouslySetInnerHTML` unless thoroughly sanitized.
  - For any markdown or rich‐text fields (e.g., FAQ answers), apply a whitelist sanitizer (DOMPurify).
- **Prevent Injection**
  - If interacting with a database or third‐party services, use parameterized queries or official SDKs.

---

## 4. Data Protection & Privacy

- **PII Handling**  
  - Onboarding may collect names, emails, preferences. Encrypt or hash sensitive fields at rest if stored in a database.
  - Implement a strict data retention policy aligned with GDPR/CCPA. Provide deletion/opt‐out endpoints.
- **Secrets Management**  
  - Store API keys (AI service, mailing lists) in Vercel Environment Variables or a secret‐management system (e.g., Vault).  
  - **Do not** commit `.env.local` or credentials to Git. Use `.gitignore` to enforce.
- **Logging & Error Messages**  
  - Log only non‐PII information (e.g., form submission timestamps, error codes).  
  - Avoid leaking stack traces or internal paths to the browser—use custom error pages (`pages/404.tsx`, `pages/500.tsx`).

---

## 5. API & Service Security

- **HTTPS & CORS**  
  - Always call AI‐matching or mailing API endpoints over TLS 1.2+.  
  - Restrict CORS origins to your own domain (`https://*.flumberico.com`).
- **Rate Limiting**  
  - Protect onboarding and referral APIs against abuse (e.g., max 5 submissions per minute per IP).  
  - Implement using Vercel Edge Middleware or a lightweight in‐memory store (e.g., Upstash).
- **Error Handling & Timeouts**  
  - On external API failures, show a generic user message and retry/circuit‐breaker logic server‐side.

---

## 6. Web Application Security Hygiene

- **Content Security Policy (CSP)**  
  - Define a strict CSP via response headers or `next.config.mjs`:
    ```js
    Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-eval'; style-src 'self' https://fonts.googleapis.com; img-src 'self' data:;
    ```
- **Cookies**  
  - Any cookies (e.g., session, CSRF) must include `HttpOnly; Secure; SameSite=Strict`.
- **Subresource Integrity (SRI)**  
  - If loading external scripts (e.g., analytics), include SRI hashes to prevent tampering.
- **Disable Debug in Production**  
  - Ensure `NEXT_PUBLIC_NODE_ENV` is set to `production` and `reactStrictMode: true` in `next.config.mjs`.

---

## 7. Infrastructure & Configuration Management

- **Vercel Hardening**  
  - Use Vercel’s Team Access Controls to limit who can modify environment variables or deploy.
  - Enable Automatic Certificate Management (ACM) for TLS.
- **Dependency Management**  
  - Commit `package-lock.json` and run `npm audit` in CI.  
  - Integrate an SCA tool (e.g., Dependabot, Snyk) to flag vulnerable dependencies (e.g., Tailwind, Framer Motion).
  - Minimize footprint: remove unused packages, pin minor versions.
- **Continuous Integration/Deployment**  
  - In CI pipelines, run linting (`eslint --max-warnings=0`), type‐checks (`tsc --noEmit`), unit tests, and security scans before merge.

---

## 8. Ongoing Maintenance & Review

- **Periodic Security Audits**  
  - Perform quarterly penetration tests and code reviews focused on authentication flows, API endpoints, and data handling.
- **Monitoring & Alerts**  
  - Use monitoring tools (e.g., Sentry, LogRocket) to track front‐end exceptions and potential injection attempts.
- **Documentation & Training**  
  - Keep `SECURITY.md` updated with incident response procedures.  
  - Ensure all contributors understand secure coding practices and follow the project’s Pull Request checklist.

---

Adherence to these guidelines will strengthen the security posture of the Flumberico landing page, protect user data, and reduce the risk of common web application vulnerabilities. Regularly revisit and update these practices as the application evolves and new threats emerge.
