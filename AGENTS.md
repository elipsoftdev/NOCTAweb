# AGENTS.md — NOCTAweb

## Project purpose

NOCTAweb is the public commercial and institutional website for NOCTA.

Its primary purpose is to explain the NOCTA value proposition clearly to prospective clients, especially:

- condominiums
- residential communities
- gated communities / urbanizaciones

This repository is a commercial presentation layer. It is not the operational NOCTA application and must not be implicitly coupled to the ADITUX/NOCTA backend unless a task explicitly requires that integration.

## Technical architecture

Keep the project intentionally simple.

Current architecture:

- static HTML
- plain CSS
- plain JavaScript
- direct GitHub Pages deployment
- no build process

Do not introduce:

- React
- Next.js
- Vite
- npm dependencies
- bundlers
- frontend frameworks
- backend services

unless the user explicitly approves an architectural change.

Prefer extending the existing HTML/CSS/JavaScript implementation.

## Commercial product model

The main NOCTA Access journey is:

NOCTA Resident → NOCTA Visit → NOCTA Guard → NOCTA Admin

Commercial roles:

- NOCTA Resident — authorizes
- NOCTA Visit — visitor identifies/completes the access process
- NOCTA Guard — verifies
- NOCTA Admin — supervises

Use the commercial name:

NOCTA Visit

Do not use "Web Visitante" in customer-facing copy unless specifically requested.

NOCTA Vision is a complementary intelligent-security capability.

Do not present NOCTA Vision as one of the human actors in the core access journey.

Access should normally be explained before Vision.

## Brand narrative

NOCTA should communicate:

- tranquility
- security
- control
- clarity
- order
- trust
- simplicity

Avoid fear-based or alarmist security marketing.

Do not make users feel personally responsible for preventing every security incident.

Explain benefits before technology.

Primary approved hero message:

"Resguarda tu tranquilidad y seguridad con NOCTA."

Approved supporting message:

"Una forma simple y moderna de gestionar quién entra, quién autoriza y qué ocurre en cada acceso."

Primary CTA:

"Solicitar demostración"

Secondary CTA:

"Ver cómo funciona"

## Visual direction

The target experience is approximately:

- 70% light
- 30% dark

Access should primarily feel:

- light
- human
- clean
- calm
- organized
- premium

Dark sections should be used intentionally, especially for:

- NOCTA Guard
- NOCTA Vision
- high-impact transitions

Avoid turning the whole site into a dark/cyberpunk interface.

Avoid excessive neon-green decoration.

Green should communicate NOCTA identity, positive status, connection and intelligent activity.

Use whitespace and visual hierarchy generously.

## Storytelling principles

Prefer narrative flows over generic feature grids.

The core access story is:

Invite → Identify → Authorize → Verify → Register

Important conceptual messages include:

- "NOCTA no comienza en la garita."
- "NOCTA pone orden."
- "Del 'déjalo pasar' a un acceso verificable."

The problem narrative may illustrate:

- information lost in chats
- fictitious ID/document images mixed with messages
- calls to the gate/security desk
- handwritten access logs
- verbal shift-change instructions
- fragmented information

Never use real personal identification data for demo assets.

## Product accuracy

Do not invent operational capabilities.

Commercial copy may simplify how a feature works, but must not claim functionality that does not exist or has not been approved.

When uncertain whether a product capability is real, surface the uncertainty instead of silently presenting it as completed.

NOCTA Admin in particular may contain commercially conceptual UI while the operational product continues evolving.

## Product source of truth

When commercial claims depend on whether a NOCTA capability actually exists, do not infer from this marketing repository alone.

The operational NOCTA product lives in the ADITUX/NOCTA project.

When verification is required, use the current product documentation, coverage status, contracts, or implementation from the operational NOCTA repository as the source of truth.

Treat that verification as read-only unless the user explicitly authorizes changes to the operational repository.

Marketing mockups may simplify presentation, but must not silently convert planned functionality into completed functionality.

## Assets

Preserve existing official NOCTA brand assets unless explicitly asked to replace them.

Do not reinterpret or redesign the official logo, wordmark or isotipo without explicit approval.

Do not download random stock photography as a shortcut.

Final marketing assets may be supplied progressively.

When an approved asset does not yet exist:

- use a clean semantic placeholder
- give it a clear identifier
- do not invent a substitute final image

Optimize asset size when preparing production-ready work, while preserving adequate visual quality.

## Scope discipline

Work only on the requested phase.

Do not automatically implement future roadmap items because they appear useful.

If a task defines Phase A, do not silently start Phase B.

Prefer small, reviewable iterations.

Preserve useful existing work when it can be refactored instead of rewritten.

Do not perform broad rewrites unless the requested outcome truly requires them.

## Phase workflow

NOCTAweb is developed through explicit implementation phases.

This AGENTS.md file defines the project's standing guardrails. The task prompt defines the active phase, its requested scope, and its acceptance criteria.

For every phase:

1. inspect the current repository state;
2. implement only the requested scope;
3. validate the affected experience;
4. report results and remaining items;
5. stop before starting the next phase.

A later phase must not be started automatically, even when its requirements are already known.

## JavaScript

Keep JavaScript plain and dependency-free unless explicitly approved otherwise.

When refactoring interactions:

- remove obsolete handlers
- avoid dead code
- keep state simple
- preserve accessibility
- preserve existing useful interactions when compatible with the new experience

## Responsive design

Every user-facing change must remain usable on:

- desktop
- tablet
- mobile

Do not consider a layout complete if only desktop was reviewed.

## Accessibility

Use semantic HTML where practical.

Maintain:

- keyboard-accessible interactive controls
- visible focus states
- meaningful labels
- appropriate heading hierarchy
- reduced-motion consideration when animations are introduced
- reasonable contrast

Do not sacrifice readability for decorative effects.

## Validation

After frontend changes, make a best effort to validate:

- no JavaScript console errors
- navigation anchors
- interactive demos
- desktop viewport
- mobile viewport
- missing assets/resources
- obvious overflow/layout issues
- GitHub Pages compatibility

When a task modifies an existing interaction, explicitly test that interaction.

Report validation results rather than simply saying "done".

## Git safety

Before making changes:

- inspect repository status
- preserve pre-existing user changes

Do not:

- discard unrelated changes
- reset user work
- force-push
- rewrite history

Do not commit or push unless the user explicitly requests it.

## Completion report

At the end of meaningful implementation work, report:

- what changed
- files modified
- relevant decisions
- validations performed
- remaining work for the requested phase

Do not claim later phases are complete when they were not part of the task.
