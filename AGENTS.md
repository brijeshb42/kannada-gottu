# Kannada Gottu (ಕನ್ನಡ ಗೊತ್ತು) — Autonomous Agent Brief & Context

Welcome! This document maintains persistent context for AI agents working on the **Kannada Gottu** project.

---

## 🎯 Goal & Pedagogy

- **User Context**: Living in Karnataka for 9 years, starting from absolute beginner level.
- **Methodology**: **Baby/Child Natural Immersion + Spaced Repetition System (SRS)**.
  - Babies learn language by associating **sounds directly with intent, context, and physical gestures** before grammar tables or text.
  - **Spaced Repetition**: Shuffling past words and 2-word combinations into every review session.
  - **Mix & Match Requirement**: Always mix and review past lessons (even 1+ week back) alongside new words to build compound phrases (*"Coffee beku"*, *"Illa, beda"*).

---

## 🕒 Schedule & Quiet Hours

- **Quiet Hours**: **10:00 PM to 8:00 AM IST** (16:30 to 02:30 UTC).
- **No notifications or messages to the user during quiet hours**.

---

## 🏗 Web Application Architecture

- **Repo Path**: `/opt/orc/repos/kannada-gottu`
- **Framework**: Vite 8 + React 19 + TypeScript + **Tailwind CSS 4** (via `@tailwindcss/vite`).
  - Components are written entirely in Tailwind utility classes. Design tokens,
    the `.glass-card` / `.kannada-text` component classes and the `fade-in`
    animation live in `src/index.css` under `@theme` / `@layer`.
  - Fonts (Outfit + Noto Sans Kannada) are loaded from Google Fonts in `index.html`.
- **Icons**: `lucide-react`.
- **Package manager**: `pnpm`. `pnpm dev` / `pnpm build` / `pnpm lint` (oxlint).
- **Data-Driven Architecture** (no backend; JSON is fetched at runtime from `public/`):
  - `public/data/index.json`: Master index listing all available modules, metadata, and stage groupings.
  - `public/data/lessons/lesson-<N>.json`: Individual lesson content containing:
    - `words`: Kannada script, transliteration, phonetic, english, baby analogy, real-world action trigger.
    - `combos`: Mix & match phrases compounding current and past words.
    - `quiz`: 1-minute scenario-based flashcard recall quiz.
  - TypeScript shapes for all of the above are in `src/types.ts` — update them
    alongside any schema change.
- **SRS tab**: `SRSReview` pools words from *every* loaded lesson, Fisher-Yates
  shuffles them into a deck, and reshuffles when the deck is exhausted.
- **Speech**: `src/services/speech.ts` uses the Web Speech API, preferring a
  `kn-IN` voice and falling back to `en-IN` on the transliteration.

---

## 🚀 Cloudflare Deployment

- **Custom Domain**: `kn.brijesh.cc` — attached to the Pages project in the
  Cloudflare dashboard (Pages → kannada-gottu → Custom domains). Wrangler does
  **not** manage the domain binding.
- **Wrangler Config**: `wrangler.json` (Pages output directory: `./dist`).
- **CI/CD Workflow**: `.github/workflows/deploy.yml` (supports `workflow_dispatch` manual trigger and push to `main`/`master`).
- **Secrets Needed on GitHub**:
  - `CLOUDFLARE_API_TOKEN`
  - `CLOUDFLARE_ACCOUNT_ID`

---

## ➕ Adding New Lessons (Instructions for Agents)

When adding Lesson `<N>`:
1. Create `public/data/lessons/lesson-<N>.json` following the schema established in `lesson-1.json`.
2. Append the Lesson `<N>` entry to the `lessons` array in `public/data/index.json`.
3. Include mixed revision combos using words from Lesson 1 through `<N-1>`.
4. Run `pnpm build` to verify TypeScript types and build validity.
5. Commit and push to Git repository (`github.com/brijeshb42/kannada-gottu`).

No component changes are needed for a new lesson — the app is driven entirely
by the JSON.

---

## 📝 Doc Convention

`CLAUDE.md` is a symlink to this file. Edit `AGENTS.md`; never replace the
symlink with a copy.
