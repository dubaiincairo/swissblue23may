<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Deployment workflow

This repo has two long-lived branches:

- `staging` — auto-deploys to `swissblue23may-git-staging-dubaiincairos-projects.vercel.app`
- `main` (production) — auto-deploys to the production Vercel target

When work is finished on a `claude/*` feature branch:
1. Push the branch to origin.
2. Open a PR into `staging` and merge it (merge commit, not squash) — do this **without asking**. This is the user's standing approval for staging deploys.
3. **Never push to `main`** unless the user explicitly says "deploy to production" or similar.

If a merge into `staging` conflicts, resolve the conflict locally on the feature branch, push, then retry the merge.
