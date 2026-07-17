# q-lisen1 — Tasks API (tutorial fixture)

A tiny in-memory REST API for **tasks**, built on plain Node.js (`http` module).
Zero runtime dependencies.

> ⚠️ **This is an educational stand (fixture) for the [opencode](https://opencode.ai)
> course screencasts. It is NOT production code.** The data lives in memory and is
> lost on every restart, there is intentionally missing validation, magic numbers,
> and a bit of legacy code — all so there is something to find and improve live.

## Requirements

- Node.js 18+ (uses built-in `node --watch` for the `dev` script).

## Run

```bash
npm install   # no-op: zero dependencies, but keeps the workflow identical to real projects
npm start     # node src/server.js  -> http://localhost:4000
npm run dev   # same, with auto-restart on file changes
```

## Endpoints

| Method   | Route          | Body                  | Description                  |
|----------|----------------|-----------------------|------------------------------|
| `GET`    | `/tasks`       | —                     | List all tasks               |
| `GET`    | `/tasks/:id`   | —                     | Get one task by id           |
| `POST`   | `/tasks`       | `{ "title": "..." }`  | Create a task                |
| `PATCH`  | `/tasks/:id`   | `{ "title"?, "done"? }` | Update title and/or `done` |

### Examples

```bash
# create
curl -s -X POST http://localhost:4000/tasks \
  -H 'Content-Type: application/json' \
  -d '{"title":"learn opencode"}'

# list
curl -s http://localhost:4000/tasks

# mark done
curl -s -X PATCH http://localhost:4000/tasks/1 \
  -H 'Content-Type: application/json' \
  -d '{"done":true}'
```

## Project layout

```
src/
  server.js     # HTTP server + routing
  taskStore.js  # in-memory array + CRUD helpers
  legacy.js     # leftover helpers — review material, not used by the server
AGENTS.md       # instructions the opencode agent reads on `/init`
README.md       # this file
```

## Intentional imperfections (for the live demo)

These are deliberate, so the agent has something to find during the screencast:

- **Magic numbers** — e.g. the `100`-char title limit in `src/server.js`, the port `4000`.
- **Duplicated routing conditions** — `parts[0] === 'tasks'` is repeated in every branch.
- **Missing validation** — `PATCH` writes fields without checking them.
- **Mediocre naming** — `t`, `d`, `buf` in the store and server.
- **Legacy file** — `src/legacy.js` has near-duplicate `proc` / `proc2` functions and
  cryptic single-letter names. A clean target for a refactor demo.

License: MIT.
