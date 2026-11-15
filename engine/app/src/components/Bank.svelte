<script lang="ts">
  import { onMount, tick } from "svelte";
  import type { Question, Subject } from "../lib/content";

  export let subject: Subject;
  export let questions: Question[];

  type Marks = Record<string, number[]>;
  type Saved = {
    version: 1;
    year: string;
    topic: string;
    marks: Marks;
  };
  type Undo = { scope: string; entries: Marks };

  const storageKey = `gk2-bank-${subject.slug}`;
  const undoKey = `gk2-bank-undo-${subject.slug}`;
  const undoLimit = 5;
  const yearOptions = [...new Set(questions.map((q) => q.year))].sort((a, b) => b - a);
  const topicLabels = new Map(subject.topics.map((topic) => [topic.slug, topic.label]));
  const chapterLabels = new Map(
    subject.notes.map((note) => [note.slug, note.title.replace(/^\d+\s*·\s*/, "")]),
  );
  const topicOptions = subject.topics.filter((topic) =>
    questions.some((question) => question.chapter === topic.slug),
  );

  let year = "all";
  let topic = "all";
  let marks: Marks = {};
  let loaded = false;
  let confirmOpen = false;
  let resetScope: "all" | string = "all";
  let resetYearCount = 0;
  let resetOtherCount = 0;
  let undoHistory: Undo[] = [];
  let undoOpen = false;
  let undoGroupEl: HTMLSpanElement;
  let undoPopEl: HTMLDivElement;
  let status = "";

  const qid = (question: Question) =>
    `${question.year}-${question.section}-${question.number}`;

  const topicLabel = (slug: string) => topicLabels.get(slug) ?? "Other";
  const chapterLabel = (slug: string) => chapterLabels.get(slug) ?? topicLabel(slug);

  function escapeHtml(value: string): string {
    return value.replace(/[&<>"']/g, (character) => {
      const entities: Record<string, string> = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      };
      return entities[character];
    });
  }

  function renderPrompt(value: string): string {
    return String(value)
      .split(/\n{2,}/)
      .map((part) => {
        const escaped = escapeHtml(part);
        const lines = part.split("\n");
        const codeLines = lines.filter((line) =>
          /(^\s{2,}|[=:{}();]|\b(if|elif|else|while|for|def|print|input|return)\b)/.test(
            line,
          ),
        );
        if (lines.length > 1 && codeLines.length >= Math.ceil(lines.length * 0.5)) {
          const indent = lines
            .filter((line) => line.trim())
            .reduce(
              (min, line) => Math.min(min, line.match(/^[ \t]*/)?.[0].length ?? 0),
              Infinity,
            );
          const cut = indent === Infinity ? 0 : indent;
          const code = lines.map((line) => line.slice(cut)).join("\n");
          return `<pre class="qcode">${escapeHtml(code)}</pre>`;
        }
        return escaped.replace(/\n/g, "<br>");
      })
      .join("<br><br>");
  }

  function renderAnswer(value: string): string {
    return escapeHtml(String(value)).replace(/\n/g, "<br>");
  }

  function sectionInfo(section: string, list: Question[]) {
    const count = list.length;
    const total = list.reduce((sum, question) => sum + question.marks, 0);
    if (subject.slug === "spanish") {
      if (section === "A") {
        return {
          title: "reading comprehension",
          note: "70 marks. Choose one Question 1 option — literature or journalistic text — and answer both Question 2 short texts.",
        };
      }
      if (section === "B") {
        return {
          title: "reading and opinion",
          note: "100 marks. The reading questions (50) and one 80–150-word opinion piece (50).",
        };
      }
      return {
        title: "written production",
        note: "50 marks. Choose one Question 1 task (30) and one Question 2 task (20).",
      };
    }
    if (section === "A") {
      const attempted = count ? Math.round((total * 9) / count) : 0;
      return {
        title: "short answers",
        note: `${attempted} marks on the paper: answer any nine of the twelve questions.`,
      };
    }
    if (section === "B") {
      const each = list[0]?.marks ?? 0;
      return {
        title: "long questions",
        note: `${each * 2} marks on the paper: answer any two of the three. Each question is ${each} marks.`,
      };
    }
    return { title: "", note: "" };
  }

  $: visible = questions.filter(
    (question) =>
      (year === "all" || String(question.year) === year) &&
      (topic === "all" || question.chapter === topic),
  );
  $: groups = yearOptions
    .map((value) => ({
      year: value,
      questions: visible.filter((question) => question.year === value),
    }))
    .filter((group) => group.questions.length > 0);

  function markedTotal(question: Question, current: Marks): number {
    return (current[qid(question)] ?? []).reduce(
      (sum, index) => sum + (question.rubric[index]?.marks ?? 0),
      0,
    );
  }

  $: visibleScore = visible.reduce((sum, question) => sum + markedTotal(question, marks), 0);
  $: visibleMax = visible.reduce((sum, question) => sum + question.marks, 0);
  $: visiblePercent = visibleMax ? Math.round((visibleScore / visibleMax) * 100) : 0;
  $: totalScore = questions.reduce((sum, question) => sum + markedTotal(question, marks), 0);
  $: lastUndo = undoHistory[undoHistory.length - 1];

  $: yearStats = Object.fromEntries(
    yearOptions.map((value) => {
      const list = questions.filter((question) => question.year === value);
      return [
        value,
        {
          count: list.length,
          marks: list.reduce((sum, question) => sum + question.marks, 0),
          score: list.reduce((sum, question) => sum + markedTotal(question, marks), 0),
        },
      ];
    }),
  );

  $: topicStats = Object.fromEntries(
    topicOptions.map((option) => {
      const list = questions.filter(
        (question) =>
          (year === "all" || String(question.year) === year) &&
          question.chapter === option.slug,
      );
      return [
        option.slug,
        {
          count: list.length,
          marks: list.reduce((sum, question) => sum + question.marks, 0),
          score: list.reduce((sum, question) => sum + markedTotal(question, marks), 0),
        },
      ];
    }),
  );

  function isMarked(question: Question, index: number, current: Marks): boolean {
    return (current[qid(question)] ?? []).includes(index);
  }

  function setMark(question: Question, index: number, checked: boolean): void {
    const id = qid(question);
    const next = new Set(marks[id] ?? []);
    if (checked) next.add(index);
    else next.delete(index);
    const updated = { ...marks };
    if (next.size) updated[id] = [...next].sort((a, b) => a - b);
    else delete updated[id];
    marks = updated;
    persist();
  }

  function selectYear(value: string): void {
    year = value;
    topic = "all";
    persist();
  }

  function selectTopic(value: string): void {
    topic = value;
    persist();
  }

  function weakestTopic(): void {
    const entries = Object.entries(topicStats).filter(([, stat]) => stat.marks > 0);
    if (!entries.some(([, stat]) => stat.score > 0)) {
      status = "Mark a few questions first and this will pick your weakest topic.";
      return;
    }
    const [slug, stat] = entries.reduce((best, entry) => {
      const bestRatio = best[1].score / best[1].marks;
      const ratio = entry[1].score / entry[1].marks;
      if (ratio < bestRatio || (ratio === bestRatio && entry[1].marks > best[1].marks)) return entry;
      return best;
    });
    topic = slug;
    persist();
    status = `Focused on ${topicLabel(slug)} — ${Math.round((stat.score / stat.marks) * 100)}% ticked.`;
  }

  function tickedIn(scope: "all" | string): number {
    return questions
      .filter((question) => scope === "all" || String(question.year) === scope)
      .reduce((sum, question) => sum + (marks[qid(question)]?.length ?? 0), 0);
  }

  function openReset(): void {
    const active = year !== "all" && yearStats[year] ? year : "all";
    const yearCount = active === "all" ? 0 : tickedIn(active);
    const totalCount = tickedIn("all");
    resetScope = active !== "all" && yearCount > 0 ? active : "all";
    resetYearCount = yearCount;
    resetOtherCount = totalCount - yearCount;
    confirmOpen = true;
    undoOpen = false;
  }

  function resetProgress(scope: "all" | string): void {
    const ids = new Set(
      questions
        .filter((question) => scope === "all" || String(question.year) === scope)
        .map((question) => qid(question)),
    );
    const next = { ...marks };
    const removed: Marks = {};
    ids.forEach((id) => {
      if (next[id]?.length) removed[id] = next[id];
      delete next[id];
    });
    if (Object.keys(removed).length) {
      undoHistory = [...undoHistory, { scope, entries: removed }].slice(-undoLimit);
      persistUndo();
    }
    marks = next;
    confirmOpen = false;
    status =
      scope === "all"
        ? "All question bank progress has been cleared."
        : `${scope} question bank progress has been cleared.`;
    persist();
  }

  function undoReset(): void {
    const last = undoHistory[undoHistory.length - 1];
    if (!last) return;
    undoHistory = undoHistory.slice(0, -1);
    undoOpen = false;
    const next = { ...marks };
    Object.entries(last.entries).forEach(([id, value]) => {
      next[id] = [...new Set([...(next[id] ?? []), ...value])].sort((a, b) => a - b);
    });
    marks = next;
    status =
      last.scope === "all"
        ? "All question bank progress has been restored."
        : `${last.scope} question bank progress has been restored.`;
    persist();
    persistUndo();
  }

  function persist(): void {
    if (!loaded) return;
    try {
      const saved: Saved = { version: 1, year, topic, marks };
      localStorage.setItem(storageKey, JSON.stringify(saved));
    } catch {
      // Storage can be unavailable in private mode; the bank still works in memory.
    }
  }

  function persistUndo(): void {
    try {
      sessionStorage.setItem(undoKey, undoHistory.length ? JSON.stringify(undoHistory) : "");
    } catch {
      // Undo history is a convenience; the bank still works in memory.
    }
  }

  function loadUndo(): void {
    try {
      const raw = sessionStorage.getItem(undoKey);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return;
      undoHistory = parsed
        .filter(
          (item): item is Undo =>
            !!item &&
            typeof item === "object" &&
            (item.scope === "all" || /^\d{4}$/.test(String(item.scope))) &&
            !!item.entries &&
            typeof item.entries === "object" &&
            !Array.isArray(item.entries) &&
            Object.keys(item.entries).length > 0,
        )
        .slice(-undoLimit);
    } catch {
      undoHistory = [];
    }
  }

  async function toggleUndo(): Promise<void> {
    undoOpen = !undoOpen;
    if (undoOpen) {
      await tick();
      positionUndoPopover();
    }
  }

  function positionUndoPopover(): void {
    if (!undoOpen || !undoGroupEl || !undoPopEl) return;
    const margin = 16;
    const width = undoPopEl.offsetWidth;
    const rect = undoGroupEl.getBoundingClientRect();
    const left = Math.max(margin, Math.min(rect.right - width, window.innerWidth - margin - width));
    undoPopEl.style.left = `${left - rect.left}px`;
    undoPopEl.style.right = "auto";
  }

  function handleDocumentClick(event: MouseEvent): void {
    if (!undoOpen || !(event.target instanceof Element)) return;
    if (!event.target.closest(".bs-undo-group")) undoOpen = false;
  }

  function handleDocumentKeydown(event: KeyboardEvent): void {
    if (event.key !== "Escape") return;
    if (confirmOpen) {
      confirmOpen = false;
    } else if (undoOpen) {
      undoOpen = false;
    }
  }

  onMount(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const saved = JSON.parse(raw) as Partial<Saved>;
        if (saved.version === 1 && saved.marks && typeof saved.marks === "object") {
          marks = saved.marks;
          if (saved.year === "all" || yearOptions.includes(Number(saved.year))) {
            year = String(saved.year);
          }
          if (saved.topic && (saved.topic === "all" || topicLabels.has(saved.topic))) {
            topic = saved.topic;
          }
        }
      }
    } catch {
      // Ignore corrupt local data and start clean.
    }
    loadUndo();
    loaded = true;
    document.addEventListener("click", handleDocumentClick);
    document.addEventListener("keydown", handleDocumentKeydown);
    window.addEventListener("resize", positionUndoPopover);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
      document.removeEventListener("keydown", handleDocumentKeydown);
      window.removeEventListener("resize", positionUndoPopover);
    };
  });
</script>

<section class="bank-head">
  <h2>Exam questions</h2>
  <p>
    {Math.min(...questions.map((question) => question.year))}–{Math.max(
      ...questions.map((question) => question.year),
    )} Higher Level, Sections {[...new Set(questions.map((question) => question.section))].join(
      " and ",
    )}. Prompts follow each exam paper; answers and mark allocations follow the State
    Examinations Commission marking schemes. The schemes mark holistically, so the
    checklists below are a study aid, not the official breakdown.
  </p>
</section>

<div class="bank-summary">
  <div class="bs-top">
    <div class="bs-score">
      <div class="bs-ring" style={`--p:${visiblePercent}`}>
        <strong>{visibleScore}</strong>
      </div>
      <span class="bs-of">of <span>{visibleMax}</span> marks ticked</span>
    </div>
    <span class="bs-count">{visible.length} questions</span>
  </div>
  <div class="bs-bar"><span style={`width:${visiblePercent}%`}></span></div>
  <div class="bs-foot" hidden={confirmOpen}>
    <p class="bs-hint">Open a card's scheme and tick each point you hit.</p>
    <span class="bs-actions">
      {#if lastUndo}
        <span class="bs-undo-group" bind:this={undoGroupEl}>
          <button
            class="bs-reset bs-undo"
            type="button"
            title={`${undoHistory.length} reset${undoHistory.length === 1 ? "" : "s"} available to undo`}
            aria-label={`${lastUndo.scope === "all" ? "Undo reset" : `Undo ${lastUndo.scope} reset`} — ${undoHistory.length} reset${undoHistory.length === 1 ? "" : "s"} available`}
            on:click={undoReset}
          >
            <span>{lastUndo.scope === "all" ? "Undo reset" : `Undo ${lastUndo.scope} reset`}</span>
          </button>
          <button
            class="bs-undo-count"
            type="button"
            aria-label={`Undo history, ${undoHistory.length} reset${undoHistory.length === 1 ? "" : "s"} available`}
            aria-expanded={undoOpen}
            aria-controls="bank-undo-history"
            title={`${undoHistory.length} reset${undoHistory.length === 1 ? "" : "s"} available to undo`}
            on:click={toggleUndo}
          >
            {undoHistory.length}
          </button>
          <div class="bs-undo-pop" id="bank-undo-history" bind:this={undoPopEl} hidden={!undoOpen}>
            <strong>Undo history</strong>
            <ol>
              {#each [...undoHistory].reverse() as item, index}
                <li>
                  {item.scope === "all" ? "All years reset" : `${item.scope} reset`}
                  {#if index === 0}<em>next</em>{/if}
                </li>
              {/each}
            </ol>
          </div>
        </span>
      {/if}
      {#if totalScore > 0}
        <button
          class="bs-reset"
          type="button"
          aria-controls="bank-reset-confirm"
          aria-expanded={confirmOpen}
          on:click={openReset}
        >Reset progress</button>
      {/if}
    </span>
  </div>
  {#if confirmOpen}
    <div class="bs-confirm" id="bank-reset-confirm">
      <p>
        <strong>{resetScope === "all" ? "Reset all progress?" : `Reset ${resetScope} progress?`}</strong>
        <span>
          {resetScope === "all"
            ? "Every ticked mark will be cleared."
            : `This clears the ${resetYearCount} ticked point${resetYearCount === 1 ? "" : "s"} in ${resetScope}; other years stay untouched.`}
        </span>
      </p>
      <div class="bs-confirm-actions">
        <button class="bs-cancel" type="button" on:click={() => (confirmOpen = false)}>Cancel</button>
        {#if resetScope !== "all"}
          <button class="bs-danger" type="button" on:click={() => resetProgress(resetScope)}>
            Reset {resetScope}
          </button>
        {/if}
        {#if resetScope === "all" || resetOtherCount > 0}
          <button class="bs-danger" type="button" on:click={() => resetProgress("all")}>
            {resetScope === "all" ? "Reset all" : "Reset all years"}
          </button>
        {/if}
      </div>
    </div>
  {/if}
  {#if status}
    <p class="sr-only" role="status" aria-live="polite">{status}</p>
  {/if}
</div>

<div class="bank-filter" role="group" aria-label="Filter questions by exam year">
  <span class="bf-label">Year</span>
  <button
    class="bf-btn"
    class:is-active={year === "all"}
    type="button"
    aria-pressed={year === "all"}
    on:click={() => selectYear("all")}
  >
    All years <span>{visibleScore}/{visibleMax}</span>
  </button>
  {#each yearOptions as value}
    <button
      class="bf-btn"
      class:is-active={year === String(value)}
      type="button"
      aria-pressed={year === String(value)}
      title={`${yearStats[value].count} questions · ${yearStats[value].marks} marks`}
      on:click={() => selectYear(String(value))}
    >
      {value} <span>{yearStats[value].score}/{yearStats[value].marks}</span>
    </button>
  {/each}
</div>

<details class="topic-panel" open={topic !== "all"}>
  <summary>
    <span>Progress by topic</span>
    <span class="tp-summary">Find your weakest area</span>
  </summary>
  <div class="topic-grid">
    {#each topicOptions as option}
      {@const stat = topicStats[option.slug]}
      <button
        class="topic-btn"
        class:is-active={topic === option.slug}
        type="button"
        aria-pressed={topic === option.slug}
        title={`${stat.count} questions · ${stat.marks} marks`}
        on:click={() => selectTopic(option.slug)}
      >
        <span class="topic-top">
          <span class="topic-name">{option.label}</span>
          <span class="topic-count">{stat.count} Q</span>
        </span>
        <span class="topic-meter"><span style={`width:${stat.marks ? Math.round((stat.score / stat.marks) * 100) : 0}%`}></span></span>
        <span class="topic-score">{stat.score}/{stat.marks}</span>
      </button>
    {/each}
  </div>
  <div class="topic-foot">
    <button
      class="topic-all"
      class:is-active={topic === "all"}
      type="button"
      aria-pressed={topic === "all"}
      on:click={() => selectTopic("all")}
    >All topics</button>
    <button class="topic-weakest" type="button" on:click={weakestTopic}>Practise weakest topic</button>
  </div>
</details>

{#if visible.length === 0}
  <div class="section-c-empty"><p>No questions match this filter.</p></div>
{:else}
  {#each groups as group}
    <section class="bank-group">
      {#each [...new Set(group.questions.map((question) => question.section))] as section}
        {@const sectionQuestions = group.questions.filter((question) => question.section === section)}
        {@const info = sectionInfo(section, sectionQuestions)}
        <div class="bank-section">
          <div class={`bank-year bank-year-${section.toLowerCase()}`}>
            <span class="demo-tag">{group.year}</span>
            <h3>Section {section} — {info.title}</h3>
            <p>{info.note}</p>
          </div>
          {#each sectionQuestions as question}
            <article class="qcard" id={`q-${qid(question)}`} data-marks={question.marks} data-topic={question.chapter}>
              <div class="qhead">
                <span class="qnum" aria-hidden="true">Q{question.number}</span>
                <span class="qmeta">{question.year} · Section {question.section} · {question.marks} marks</span>
                <a class="qtag" href={`/${subject.slug}/notes/${question.chapter}/`}>{chapterLabel(question.chapter)}</a>
                {#if markedTotal(question, marks) > 0}
                  <span class="qdone">✓ Marked</span>
                {/if}
              </div>
              <h4>{question.title}</h4>
              <div class="qprompt">{@html renderPrompt(question.prompt)}</div>
              <details class="qscheme">
                <summary>
                  <span>Marking scheme &amp; self-mark</span>
                  <span class="qchev" aria-hidden="true">⌄</span>
                </summary>
                <div class="qanswer">{@html renderAnswer(question.answer)}</div>
                <div class="qrubric">
                  {#each question.rubric as item, index}
                    <label class="qcheck">
                      <input
                        type="checkbox"
                        checked={isMarked(question, index, marks)}
                        on:change={(event) => setMark(question, index, event.currentTarget.checked)}
                      />
                      <span class="qbox" aria-hidden="true"></span>
                      <span class="qtext">{item.point}</span>
                      <em>{item.marks}</em>
                    </label>
                  {/each}
                </div>
                <div class="qscore">
                  <strong aria-live="polite">{markedTotal(question, marks)} / {question.marks}</strong>
                  <span class="qbar"><span style={`width:${question.marks ? (markedTotal(question, marks) / question.marks) * 100 : 0}%`}></span></span>
                  <button
                    class="qclear"
                    type="button"
                    on:click={() => {
                      const next = { ...marks };
                      delete next[qid(question)];
                      marks = next;
                      persist();
                    }}
                  >Clear</button>
                </div>
              </details>
            </article>
          {/each}
        </div>
      {/each}
    </section>
  {/each}
{/if}
