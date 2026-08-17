# IGCSE Science Lab

An AI-assisted learning platform built around **Cambridge IGCSE Physics 0625** and **Chemistry 0620**.

Understand the concept. Visualise it. Practise it. Master it.

---

## Getting started

```bash
npm install
cp .env.example .env      # then edit AUTH_SECRET and ANTHROPIC_API_KEY
npm run db:push           # create the SQLite database
npm run db:seed           # load the syllabus, lessons, questions and accounts
npm run dev
```

Open http://localhost:3000.

Two development accounts are seeded. **Change or delete them before deploying anywhere public.**
Neither can reach the owner console.

| Email | Password |
| --- | --- |
| `student@example.com` | `student1234` |
| `admin@example.com` | `admin1234` |

### Claiming the owner console

The admin area at `/admin` belongs to exactly one account, named in `OWNER_EMAIL`:

```bash
OWNER_EMAIL="you@example.com"
```

Register at `/signup` with that exact address and the console appears in your account menu. No
password is seeded for it, so nobody can sign in as the owner before you do.

This is deliberately **not** a database role. A role can be granted — by a bug, a stray API call, or
a future feature — whereas an env-pinned email cannot be handed out from inside the running app.
Concretely:

- `requireOwner()` re-reads the email from the **database row**, so a forged or stale token fails.
- Middleware derives ownership from the email on every request, so editing `OWNER_EMAIL` revokes
  access immediately without waiting for sessions to expire.
- The `role` column still exists and is kept in step at sign-in, but it is a label. Setting someone
  to `ADMIN` in the users tab does **not** let them in, and the UI says so.
- Leaving `OWNER_EMAIL` blank disables `/admin` entirely.

New accounts start with an empty dashboard on purpose — mastery, weak topics and the study plan are
all derived from real activity rather than seeded with placeholder numbers.

## Plans and billing

| | Free | Pro — ₹299/mo or ₹2,499/yr |
| --- | --- | --- |
| Syllabus, lessons, simulations, calculators, periodic table | ✅ | ✅ |
| Question bank, exam mode, flashcards, progress, planner | ✅ | ✅ |
| NOVA tutor, Explain Anything, notes, diagrams, explainers, photo help | 30-day trial | ✅ |

Every new account starts on a **30-day full-access trial**, no card required. When it ends the
account drops to Free — nothing is deleted, and only the AI features stop.

The split is deliberate: the paid features are the ones that cost money per request, so the content
stays free for students who cannot pay.

### How access is decided

`src/lib/billing/entitlements.ts` **recomputes** access on every check from the trial window and the
live subscription. The `user.plan` column is a cache for listings only — a stale value, a missed
webhook or a hand-edited row cannot grant paid access.

### Connecting Razorpay

Payments are optional. Without keys, the trial and free tier work normally and you can grant Pro to
individual accounts from the owner console.

1. In the Razorpay dashboard create two **subscription plans** — ₹299 monthly and ₹2,499 yearly.
2. Put their plan ids in `RAZORPAY_PLAN_MONTHLY` / `RAZORPAY_PLAN_YEARLY`.
3. Set `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET`.
4. Add a webhook to `https://your-domain/api/billing/webhook` for the `subscription.*` events, and
   put its signing secret in `RAZORPAY_WEBHOOK_SECRET`.

Webhook safety: the HMAC signature is verified before the body is read, and every event is stored by
its unique id, so a retried delivery cannot grant a second period of access.

### Testing the paywall

```bash
npx tsx scripts/set-trial.ts student@example.com -1
```

Sets that account's trial to expired. Use a positive number to restore it.

### Choosing an AI provider

| `AI_PROVIDER` | Key variable | Default model |
| --- | --- | --- |
| `anthropic` | `ANTHROPIC_API_KEY` | `claude-sonnet-5` |
| `google` | `GOOGLE_API_KEY` | `gemini-2.0-flash` |
| `none` | — | curriculum-only fallback |

Both providers support streaming and image analysis. Adding another means one file in `src/lib/ai/`
and one line in `index.ts` — nothing above that layer imports a vendor SDK.

Google keys come from [Google AI Studio](https://aistudio.google.com) and start with `AIza`. An
OAuth authorization code (starting `AQ.` or `4/0A`) is **not** an API key; the app warns at startup
if the value does not look right, rather than failing confusingly on every request.

### Without an AI key

The app runs with no key set. Every AI feature falls back to the **curriculum-grounded provider**,
which assembles answers from the local content database and says plainly on screen that no model is
connected. Nothing is faked, and nothing silently degrades.

---

## Architecture

```
src/
  app/
    (auth)/            sign in / sign up
    api/               server-only routes: auth, tutor, explain, notes, diagram,
                       video, questions, quiz, attempts, analyze, search, plan,
                       flashcards, admin/*
    dashboard/ learn/ tutor/ explain/ notes/ diagrams/ explainer/ lab/
    practice/ exam/ flashcards/ progress/ mistakes/ plan/ map/ search/
    periodic-table/ tools/ photo/ admin/
  components/
    ui/                design-system primitives
    layout/            nav, mobile bar, command palette
    three/             React Three Fiber scenes (lazy, viewport-gated)
    sim/               simulations + registry
    content/ diagram/ notes/ explainer/ practice/ flashcards/ map/ admin/
  lib/
    curriculum/        the syllabus content database (source of truth)
    ai/                provider abstraction, prompts, grounding, fallbacks
    diagrams/          hand-checked diagram specifications
    auth.ts db.ts api.ts progress.ts plan.ts solver.ts elements.ts
prisma/
  schema.prisma        20+ normalised models
  seed.ts              idempotent seeding
```

### Stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js 15 (App Router), React 19, TypeScript strict |
| Styling | Tailwind CSS with a token-driven two-theme design system |
| Animation | Framer Motion, plus deterministic `requestAnimationFrame` loops for simulations |
| 3D | Three.js / React Three Fiber, lazy-loaded and viewport-gated |
| Database | Prisma — SQLite by default, Postgres-ready |
| Auth | JWT session cookies (`jose`) + bcrypt, with STUDENT/ADMIN roles |
| AI | Provider abstraction; Anthropic implemented, others pluggable |

### Moving to Postgres

Change `provider` in `prisma/schema.prisma` to `"postgresql"` and point `DATABASE_URL` at the server.
No model changes are needed — structured payloads are stored as JSON strings precisely so the schema
stays portable.

---

## Content accuracy

This is the part that mattered most, so it is enforced structurally rather than by convention.

**Three kinds of content are kept visibly separate:**

1. **Syllabus structure** — topic and subtopic numbering mapped from the published Cambridge
   specifications, stored per `SyllabusVersion` so a revision can be added without destroying the
   previous cohort's structure.
2. **Authored explanation** — lessons, definitions, worked examples, misconceptions and exam
   technique written for this platform. Labelled as teaching material, never as official wording.
3. **AI-generated practice** — anything a model produces is stored with `origin: AI_GENERATED` and
   `reviewStatus: PENDING`. The practice engine only serves `APPROVED` questions, so generated
   content reaches students through the admin review queue or not at all.

**Provenance is explicit.** Each `SyllabusVersion` carries `UNVERIFIED` / `TEACHER_MAPPED` /
`OFFICIAL_CHECKED`. Seeds ship as `TEACHER_MAPPED`, and the learn pages say so. Promoting a version to
`OFFICIAL_CHECKED` is a deliberate administrative action.

**Grounding.** Every AI route runs `buildGrounding()` first, which retrieves matching subtopics,
definitions and formulae from the database and injects them into the prompt. Responses cite the
subtopic numbers they were grounded in, and the UI shows them.

**Diagrams are data, not images.** `src/lib/diagrams/library.ts` holds hand-checked `DiagramSpec`
objects rendered as SVG. Requests matching the library always use the verified version; a generated
layout is a labelled fallback.

---

## Security

- API keys are server-side only. No AI provider is imported into a client component.
- Every AI route requires an authenticated user and passes through per-minute and per-day quotas.
- All request bodies are validated with Zod; `handleRoute()` maps failures to consistent responses
  and never leaks stack traces.
- Passwords are bcrypt-hashed (cost 12). Sessions are signed JWTs in httpOnly, SameSite=Lax cookies.
- Middleware guards student and admin routes on the edge; pages re-check their own access.
- Quiz answers, mark schemes and explanations are withheld from `/api/quiz` and only returned by
  `/api/attempts` after an answer is committed.
- The last administrator cannot be demoted, so the review queue can never become unreachable.

---

## What works, and what does not

Everything visible either works, has a backend, or is labelled as planned.

**Working end to end:** authentication and roles; the full syllabus browser; dashboard, mastery with
time decay, streaks, XP and achievements; the tutor with five modes and streaming; Explain Anything;
notes in five styles with PDF export via print; the diagram engine; the explainer studio with
narration and timeline; 15 simulations; both calculators; the periodic table; the practice engine
with self-marking; exam mode with timer and analysis; spaced-repetition flashcards; the mistake
analyser; the knowledge map; global search; photo analysis; and the admin console.

**Labelled as planned:** six catalogued simulations (`forces-lab`, `energy-skate`, `pressure-depth`,
`induction-lab`, `gas-particles` variants, `ionic-bonding`) have syllabus entries but no interactive
implementation yet. The Simulation Lab derives availability from
`src/components/sim/available.ts` and renders them as non-clickable "planned" cards — a dev-time
assertion keeps that list honest against the registry.

**Content depth is uneven, and the UI says so.** All 73 subtopics have objectives; around 20 have
full authored lessons. Subtopics without one show an explicit "lesson still being written" state
rather than an empty page.

---

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build (runs `prisma generate` first) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run db:push` | Sync the schema |
| `npm run db:seed` | Seed curriculum + accounts (idempotent) |
| `npm run db:reset` | Wipe and reseed |
| `npm run db:studio` | Prisma Studio |

---

## Accessibility and performance

- Full keyboard navigation, visible focus rings, ARIA on every interactive control.
- `prefers-reduced-motion` is honoured in CSS **and** in the canvas/3D loops, which stop entirely.
- 3D is lazy-loaded and only mounts when scrolled into view; particle counts drop on small screens
  and device pixel ratio is capped at 1.5.
- Simulations are individually code-split.
- Wide content scrolls inside its own container — the page body never scrolls sideways.
- Responsive at 375 / 768 / 1280, with a bottom navigation bar on phones.

---

## Disclaimer

IGCSE Science Lab is an independent study tool. It is not endorsed by or affiliated with Cambridge
Assessment International Education. The syllabus codes 0625 and 0620 identify the specifications this
tool is designed around. Always check the official syllabus document published by Cambridge for
authoritative requirements. No content here is a past-paper question.
