# Leaving Cert Study

[![Open app and install](https://img.shields.io/badge/Open%20app%20and%20install-LC%20Study-16b8d4?style=for-the-badge&logo=googlechrome&logoColor=white)](https://site-f3e44e50dd0045fe93a0faf1eb6cc738.freebuff.page/#install)

Leaving Certificate Computer Science and Spanish study packs: chapter notes,
exam questions, timed mocks, listening papers, oral practice and browser demos.

**To install:** open the app, then tap its **Install app** button. On iPhone or
iPad, use Safari's Share menu and choose **Add to Home Screen**. If no prompt
appears, use your browser menu's **Install app** option; Safari on Mac uses
**File → Add to Dock**.

The repository page cannot open the browser's install prompt itself; the
install control runs on the app's HTTPS origin. Chrome, Edge and Android show
the native install popup. Safari and Firefox do not.

## Project layout

```text
archive/    historical screenshots, source material and work log
docs/       project documentation
engine/     Astro app and shared subject registry
subjects/   Computer Science and Spanish notes, data and audio
```

## Development

```sh
cd engine/app
npm install
npm run dev -- --host 0.0.0.0 --port 3000
```

Build checks:

```sh
npm run check
npm run build
npm run check:links
```

The Freebuff Sites build, which serves listening audio from the attached R2
bucket, is:

```sh
BASE_PATH=/ npm run build:sites
```
