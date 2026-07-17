# AGENTS.md

Instructions for the opencode agent working in this repo.
Read this before editing code.

## What this is

A **tutorial fixture** — a deliberately small and slightly imperfect Node.js REST API
for "tasks". It exists as a sandbox for opencode course screencasts, not as a real product.
Expect (and point out) intentional code smells; do not assume they are bugs to silently fix.

## Stack

- Plain Node.js (>= 18). No TypeScript, no bundler, no framework.
- HTTP server: built-in `http` module.
- Storage: in-memory array in `src/taskStore.js`. Data resets on restart.

## Commands

```bash
npm install     # zero deps — runs instantly, but keeps the standard workflow
npm start       # start the API on http://localhost:4000
npm run dev     # start with node --watch (auto-reload on save)
```

There is no test suite yet. To smoke-test manually:

```bash
curl -s -X POST http://localhost:4000/tasks -H 'Content-Type: application/json' -d '{"title":"hello"}'
curl -s http://localhost:4000/tasks
```

## Layout

- `src/server.js` — HTTP server, routing, request/response helpers.
- `src/taskStore.js` — in-memory CRUD for tasks.
- `src/legacy.js` — unused legacy helpers; review/refactor material only.

## Conventions

- CommonJS (`require` / `module.exports`). Do not introduce ESB unless asked.
- `'use strict';` at the top of each module.
- Simple, common English identifiers for new code (see global naming rules).
- Endpoints speak JSON; errors look like `{ "error": "...", "detail"?: "..." }`.

## Endpoints

- `GET /tasks` — list
- `GET /tasks/:id` — get one
- `POST /tasks` — create (body `{ title }`)
- `PATCH /tasks/:id` — update (body `{ title?, done? }`)

## Known smells (intentional — call them out, don't silently "fix" mid-demo)

- Magic numbers: title length `100`, port `4000`.
- Repeated routing conditions (`parts[0] === 'tasks'`).
- No validation on `PATCH`.
- Short/cryptic names in `legacy.js` (`proc`, `proc2`, `r`, `n`, `s`).
