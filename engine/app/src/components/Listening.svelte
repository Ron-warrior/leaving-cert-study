<script lang="ts">
  import { onMount } from "svelte";
  import { withBase } from "../lib/paths";
  import type { ListeningPaper, Subject } from "../lib/content";

  export let subject: Subject;
  export let papers: ListeningPaper[];
  export let note: string;

  const storageKey = `gk2-listening-${subject.slug}`;
  const latestYear = papers.reduce((latest, paper) => Math.max(latest, paper.year), 0);
  const yearOptions = [...papers].sort((a, b) => b.year - a.year);
  let year = latestYear;
  let showEnglish = false;

  $: paper = papers.find((item) => item.year === year) ?? papers[0];
  $: questions = paper?.questions ?? [];
  $: marks = questions.reduce((sum, question) => sum + question.marks, 0);

  function chooseYear(next: number): void {
    year = next;
    try {
      localStorage.setItem(storageKey, String(next));
    } catch {
      // Storage can be unavailable in private mode.
    }
  }

  function applyHash(): void {
    const match = location.hash.match(/^#listen-(\d{4})-q-\d+$/);
    const transcriptMatch = location.hash.match(/^#transcript-(\d{4})$/);
    if (!match && !transcriptMatch) return;
    const next = Number((match ?? transcriptMatch)?.[1]);
    if (!papers.some((item) => item.year === next)) return;
    year = next;
    requestAnimationFrame(() => {
      const target = document.getElementById(location.hash.slice(1));
      if (transcriptMatch && target instanceof HTMLDetailsElement) target.open = true;
      target?.scrollIntoView({ block: "start" });
    });
  }

  onMount(() => {
    try {
      const saved = Number(localStorage.getItem(storageKey));
      if (papers.some((item) => item.year === saved)) year = saved;
    } catch {
      // Keep the latest paper.
    }
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  });
</script>

<section class="section-c-head listen-page-head">
  <h2>Listening practice</h2>
  <p>Play the full paper, answer all seven sections in English, then reveal the scheme.</p>
</section>

<div class="bank-filter mock-years" role="group" aria-label="Choose a listening paper">
  <span class="bf-label">Paper</span>
  {#each yearOptions as item}
    <button
      class="bf-btn"
      class:is-active={year === item.year}
      type="button"
      aria-pressed={year === item.year}
      on:click={() => chooseYear(item.year)}
    >
      {item.year}
    </button>
  {/each}
</div>

{#if paper}
  <div class="listen-panel">
    <div class="listen-head">
      <div>
        <span class="listen-year">{paper.year}</span>
        <strong>{paper.year} Listening Comprehension</strong>
      </div>
      <span class="listen-meta">{paper.duration} · {marks} marks · 7 sections</span>
    </div>
    <audio
      class="listen-player"
      controls
      preload="metadata"
      aria-label={`${paper.year} listening audio`}
      src={withBase(paper.audio)}
    >
      Your browser does not support the audio element.
    </audio>
    {#if note}<p class="listen-note">{note}</p>{/if}
    <div class="listen-transcript-wrap">
      <details class="listen-transcript" id={`transcript-${paper.year}`}>
        <summary>Show transcript</summary>
        <button
          type="button"
          class="transcript-toggle"
          aria-pressed={showEnglish}
          on:click={() => (showEnglish = !showEnglish)}
        >
          {showEnglish ? "Show Spanish" : "Translate to English"}
        </button>
        <div class="transcript" lang="es" hidden={showEnglish}>{paper.transcript}</div>
        <div class="transcript" lang="en" hidden={!showEnglish}>
          <p class="transcript-note">English study translation. The Spanish transcript is the official wording.</p>
          {paper.transcriptEn}
        </div>
      </details>
    </div>
  </div>

  <div class="listen-list">
    {#each questions as question}
      <article class="qcard listen-card" id={`listen-${paper.year}-q-${question.number}`}>
        <div class="qhead">
          <span class="qnum" aria-hidden="true">{question.number}</span>
          <span class="qmeta">Section {question.number} · {question.marks} marks</span>
        </div>
        <h4>{question.title}</h4>
        <div class="qprompt">{question.prompt}</div>
        <details class="qscheme">
          <summary>
            <span>Answer &amp; scheme</span>
            <span class="qchev" aria-hidden="true">⌄</span>
          </summary>
          <div class="qanswer">{question.answer}</div>
        </details>
      </article>
    {/each}
  </div>

  <p class="lab-source">
    Questions and answer points follow the {paper.year} SEC Higher Level listening paper and
    marking scheme. Answers must be in English; answering the whole test or section in Spanish
    halves the marks gained.
  </p>
{/if}
