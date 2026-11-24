# AGENTS.md — Kaszubskie Safari

## Project purpose
- This landing page is a market-validation prototype for guided buggy experiences, not a vehicle rental marketplace.
- Preserve the experience-led positioning and Polish-language interface. Do not invent pricing, availability, routes or booking terms; change offer details only when explicitly requested.

## Repository and workflow
- Stack: React, Vite and Tailwind CSS. Follow the existing structure and conventions.
- Check README.md and package.json before changes. Use the Node.js version supported by the project and an actively supported runtime when available.
- Use `npm run dev` for local development and `npm run build` to verify changes. Use the existing lockfile/package manager if present; otherwise follow README.md. Do not introduce paid services or unnecessary dependencies.
- Keep changes narrowly scoped. Review the diff and report the actual checks performed, including any unavailable checks.

## Prototype and data handling
- The documented form uses localStorage for demonstration only; do not describe it as delivering reservations or messages to a backend.
- Do not connect live data collection, analytics, payment, CRM or external services without explicit approval. Never commit credentials or personal data.
- Check mobile usability, accessibility, form validation, keyboard navigation and error states when changing the UI. Avoid claims about functionality that has not been tested.

## Deployment
- Vercel is the documented deployment target. Work on a separate branch; use a preview for verification when available.
- Do not merge to main or publish production changes without explicit approval. Do not change unrelated deployment settings.
- Summarize changes, test results, limitations and one next step in Polish.
