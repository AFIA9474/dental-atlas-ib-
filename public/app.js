const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
let teeth = [], diseases = [], selected = null, three = null;

/* ---------- arch geometry shared by 2D and 3D ---------- */
const W = [.9, .7, .8, .75, .75, 1.1, 1.05, .95], A = 4.2, B = 3.2;
function place(f) {
  const sg = (f.q === 1 || f.q === 4) ? -1 : 1;
  const th = (W.slice(0, f.pos - 1).reduce((a, b) => a + b, 0) + W[f.pos - 1] / 2) / A;
  return { sg, th, x: sg * A * Math.sin(th), d: B * (1 - Math.cos(th)), ang: Math.atan2(B * Math.sin(th), A * Math.cos(th)) };
}

/* ---------- boot ---------- */
(async function () {
  [teeth, diseases] = await Promise.all([fetch('/api/teeth').then(r => r.json()), fetch('/api/diseases').then(r => r.json())]);
  build2D(); buildDiseases(); loadQuiz();
})();

/* ---------- tabs and view toggle ---------- */
$('#tabs').onclick = e => {
  const t = e.target.dataset.tab; if (!t) return;
  $$('#tabs button').forEach(b => b.classList.toggle('on', b === e.target));
  ['atlas', 'conditions', 'quiz'].forEach(id => $('#' + id).hidden = id !== t);
  if (t !== 'atlas') closeSheet();
};
$('#viewToggle').onclick = e => {
  const v = e.target.dataset.view; if (!v) return;
  $$('#viewToggle button').forEach(b => b.classList.toggle('on', b === e.target));
  $('#view2d').hidden = v !== '2d'; $('#view3d').hidden = v !== '3d';
  if (v === '3d') init3D();
};

/* ---------- selection and info sheet ---------- */
function select(fdi) {
  selected = teeth.find(t => t.fdi === fdi);
  $$('.t').forEach(g => g.classList.toggle('sel', +g.dataset.f === fdi));
  highlight3D();
  const t = selected, rel = relatedDiseases(t);
  $('#sheetBody').innerHTML = `
    <h3>${t.name[0].toUpperCase() + t.name.slice(1)}</h3>
    <div class="meta">FDI ${t.fdi} · Universal #${t.universal} · ${t.type}</div>
    <dl>
      <dt>Function</dt><dd>${t.role}</dd>
      <dt>Crown</dt><dd>${t.cusps}</dd>
      <dt>Roots</dt><dd>${t.roots}</dd>
      <dt>Erupts</dt><dd>${t.erupt}</dd>
      <dt>Good to know</dt><dd>${t.fact}</dd>
      <dt>Common problems</dt><dd>${t.risk}</dd>
    </dl>
    <div class="chips">${rel.map(d => `<button data-d="${d.id}">${d.name}</button>`).join('')}</div>`;
  $('#sheet').hidden = false; $('#hint').hidden = true;
}
function relatedDiseases(t) {
  const ids = ['caries', 'pulpitis', 'abscess'];
  if (t.pos === 8) ids.push('impaction'); else ids.push('gingivitis');
  if (t.type === 'molar') ids.push('periodontitis');
  return diseases.filter(d => ids.includes(d.id));
}
function closeSheet() { $('#sheet').hidden = true; }
$('#closeSheet').onclick = closeSheet;
