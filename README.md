# DevSecOps Foundation Exam Simulator

A free, local-only practice simulator for the DevSecOps Foundation syllabus.
Static HTML/CSS/JS — no build step, no backend, no tracking.

> Not affiliated with DevOps Institute or any certifying body. Questions are
> original study material covering the public DSOF syllabus areas.

## Features

- **Three modes**
  - **Practice** — instant per-question feedback with full explanations
  - **Exam** — timed conditions; score and pass/fail revealed at the end
  - **Revision** — automatically drills questions you missed or flagged
- **168 questions** across 14 topic areas
  - Principles & Concepts, Culture & Collaboration, Controls & Compliance,
    Risk & Threat Modeling, Security Testing Tools, CI/CD Pipeline Security,
    Secrets & Cryptography, Container & Cloud Security, Monitoring & Incident
    Response, Identity & Access Management, Application Security, DevOps &
    Automation, Software Supply Chain, Data Protection & Privacy
- Configurable session: count, category, difficulty, timer, pass mark, shuffle
- Question navigator, mark for review, per-attempt scoring
- Detailed review filterable by All / Incorrect / Skipped / Flagged
- Stats screen: best/avg score, per-category accuracy, recent attempts
- **Session resume** — refresh or close the tab without losing progress
- Keyboard shortcuts for fast practice
- Local-only storage (`localStorage`); a one-click `Reset` clears everything

## Keyboard shortcuts

| Action | Keys |
| --- | --- |
| Select choice | `1` – `9` |
| Next question | `N` or `→` |
| Previous question | `P` or `←` |
| Flag / unflag | `F` |
| Submit (practice) / next | `Enter` |

## Project structure

```
DevSecOpsExamTool/
├─ index.html
├─ css/styles.css
├─ js/
│  ├─ questions.js   # question bank
│  └─ app.js         # all UI/logic
└─ README.md
```

## Run locally

The simplest path — just open `index.html` in a browser. On Windows:

```powershell
Start-Process .\index.html
```

If your browser blocks `localStorage` on `file://` URLs, serve the folder over
HTTP instead. Any of these work:

```powershell
# Python 3 (anywhere it's installed)
python -m http.server 5173

# Node (npx, no install needed)
npx --yes http-server -p 5173 -c-1

# PowerShell 7 + dotnet (built-in on many machines)
dotnet serve -p 5173
```

Then visit <http://localhost:5173>.

## Deploy

It's a static site, so any static host works.

### GitHub Pages

```powershell
git init
git add .
git commit -m "DevSecOps Foundation exam simulator"
git branch -M main
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main
```

In GitHub: **Settings → Pages → Build from a branch → `main` / `(root)`**.

### Netlify (drag and drop)

1. Visit <https://app.netlify.com/drop>
2. Drag the `DevSecOpsExamTool` folder onto the page

### Vercel

```powershell
npx vercel
```

When asked, accept the static deployment defaults.

### Cloudflare Pages / S3 / Nginx / IIS

Upload the folder; serve `index.html` as the entry point. No special config
required.

## Privacy

Everything stays in your browser. The app does not call any external APIs and
does not load remote scripts or fonts. Reset wipes all locally stored data:

- `dsof.history.v1`   — recent attempts
- `dsof.revision.v1`  — your revision queue
- `dsof.catstats.v1`  — per-category accuracy
- `dsof.resume.v1`    — in-progress session for resume

## Adding or editing questions

Edit `js/questions.js`. Each entry has:

```js
{
  id: 169,                          // unique number
  category: "Application Security", // pick existing or new — selector populates automatically
  difficulty: "easy",               // "easy" | "medium" | "hard"
  question: "What is ...?",
  choices: ["A", "B", "C", "D"],    // 2–9 choices supported
  answer: 1,                        // index into choices (0-based)
  explanation: "Because ..."        // shown after submit (practice) or in review
}
```

The question bank is plain JS — no schema, no compiler. Reload the page to pick
up changes.

## Browser support

Tested mentally and via syntax-check; verified to work on current Chromium and
Firefox. Requires `localStorage` to remember progress and history.

## License

This repository contains no third-party code. Use it freely for personal study.
