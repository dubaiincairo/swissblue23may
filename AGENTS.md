<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# User Profile & Cost-Optimization Policy (Sole Operator - Price Sensitive)

- **User Context**: The user is the sole operator and owner of `dubaiincairo` and is strictly **price-sensitive**.
- **Maximum Cost-Frugality**: All workflows, agent actions, tools, and background processes must strictly minimize resource consumption, API bills, and cloud compute charges.
- **Codespace Economy**: Ensure idle timeouts are minimal (5–15 mins), stop unused containers immediately, avoid running unneeded persistent processes, and switch to 2-core / lower specs when doing non-intensive work.
- **Host Memory & Performance (8 GB RAM MacBook)**:
  - NEVER run long-lived local dev servers (`npm run dev`) or dev daemons locally.
  - Preview & Verification is 100% Cloud-First via Staging (`https://test.swissblue.sa`) and Codespaces.
  - Local execution is kept strictly lightweight: atomic edits, git operations, and lightweight static checks.

# Deployment workflow

This repo has two long-lived branches:

- `staging` — auto-deploys to the primary preview at `https://test.swissblue.sa`
- `main` (production) — auto-deploys to the production target at `https://swissblue.sa`

Use the cloud preview workflow during development:

1. **Primary preview (Cloud-First):** merge approved work into `staging` and review it at `https://test.swissblue.sa`. This is the durable, zero-local-RAM review URL.
2. **Never push to `main`** unless the user explicitly says "deploy to production" or similar.

When work is finished on a `claude/*` or `codex/*` feature branch:
1. Push the branch to origin.
2. Open a PR into `staging` and merge it (merge commit, not squash) — do this **without asking**. This is the user's standing approval for staging deploys.
3. If a merge into `staging` conflicts, resolve the conflict locally on the feature branch, push, then retry the merge.
