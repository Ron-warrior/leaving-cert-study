const AUDIO_PREFIX = "/audio/";

function parseRange(value, size) {
  if (!value) return null;
  const match = /^bytes=(\d*)-(\d*)$/.exec(value.trim());
  if (!match) return null;

  let start;
  let end;
  if (match[1] === "" && match[2] !== "") {
    const suffix = Number(match[2]);
    if (!Number.isFinite(suffix) || suffix <= 0) return null;
    start = Math.max(0, size - suffix);
    end = size - 1;
  } else {
    start = Number(match[1]);
    end = match[2] === "" ? size - 1 : Number(match[2]);
    if (!Number.isFinite(start) || !Number.isFinite(end)) return null;
    start = Math.max(0, start);
    end = Math.min(size - 1, end);
  }

  if (start > end || start >= size) return null;
  return { start, end, offset: start, length: end - start + 1 };
}

async function serveAudio(request, env) {
  if (request.method !== "GET" && request.method !== "HEAD") {
    return new Response("Method not allowed", {
      status: 405,
      headers: { Allow: "GET, HEAD" },
    });
  }

  const key = new URL(request.url).pathname.slice(1);
  const head = await env.AUDIO.head(key);
  if (!head) return env.ASSETS.fetch(request);

  const range = parseRange(request.headers.get("Range"), head.size);
  if (request.headers.get("Range") && !range) {
    return new Response("Range not satisfiable", {
      status: 416,
      headers: { "Content-Range": `bytes */${head.size}` },
    });
  }

  const headers = new Headers();
  head.writeHttpMetadata(headers);
  headers.set("Accept-Ranges", "bytes");
  headers.set("Cache-Control", "public, max-age=31536000, immutable");
  headers.set("ETag", head.httpEtag);

  if (request.method === "HEAD") {
    headers.set("Content-Length", String(range ? range.length : head.size));
    if (range) {
      headers.set(
        "Content-Range",
        `bytes ${range.start}-${range.end}/${head.size}`,
      );
    }
    return new Response(null, { status: range ? 206 : 200, headers });
  }

  const object = await env.AUDIO.get(key, range ? { range } : undefined);
  if (!object) return env.ASSETS.fetch(request);
  headers.set("Content-Length", String(range ? range.length : head.size));
  if (range) {
    headers.set(
      "Content-Range",
      `bytes ${range.start}-${range.end}/${head.size}`,
    );
  }
  return new Response(object.body, { status: range ? 206 : 200, headers });
}

export default {
  async fetch(request, env) {
    if (new URL(request.url).pathname.startsWith(AUDIO_PREFIX)) {
      return serveAudio(request, env);
    }
    return env.ASSETS.fetch(request);
  },
};
