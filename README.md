# AnspruchsCheck.de

A privacy-first web application that helps people in Germany discover public
benefits that may fit their situation.

**Live:** [anspruchscheck.de](https://anspruchscheck.de)

## What it does

- Guides visitors through a seven-step household questionnaire
- Evaluates eight common benefits using deterministic, explainable rules
- Ranks results as **Strong match**, **Worth checking**, or **Not currently**
- Shows possible amounts, reasoning, documents, next steps, and official links
- Stores questionnaire answers only in the visitor's browser
- Requires no login, account, database, cookies, or API keys
- Includes responsive layouts, programme detail pages, a PWA manifest, privacy
  information, and an MVP imprint page

## Included programmes

1. Kindergeld
2. Kinderzuschlag
3. Elterngeld
4. Wohngeld
5. Rundfunkbeitrag exemption
6. Bildung und Teilhabe
7. Unterhaltsvorschuss
8. Mutterschaftsgeld

The checker provides orientation only. A public authority makes every binding
eligibility decision.

## Technology

- Next.js 16 App Router
- React 19
- TypeScript
- Plain responsive CSS
- Browser `localStorage` with a versioned schema
- No backend required for the current MVP

## Run locally

Requirements: Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Quality checks

```bash
npm run lint
npm run typecheck
npm run build
```

## Project structure

```text
app/                 Routes, questionnaire, results and legal pages
components/          Shared site components
lib/benefits.ts      Programme content and official sources
lib/evaluate.ts      Deterministic matching rules
lib/profile.ts       Questionnaire model and local persistence
public/              Icons and static assets
```

## Push to GitHub

Create an empty repository on GitHub, then run:

```bash
git init
git add .
git commit -m "Initial AnspruchsCheck MVP"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/anspruchscheck.git
git push -u origin main
```

## Deployment

This portable Next.js version can be deployed to any compatible Node.js host.
No environment variables are required for the MVP.

## Before commercial promotion

- Replace the MVP imprint notice with the operator's legal name, serviceable
  address and direct contact details.
- Have a German legal professional review the privacy policy and disclaimer.
- Reverify benefit rules and amounts whenever legislation changes.
- Add analytics only with an appropriate consent and privacy setup.

## Copyright

Copyright © 2026 Muhammad Mazhar Munir. All rights reserved. No open-source
license is granted by this repository.
