<script lang="ts">
  import { onMount } from "svelte";

  export let title: string;
  export let blurb: string;
  export let code: string;
  export let lang: "python" | "html" | "js";
  export let showInput = false;

  declare global {
    interface Window {
      loadPyodide?: (options: { indexURL: string }) => Promise<any>;
    }
  }

  const labels = { python: "Python", html: "HTML", js: "JavaScript" };
  const classes = { python: "tag-python", html: "tag-html", js: "tag-js" };
  let current = code;
  let output = "";
  let status =
    lang === "python"
      ? "Python · loads on first run"
      : lang === "html"
        ? "HTML · live preview"
        : "JavaScript · runs in a sandbox";
  let running = false;
  let stdinValue = "";
  let preview = "";

  let pyodidePromise: Promise<any> | null = null;

  function loadPython(): Promise<any> {
    if (pyodidePromise) return pyodidePromise;
    pyodidePromise = new Promise<any>((resolve, reject) => {
      if (window.loadPyodide) {
        window
          .loadPyodide({ indexURL: "https://cdn.jsdelivr.net/pyodide/v0.27.7/full/" })
          .then(resolve, reject);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/pyodide/v0.27.7/full/pyodide.js";
      script.onload = () => {
        if (!window.loadPyodide) {
          reject(new Error("The Python runtime did not initialise."));
          return;
        }
        window
          .loadPyodide({ indexURL: "https://cdn.jsdelivr.net/pyodide/v0.27.7/full/" })
          .then(resolve, reject);
      };
      script.onerror = () => reject(new Error("Could not load the Python runtime (check your connection)."));
      document.head.appendChild(script);
    }).catch((error) => {
      pyodidePromise = null;
      throw error;
    });
    return pyodidePromise;
  }

  function jsDocument(source: string): string {
    const safe = source.replace(/<\/script/gi, "<\\/script");
    return `<!doctype html><html><head><meta charset="utf-8"><style>
      body{margin:0;padding:14px 16px;background:#0b1220;color:#d7e6ff;
        font:12.5px/1.6 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}
      #o{white-space:pre-wrap;margin:0}
    </style></head><body><div id="o"></div><script>
      const o = document.getElementById("o");
      const fmt = (a) => a.map((x) => {
        try { return typeof x === "object" ? JSON.stringify(x) : String(x); }
        catch (e) { return String(x); }
      }).join(" ");
      const show = (t) => { o.textContent += t + "\\n"; };
      ["log", "info", "warn", "error"].forEach((k) => { console[k] = (...a) => show(fmt(a)); });
      window.addEventListener("error", (e) => show("Error: " + e.message));
      try {
${safe}
      } catch (e) { show("Error: " + e.message); }
    <\\/script></body></html>`;
  }

  async function runPython(): Promise<void> {
    const started = performance.now();
    output = "";
    running = true;
    status = "loading Python…";
    try {
      const py = await loadPython();
      if (current.includes("import sqlite3")) {
        status = "loading sqlite3…";
        await py.loadPackage("sqlite3");
      }
      const inputValues = stdinValue.split(/\r?\n/);
      while (inputValues.length && inputValues[inputValues.length - 1] === "") inputValues.pop();
      py.globals.set("__gk_stdin", inputValues);
      py.runPython(`
import builtins
_gk_inputs = list(__gk_stdin)
def _gk_input(prompt=""):
    if prompt:
        print(prompt, end="")
    if not _gk_inputs:
        raise EOFError("No more input. Add one value per line under Program input.")
    value = str(_gk_inputs.pop(0))
    print(value)
    return value
builtins.input = _gk_input
`);
      const lines: string[] = [];
      py.setStdout({ batched: (line: string) => lines.push(line) });
      py.setStderr({ batched: (line: string) => lines.push(line) });
      status = "running…";
      try {
        await py.runPythonAsync(current);
      } catch (error) {
        lines.push(String((error as { message?: string })?.message ?? error));
      }
      output = lines.length ? lines.join("\n") : "(no output)";
      status = `Python · ${Math.round(performance.now() - started)} ms`;
    } catch (error) {
      output = String((error as { message?: string })?.message ?? error);
      status = "Python runtime unavailable";
    } finally {
      running = false;
    }
  }

  async function run(): Promise<void> {
    if (lang === "python") {
      await runPython();
      return;
    }
    preview = lang === "html" ? current : jsDocument(current);
    status = lang === "html" ? "HTML · preview updated" : "JavaScript · sandbox";
  }

  onMount(() => {
    if (lang !== "python") run();
  });
</script>

<section class="demo" data-lang={lang}>
  <div class="demo-head">
    <span class={`demo-tag ${classes[lang]}`}>{labels[lang]}</span>
    <h4>{title}</h4>
    <button class="demo-run" type="button" on:click={run} disabled={running}>
      {running ? "Running…" : "▶ Run"}
    </button>
  </div>
  <p class="demo-blurb">{blurb}</p>
  <textarea class="demo-code" bind:value={current} spellcheck="false" aria-label={`${title} code`}
  ></textarea>
  {#if showInput && lang === "python"}
    <div class="demo-stdin">
      <label>
        <span class="demo-stdin-label">Program input <span>one value per line, in the order the program asks</span></span>
        <textarea class="demo-stdin-box" bind:value={stdinValue} spellcheck="false" rows="4"
          placeholder="3&#10;H&#10;50&#10;75"></textarea>
      </label>
    </div>
  {/if}
  <div class="demo-bar">
    <span class="demo-status" aria-live="polite">{status}</span>
  </div>
  {#if lang === "python"}
    <div class="demo-out-wrap">
      <div class="demo-out-head"><span>Output</span></div>
      <pre class="demo-out">{output || "Press Run to execute this code."}</pre>
    </div>
  {:else}
    <iframe class="demo-preview" title={`${title} preview`} sandbox="allow-scripts" srcdoc={preview}></iframe>
  {/if}
</section>
