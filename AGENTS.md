<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Deployment workflow

This repo has two long-lived branches:

- `staging` — auto-deploys to the primary preview at `https://test.swissblue.sa`
- `main` (production) — auto-deploys to the production target at `https://swissblue.sa`

Use two preview methods during development:

1. **Primary preview:** merge approved work into `staging` and review it at `https://test.swissblue.sa`. This is the durable, shareable review URL.
2. **Secondary preview:** run `npm run dev -- --hostname 0.0.0.0 --port 3000` and review `http://127.0.0.1:3000`. Use it for rapid iteration and annotation-tool feedback, but never as the only handoff because the local server is temporary.

When work is finished on a `claude/*` or `codex/*` feature branch:
1. Push the branch to origin.
2. Open a PR into `staging` and merge it (merge commit, not squash) — do this **without asking**. This is the user's standing approval for staging deploys.
3. **Never push to `main`** unless the user explicitly says "deploy to production" or similar.

If a merge into `staging` conflicts, resolve the conflict locally on the feature branch, push, then retry the merge.
