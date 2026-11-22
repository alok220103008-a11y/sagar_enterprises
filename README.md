# Sagar Enterprises website (React + TypeScript + Node/SQLite)

## Run on your computer (needs Node.js 20+)
    npm install
    npm run dev          # site at http://localhost:5173, API at :3001

## Edit your details
- `src/config.ts` – phone, WhatsApp, email, address, founder, stats, certifications, projects
- `public/founder.jpg` – drop the founder photo here (until then, initials are shown)
- `public/logo.png` – company symbol
- `src/data.ts` – services, FAQ, industries text

## Where enquiries are stored
Quote and service requests are saved in a SQLite database (`server/data.db`).
View them: `npm run enquiries`
Email alerts: copy `.env.example` to `.env` and fill the SMTP settings.

## Deploy
    npm run build && npm start     # Express serves the site and the API together
Host on any Node host (Render, Railway, a VPS). Keep `server/data.db` on a persistent disk and back it up.
