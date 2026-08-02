# Project Specification
<!-- TEMPLATE VERSION: 2.0 — filled by Claude, not by hand -->
<!-- AGENT INSTRUCTION: Sections marked [CONDITIONAL] are included only when relevant to the project type. Remove the tag and the section if it does not apply. Never leave a field blank — write "N/A" with a one-line reason if truly not applicable. -->

---

## 1. Project Identity

| Field | Value |
|-------|-------|
| **Project Name** | |
| **One-line Description** | What it does + for whom (max 20 words) |
| **Project Type** | `web-app` / `cli` / `api` / `ml-pipeline` / `mobile` / `browser-ext` / `library` / `other:___` |
| **Hackathon / Context** | Name of competition, course, or personal project |
| **Deadline** | ISO date (YYYY-MM-DD) + hours remaining at spec creation |
| **Team Size** | N people + roles (e.g., "3 — 1 frontend, 1 backend, 1 ML") |
| **Primary Language(s)** | |

---

## 2. Problem Statement

<!-- 2–3 sentences. Must answer: what is broken or missing, for whom, and why it matters now. -->
<!-- Do not describe the solution here. -->

---

## 3. Users

| User Type | Goal | Interaction Mode | Success Signal |
|-----------|------|-----------------|----------------|
| | | CLI / Web UI / API / Dashboard / Other | What does "it worked" look like for this user? |
| | | | |

<!-- Success Signal drives acceptance criteria in Section 7. -->

---

## 4. Core Features

### Must-Have (MVP — project fails without these)

- [ ] **Feature 1** — one sentence. Include the user type it serves.
- [ ] **Feature 2**
- [ ] **Feature 3**

### Nice-to-Have (only if MVP is done and time remains)

- [ ] **Feature A**
- [ ] **Feature B**

### Explicitly Out of Scope

<!-- This list is as important as the feature list. The coding agent will not build anything not in Must-Have or Nice-to-Have unless it appears here first. -->

- Item 1
- Item 2

---

## 5. Tech Stack

| Layer | Technology | Version / Config | Reason for Choice |
|-------|-----------|-----------------|-------------------|
| Frontend | | | |
| Backend | | | |
| Database | | | |
| AI / ML | | | |
| Hosting / Deploy | | | |
| Key APIs / SDKs | | | |
| Dev Tooling | | | |

<!-- [CONDITIONAL — ML projects only] -->
## 5a. Model Card

| Field | Value |
|-------|-------|
| **Model(s) Used** | |
| **Task Type** | classification / generation / retrieval / ranking / other |
| **Input Format** | |
| **Output Format** | |
| **Evaluation Metric(s)** | |
| **Baseline to Beat** | |
| **Training Data Source** | |
| **Known Limitations** | |

---

## 6. Architecture & Data Flow

<!-- Describe in bullet prose how data moves through the system end to end. -->
<!-- Example: User submits form → FastAPI validates → Celery task queued → model runs → result written to Postgres → WebSocket pushes to frontend. -->
<!-- One paragraph or bullet list. No diagrams required. -->

### Key Entities / Data Structures

<!-- List the 3–6 core objects/tables/schemas the system revolves around. One line each. -->

- `EntityName` — what it represents, key fields

### [CONDITIONAL — API / backend projects]

**Endpoints (high-level):**

| Method | Path | Purpose |
|--------|------|---------|
| | | |

---

## 7. System Boundaries

| Concern | Decision |
|---------|----------|
| **What this system does NOT do** | |
| **External dependencies** | List each + fallback if it goes down |
| **Data stored** | What is persisted |
| **Data never stored** | PII, secrets, etc. |
| **Authentication** | None / JWT / OAuth / API key / session — specify which |
| **Rate limits / quotas** | Any API or compute ceiling that affects the design |

---

## 8. Constraints

<!-- Hard limits that determine what's feasible. These override feature wishes. -->

| Constraint | Value | Impact |
|-----------|-------|--------|
| Time budget | X hours / days | |
| Compute / infra budget | Free tier / $X | |
| Team skill ceiling | e.g., "no iOS experience" | |
| Dataset size / availability | [CONDITIONAL — ML] | |
| Latency requirement | e.g., "<2s response" | |

---

## 9. Acceptance Criteria

<!-- One row per Must-Have feature. Format: WHEN [trigger] THE system SHALL [behaviour]. -->
<!-- Every criterion must be mechanically testable. If you cannot write a test for it, rewrite it. -->

| Feature | Passing Condition (EARS) |
|---------|--------------------------|
| Feature 1 | WHEN [trigger] THE system SHALL [behaviour] |
| Feature 2 | |
| Feature 3 | |

**Definition of Done (whole project):**
<!-- When is the project shippable / submittable as a whole? -->
- [ ] All Must-Have acceptance criteria pass
- [ ] No crash on the happy path with realistic input
- [ ] README covers setup in ≤5 steps
- [ ] [Add project-specific condition]

---

## 10. Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| | H / M / L | H / M / L | |

---

## 11. File & Folder Structure

<!-- Canonical layout the coding agent must follow. Every file lives here or it doesn't exist. -->
<!-- Include only top-level and second-level paths. Don't go deeper unless a specific file needs calling out. -->
<!-- Mark generated/auto files with (generated) so the agent doesn't create them manually. -->

```
project-root/
├── src/                  # or app/ — all source code
│   ├── module-a/
│   └── module-b/
├── tests/                # mirrors src/ structure
├── data/                 # [CONDITIONAL — ML] raw/, processed/, outputs/
├── notebooks/            # [CONDITIONAL — ML] exploration only, not imported by src/
├── public/               # [CONDITIONAL — web] static assets
├── docs/                 # spec.md lives here; any other reference docs
├── .env.example          # committed; .env is not
├── README.md
└── [config files]        # e.g. pyproject.toml, package.json, Dockerfile
```

**Naming conventions:**
- Files: `kebab-case` / `snake_case` — pick one, state it here
- Components / Classes: `PascalCase`
- Constants: `UPPER_SNAKE_CASE`

---

## 12. Change Log

<!-- Update every time the spec changes after coding has started. -->
<!-- Before any new phase, check this log — if a change affects the plan, update the plan first. -->

| Version | Date | What Changed | Why | Affected Plans |
|---------|------|-------------|-----|----------------|
| v1.0 | YYYY-MM-DD | Initial spec | — | All |
