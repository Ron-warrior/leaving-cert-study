<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import type { Question, Subject } from "../lib/content";

  export let subject: Subject;
  export let questions: Question[];
  export let title: string;
  export let minutes: number;
  export let blurb: string;
  export let storageId = "";
  export let original = false;
  export let extraLink = "";

  type MockMarks = Record<string, number[]>;
  type Status = "idle" | "running" | "finished";
  type Saved = {
    version: 1;
    year: number;
    status: Status;
    deadline: number;
    expired: boolean;
    marks: MockMarks;
  };

  const storageKey = storageId
    ? `gk2-mock-${subject.slug}-${storageId}`
    : `gk2-mock-${subject.slug}`;
  const years = [...new Set(questions.map((question) => question.year))].sort((a, b) => b - a);
  const yearCounts = new Map(
    years.map((option) => [option, questions.filter((question) => question.year === option).length]),
  );

  let year = years[0] ?? new Date().getFullYear();
  let marks: MockMarks = {};
  let status: Status = "idle";
  let deadline = 0;
  let now = Date.now();
  let expired = false;
  let loaded = false;
  let ticker: ReturnType<typeof setInterval> | undefined;

  const qid = (question: Question) =>
    `${question.year}-${question.section}-${question.number}`;

  $: paper = questions.filter((question) => question.year === year);
  $: ordered = [...paper].sort(
    (a, b) => a.section.localeCompare(b.section) || a.number - b.number,
  );
  $: totalMarks = paper.reduce((sum, question) => sum + question.marks, 0);
  $: score = paper.reduce((sum, question) => sum + scoreFor(question, marks), 0);
  $: percent = totalMarks ? Math.round((score / totalMarks) * 100) : 0;
  $: clock =
    status === "running"
      ? formatClock(Math.max(0, deadline - now))
      : status === "finished"
        ? expired
          ? "00:00"
          : "Done"
        : formatClock(minutes * 60_000);
  $: schemeText = original ? "marking guide" : "marking schemes";
  $: referenceText = original ? "marking guide" : "official scheme";
  $: statusText =
    status === "idle"
      ? `Ready when you are. The clock starts at ${minutes} minutes and keeps running if you reload.`
      : status === "running"
        ? original
          ? "Timer running. The marking guide stays locked until you finish."
          : "Timer running. The marking schemes stay locked until you finish."
        : expired
          ? `Time is up — ${schemeText} unlocked. Mark each answer against the ${referenceText} below.`
          : `Mock finished early — ${schemeText} unlocked. Mark each answer against the ${referenceText} below.`;

  function formatClock(ms: number): string {
    const total = Math.max(0, Math.ceil(ms / 1000));
    const mins = Math.floor(total / 60);
    const secs = total % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }

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

  function scoreFor(question: Question, current: MockMarks): number {
    return (current[qid(question)] ?? []).reduce(
      (sum, index) => sum + (question.rubric[index]?.marks ?? 0),
      0,
    );
  }

  function isMarked(question: Question, index: number, current: MockMarks): boolean {
    return (current[qid(question)] ?? []).includes(index);
  }

  function setMark(question: Question, index: number, checked: boolean): void {
    if (status !== "finished") return;
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

  function stopTicker(): void {
    if (ticker !== undefined) {
      clearInterval(ticker);
      ticker = undefined;
    }
  }

  function startTicker(): void {
    stopTicker();
    ticker = setInterval(() => {
      now = Date.now();
      if (status === "running" && deadline > 0 && now >= deadline) finish(true);
    }, 1000);
  }

  function persist(): void {
    if (!loaded) return;
    try {
      const saved: Saved = { version: 1, year, status, deadline, expired, marks };
      localStorage.setItem(storageKey, JSON.stringify(saved));
    } catch {
      // Storage can be unavailable in private mode; the mock still works in memory.
    }
  }

  function start(): void {
    if (status === "running") return;
    status = "running";
    deadline = Date.now() + minutes * 60_000;
    now = Date.now();
    expired = false;
    marks = {};
    persist();
    startTicker();
  }

  function finish(auto: boolean): void {
    if (status !== "running") return;
    expired = auto || Date.now() >= deadline;
    status = "finished";
    stopTicker();
    persist();
  }

  function reset(): void {
    stopTicker();
    status = "idle";
    deadline = 0;
    expired = false;
    marks = {};
    persist();
  }

  function chooseYear(next: number): void {
    if (status === "running" || next === year) return;
    year = next;
    status = "idle";
    deadline = 0;
    expired = false;
    marks = {};
    persist();
  }

  onMount(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const saved = JSON.parse(raw) as Partial<Saved>;
        if (saved.version === 1 && years.includes(Number(saved.year))) {
          year = Number(saved.year);
        }
        if (saved.marks && typeof saved.marks === "object") {
          const clean: MockMarks = {};
          Object.entries(saved.marks).forEach(([id, value]) => {
            if (Array.isArray(value)) {
              clean[id] = [...new Set(value.map(Number).filter((index) => Number.isInteger(index)))].sort(
                (a, b) => a - b,
              );
            }
          });
          marks = clean;
        }
        if (saved.status === "running" || saved.status === "finished" || saved.status === "idle") {
          status = saved.status;
        }
        deadline = Number(saved.deadline) || 0;
        expired = !!saved.expired;
        if (status === "running" && (!(deadline > Date.now()) || saved.expired)) {
          status = "finished";
          expired = true;
        }
      }
    } catch {
      // Ignore corrupt saved state and start clean.
    }
    loaded = true;
    if (status === "running") startTicker();
  });

  onDestroy(stopTicker);
</script>

<section class="mock-head">
  <h2>{title}</h2>
  <p>{blurb}</p>
  {#if extraLink}<a class="mock-original-link" href={extraLink}>Try the original sample paper →</a>{/if}
</section>

<div class="bank-filter mock-years" role="group" aria-label="Choose a mock paper">
  <span class="bf-label">Paper</span>
  {#each years as option}
    <button
      class="bf-btn"
      class:is-active={year === option}
      type="button"
      aria-pressed={year === option}
      disabled={status === "running"}
      on:click={() => chooseYear(option)}
    >
      {original ? "Original" : option} <span>{yearCounts.get(option)} Q</span>
    </button>
  {/each}
</div>

<section class="mock-panel" class:is-running={status === "running"} class:is-finished={status === "finished"}>
  <div class="mock-clock-wrap">
    <span class="mock-clock-label">Time left</span>
    <strong class="mock-clock" aria-live="off">{clock}</strong>
  </div>
  <div class="mock-actions">
    {#if status === "idle"}
      <button class="cta" type="button" on:click={start}>Start {minutes}-minute mock</button>
    {:else if status === "running"}
      <button class="cta ghost" type="button" on:click={() => finish(false)}>Finish &amp; unlock schemes</button>
    {:else}
      <button class="bs-reset" type="button" on:click={reset}>Start another mock</button>
    {/if}
  </div>
  <p class="mock-status" role="status" aria-live="polite">{statusText}</p>
</section>

<p class="mock-meta">
  {paper.length} questions · {totalMarks} marks · {minutes} minutes
</p>

{#if status === "finished"}
  <section class="bank-summary" aria-label="Mock self-marking result">
    <div class="bs-top">
      <div class="bs-score">
        <div class="bs-ring" style={`--p:${percent}`}>
          <strong>{score}</strong>
        </div>
        <span class="bs-of">of <span>{totalMarks}</span> marks ticked</span>
      </div>
      <span class="bs-count">{percent}% self-marked</span>
    </div>
    <div class="bs-bar"><span style={`width:${percent}%`}></span></div>
  </section>
{/if}

<div class="mock-list">
  {#each ordered as question}
    <article class="qcard mock-card" data-marks={question.marks}>
      <div class="qhead">
        <span class="qnum" aria-hidden="true">Q{question.number}</span>
        <span class="qmeta">{original ? "Original sample paper" : question.year} · Section {question.section} · {question.marks} marks</span>
      </div>
      <h4>{question.title}</h4>
      <div class="qprompt">{@html renderPrompt(question.prompt)}</div>
      <details class="qscheme" hidden={status !== "finished"}>
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
                disabled={status !== "finished"}
                on:change={(event) => setMark(question, index, event.currentTarget.checked)}
              />
              <span class="qbox" aria-hidden="true"></span>
              <span class="qtext">{item.point}</span>
              <em>{item.marks}</em>
            </label>
          {/each}
        </div>
        <div class="qscore">
          <strong aria-live="polite">{scoreFor(question, marks)} / {question.marks}</strong>
          <span class="qbar"><span style={`width:${question.marks ? (scoreFor(question, marks) / question.marks) * 100 : 0}%`}></span></span>
        </div>
      </details>
    </article>
  {/each}
</div>
