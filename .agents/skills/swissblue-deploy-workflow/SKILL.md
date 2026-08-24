---
name: swissblue-deploy-workflow
description: >-
  Standard operating procedure for developing, testing, previewing on staging, and releasing to
  production for the SwissBlue project.
---

# SwissBlue Deployment Workflow

## Deployment Targets

- **Staging / Preview**: `https://test.swissblue.sa` (auto-deploys from GitHub `staging` branch)
- **Production**: `https://swissblue.sa` (auto-deploys from GitHub `main` branch)

## Memory & Performance Policy (8 GB RAM Host)
- **Zero Local Dev Server Burden**: Do NOT launch persistent background `npm run dev` servers on the local machine to avoid memory pressure and lag.
- **Cloud-First Verification**: Use the auto-deploy staging target (`https://test.swissblue.sa`) for all preview and verification.

## Workflow Steps

1. **Development**:
   - Create a feature branch: `codex/<feature-name>` or `claude/<feature-name>`.
   - Perform lightweight local edits and atomic static checks.

2. **Staging Review (Cloud Preview)**:
   - Push feature branch to GitHub.
   - Merge into `staging` branch (standing user approval for staging).
   - Verify changes on `https://test.swissblue.sa` (zero RAM cost to local machine).

3. **Production Release**:
   - Only deploy to production (`main`) when explicitly requested by the user.
   - Merge `staging` into `main` and push to `origin/main`.
   - Verify deployment readiness on `https://swissblue.sa`.
