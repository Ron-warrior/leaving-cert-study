import { cp, rm } from "node:fs/promises";

await rm("dist-sites", { recursive: true, force: true });
await cp("dist", "dist-sites", { recursive: true });
await rm("dist-sites/audio", { recursive: true, force: true });
await rm("dist-sites/.nojekyll", { force: true });
console.log("Prepared dist-sites for Freebuff Sites (audio served from R2).");
