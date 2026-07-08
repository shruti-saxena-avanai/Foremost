# Foremost

A minimal, single-user task manager. Foremost is a frontend-only React + TypeScript single-page app — there's no backend or account system; all tasks are stored in your browser's `localStorage`.

## Features

- Create, edit, complete/reopen, and delete tasks (with delete confirmation)
- Assign a priority (High / Medium / Low, defaults to Medium)
- Tasks auto-sort: Active before Completed, then High to Low priority
- Filter the list by status and priority
- Everything persists locally across reloads — no network calls

## Getting started

Requires Node.js (npm comes with it).

```bash
npm install
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`) in your browser.

## Scripts

| Command           | Description                        |
| ----------------- | ----------------------------------- |
| `npm run dev`     | Start the Vite dev server           |
| `npm run build`   | Type-check and build for production |
| `npm run preview` | Preview the production build        |
| `npm run lint`    | Run oxlint                          |

## Project structure

```
src/
  components/     UI components (AppShell, TaskListView, TaskEditor,
                   DeleteConfirmation, FilterControls, PrioritySelector, Modal)
  state/           Task model and TaskStore (in-memory state + mutations)
  persistence/     TaskPersistence — reads/writes tasks to localStorage
  utils/           Pure helpers — taskSorter, taskFilter
  App.tsx          Wires state, filtering, sorting, and views together
```

## Tech stack

- React 19 + TypeScript
- Vite (build tooling and dev server)
- oxlint (linting)
- Browser `localStorage` (persistence — no backend)
