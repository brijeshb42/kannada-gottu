# Kannada Gottu — ಕನ್ನಡ ಗೊತ್ತು

A fully client-side web app for learning Kannada the way a child does: sound →
intent → gesture, reinforced by spaced repetition. Lessons live as plain JSON
files, so adding one is a data change, not a code change.

Live at **[kn.brijesh.cc](https://kn.brijesh.cc)**.

## Stack

Vite 8 · React 19 · TypeScript · Tailwind CSS 4 · lucide-react · Cloudflare Workers

## Local development

```bash
pnpm install
pnpm dev        # http://localhost:5173
pnpm build      # type-check + production build into dist/
pnpm lint       # oxlint
pnpm preview    # serve the built dist/
```

## Content model

Lessons are static JSON served from `public/`, fetched at runtime — there is no
backend and no build step for content.

```
public/data/index.json              master list of lessons (title, stage, topic, word previews)
public/data/lessons/lesson-<N>.json one lesson: words, combos, quiz
```

A lesson file carries three sections:

- **`words`** — Kannada script, transliteration, phonetic spelling, English
  meaning, a baby-acquisition analogy, and a real-world action trigger.
- **`combos`** — mix & match phrases that compound the new words with words from
  earlier lessons (*"Coffee beku"*, *"Illa, beda"*).
- **`quiz`** — scenario-based recall questions with explanations.

The **SRS Revision** tab pools the words from *every* lesson, shuffles them into
a flashcard deck, and reshuffles on each pass.

### Adding a lesson

1. Create `public/data/lessons/lesson-<N>.json` matching the shape of
   `lesson-1.json` (types are in `src/types.ts`).
2. Append an entry to the `lessons` array in `public/data/index.json`.
3. Include combos that mix the new words with lessons 1…N-1.
4. `pnpm build` to verify types, then commit.

## Deployment

Deployed as a **Cloudflare Worker serving static assets** — `dist/` is uploaded
as the Worker's asset bundle, and there is no Worker script (`wrangler.json` has
no `main`; requests are served straight from the asset store).

`.github/workflows/deploy.yml` runs `wrangler deploy` on push to `main`, or on
demand via **Actions → Deploy to Cloudflare Workers → Run workflow**. The Worker
and the `kn.brijesh.cc` custom domain are both created on the first deploy —
nothing needs provisioning in the dashboard first.

Required repository secrets: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`.
The token needs Workers *and* zone permissions — the **"Edit Cloudflare
Workers"** token template covers it. A Pages-scoped token will not work.

`not_found_handling` is deliberately `"none"`: the app has no client-side
router, and SPA mode would answer a missing `lesson-<N>.json` with `index.html`
and a `200`, so `src/services/data.ts` would try to parse HTML instead of
surfacing its "Failed to load lesson" error.
