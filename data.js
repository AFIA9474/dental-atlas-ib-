// ---- Tooth content: one entry per position (1-8 from midline); the 32 teeth are generated below ----
const POS = [
  { n: 'Central incisor', type: 'incisor', cusps: 'Straight incisal edge', roots: [1, 1], erupt: ['7–8 years', '6–7 years'],
    role: 'Cuts food and shapes the smile and speech sounds (f, v, s).', fact: 'Upper centrals are the widest front teeth; lower centrals are the narrowest teeth in the mouth.', risk: 'Interproximal caries, trauma, enamel hypoplasia.' },
  { n: 'Lateral incisor', type: 'incisor', cusps: 'Straight incisal edge', roots: [1, 1], erupt: ['8–9 years', '7–8 years'],
    role: 'Assists the central incisor in cutting; guides the jaw in lateral movement together with the canine.', fact: 'Upper laterals are the most commonly congenitally missing teeth after third molars and are often peg-shaped.', risk: 'Palatal pits and the cingulum area plaque; deep lingual groove (palatogingival groove).' },
  { n: 'Canine', type: 'canine', cusps: '1 cusp', roots: [1, 1], erupt: ['11–12 years', '9–10 years'],
    role: 'Tears food and provides canine guidance, protecting posterior teeth in lateral jaw movement.', fact: 'Has the longest root of all teeth; upper canines are the most commonly impacted teeth after third molars.', risk: 'Gingival recession and abfraction at the neck; impaction.' },
  { n: 'First premolar', type: 'premolar', cusps: '2 cusps (buccal and palatal/lingual)', roots: [2, 1], erupt: ['10–11 years', '10–12 years'],
    role: 'Grips and tears food; transitions between canines and molars.', fact: 'The upper first premolar usually has two roots (buccal and palatal), which matters in endodontics.', risk: 'Occlusal and mesial-proximal caries; root fracture risk after root canal.' },
  { n: 'Second premolar', type: 'premolar', cusps: 'Upper: 2 cusps. Lower: 2 or 3 cusps', roots: [1, 1], erupt: ['10–12 years', '11–12 years'],
    role: 'Crushes and grinds food, supports chewing efficiency.', fact: 'Lower second premolars may have a Y-shaped groove pattern with three cusps.', risk: 'Occlusal fissure caries, interproximal caries next to the first molar.' },
  { n: 'First molar', type: 'molar', cusps: 'Upper: 4 (+ cusp of Carabelli). Lower: 5', roots: [3, 2], erupt: ['6–7 years', '6–7 years'],
    role: 'Main grinding tooth; anchors the bite and sets vertical dimension of occlusion.', fact: 'The "six-year molar" is the first permanent tooth to erupt, and the most frequently decayed and restored tooth.', risk: 'Deep fissure caries soon after eruption; furcation involvement; most common root canal tooth.' },
  { n: 'Second molar', type: 'molar', cusps: 'Upper: 4. Lower: 4', roots: [3, 2], erupt: ['11–13 years', '11–13 years'],
    role: 'Grinds food and supports the first molar.', fact: 'Lower second molar roots are often fused (C-shaped canals), making root canal treatment challenging.', risk: 'Fissure caries, distal caries; periodontal pockets after wisdom tooth extraction.' },
  { n: 'Third molar (wisdom tooth)', type: 'molar', cusps: 'Variable, 3–5', roots: [3, 2], erupt: ['17–21 years', '17–21 years'],
    role: 'Extra grinding capacity when present and well positioned.', fact: 'Often impacted, rotated or congenitally absent; root anatomy is highly variable, often fused.', risk: 'Pericoronitis, impaction, distal caries on the second molar.' }
];
const SIDE = { 1: 'right', 2: 'left', 3: 'left', 4: 'right' };
const teeth = [];
for (const q of [1, 2, 3, 4]) for (let p = 1; p <= 8; p++) {
  const d = POS[p - 1], up = q < 3, arch = up ? 'Upper' : 'Lower';
  teeth.push({ fdi: q * 10 + p, q, pos: p, arch, side: SIDE[q], type: d.type,
    name: `${arch} ${SIDE[q]} ${d.n.toLowerCase()}`, cusps: d.cusps, roots: d.roots[up ? 0 : 1], erupt: d.erupt[up ? 0 : 1],
    role: d.role, fact: d.fact, risk: d.risk,
    universal: ((q === 1 ? p : q === 2 ? 17 - p : q === 3 ? 16 + p : 33 - p)) });
}

const diseases = [
  { id: 'caries', name: 'Dental caries (cavities)', stage: 'Enamel → dentin → pulp',
    cause: 'Biofilm bacteria (Streptococcus mutans, Lactobacillus) ferment sugars, producing acid that demineralizes enamel.',
    signs: 'White-spot lesion, brown or black pit, sensitivity to sweet/cold, visible cavity on radiograph (bitewing).',
    treatment: ['Early (white spot): fluoride varnish, remineralization, diet counselling', 'Moderate: removal of decay and composite or glass-ionomer restoration', 'Deep: indirect/direct pulp cap, or crown if large', 'Prevention: fissure sealants, brushing with fluoride toothpaste, interdental cleaning'] },
  { id: 'pulpitis', name: 'Pulpitis', stage: 'Reversible vs irreversible',
    cause: 'Deep caries, cracked tooth, or leaking restoration lets bacteria irritate the pulp.',
    signs: 'Reversible: short sharp pain to cold that stops quickly. Irreversible: lingering or spontaneous pain, pain at night.',
    treatment: ['Reversible: remove the cause and place a sedative or bioactive base, then restore', 'Irreversible: pulpotomy (immature teeth) or root canal treatment', 'Crown the tooth after root canal treatment on posterior teeth'] },
  { id: 'abscess', name: 'Periapical abscess', stage: 'Acute or chronic',
    cause: 'Necrotic pulp infection spreads through the apex into periapical bone.',
    signs: 'Throbbing pain, tenderness to percussion, swelling, sometimes a sinus tract (gum boil) and fever.',
    treatment: ['Drainage of pus (through canal or incision)', 'Root canal treatment or extraction', 'Antibiotics only with systemic involvement (fever, spreading swelling)', 'Urgent referral if swelling affects airway, eye or swallowing'] },
  { id: 'gingivitis', name: 'Gingivitis', stage: 'Reversible',
    cause: 'Dental plaque accumulates at the gingival margin and causes inflammation.',
    signs: 'Red, swollen gums that bleed on brushing or probing, with no attachment loss.',
    treatment: ['Oral hygiene instruction and plaque control', 'Professional scaling and polishing', 'Chlorhexidine rinse short term if needed', 'Review after 2–4 weeks'] },
  { id: 'periodontitis', name: 'Periodontitis', stage: 'Staged (I–IV) and graded (A–C)',
    cause: 'Plaque dysbiosis in a susceptible host leads to loss of attachment and alveolar bone.',
    signs: 'Probing depth of 4 mm or more, clinical attachment loss, bone loss on radiograph, mobility, recession.',
    treatment: ['Step 1: hygiene instruction, risk-factor control (smoking, diabetes)', 'Step 2: scaling and root planing', 'Step 3: re-evaluation, then surgery or regeneration for residual pockets', 'Step 4: supportive periodontal care every 3–6 months'] },
  { id: 'erosion', name: 'Enamel erosion and wear', stage: 'Surface loss',
    cause: 'Acid (reflux, citrus, soft drinks) or mechanical wear from bruxism and abrasive brushing.',
    signs: 'Smooth cupped surfaces, shiny dentin, sensitivity, flattened cusps, shortened teeth.',
    treatment: ['Identify and control the acid source', 'Desensitizing and remineralizing agents', 'Night guard for bruxism', 'Composite or indirect restorations for advanced wear'] },
  { id: 'impaction', name: 'Impacted third molar and pericoronitis', stage: 'Eruption problem',
    cause: 'Lack of space leaves the tooth partly covered by gum (operculum) where food and plaque collect.',
    signs: 'Pain and swelling behind the last molar, bad taste, trismus; radiograph shows angulation (mesioangular, vertical, horizontal, distoangular).',
    treatment: ['Irrigation and chlorhexidine; operculectomy in selected cases', 'Surgical removal when recurrent or associated with caries or cysts', 'Risk assessment of the inferior alveolar nerve before surgery'] }
];

const quiz = [
  { id: 1, q: 'Which tooth is the first permanent tooth to erupt?', options: ['Upper central incisor', 'Lower first molar', 'Lower canine', 'Upper first premolar'], answer: 1, why: 'The lower first permanent molar erupts around 6 years, behind the last primary molar.' },
  { id: 2, q: 'In the FDI system, what is tooth 36?', options: ['Upper right first molar', 'Lower left first molar', 'Lower right second premolar', 'Upper left canine'], answer: 1, why: 'Quadrant 3 is lower left, and position 6 is the first molar.' },
  { id: 3, q: 'Which tooth usually has the longest root?', options: ['Upper canine', 'Lower central incisor', 'Upper first molar', 'Lower second premolar'], answer: 0, why: 'Canines have the longest roots, which is why they resist extraction forces and anchor the arch.' },
  { id: 4, q: 'How many roots does an upper first molar usually have?', options: ['1', '2', '3', '4'], answer: 2, why: 'Mesiobuccal, distobuccal and palatal roots.' },
  { id: 5, q: 'Which bacterium is most associated with the initiation of caries?', options: ['Porphyromonas gingivalis', 'Streptococcus mutans', 'Staphylococcus aureus', 'Treponema denticola'], answer: 1, why: 'S. mutans produces acid from sugars and tolerates low pH.' },
  { id: 6, q: 'Pain that lingers after cold stimulus is most typical of:', options: ['Dentin hypersensitivity', 'Reversible pulpitis', 'Irreversible pulpitis', 'Gingivitis'], answer: 2, why: 'Lingering or spontaneous pain indicates irreversible pulpal inflammation.' },
  { id: 7, q: 'Which is reversible with good plaque control alone?', options: ['Periodontitis', 'Gingivitis', 'Periapical abscess', 'Pulp necrosis'], answer: 1, why: 'Gingivitis has no attachment loss, so tissue returns to health once plaque is removed.' },
  { id: 8, q: 'The first step of non-surgical periodontal therapy is usually:', options: ['Gingival graft', 'Extraction', 'Hygiene instruction and risk-factor control', 'Systemic antibiotics'], answer: 2, why: 'Patient self-care and risk-factor control come before instrumentation.' },
  { id: 9, q: 'Which tooth is most commonly impacted?', options: ['Lower third molar', 'Lower canine', 'Upper lateral incisor', 'Upper first premolar'], answer: 0, why: 'Lower third molars are the most frequently impacted teeth.' },
  { id: 10, q: 'Fissure sealants are mainly used to prevent caries on:', options: ['Smooth buccal surfaces', 'Occlusal pits and fissures', 'Root surfaces', 'Incisal edges'], answer: 1, why: 'Sealants fill deep pits and fissures where plaque is hard to clean.' },
  { id: 11, q: 'Which tooth often has a cusp of Carabelli?', options: ['Lower first molar', 'Upper first molar', 'Upper canine', 'Lower second premolar'], answer: 1, why: 'The cusp of Carabelli is an accessory cusp on the palatal surface of the upper first molar.' },
  { id: 12, q: 'Which finding best suggests a chronic periapical abscess?', options: ['Sinus tract on the gum', 'Bleeding on brushing', 'White-spot lesion', 'Cupped occlusal surface'], answer: 0, why: 'A sinus tract drains pus from the periapical infection and often causes little pain.' }
];

module.exports = { teeth, diseases, quiz };
