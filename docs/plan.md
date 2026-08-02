# Implementation Plan for "[Project Name]"

> **How to use this file**
> Fill in every `[placeholder]`. Delete phases that don't apply to your project type. Keep this file as the single source of truth for what is built, what is planned, and what is out of scope. A coding agent should read this file before writing a single line of code and re-read it before starting each phase.

---

## Project Overview

| Field | Value |
|---|---|
| Project Name | [Project Name] |
| Project Type | [Backend Service / Frontend App / Full-Stack / CLI Tool / Mobile App / Desktop App / Library / ML Pipeline / AI App / Game / Other] |
| Primary Language(s) | [Language(s)] |
| Framework(s) | [Framework(s)] |
| Target Platform | [Web / Mobile / Desktop / Server / Edge / Embedded / Cross-platform] |
| Deployment Target | [Local / Docker / Cloud Provider / App Store / npm / PyPI / Other] |
| Team / Owner | [Name or Role] |
| Status | [Planning / In Progress / Completed] |

---

## Dependencies

> Fill this during planning before anyone starts coding.
> Each member lists what their work depends on from other members, and what others depend on from them.
> This replaces informal coordination with an artifact everyone can reference.

| My Task | Depends On | Owner | Must Complete Before I Can |
|---------|-----------|-------|---------------------------|
| [Task] | [What you need] | [Team member name] | [Which of your tasks/phases] |
| | | | |

---

## Global Rules

These rules apply to every phase and every coding agent working on this project. They are non-negotiable.

1. **Never implement a future phase early.** If Phase 3 needs a feature, wait until Phase 3.
2. **Never invent APIs, interfaces, or contracts** that aren't defined in this plan or explicitly agreed upon.
3. **Keep every change scoped to the current phase.** One phase, one concern.
4. **Never introduce a new dependency without justification.** State why it's needed and what it replaces.
5. **Prefer the simplest correct implementation.** Optimize only in the designated performance phase.
6. **Preserve backward compatibility** unless a phase explicitly breaks it.
7. **Update documentation whenever public-facing behavior changes.**
8. **All acceptance criteria must pass before moving to the next phase.** Do not skip ahead.
9. **Never leave a phase half-done.** A partial phase is worse than no phase — it creates hidden assumptions.
10. **Distinguish implemented features from planned ones** at all times. Never present a stub as complete.

---

## Architecture Decision Records (ADR)

Document every significant design choice here before implementation begins. Add a new entry whenever a major decision is made mid-project.

### ADR Template

```
### ADR-[N]: [Short Title]
- **Date:** [YYYY-MM-DD]
- **Status:** [Proposed / Accepted / Deprecated / Superseded by ADR-X]
- **Context:** What problem or situation forced this decision?
- **Decision:** What was decided?
- **Alternatives considered:** What else was evaluated and why was it rejected?
- **Consequences:** What does this decision make easier or harder going forward?
```

### ADR-1: [First Decision — e.g., Language Choice]

- **Date:** [YYYY-MM-DD]
- **Status:** Accepted
- **Context:** [Why this needed a decision]
- **Decision:** [What was decided]
- **Alternatives considered:** [What else was evaluated]
- **Consequences:** [Impact on the project]

---

## Technology Stack

| Layer | Choice | Justification |
|---|---|---|
| Language | [Language] | [Why] |
| Framework | [Framework] | [Why] |
| Database / Storage | [DB or N/A] | [Why] |
| Authentication | [Auth method or N/A] | [Why] |
| Real-time | [WebSocket / SSE / Polling / N/A] | [Why] |
| Testing | [Test framework] | [Why] |
| CI/CD | [CI platform or N/A] | [Why] |
| Deployment | [Platform] | [Why] |
| Observability | [Logging / Metrics / Tracing tools or N/A] | [Why] |

---

## Dependency Management

- **Package manager:** [npm / pip / cargo / go mod / other]
- **Lock file committed:** [Yes / No — should almost always be Yes]
- **Rule for adding dependencies:** [e.g., "Must be justified in a PR description and reviewed"]
- **Security audit cadence:** [e.g., "Run `npm audit` / `pip-audit` before every release"]
- **Known constraints:** [e.g., "No GPL dependencies", "Must support Node 18+"]

---

## Configuration & Environment

- All secrets and environment-specific values go in `.env` (never committed).
- `.env.example` is always committed and kept up to date.
- A single `config.[ext]` module loads and validates all env vars at startup. The app must fail fast with a clear error if a required variable is missing.
- Environment variables used in this project:

| Variable | Required | Default | Description |
|---|---|---|---|
| `[VAR_NAME]` | [Yes/No] | [default or —] | [What it controls] |

---

## Project-Type Guidance

Skip phases that don't apply. Common skips by project type:

| Project Type | Typically Skip |
|---|---|
| CLI Tool | Phase 6 (Real-time), Phase 10 (Security Hardening if no network) |
| Frontend Only | Phase 5 (Business Logic Engine — move to Phase 4), Phase 9 (Persistence) |
| Library / Package | Phase 6 (Real-time), Phase 9 (Persistence), Phase 11 (Deployment — replace with publish) |
| ML Pipeline | Phase 6 (Real-time), replace Phase 4 with Model Training, Phase 9 with Dataset Management |
| Static Site | Phase 6, Phase 9, Phase 10 |
| Mobile App | Phase 6 optional, Phase 9 use device storage |

**Phases skipped for this project:** [List here, or "None"]

---

## Phase Checklist

- [ ] Phase 0: Requirements & Architecture
- [ ] Phase 1: Repository Scaffold & Project Skeleton
- [ ] Phase 2: Core Domain / Data Model
- [ ] Phase 3: Primary Interface(s)
- [ ] Phase 4: Secondary Interface(s) & Computed Data *(skip if not applicable)*
- [ ] Phase 5: Business Logic Layer
- [ ] Phase 6: Real-Time / Event Layer *(skip if not applicable)*
- [ ] Phase 7: Persistence / External Storage *(skip if not applicable)*
- [ ] Phase 8: External Integrations *(skip if not applicable)*
- [ ] Phase 9: Validation, Error Handling & Observability
- [ ] Phase 10: Security *(skip if not applicable)*
- [ ] Phase 11: Testing
- [ ] Phase 12: Performance Optimization
- [ ] Phase 13: CI/CD & Code Quality
- [ ] Phase 14: Documentation
- [ ] Phase 15: Deployment & Release
- [ ] Phase 16: Refactoring & Cleanup

---

## Phase 0 – Requirements & Architecture

### Goals

- Establish what is being built, for whom, and why before touching any code.
- Make all major architectural decisions upfront and record them as ADRs.
- Identify risks, unknowns, and out-of-scope items explicitly.

### Tasks

1. Write a one-paragraph plain-language description of what this project does and who uses it.
2. List functional requirements (what the system must do).
3. List non-functional requirements (performance, security, accessibility, scalability targets).
4. Define what is explicitly out of scope for this version.
5. Produce a high-level architecture diagram (Mermaid, Excalidraw, or ASCII) showing the major components and how data flows between them. Save it to `docs/architecture.[ext]`.
6. Identify all external dependencies (third-party APIs, services, hardware) and their failure modes.
7. Complete ADR-1 through ADR-N for all major decisions.
8. Define the data model at a high level — entities, relationships, key fields.
9. Agree on naming conventions, folder structure, and code style before Phase 1 begins.

### Acceptance Criteria

- [ ] Functional and non-functional requirements are written down and reviewed.
- [ ] Out-of-scope items are explicitly listed.
- [ ] Architecture diagram exists in `docs/`.
- [ ] All major technology choices are recorded as ADRs with reasoning.
- [ ] The team/owner can answer "what does this project do?" in one sentence.

### Common Pitfalls

- Skipping this phase entirely and letting the architecture "emerge." It won't emerge cleanly.
- Over-specifying implementation details here. This phase defines *what*, not *how*.

### AI Agent Guidance

> Read this phase completely before generating any file or folder. Do not create any code until all acceptance criteria here are met or explicitly waived by the owner. If requirements are ambiguous, list your assumptions here before proceeding.
>
> **Verification rule that applies to every phase:** After every file you create or modify, run (1) the relevant test or type check for that specific file, and (2) the full test suite. Report both results before touching the next file. Do not proceed if either fails.

---

## Phase 1 – Repository Scaffold & Project Skeleton

### Goals

- Create a working, bootable project skeleton with the correct folder structure.
- Establish the development environment so all future phases have a clean foundation.
- Confirm the project runs with zero business logic before any is added.

### Tasks

1. Initialise the repository with version control (`.gitignore`, `README.md` stub, `LICENSE` if applicable).
2. Create the folder structure:
   ```
   [project-root]/
   ├── src/                    # or lib/, app/, pkg/ — match language conventions
   │   ├── [entry-point].[ext] # main, index, app, main.py, etc.
   │   ├── [core/]             # domain logic (added in Phase 2)
   │   ├── [interfaces/]       # API routes, CLI commands, UI components (Phase 3+)
   │   ├── [services/]         # business logic (Phase 5+)
   │   ├── [integrations/]     # third-party (Phase 8+)
   │   ├── [utils/]
   │   │   ├── logger.[ext]
   │   │   └── constants.[ext]
   │   └── config.[ext]
   ├── tests/                  # or test/, __tests__/
   ├── docs/
   │   └── architecture.[ext]
   ├── .env.example
   ├── [package-manifest]      # package.json, pyproject.toml, go.mod, Cargo.toml, etc.
   └── README.md
   ```
3. Install and pin core dependencies only. No feature dependencies yet.
4. Implement the config module: load all env vars, validate required ones, export a single config object. Fail fast if required vars are missing.
5. Implement the logger utility: `log.info`, `log.warn`, `log.error` with timestamps. Keep it swappable.
6. Add a minimal health/smoke check — the simplest possible proof the project runs:
   - **Backend/API:** `GET /health` returns `200 { "status": "ok" }`
   - **Frontend:** Root route renders without errors
   - **CLI:** `--version` or `--help` exits `0`
   - **Library:** Import succeeds and a smoke test passes
   - **ML pipeline:** Training script reaches the data loading step without error
7. Confirm linting and formatting tools are configured and pass on the empty scaffold.

### Acceptance Criteria

- [ ] `[install command]` completes with no errors.
- [ ] `[start/run command]` boots successfully.
- [ ] Smoke check passes (see Task 6).
- [ ] `.env` is gitignored; `.env.example` is committed with all variables documented.
- [ ] All target folders exist (even if empty stubs for now).
- [ ] Linter passes with zero warnings on the scaffold.

### Common Pitfalls

- Installing all dependencies upfront "just in case." Only install what Phase 1 needs.
- Skipping the config validation step. This causes mysterious failures in production.

### AI Agent Guidance

> Do not add any domain logic, routes, or business rules in this phase. If a feature seems obviously needed now, note it for the correct phase and move on.

---

## Phase 2 – Core Domain / Data Model

### Goals

- Define the canonical data structures (entities, schemas, types) that every other phase depends on.
- Implement the in-memory or schema-level representation of all core entities.
- Build the foundational layer that all interfaces and business logic will read from.

### Tasks

1. In `src/utils/constants.[ext]`, define all domain constants: entity types, enums, status values, magic numbers with names, lookup maps.
2. Define each core entity's shape. For each entity, document:
   ```
   [EntityName]:
     id:          [type, unique identifier]
     [field-1]:   [type, description]
     [field-2]:   [type, description]
     status:      [enum of valid statuses]
     createdAt:   ISO timestamp
     updatedAt:   ISO timestamp
   ```
3. Implement factory functions / constructors / schemas for each entity. Each factory must return a valid, fully-populated entity with no undefined or null fields that aren't explicitly optional.
4. Implement the core data store or registry:
   - `getAll()` — returns all entities
   - `getById(id)` — returns entity or `null` (never throws for a missing ID)
   - `getBy[Field](value)` — returns filtered list or `null` for an unrecognised key
   - `create(data)` — validates and inserts
   - `update(id, patch)` — validates, merges, updates `updatedAt`
   - `delete(id)` — removes or soft-deletes
5. If the project uses a database: define the schema/migration files now. Never write raw SQL or schema logic outside the designated models/schema layer.
6. Seed the store with initial/test data so downstream phases have something to work with immediately.

### Acceptance Criteria

- [ ] Every entity has a documented shape and a working factory/constructor.
- [ ] `getAll()` returns the expected number of seeded entities.
- [ ] `getById("nonexistent")` returns `null`, never throws.
- [ ] `updatedAt` changes on update; `createdAt` never changes after creation.
- [ ] No entity field is ever `undefined` — all optional fields are explicitly `null` or have a default.

### Common Pitfalls

- Defining entities in the route layer or UI layer. Entities belong here, not there.
- Using `any` / untyped dicts for entities in typed languages. Define proper types now.
- Tight-coupling the data store to a specific database before the interface is stable.

### AI Agent Guidance

> No HTTP handlers, UI components, or business rules belong in this phase. If you find yourself writing a route or a UI element, stop and move it to Phase 3 or Phase 5.

---

## Phase 3 – Primary Interface(s)

### Goals

- Expose the core domain to the outside world through the project's primary interface.
- Use the standard response/output contract defined here for every response going forward.

### Interface Type (pick one or more, delete the rest)

**Option A — REST API**
Standard response envelope for every endpoint:
```json
// Success
{ "success": true, "data": { }, "timestamp": "ISO-8601", "error": null }
// Error
{ "success": false, "data": null, "timestamp": "ISO-8601", "error": { "code": "STRING_CODE", "message": "human readable" } }
```

**Option B — GraphQL**
Define the schema in `src/schema.[graphql|ext]` before writing resolvers. Every resolver must handle errors without throwing unhandled exceptions to the client.

**Option C — CLI**
Define the command tree: `[tool] <command> [subcommand] [--flags]`. Use `--help` on every command. Use exit codes: `0` success, `1` user error, `2` internal error.

**Option D — UI / Frontend**
Define the component tree and routing structure. Every page must have a loading state, an error state, and an empty state before any data-fetching logic is added.

**Option E — Library / SDK**
Define the public API surface in a single `index.[ext]` or `__init__.[ext]`. Anything not exported from this file is private and subject to change without notice.

**Option F — Other: [describe]**

### Tasks

1. Implement the standard response/output contract (see Interface Type above). Apply it to every response from this phase forward — no exceptions.
2. Implement primary read operations for all core entities:
   - List all: `GET /api/[resources]` / `[tool] list [resource]` / `<ResourceList />` etc.
   - Get one: `GET /api/[resources]/:id` / `getById(id)` etc.
3. Implement primary write operations:
   - Create: `POST /api/[resources]` / `[tool] create [resource]`
   - Update: `PUT /api/[resources]/:id` or `PATCH`
   - Delete: `DELETE /api/[resources]/:id`
4. Return correct status codes / exit codes / UI states for all outcomes (not found, bad input, success, server error).
5. Add input validation at the interface boundary. Reject malformed input before it reaches the domain layer.

### Acceptance Criteria

- [ ] Every response uses the standard contract — no raw objects or inconsistent shapes.
- [ ] All CRUD operations work end-to-end against the Phase 2 data layer.
- [ ] Invalid input returns a `400`-equivalent with a useful error message, never a `500`.
- [ ] A missing resource returns a `404`-equivalent, never an empty success.
- [ ] No business logic lives in the interface layer — it only translates requests to domain calls and domain results to responses.

### Common Pitfalls

- Putting business rules in route handlers or UI components. Business logic belongs in Phase 5.
- Inconsistent response shapes between endpoints. Enforce the envelope from day one.
- Forgetting empty/error/loading states in UI projects.

### AI Agent Guidance

> The interface layer is a translation layer only. If you are writing a conditional that makes a business decision (not just a routing decision), move it to Phase 5.

---

## Phase 4 – Secondary Interface(s) & Computed Data *(skip if not applicable)*

### Goals

- Expose derived, aggregated, or computed views of the core data.
- Add any secondary interface surfaces (admin panel, secondary API version, secondary CLI commands, dashboard views, etc.).

### Tasks

1. Identify what computed or aggregated data consumers need that isn't raw entity data.
2. Implement a [Processor / Aggregator / Computed View] layer in `src/[processor].[ext]`:
   - `getTotal()` or equivalent aggregate
   - `getBy[Dimension]()` breakdowns
   - `getSummary()` or rollup
3. Expose these through the same interface contract defined in Phase 3.
4. Implement any secondary interface surfaces (admin panel, secondary CLI subcommands, dashboard route, alternative API version).

### Acceptance Criteria

- [ ] All computed values are consistent with the underlying raw data (no arithmetic errors).
- [ ] Aggregates update correctly when the underlying data changes.
- [ ] Secondary interfaces use the same response/output contract as primary ones.

### Common Pitfalls

- Computing aggregates in the interface layer rather than a dedicated module.
- Caching computed results without an invalidation strategy.

---

## Phase 5 – Business Logic Layer

### Goals

- Implement all rules, workflows, algorithms, and decisions that define what the system *does*.
- Keep this layer completely independent of the interface (no HTTP, no DOM, no CLI parsing).

### Tasks

1. Identify every business rule in the requirements from Phase 0. List them explicitly:
   - Rule 1: [description]
   - Rule 2: [description]
2. Implement each rule as a named function or class method with a single responsibility.
3. Implement any state machines, workflows, or multi-step processes:
   - Define all valid states and transitions.
   - Reject invalid transitions explicitly.
4. Wire business logic into the interface layer from Phase 3 — the interface calls the business logic, not the other way around.
5. Implement any scheduled or recurring tasks (cron jobs, polling loops, background workers) here — not in the interface layer.

### Acceptance Criteria

- [ ] Every business rule from Phase 0 requirements is implemented and testable in isolation.
- [ ] Business logic functions have no direct dependency on HTTP request/response objects, DOM, or CLI args.
- [ ] All valid state transitions work; all invalid transitions are rejected with a clear error.
- [ ] Scheduled tasks fire at the correct interval and do not pile up on slow executions.

### Common Pitfalls

- Scattering business rules across route handlers, UI components, and database queries.
- Business logic that can't be unit-tested because it depends on the framework.

---

## Phase 6 – Real-Time / Event Layer *(skip if not applicable)*

### Goals

- Push state changes and events to consumers in real time without polling.

### Tasks

1. Choose and justify the real-time mechanism: [WebSocket / Server-Sent Events / Pub/Sub / Webhooks / Long-polling].
2. Define all event types and their payload shapes:
   ```
   [event-type]:
     type:      "[event-type]"
     timestamp: ISO-8601
     [payload fields]
   ```
3. Implement a `broadcast(eventType, payload)` helper that:
   - Sends only to open/active connections.
   - Guards against send errors on stale connections without crashing.
   - Logs failed sends at `warn` level.
4. Wire every domain event from Phase 5 to a broadcast call.
5. Implement connection lifecycle: connect, authenticate (if applicable), disconnect, cleanup.
6. Implement reconnection handling on the client side (if applicable): exponential backoff, max retry limit.

### Acceptance Criteria

- [ ] A connected client receives an event within one processing cycle of a relevant domain change.
- [ ] Disconnecting a client does not crash the server or leak memory.
- [ ] Reconnecting a client re-establishes the event stream correctly.
- [ ] All event payloads conform to the defined shapes.

### Common Pitfalls

- Broadcasting before validating that the connection is still open.
- Keeping references to disconnected clients and accumulating memory leaks.
- Not handling backpressure on high-frequency events.

---

## Phase 7 – Persistence / External Storage *(skip if not applicable)*

### Goals

- Move data from in-memory or ephemeral storage to durable persistence.
- Ensure data survives service restarts.

### Tasks

1. Choose the persistence layer: [Relational DB / Document DB / Key-Value / File System / Object Storage / Device Storage].
2. Write migration files (if applicable). Migrations are versioned, never edited after being applied.
3. Implement the repository/data-access layer — all database calls go here, nowhere else.
4. Replace in-memory store from Phase 2 with the persistent layer behind the same interface. The domain layer must not know the difference.
5. Implement connection pooling, retry logic, and graceful degradation on database unavailability.
6. Implement backup/restore procedure and document it in `docs/database.md`.

### Acceptance Criteria

- [ ] Data persists across service restarts.
- [ ] The domain layer uses the same interface as before — no domain code changed to accommodate persistence.
- [ ] All database calls are confined to the repository layer.
- [ ] Migration files are versioned and `[migrate command]` runs cleanly on a fresh database.
- [ ] Service degrades gracefully (returns `503`-equivalent) when the database is unavailable, rather than crashing.

### Common Pitfalls

- Writing SQL or database queries directly in route handlers or business logic.
- Editing already-applied migration files rather than writing new ones.
- Not handling connection pool exhaustion.

---

## Phase 8 – External Integrations *(skip if not applicable)*

### Goals

- Connect to third-party services, APIs, hardware, or external data sources.

### Tasks

1. List every external integration and its purpose:
   - [Integration A]: [what it does, which endpoints are used]
   - [Integration B]: [what it does]
2. Implement each integration as an isolated adapter/client in `src/integrations/[name].[ext]`.
3. Every integration adapter must:
   - Validate its configuration at startup (fail fast if credentials are missing or invalid).
   - Implement a retry strategy with exponential backoff and a configurable max attempt count.
   - Never let an integration failure crash the core service — catch and log, degrade gracefully.
   - Be mockable for testing (accept a dependency-injected client or use an interface).
4. Document rate limits and quota constraints for every external API in `docs/integrations.md`.

### Acceptance Criteria

- [ ] Every integration is encapsulated in its own module — no third-party SDK calls scattered in business logic.
- [ ] Integration failures are caught and logged; the service continues operating in a degraded state.
- [ ] All credentials are loaded from config, never hardcoded.
- [ ] Integration adapters can be replaced with mocks in tests without changing business logic.

### Common Pitfalls

- Mixing integration logic with business logic.
- Not handling rate-limit responses (`429`) from external APIs.
- Assuming external services are always available.

---

## Phase 9 – Validation, Error Handling & Observability

### Goals

- Make the system resilient to bad input and observable in production.

### Tasks

1. **Validation:** Add validators for all inputs at every boundary (API inputs, CLI args, UI form fields, function arguments in public APIs). Prefer manual validation over pulling in a schema library unless one is already in the stack.
2. **Error handling:** Implement a single top-level error handler that:
   - Catches all unhandled errors.
   - Returns the standard error envelope (never leaks stack traces to the client).
   - Logs the full error internally with stack trace and request context.
3. **Logging:** Extend the logger from Phase 1:
   - Structured logs (JSON in production, human-readable in development).
   - Log levels respected via config.
   - Log: service start/stop, each request (method, path, status, duration), all errors, all significant state changes.
4. **Metrics** *(optional but recommended)*: Instrument key operations — request count, error rate, latency percentiles, queue depth. Export to [Prometheus / Datadog / CloudWatch / other].
5. **Tracing** *(optional)*: Add distributed tracing if this is a multi-service project.
6. Ensure async error forwarding is in place — every async handler catches its own errors and forwards them to the global handler.

### Acceptance Criteria

- [ ] No bad input at any boundary causes an unhandled exception or exposes a stack trace to the caller.
- [ ] Every `4xx` and `5xx` is logged with enough context to reproduce the issue.
- [ ] The service process does not crash under any tested bad input.
- [ ] Log output is readable and not so verbose that real errors are buried.

### Common Pitfalls

- Logging sensitive data (passwords, tokens, PII) at any log level.
- Catching errors and swallowing them silently (`catch (e) {}`).
- Different error shapes from different endpoints.

---

## Phase 10 – Security *(skip if project has no network surface or user data)*

### Goals

- Identify and close the most critical security risks before the project ships.

### Tasks

1. **Authentication:** Implement or integrate the authentication mechanism defined in the ADR ([JWT / Session / OAuth / API Key / mTLS / other]).
2. **Authorization:** Implement role-based or permission-based access control. Define who can do what and enforce it in the business logic layer, not just the interface layer.
3. **Input sanitization:** Ensure all user-supplied input is sanitized before use in queries, file operations, shell commands, or rendered output. Prevent SQL injection, XSS, path traversal, command injection.
4. **HTTPS / TLS:** Enforce encrypted transport in all non-local environments.
5. **Secrets management:** Audit for hardcoded secrets. Rotate any that were accidentally committed.
6. **Dependency audit:** Run `[npm audit / pip-audit / cargo audit / other]` and resolve all high/critical findings.
7. **Rate limiting:** Apply rate limits to all public-facing interfaces.
8. **CORS / CSP:** Configure correctly for all expected origins (not `*` in production).
9. **Security headers:** Apply standard security headers ([Helmet / similar]).
10. **Threat model review:** Review the Phase 0 architecture diagram and mark each component with its threat surface. Document mitigations.

### Acceptance Criteria

- [ ] No hardcoded secrets anywhere in the codebase or git history.
- [ ] All user input is validated and sanitized before use.
- [ ] Authentication is enforced on all protected routes/endpoints.
- [ ] Dependency audit returns zero high or critical findings.
- [ ] Rate limiting is active on all public endpoints.

### Common Pitfalls

- Enforcing authorization only at the UI/interface layer.
- Using `*` CORS in production.
- Forgetting to secure internal endpoints that are "not public" but are reachable.

---

## Phase 11 – Testing

### Goals

- Prove that the system behaves correctly at every layer, both in isolation and end-to-end.

### Tasks

1. **Unit tests** — test every function in the business logic and domain layers in isolation:
   - Test the happy path, every error path, and every edge case.
   - Use test fixtures, not production data.
   - Aim for high coverage of business logic (not UI boilerplate).
2. **Integration tests** — test that layers work together:
   - Interface → Business Logic → Domain: test the real wiring, not mocks.
   - Database integration: test against a real (test) database, not an in-memory mock.
3. **End-to-end tests** *(if applicable)* — test the full system from the outside:
   - Use the same interface a real user or consumer would use.
   - Cover the primary user journeys only — don't over-specify E2E tests.
4. **Contract tests** *(if applicable for multi-consumer projects)* — verify that all consumers' expectations match the actual API.
5. Add a `[test command]` script. All tests must pass before merging to the main branch.
6. Set a coverage threshold and enforce it in CI: `[coverage target]%` on business logic.

### Acceptance Criteria

- [ ] `[test command]` runs and all tests pass on a clean install.
- [ ] Every business rule from Phase 5 has at least one unit test.
- [ ] Integration tests run against a real running instance (not fully mocked internals).
- [ ] No test makes real calls to paid external services (use mocks/stubs for integrations).
- [ ] Test fixtures cover: normal state, empty state, error state, and each edge case.

### Common Pitfalls

- Only writing happy-path tests.
- Tests that pass because the mock mimics the bug, not because the code is correct.
- Huge E2E test suites that are slow and flaky instead of targeted and reliable.

### AI Agent Guidance

> Write tests against the public interface of each module, not its internals. If you find yourself mocking private functions or accessing private fields, the design probably needs fixing, not the test.

---

## Phase 12 – Performance Optimization

### Goals

- Identify and fix real bottlenecks. Never optimize prematurely.

### Rules for this phase

- Only optimize something that has been **measured and proven** to be a bottleneck.
- Before changing anything, capture a baseline metric (latency, throughput, memory, bundle size).
- After changing, measure again. If the metric doesn't improve, revert.

### Tasks

1. Profile the system under realistic load. Identify the top 3 bottlenecks.
2. Address bottlenecks in priority order:
   - [ ] Bottleneck 1: [description] → [fix strategy]
   - [ ] Bottleneck 2: [description] → [fix strategy]
   - [ ] Bottleneck 3: [description] → [fix strategy]
3. Common optimization targets (address only what profiling confirms is slow):
   - **Backend:** N+1 queries, missing indexes, synchronous blocking I/O, large response payloads.
   - **Frontend:** Bundle size, render blocking, unvirtualized long lists, unnecessary re-renders.
   - **CLI:** Startup time, unnecessary file reads, blocking operations.
   - **ML:** Training throughput, inference latency, memory footprint.
4. Document before/after metrics for every optimization made.

### Acceptance Criteria

- [ ] Every optimization is backed by a before/after measurement.
- [ ] No optimization breaks any existing test.
- [ ] Performance targets from Phase 0 non-functional requirements are met.

### Common Pitfalls

- Optimizing before measuring.
- Sacrificing code clarity for micro-optimizations that don't move the needle.

---

## Phase 13 – CI/CD & Code Quality

### Goals

- Automate testing, linting, and deployment so quality is enforced on every change.

### Tasks

1. Set up CI pipeline (`.github/workflows/`, `.gitlab-ci.yml`, `Jenkinsfile`, etc.):
   - On every pull request / merge request:
     - [ ] Install dependencies
     - [ ] Run linter
     - [ ] Run type checker (if applicable)
     - [ ] Run all tests
     - [ ] Check coverage threshold
     - [ ] Run security audit
   - On merge to main:
     - [ ] All of the above, plus:
     - [ ] Build artifact (if applicable)
     - [ ] Deploy to staging (if applicable)
2. Configure code formatters to run automatically (pre-commit hook or CI step).
3. Configure static analysis tools appropriate to the stack.
4. Define branch protection rules: no direct pushes to main, CI must pass before merge.
5. Set up CD to the deployment target (see Phase 15) if applicable.

### Acceptance Criteria

- [ ] CI pipeline runs automatically on every PR and fails on lint errors, type errors, or test failures.
- [ ] Main branch is protected — cannot be pushed to directly.
- [ ] A developer starting fresh can run `[install] && [test]` and see all tests pass.

---

## Phase 14 – Documentation

### Goals

- Produce documentation sufficient for a new developer, consumer, or reviewer to understand and use the project without asking questions.

### Tasks

1. **README.md** (root): Prerequisites, installation, environment setup, how to run, how to test, ports/addresses, 2–3 quick-start examples.
2. **INTEGRATION.md** or `docs/api.md` (for APIs and libraries): Every public endpoint, event, or exported function — name, parameters, return shape, example.
3. **docs/architecture.[ext]**: Up-to-date architecture diagram from Phase 0 (update it if the implementation diverged).
4. **docs/adr/**: All ADRs, one file each: `ADR-001-[title].md`.
5. **CONTRIBUTING.md**: How to set up the dev environment, run tests, submit a PR.
6. **CHANGELOG.md**: Running record of what changed and when, following [Keep a Changelog](https://keepachangelog.com) format.
7. **Inline code comments**: Every non-obvious function has a comment explaining *why*, not *what*.
8. **Distinguish clearly** between what is implemented and what is planned. Use `[PLANNED]` tags in documentation for anything not yet built.

### Acceptance Criteria

- [ ] A developer with zero project context can follow `README.md` alone to run the project successfully.
- [ ] Every public API endpoint / function / command is documented with a working example.
- [ ] No documentation describes a planned feature as if it is already implemented.
- [ ] Architecture diagram matches the actual implementation.

---

## Phase 15 – Deployment & Release

### Goals

- Ship a working, production-ready artifact to the target environment.

### Tasks

1. Confirm all environment variables are set in the deployment platform — never in code.
2. Confirm the health check / smoke check from Phase 1 passes on the deployed instance.
3. Run the full test suite against the staging/production build before promoting.
4. Tag the release in version control with a semantic version: `v[MAJOR].[MINOR].[PATCH]`.
5. Update `CHANGELOG.md` with this release's changes.
6. Notify all consumers/stakeholders of the release and any breaking changes.

### Release Checklist

- [ ] All tests pass on the release branch.
- [ ] All high/critical security vulnerabilities resolved.
- [ ] Environment variables are set correctly in the deployment target.
- [ ] Health check returns `OK` on the deployed instance.
- [ ] Documentation is up to date.
- [ ] CHANGELOG is updated.
- [ ] Version is tagged in git.
- [ ] No `[PLANNED]` features are presented as shipped in external communications.
- [ ] Rollback plan is documented and tested.

### Common Pitfalls

- Deploying directly from a local machine instead of through CI/CD.
- Missing environment variables discovered only after a production deploy.
- Forgetting to test the rollback procedure until you actually need it.

---

## Phase 16 – Refactoring & Cleanup

### Goals

- Pay down technical debt accumulated during fast-paced earlier phases.
- Leave the codebase in better shape than you found it.

### Tasks

1. Review every `TODO`, `FIXME`, `HACK`, and `// temporary` comment in the codebase. Resolve or convert to a tracked issue.
2. Identify any code that violates the architecture defined in Phase 0. Refactor to match the intended design.
3. Remove all dead code, unused dependencies, and commented-out blocks.
4. Consolidate any duplicated logic into shared utilities.
5. Re-run the full test suite after every refactor step. No refactor is complete until all tests still pass.
6. Update inline documentation to reflect any changes made.
7. Close the loop: verify that every phase's acceptance criteria is still met after refactoring.

### Acceptance Criteria

- [ ] Zero unresolved `TODO` or `FIXME` comments (or all are tracked as issues).
- [ ] All tests pass after refactoring.
- [ ] No unused dependencies remain in the package manifest.
- [ ] The codebase structure matches the architecture defined in Phase 0.

---

## Future Work

> Track features, improvements, and ideas that are explicitly out of scope for this version. This prevents scope creep during implementation while preserving good ideas.

| Item | Priority | Notes |
|---|---|---|
| [Feature or improvement] | [High / Medium / Low] | [Context] |

---

## Out of Scope (This Version)

The following are explicitly **not** part of this implementation. Do not build these unless this list is updated and all phases are re-reviewed.

- [Item 1]
- [Item 2]

---

*This plan is intentionally granular to enable a coding agent to work through each phase sequentially without ambiguity. Complete each phase fully, verify all acceptance criteria, and do not proceed to the next phase until they pass.*

*Last updated: [YYYY-MM-DD] by [Name/Role]*
