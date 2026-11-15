const base = import.meta.env.BASE_URL.endsWith("/")
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

/**
 * Prefix an internal URL with the deployment base path.
 *
 * GitHub Pages serves this app from /<repository>/, while local development
 * and other hosts serve it from /. Hash links and external URLs pass through.
 */
export function withBase(value = ""): string {
  if (
    value.startsWith("#") ||
    /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(value)
  ) {
    return value;
  }

  const path = value.replace(/^\.?\//, "");
  return path ? `${base}${path}` : base;
}
