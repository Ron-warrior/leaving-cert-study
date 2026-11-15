<script lang="ts">
  import { onMount } from "svelte";

  type Entry = { key: string; label: string; size: number };
  type CalendarCell = { day: number | null; active: boolean; today: boolean };
  type StudyCalendar = { slug: string; name: string; label: string; cells: CalendarCell[] };

  const labels: Record<string, string> = {
    bank: "Question bank",
    mock: "Timed mock",
    listening: "Listening paper",
    resume: "Last chapter",
    activity: "Study activity",
    reflection: "Study notes",
  };
  const subjectNames: Record<string, string> = {
    cs: "Computer Science",
    spanish: "Spanish",
  };

  const weekdays = ["M", "T", "W", "T", "F", "S", "S"];
  let entries: Entry[] = [];
  let calendars: StudyCalendar[] = [];
  let reflection = "";
  let reflectionStatus = "";
  let status = "";
  let importing = false;
  let fileInput: HTMLInputElement;

  function today(): string {
    return new Date().toISOString().slice(0, 10);
  }

  function readReflection(): string {
    try {
      const saved = JSON.parse(localStorage.getItem("gk2-reflection") || "{}") as Record<string, unknown>;
      return typeof saved?.[today()] === "string" ? String(saved[today()]) : "";
    } catch {
      return "";
    }
  }

  function saveReflection(): void {
    try {
      const saved = JSON.parse(localStorage.getItem("gk2-reflection") || "{}") as Record<string, unknown>;
      const next = saved && typeof saved === "object" ? { ...saved } : {};
      const text = reflection.trim();
      if (text) next[today()] = text;
      else delete next[today()];
      if (Object.keys(next).length) localStorage.setItem("gk2-reflection", JSON.stringify(next));
      else localStorage.removeItem("gk2-reflection");
      entries = readEntries();
      reflectionStatus = text ? "Saved in this browser." : "Note cleared.";
    } catch {
      reflectionStatus = "Could not save this note in the browser.";
    }
  }

  function describeKey(key: string): string {
    const parts = key.split("-");
    const kind = labels[parts[1]] ?? "Study state";
    const subject = subjectNames[parts[2]] ?? parts.slice(2).join(" ");
    return subject ? `${kind} · ${subject}` : kind;
  }

  function readEntries(): Entry[] {
    return Object.keys(localStorage)
      .filter((key) => key.startsWith("gk2-"))
      .sort()
      .map((key) => {
        const value = localStorage.getItem(key) ?? "";
        return { key, label: describeKey(key), size: new Blob([value]).size };
      });
  }

  function pad(value: number): string {
    return String(value).padStart(2, "0");
  }

  function buildCalendar(dates: string[]): { label: string; cells: CalendarCell[] } {
    const now = new Date();
    const year = now.getUTCFullYear();
    const month = now.getUTCMonth();
    const active = new Set(dates);
    const firstWeekday = (new Date(Date.UTC(year, month, 1)).getUTCDay() + 6) % 7;
    const daysInMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
    const today = `${year}-${pad(month + 1)}-${pad(now.getUTCDate())}`;
    const cells: CalendarCell[] = [];
    for (let index = 0; index < firstWeekday; index += 1) {
      cells.push({ day: null, active: false, today: false });
    }
    for (let day = 1; day <= daysInMonth; day += 1) {
      const iso = `${year}-${pad(month + 1)}-${pad(day)}`;
      cells.push({ day, active: active.has(iso), today: iso === today });
    }
    while (cells.length % 7 !== 0) cells.push({ day: null, active: false, today: false });
    return {
      label: now.toLocaleDateString(undefined, { month: "long", year: "numeric", timeZone: "UTC" }),
      cells,
    };
  }

  function readCalendars(): StudyCalendar[] {
    return Object.keys(localStorage)
      .filter((key) => key.startsWith("gk2-activity-"))
      .sort()
      .map((key) => {
        const slug = key.slice("gk2-activity-".length);
        let dates: string[] = [];
        try {
          const saved = JSON.parse(localStorage.getItem(key) || "[]");
          if (Array.isArray(saved)) dates = saved.filter((date) => typeof date === "string");
        } catch {
          // Keep an empty calendar for an unreadable value.
        }
        const calendar = buildCalendar(dates);
        return {
          slug,
          name: subjectNames[slug] ?? slug,
          label: calendar.label,
          cells: calendar.cells,
        };
      });
  }

  function exportProgress(): void {
    const keys = Object.keys(localStorage).filter((key) => key.startsWith("gk2-")).sort();
    if (!keys.length) {
      status = "There is no saved progress to export yet.";
      return;
    }
    const data: Record<string, string> = {};
    for (const key of keys) data[key] = localStorage.getItem(key) ?? "";
    const payload = {
      version: 1,
      exportedAt: new Date().toISOString(),
      data,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "leaving-cert-progress.json";
    link.click();
    URL.revokeObjectURL(url);
    status = `Exported ${keys.length} saved ${keys.length === 1 ? "item" : "items"}.`;
  }

  async function importProgress(event: Event): Promise<void> {
    const input = event.currentTarget as HTMLInputElement;
    const file = input.files?.[0];
    input.value = "";
    if (!file) return;

    importing = true;
    status = "";
    try {
      const parsed = JSON.parse(await file.text()) as {
        version?: number;
        data?: Record<string, unknown>;
      };
      if (parsed.version !== 1 || !parsed.data || typeof parsed.data !== "object") {
        throw new Error("This is not a version 1 progress file.");
      }
      const incoming = Object.entries(parsed.data).filter(
        (entry): entry is [string, string] =>
          entry[0].startsWith("gk2-") && typeof entry[1] === "string",
      );
      if (!incoming.length) throw new Error("The file has no usable saved items.");
      const confirmed = window.confirm(
        `Restore ${incoming.length} saved ${incoming.length === 1 ? "item" : "items"}? This replaces progress with the same keys in this browser.`,
      );
      if (!confirmed) {
        status = "Import cancelled.";
        return;
      }
      for (const [key, value] of incoming) localStorage.setItem(key, value);
      entries = readEntries();
      calendars = readCalendars();
      status = `Restored ${incoming.length} saved ${incoming.length === 1 ? "item" : "items"}. Reloading…`;
      window.setTimeout(() => location.reload(), 700);
    } catch (error) {
      status = `Could not import that file: ${(error as Error).message}`;
    } finally {
      importing = false;
    }
  }

  onMount(() => {
    try {
      entries = readEntries();
      calendars = readCalendars();
      reflection = readReflection();
    } catch {
      status = "This browser is not allowing local storage.";
    }
  });
</script>

<div class="progress-manager">
  <div class="pm-head">
    <div>
      <h2>Saved in this browser</h2>
      <p>
        Question ticks, the mock clock, the selected listening paper and the last chapter are
        stored locally. Export a copy before changing device or clearing site data.
      </p>
    </div>
    <div class="pm-actions">
      <button class="cta" type="button" on:click={exportProgress} disabled={!entries.length}>
        Export progress
      </button>
      <button class="cta ghost" type="button" on:click={() => fileInput?.click()} disabled={importing}>
        {importing ? "Restoring…" : "Restore a file"}
      </button>
      <input
        class="sr-only"
        bind:this={fileInput}
        type="file"
        accept="application/json,.json"
        on:change={importProgress}
        disabled={importing}
        tabindex="-1"
      />
    </div>
  </div>

  <ul class="pm-list" aria-label="Saved progress items">
    {#each entries as entry}
      <li>
        <span class="pm-label">{entry.label}</span>
        <span class="pm-size">{entry.size} bytes</span>
      </li>
    {:else}
      <li class="pm-empty">No progress saved in this browser yet.</li>
    {/each}
  </ul>

  {#if calendars.length}
    <section class="pm-calendars" aria-labelledby="pm-calendars-heading">
      <div class="pm-calendars-head">
        <h2 id="pm-calendars-heading">Study days</h2>
        <p>A day is marked when you open a chapter, bank, mock, listening, oral or lab screen.</p>
      </div>
      <div class="pm-calendar-grid">
        {#each calendars as calendar}
          <article class="pm-calendar">
            <h3>{calendar.name} <span>{calendar.label}</span></h3>
            <div class="pm-weekdays" aria-hidden="true">
              {#each weekdays as weekday}<span>{weekday}</span>{/each}
            </div>
            <div class="pm-days" aria-label={`${calendar.name} study days in ${calendar.label}`}>
              {#each calendar.cells as cell}
                {#if cell.day === null}
                  <span class="pm-blank"></span>
                {:else}
                  <span
                    class:is-active={cell.active}
                    class:is-today={cell.today}
                    class="pm-day"
                    title={`${calendar.label} ${cell.day}${cell.active ? " — studied" : ""}`}
                    aria-label={`${calendar.label} ${cell.day}${cell.active ? ", studied" : ", not studied"}`}
                  >{cell.day}</span>
                {/if}
              {/each}
            </div>
          </article>
        {/each}
      </div>
    </section>
  {:else}
    <p class="pm-note">Study days will appear here after you open a chapter or a practice screen.</p>
  {/if}

  <section class="pm-reflection" aria-labelledby="pm-reflection-heading">
    <div class="pm-reflection-head">
      <h2 id="pm-reflection-heading">Today's note</h2>
      <p>What did you cover? What still feels shaky? This line stays local.</p>
    </div>
    <label class="sr-only" for="pm-reflection">Today's study note</label>
    <textarea
      id="pm-reflection"
      bind:value={reflection}
      on:input={saveReflection}
      rows="3"
      placeholder="One line for future you…"
    ></textarea>
    {#if reflectionStatus}<p class="pm-reflection-status" role="status" aria-live="polite">{reflectionStatus}</p>{/if}
  </section>

  {#if status}
    <p class="pm-status" role="status" aria-live="polite">{status}</p>
  {/if}

  <p class="pm-note">
    The file is a plain JSON copy of the local `gk2-*` keys, including study days. It is not
    uploaded anywhere; restoring it only affects this browser.
  </p>
</div>
