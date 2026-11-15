# Next features

The five things worth building next. This list is deliberately short: it is a
working queue, not a wish list.

**Last reviewed:** 15 November 2026

## 1. Command-palette search

The web app now has a full `/search/` page over every note, question, listening
item, oral prompt and lab task. The remaining step is a keyboard-first overlay
(Ctrl/Cmd + K or `/`) available from any page, reusing the same index and opening
the exact result without a page transition.

- **Why:** search should not cost a navigation when you are already reading or
  marking a paper. A palette makes the existing index feel immediate.
- **Smallest slice:** a modal input that fetches the existing index on first open,
  with the current subject as the default filter and recent queries remembered.

## 2. Weak-question review queue

Use the ticks already stored in the bank to build a short review queue: questions
with the lowest self-marked percentage, questions carrying the most marks, and
ones not yet opened, with the mix explained before it starts.

- **Why:** marking a scheme is only useful if it changes what gets studied next.
  The bank has enough progress data to make that decision without new content.
- **Smallest slice:** rank the visible bank by `score / marks`, add a review filter,
  and let the existing year and topic filters narrow the queue.

## 3. Weekly review digest

A local weekly summary built from the existing activity, bank and mock state:
study days, weakest topics and questions still untouched. No email, account or
new tracking.

- **Why:** the calendar and reflection capture what happened; a short digest turns
  that history into the next session’s plan.
- **Smallest slice:** a card on `/progress/` computed from the current marks and
  `gk2-activity-*` dates, with links into the existing filters.

## 4. Installable offline study

Make the site an installable PWA with a service worker that caches the shell,
wasm, notes and listening audio after first use, plus a clear offline indicator.

- **Why:** the entire app is already server-less; offline access is a natural
  study advantage and removes dependence on a connection.
- **Smallest slice:** cache the shell and current subject pack; add audio caching
  behind an explicit “Download for offline” action.

## 5. Printable revision sheet

A print stylesheet and one-page-per-chapter export containing the chapter’s key
definitions, mark tariffs and exam wording, with navigation, demos and progress
chrome removed.

- **Why:** printing is still how many students revise, and the current print view
  is only a fallback rather than a designed artifact.
- **Smallest slice:** a clean chapter print view with headings, tables and a
  compact “exam focus” strip.

## Maintenance contract

- Keep exactly **five** open proposals in this file. Never leave it empty or short.
- When one proposal ships, remove it in the same change that ships it.
- Before adding a replacement, re-read the remaining four. Keep only the ones that
  still fit the neutral shell, work for every subject pack and reduce friction
  rather than add decoration. Drop anything outdated or no longer worth doing.
- Refill the list to five. A replacement may be one new idea with four kept, or
  five new ideas if the review retires all of them.
- Re-rank what remains by impact and independence. Prefer work that can ship
  without a redesign or a new content model.
- If fewer than five strong proposals survive, add smaller polish tasks rather
  than padding the list with vague ideas.
