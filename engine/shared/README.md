# Shared contracts

`subjects.json` is the registry the Astro app uses to discover subject packs:

- subject identity and display copy,
- chapter titles and stable slugs,
- note file paths,
- mock, listening, oral and lab display copy,
- high-level counts used by the subject cards.

Subject-owned content lives beside its notes:

- `subjects/cs/content/questions.json` — Computer Science paper bank,
- `subjects/cs/content/original-sample-paper-a.json` — Original Sample Paper A,
- `subjects/cs/content/demos.json` — Computer Science chapter demo code,
- `subjects/cs/content/lab.json` — Computer Science Section C papers,
- `subjects/spanish/content/questions.json` — Spanish paper bank,
- `subjects/spanish/content/listening.json` — Spanish listening papers,
- `subjects/spanish/content/oral.json` — Spanish oral practice.

The Markdown notes live in `subjects/cs/notes/` and `subjects/spanish/notes/`.
Listening audio is in `subjects/spanish/audio/`.

The app's `/search-index.json` is generated at build time from those notes and
JSON files. It is a derived artifact, not a second content source.

## Rules

- Slugs are stable; they become web routes and future navigation IDs.
- Note paths are repository-relative.
- Display copy may differ by platform, but subject and note identity must not.
- Progress stays browser-local under the app's versioned `gk2-*` keys.
