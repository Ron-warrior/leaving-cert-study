# Leaving Cert Study — Notes, Papers & Practice

A two-subject Leaving Certificate study app built with Astro and TypeScript.
Computer Science and Spanish each keep their notes, question banks, mocks and
practice data in their own folder.

## Structure

```text
subjects/
  cs/
    notes/                          H1 guide + 14 Computer Science chapters
    content/                        CS question bank, original sample paper, demos and Section C lab
  spanish/
    notes/                          Spanish exam guide + 15 HL chapters
    content/                        Spanish question bank, listening and oral data
    audio/                          2024–2026 listening MP3s
engine/
  app/                              Astro app and build scripts
  shared/                           subject registry and shared contracts
docs/                               project README and backlog
archive/                            historical screenshots, source material and work log
```

## Content model

- `engine/shared/subjects.json` — subject identity, display copy and note paths.
- `subjects/<subject>/content/questions.json` — the question bank.
- `subjects/cs/content/original-sample-paper-a.json` — Original Sample Paper A.
- `subjects/cs/content/demos.json` — runnable chapter demos.
- `subjects/cs/content/lab.json` — Section C lab papers and solutions.
- `subjects/spanish/content/listening.json` — Spanish listening papers and transcripts.
- `subjects/spanish/content/oral.json` — Spanish oral roleplays and conversation bank.
- `subjects/<subject>/notes/` — the Markdown chapter notes.

The app reads these files directly at build time. There is no separate content
generator or second frontend to keep in sync.

## Routes

| Route | Screen |
| --- | --- |
| `/` | subject index |
| `/cs/`, `/spanish/` | subject homes and progress |
| `/cs/notes/<slug>/`, `/spanish/notes/<slug>/` | chapter notes and demos |
| `/cs/questions/`, `/spanish/questions/` | self-marking question banks |
| `/cs/mock/`, `/spanish/mock/` | timed mocks |
| `/cs/original-sample-paper-a/` | original Computer Science paper |
| `/spanish/listening/` | listening papers and transcripts |
| `/spanish/oral/` | oral roleplays and conversation practice |
| `/cs/section-c/` | Section C programming lab |
| `/search/` | full-text search |
| `/progress/` | local progress export, restore and study calendar |
| `/404.html` | custom not-found page |

## Commands

```sh
cd engine/app
npm install
npm run dev -- --host 0.0.0.0 --port 3000
npm run check
npm run build
npm run check:links
```

The app is a static Astro build. Python and JavaScript demos run entirely in the
browser through Pyodide and sandboxed iframes. Progress is stored in browser
local storage; nothing is sent to a server.

## Verification

- `npm run check` — 0 errors, 0 warnings, 0 hints.
- `npm run build` — 45 pages.
- `npm run check:links` — 1,496 local links across 45 HTML files.

The living five-item queue is in [NEXT_FEATURES.md](NEXT_FEATURES.md).
