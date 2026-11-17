# Dental Atlas
Interactive 2D + 3D tooth atlas, conditions & treatments guide, and a daily quiz.

## Run
1. Install Node.js 18+
2. In this folder: `node server.js`  (no `npm install` needed, zero dependencies)
3. Open http://localhost:3000

The 3D view loads three.js from a CDN, so the browser needs internet access.

## Files
- `server.js` – static server + API (`/api/teeth`, `/api/diseases`, `/api/quiz/daily`, `POST /api/quiz/check`)
- `data.js` – all content: 32 teeth, conditions, quiz bank (edit this to add content)
- `public/index.html`, `style.css`, `app.js` – the front end

## Deploy
Any Node host works (Render, Railway, a VPS). Set `PORT` if needed.
