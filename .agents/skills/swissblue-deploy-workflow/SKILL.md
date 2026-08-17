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

## Workflow Steps

1. **Development**:
   - Create a feature branch: `codex/<feature-name>` or `claude/<feature-name>`.
   - Run local checks: `npm run build` to ensure TypeScript, static generation, and linting pass.

2. **Staging Review**:
   - Push feature branch to GitHub.
   - Merge into `staging` branch (standing user approval for staging).
   - Verify changes on `https://test.swissblue.sa`.

3. **Production Release**:
   - Only deploy to production (`main`) when explicitly requested by the user.
   - Merge `staging` into `main` and push to `origin/main`.
   - Verify deployment readiness on `https://swissblue.sa`.
