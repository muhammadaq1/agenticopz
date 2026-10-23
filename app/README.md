# AgenticOpz landing page — source

Stack: Vue 3 + Vite + Tailwind CSS v4 + Motion for Vue (motion-v, the Framer Motion team's Vue library).

## Develop
npm install
npm run dev

## Build & deploy
npm run build
Then push the contents of `dist/` to the ROOT of this repository
(index.html + assets/). GitHub Pages serves the repo root at
agenticopz.com. Keep the CNAME file at the repo root untouched.

Layout rule: the call-player stage has a fixed height and all
animations run on transform/opacity only — never break that, or the
page will shift while the demo plays.
