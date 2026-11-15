<script lang="ts">
  import { onMount } from "svelte";
  import type { SearchDoc } from "../lib/search-index";

  const kinds: Array<{ value: string; label: string }> = [
    { value: "all", label: "Everything" },
    { value: "Notes", label: "Notes" },
    { value: "Questions", label: "Questions" },
    { value: "Listening", label: "Listening" },
    { value: "Oral", label: "Oral" },
    { value: "Lab", label: "Lab" },
  ];

  let docs: SearchDoc[] = [];
  let query = "";
  let kind = "all";
  let subject = "all";
  let loading = true;
  let error = "";
  let mounted = false;

  $: terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  $: subjectOptions = [...new Map(docs.map((doc) => [doc.subject, doc.subjectName])).entries()];
  $: filtered = docs.filter(
    (doc) => (kind === "all" || doc.kind === kind) && (subject === "all" || doc.subject === subject),
  );
  $: results = terms.length
    ? filtered
        .filter((doc) => terms.every((term) => `${doc.title} ${doc.text}`.toLowerCase().includes(term)))
        .map((doc) => ({ ...doc, score: scoreDoc(doc, terms) }))
        .filter((doc) => doc.score > 0)
        .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
        .slice(0, 30)
    : [];

  function scoreDoc(doc: SearchDoc, searchTerms: string[]): number {
    const title = doc.title.toLowerCase();
    const text = doc.text.toLowerCase();
    let score = 0;
    for (const term of searchTerms) {
      if (title.includes(term)) score += 10;
      const first = text.indexOf(term);
      if (first >= 0) {
        score += 2;
        const occurrences = text.split(term).length - 1;
        score += Math.min(4, occurrences);
      }
    }
    return score;
  }

  function snippet(doc: SearchDoc, searchTerms: string[]): string {
    if (!searchTerms.length) return doc.text.slice(0, 160);
    const lower = doc.text.toLowerCase();
    let at = -1;
    for (const term of searchTerms) {
      const found = lower.indexOf(term);
      if (found >= 0 && (at < 0 || found < at)) at = found;
    }
    if (at < 0) return doc.text.slice(0, 160);
    const start = Math.max(0, at - 55);
    const end = Math.min(doc.text.length, at + 150);
    return `${start ? "… " : ""}${doc.text.slice(start, end)}${end < doc.text.length ? " …" : ""}`;
  }

  function syncUrl(): void {
    if (!mounted) return;
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (kind !== "all") params.set("kind", kind);
    if (subject !== "all") params.set("subject", subject);
    const next = params.toString() ? `${location.pathname}?${params.toString()}` : location.pathname;
    history.replaceState(null, "", next);
  }

  function chooseKind(next: string): void {
    kind = next;
    syncUrl();
  }

  function chooseSubject(next: string): void {
    subject = next;
    syncUrl();
  }

  function clearSearch(): void {
    query = "";
    kind = "all";
    subject = "all";
    syncUrl();
  }

  onMount(() => {
    function focusSearch(event: KeyboardEvent): void {
      const target = event.target as HTMLElement | null;
      if (
        event.key === "/" &&
        target?.tagName !== "INPUT" &&
        target?.tagName !== "TEXTAREA" &&
        target?.tagName !== "SELECT"
      ) {
        event.preventDefault();
        document.getElementById("site-search")?.focus();
      }
    }
    window.addEventListener("keydown", focusSearch);
    return () => window.removeEventListener("keydown", focusSearch);
  });

  onMount(async () => {
    const params = new URLSearchParams(location.search);
    if (params.get("q")) query = params.get("q") ?? "";
    if (params.get("kind")) kind = params.get("kind") ?? "all";
    if (params.get("subject")) subject = params.get("subject") ?? "all";
    mounted = true;

    try {
      const response = await fetch("/search-index.json");
      if (!response.ok) throw new Error(`Search index returned ${response.status}.`);
      docs = (await response.json()) as SearchDoc[];
    } catch (err) {
      error = String((err as { message?: string })?.message ?? err);
    } finally {
      loading = false;
    }
  });
</script>

<div class="search-box">
  <label for="site-search">Search notes and practice</label>
  <div class="search-input-row">
    <input
      id="site-search"
      type="search"
      bind:value={query}
      on:input={syncUrl}
      placeholder="Try “binary search”, “Almodóvar” or “normalisation”"
      autocomplete="off"
      aria-keyshortcuts="/"
    />
    {#if query || kind !== "all" || subject !== "all"}
      <button class="search-clear" type="button" on:click={clearSearch}>Clear</button>
    {/if}
  </div>
</div>

<div class="search-filters">
  <div class="search-filter-group" role="group" aria-label="Filter by content type">
    {#each kinds as option}
      <button
        class="search-chip"
        class:is-active={kind === option.value}
        type="button"
        aria-pressed={kind === option.value}
        on:click={() => chooseKind(option.value)}
      >
        {option.label}
      </button>
    {/each}
  </div>
  <div class="search-filter-group" role="group" aria-label="Filter by subject">
    <button
      class="search-chip"
      class:is-active={subject === "all"}
      type="button"
      aria-pressed={subject === "all"}
      on:click={() => chooseSubject("all")}
    >
      All subjects
    </button>
    {#each subjectOptions as [slug, name]}
      <button
        class="search-chip"
        class:is-active={subject === slug}
        type="button"
        aria-pressed={subject === slug}
        on:click={() => chooseSubject(slug)}
      >
        {name}
      </button>
    {/each}
  </div>
</div>

<div class="search-status" aria-live="polite">
  {#if loading}
    Loading the search index…
  {:else if error}
    Search is unavailable: {error}
  {:else if !terms.length}
    {docs.length} indexed notes, questions, listening items, oral prompts and lab tasks.
  {:else}
    {results.length}{results.length === 1 ? " result" : " results"} for “{query}”
    {#if results.length === 30}<span> · showing the strongest 30</span>{/if}
  {/if}
</div>

{#if terms.length && !loading && !error}
  <div class="search-results">
    {#each results as result}
      <a class="search-result" href={result.href}>
        <span class="search-kind">{result.kind}</span>
        <span class="search-subject">{result.subjectName}</span>
        <strong>{result.title}</strong>
        <p>{snippet(result, terms)}</p>
      </a>
    {/each}
    {#if results.length === 0}
      <div class="search-empty">
        <p>No matches. Try a shorter phrase or a different filter.</p>
      </div>
    {/if}
  </div>
{/if}
