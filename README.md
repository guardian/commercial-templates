# Guardian Commercial Templates

Guardian Commercial Templates is the codebase for the bespoke native ads we build and preview for The Guardian. It contains the template routes, preview app, build tooling, and deployment scripts used to turn commercial concepts into editable Svelte templates and publish them to Google Ad Manager and GitHub Pages.

The current preview site is published at [guardian.github.io/commercial-templates](https://guardian.github.io/commercial-templates/), and the template authoring guide lives in [docs/svelte-template-authoring.md](docs/svelte-template-authoring.md).

## Contents

- [Guardian Commercial Templates](#guardian-commercial-templates)
  - [Contents](#contents)
  - [1. Introduction](#1-introduction)
  - [2. Getting Started](#2-getting-started)
  - [3. How It Works](#3-how-it-works)
  - [4. Useful Links](#4-useful-links)
  - [5. Terminology](#5-terminology)

## 1. Introduction

This project exists to help commercial editors, designers, and engineers produce native advertising that fits The Guardian's tone and layout. Instead of hand-coding one-off ad pages, each creative is implemented as a template route that can be previewed locally, checked visually, and deployed into Google Ad Manager.

The project currently contains 18 templates across several families, including Fabric, CAPI, Manual, Public Good, Image Native, Events, Mobile Revealer, and Interscroller. Those templates share a common preview app and build pipeline, so changes to the shared rendering logic can be checked consistently across every ad format.

The main integrations are Google Ad Manager for native styles and creative previews, the commercial templates preview site on GitHub Pages, and the Guardian content APIs used by some templates to fetch article or series data.

## 2. Getting Started

Prerequisites:

- Node.js and pnpm
- Access to the repository and the relevant Google Ad Manager environment if you are testing creative previews

Install dependencies:

```bash
pnpm i
```

Start the local preview app:

```bash
pnpm dev
```

Then open [http://localhost:7777](http://localhost:7777) and choose a template from the preview list. The preview page renders each template in several widths so you can check responsive behaviour quickly.

Useful local commands:

```bash
pnpm check
pnpm lint
pnpm playwright test
pnpm playwright test --ui
```

Run Playwright visual regression tests only while the dev server is running. Test output and diffs are written to `test-results/`.

When you are adding or changing a template, the usual flow is to update the route in `src/routes/templates/<template>/`, adjust any `variables.gam.ts` or `ad.json` values, verify the preview locally, and then add or update the matching Playwright test in `playwright/`.

## 3. How It Works

The app is built with SvelteKit and Vite. Each template is implemented as a SvelteKit route under `src/routes/templates/`, while the preview experience is handled by the `(preview)` routes. The preview page loads the template route in several iframes, injects GAM variables for display, and uses `postMessage` to keep the iframe height in sync with the rendered ad.

```mermaid
flowchart LR
  A[Template route in src/routes/templates/<name>] --> B[Preview route in src/routes/(preview)]
  B --> C[iframe previews at multiple widths]
  A --> D[ad.json and variables.gam.ts]
  D --> E[Google Ad Manager preview and deployment]
  A --> F[Playwright visual regression tests]
  A --> G[Vite build plugins and shared components]
```

The main project pieces are:

- `src/routes/templates/` contains the 18 template routes. Most templates have a `+page.svelte`, an optional `+page.server.ts` or `+page.ts`, an optional `variables.gam.ts`, an optional template `README.md`, and an `ad.json` file.
- `src/routes/(preview)/` provides the preview shell, template listing, and GAM preview links.
- `src/lib/` contains shared rendering components and helpers used by multiple templates.
- `src/vite/` contains custom Vite plugins for extracting assets and transforming GAM variables during template builds.
- `playwright/` contains the visual regression tests that compare the current branch against the published reference images.
- `scripts/deploy/` contains the Python uploader that pushes generated creative output into GAM.

Two implementation details are easy to miss if you are new to the repo:

- Some templates fetch data from the Guardian CAPI endpoints, so the route may include a `README.md` describing the endpoint or series lookup used by that template.
- Deployment depends on `ad.json` containing a `nativeStyleId`, and some templates also include test IDs so the preview app can link directly into GAM.

## 4. Useful Links

- [Svelte template authoring guide](docs/svelte-template-authoring.md) - how to structure a new template route and preview it locally.
- [Deployment script README](scripts/deploy/README.md) - how generated templates are uploaded into Google Ad Manager.
- [Google Ad Manager native styles help](https://support.google.com/admanager/answer/13404315) - reference for the ad format used by these templates.
- [Svelte documentation](https://svelte.dev/docs) - framework reference for template and component code.
- [SvelteKit documentation](https://kit.svelte.dev/docs/introduction) - routing, data loading, and build behaviour.
- [Visual regression results](test-results/) - local screenshots and diffs from Playwright runs.

## 5. Terminology

Native style
: The Google Ad Manager object that stores the HTML and CSS for a native ad creative.

GAM
: Google Ad Manager, the system used to preview, configure, and serve the commercial templates.

Template
: A single SvelteKit route under `src/routes/templates/` that renders one commercial ad format.

Preview
: The local or GitHub Pages view that renders a template in multiple widths and exposes links into GAM.

`ad.json`
: The per-template configuration file that stores GAM identifiers such as `nativeStyleId` and related preview IDs.

CAPI
: Guardian Content API. Some templates use CAPI responses to populate the ad with article or series data.

Fabric
: The main family of Guardian commercial templates for rich native formats, including standard, expandable, and video variants.

Manual
: Templates that are assembled with more explicitly supplied content rather than being driven by CAPI data.

Public Good
: Templates used for public-good style commercial campaigns and their corresponding preview/test variants.
