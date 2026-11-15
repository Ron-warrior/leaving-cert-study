# Work log

> Historical record. Paths, page counts and references to the removed Rust/legacy
> app reflect the state at the time of each entry, not current setup instructions.

## Session: 2026-11-14

**Start:** 20:28:48 UTC
**Window:** 2 hours (until approximately 22:28 UTC)

Working through the five-item queue in `NEXT_FEATURES.md`, shipping complete
slices and reviewing the list after each one.

### Log

- **20:28** Session started. Current backlog: quick search, focus mode, progress
  on the subject index, offline study, printable revision sheet.
- **20:28** Starting with quick search: the app has enough content that browsing the sidebar is now the slow path.

## Session: 2026-11-15 — web-first migration

**Start:** 00:53:15 UTC
**Minimum window:** 2 hours (until 02:53:15 UTC)

Working through the web-first slices: shared question data, the question bank,
search/progress and polish. The legacy Rust app remains available at
`/legacy/index.html` while the new Astro app is built out.

### Log

- **00:53** Session started. Audited the existing Astro slice and recorded the
  two-hour window.
- **00:56** Fixed the bank island: stale Vite optimizer chunks loaded two copies
  of the Svelte client runtime, so hydration emptied the island. Clear the
  optimizer cache when this recurs.
- **01:01** Fixed bank reactivity: Svelte legacy dependency tracking cannot see
  state reads hidden inside helper functions. Pass `marks`, `year` and `topic`
  explicitly so filters, scores and topic stats update.
- **01:04** Added the persisted timed mock for both subjects and verified timer
  resume, scheme locking, early finish, self-marking and reset.
- **01:07** Exported and added the Spanish listening papers: audio, year switching
  and bilingual transcripts. Added `shared/content/listening.json`.
- **01:08** Exported and added the static Spanish oral trainer. Added
  `shared/content/oral.json`.
- **01:11** Exported chapter demos and the Section C lab. Added a lazy CodeRunner
  (Pyodide, HTML and JavaScript sandboxes), attached demos to chapter pages and
  generated the Section C route. Added `shared/content/demos.json` and
  `shared/content/lab.json`.
- **01:12** Full static build: 41 pages, `astro check` clean; all practice routes
  and the legacy entry return 200. Python, HTML and JavaScript runners checked in
  the browser.
- **01:16** Replaced the crowded subject-home CTA row with a practice card grid
  for the bank, mock, lab, listening and oral screens. Added theme toggles to the
  practice pages.
- **01:18** Added `/search/` and a build-time `/search-index.json`: 192 indexed
  notes, questions, listening items, oral prompts and lab tasks, with subject and
  type filters. Results deep-link to question, listening and lab anchors; the
  listening page reads the hash and switches to the matching paper year.
- **01:21** Added subject-home progress cards backed by the existing browser
  storage, plus a continue-reading link populated by the last opened chapter.
- **01:22** Added a random-question jump in the bank, opening the chosen scheme
  and scrolling to it. Verified search, resume, progress, random question and
  listening deep links in the browser.
- **01:25** Carried progress and the continue-reading link onto the all-subjects
  cards, then reran `astro check` and the static build (42 pages).
- **01:29** Added persisted focus-reading mode on chapters: it hides the chapter
  chrome, demo and footer, narrows the prose column and restores the choice on
  reload. Verified the toggle, persistence and exit state in the browser.
- **01:29** Final QA: 60 CS and 30 Spanish bank cards, 90/150-minute mock clocks
  with locked schemes, listening audio and translation toggle, ten roleplays /
  32 oral questions, eight lab anchors, search filters and all HTML routes.
- **01:30** Added a generated chapter outline with heading anchors and a fixed
  reading-progress line; anchors, progress and print hiding verified. Refreshed
  the feature queue for the remaining work.
- **01:32** Kept search query, type and subject in the URL so reload and Back
  preserve the search. Verified a deep-linked search and the Back path from a
  result. Checked mobile overflow and headings on the note, subject, bank and
  search pages.
- **01:34** Added `/progress/` with a versioned JSON export and validated restore
  of the browser-local `gk2-*` keys. Export and import both verified in the
  browser; the progress page links from the subject-home summary and root footer.
- **01:38** Added `npm run check:links`, a dependency-free checker for every
  local `href`/`src` in the built HTML. It reports 407 checked links across the
  44 HTML files (including the copied legacy app) with no missing targets.
- **01:39** Added listening playback-speed buttons (0.75×–1.5×), a 15-second
  replay control and an audio label; verified the player changes rate and the
  controls expose their active state.
- **01:41** Added local study-day tracking (`gk2-activity-<subject>`) and a
  seven-day strip with a streak on the subject homes. Verified recording on the
  Spanish bank, the active day/strip, and inclusion in the progress export.
- **01:43** Added a `/` keyboard shortcut to focus the search field, with an
  accessible shortcut hint. Verified focus without inserting a slash character.
- **01:44** Added a month calendar of recorded study days to `/progress/`, using
  the same activity dates. Verified both subjects, active-day counts and the
  mobile layout; refreshed the remaining feature queue.
- **01:46** Added a custom `/404.html`, carried “studied today” onto the root
  subject cards, and documented the route table. The 44-page build and 413-link
  checker pass cleanly; the custom 404 correctly returns a 404 status.
- **01:47** Cleared the browser state created by QA so the preview starts with a
  clean local progress slate. Final browser sweep: 43 public routes returned 200,
  exactly one h1 per page, no horizontal overflow at the narrow viewport and no
  page console errors (the deliberate 404 request is the only expected failure).
- **01:50** Added the current day's short study note to `/progress/`, included it
  in the JSON backup and verified typing, persistence, clearing and the empty-list
  state. Refreshed the feature queue once more.
- **01:52** Added direct oral-conversation anchors and listening-transcript
  anchors to search results. The index now has 195 documents; both deep links
  switch the listening year/open the transcript and open the oral prompt.
- **02:04** Replaced the inline data-URI favicon with a static SVG, rechecked the
  build (44 pages / 457 local links), and ran the final bank, mock, note-focus,
  search, progress export/import and narrow-viewport regressions. Browser state
  is clean for the handoff.
- **02:05** Final handoff pass: 195 search documents, 43 Astro public routes and
  the legacy entry returning 200, custom 404 returning 404, all three listening
  MP3s and shared JSON files valid. Documented the verification results in
  `app/README.md`.
- **02:52** Two-hour window closed. Dev server healthy on port 3000, browser
  state clean, home-screen preview open. No commit, push or deployment.
- **07:26** Restored visual parity after comparing the public preview with the
  legacy app: footer links are now spaced, chapter toolbar labels have room, and
  note pages have the old left chapter rail. Link checker now covers 1,031 local
  links; public preview redeployed.
- **11:53** Matched the navigation to the old app rather than the interim
  dropdown: the hamburger now opens a full-height "Chapters & practice" drawer
  with the complete chapter list, subject home, practice links, close control,
  scrim, Escape and focus restoration. The trigger uses the old 48 px rounded
  square treatment and the old 900 px breakpoint; the drawer is 340 px / 86vw.
  Desktop chapter pages keep the rail and desktop subject pages have no
  hamburger, matching the legacy behaviour. `astro check`, the 44-page
  build and the 2,005-link checker pass; public preview redeployed.

