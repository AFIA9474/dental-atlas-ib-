const http = require('http'), fs = require('fs'), path = require('path');
const { teeth, diseases, quiz } = require('./data');
const PORT = process.env.PORT || 3000, PUB = path.join(__dirname, 'public');
const MIME = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml' };

const send = (res, obj, code = 200) => { res.writeHead(code, { 'Content-Type': 'application/json' }); res.end(JSON.stringify(obj)); };

// Same 5 questions for everyone on a given day (seeded shuffle)
function daily() {
  const day = Math.floor(Date.now() / 864e5);
  let s = day * 9301 + 49297;
  const rnd = () => (s = (s * 9301 + 49297) % 233280) / 233280;
  const a = [...quiz];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return { day, items: a.slice(0, 5) };
}

http.createServer((req, res) => {
  const url = req.url.split('?')[0];
  if (url === '/api/teeth') return send(res, teeth);
  if (url === '/api/diseases') return send(res, diseases);
  if (url === '/api/quiz/daily') {
    const d = daily();
    return send(res, { day: d.day, items: d.items.map(({ id, q, options }) => ({ id, q, options })) });
  }
  if (url === '/api/quiz/check' && req.method === 'POST') {
    let body = '';
    req.on('data', c => { body += c; if (body.length > 1e4) req.destroy(); });
    req.on('end', () => {
      try {
        const { id, answer } = JSON.parse(body), item = quiz.find(x => x.id === id);
        if (!item) return send(res, { error: 'Unknown question' }, 404);
        send(res, { correct: answer === item.answer, answer: item.answer, why: item.why });
      } catch { send(res, { error: 'Bad request' }, 400); }
    });
    return;
  }
  const file = path.join(PUB, url === '/' ? 'index.html' : url);
  if (!file.startsWith(PUB)) { res.writeHead(403); return res.end(); }
  fs.readFile(file, (err, buf) => {
    if (err) { res.writeHead(404); return res.end('Not found'); }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream' });
    res.end(buf);
  });
}).listen(PORT, () => console.log(`Dental Atlas running at http://localhost:${PORT}`));
