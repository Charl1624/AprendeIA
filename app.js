// Merge extra modules
if (typeof MODULES_EXTRA !== 'undefined') MODULES.push(...MODULES_EXTRA);

// State
let state = {
  currentQ: 0, score: 0, userLevel: 0,
  currentModule: 0, currentLesson: 0,
  completed: new Set(), xp: 0, streak: 0,
  lastVisit: null, quizAnswered: new Set()
};

// Persistence
function save() {
  const d = { ...state, completed: [...state.completed], quizAnswered: [...state.quizAnswered], lastVisit: new Date().toDateString() };
  try { localStorage.setItem('aprende-ia-v2', JSON.stringify(d)); } catch(e) {}
}
function load() {
  try {
    const d = JSON.parse(localStorage.getItem('aprende-ia-v2'));
    if (d) {
      state = { ...state, ...d, completed: new Set(d.completed || []), quizAnswered: new Set(d.quizAnswered || []) };
      const today = new Date().toDateString();
      if (d.lastVisit === today) {}
      else if (d.lastVisit) {
        const last = new Date(d.lastVisit), now = new Date();
        const diff = Math.floor((now - last) / 86400000);
        state.streak = diff <= 1 ? state.streak + 1 : 1;
      }
      if (d.started) { show('course'); renderCourse(); showTab('ruta'); }
    }
  } catch(e) {}
}

// Navigation
function show(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('screen-' + id).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showTab(t, btn) {
  ['ruta','leccion','quiz','glosario'].forEach(tb => {
    const el = document.getElementById('tab-' + tb);
    if (el) el.style.display = tb === t ? 'block' : 'none';
  });
  document.querySelectorAll('.nav-pill').forEach(p => p.classList.remove('active'));
  if (btn) btn.classList.add('active');
  else { const p = document.querySelector(`.nav-pill[data-tab="${t}"]`); if (p) p.classList.add('active'); }
  if (t === 'leccion') { renderLessonNav(); renderLesson(); }
  if (t === 'quiz') renderQuiz();
  if (t === 'glosario') renderGlossary();
}

// XP Toast
function showXP(amount, reason) {
  state.xp += amount;
  const toast = document.createElement('div');
  toast.className = 'xp-toast';
  toast.innerHTML = `+${amount} XP — ${reason}`;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2000);
  save();
}

// Landing
function renderLanding() {
  const feat = document.getElementById('landing-features');
  if (feat) {
    feat.innerHTML = [
      { icon: 'ti-brain', title: 'Test de nivel', desc: '10 preguntas que te ubican en el módulo perfecto', color: 'accent' },
      { icon: 'ti-player-play', title: 'Demos interactivas', desc: 'Visualizaciones y código real, no solo teoría', color: 'green' },
      { icon: 'ti-vocabulary', title: 'Glosario completo', desc: 'Cada término técnico definido con precisión', color: 'purple' },
      { icon: 'ti-link', title: 'Recursos curados', desc: 'Videos, artículos y herramientas de los mejores', color: 'blue' },
      { icon: 'ti-trophy', title: 'XP y progreso', desc: 'Gamificación que te mantiene motivado', color: 'amber' },
      { icon: 'ti-code', title: 'Código real', desc: 'Ejemplos en Python que puedes copiar y ejecutar', color: 'red' }
    ].map(f => `<div class="feature"><div class="feature-icon" style="background:var(--${f.color}-bg);color:var(--${f.color});"><i class="ti ${f.icon}" aria-hidden="true"></i></div><h3>${f.title}</h3><p>${f.desc}</p></div>`).join('');
  }
  const mods = document.getElementById('landing-modules');
  if (mods) {
    mods.innerHTML = MODULES.map((m, i) => `<div class="module" style="cursor:default;"><div class="module-num" style="background:var(--${m.color}-bg);color:var(--${m.color});">${i + 1}</div><div class="module-info"><div class="module-title">${m.title}</div><div class="module-desc">${m.desc} — ${m.lessons.length} lecciones</div></div></div>`).join('');
  }
}

// Test
function startTest() {
  state.currentQ = 0; state.score = 0;
  show('test'); renderQuestion();
}

function renderQuestion() {
  const q = QUESTIONS[state.currentQ];
  document.getElementById('test-progress').style.width = ((state.currentQ + 1) * 10) + '%';
  document.getElementById('q-counter').textContent = (state.currentQ + 1) + ' / 10';
  document.getElementById('q-category').textContent = q.cat;
  document.getElementById('q-text').textContent = q.q;
  const opts = document.getElementById('q-options');
  opts.innerHTML = '';
  const letters = ['A', 'B', 'C', 'D'];
  q.opts.forEach((o, i) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-opt';
    btn.innerHTML = `<span class="opt-letter">${letters[i]}</span><span>${o}</span>`;
    btn.onclick = () => answerTest(i);
    opts.appendChild(btn);
  });
}

function answerTest(i) {
  const q = QUESTIONS[state.currentQ];
  if (i === q.correct) state.score += q.diff + 1;

  const opts = document.querySelectorAll('#q-options .quiz-opt');
  opts.forEach((o, idx) => {
    o.classList.add('disabled');
    if (idx === q.correct) o.classList.add('correct');
    else if (idx === i && i !== q.correct) o.classList.add('wrong');
  });

  const explain = document.createElement('div');
  explain.className = `quiz-explain ${i === q.correct ? 'correct' : 'wrong'}`;
  explain.innerHTML = `<strong>${i === q.correct ? '¡Correcto!' : 'Incorrecto.'}</strong> ${q.explain}`;
  document.getElementById('q-options').appendChild(explain);

  setTimeout(() => {
    state.currentQ++;
    if (state.currentQ < QUESTIONS.length) renderQuestion();
    else showResults();
  }, 2500);
}

function showResults() {
  const maxScore = QUESTIONS.reduce((s, q) => s + q.diff + 1, 0);
  const pct = Math.round((state.score / maxScore) * 100);
  if (pct < 20) state.userLevel = 0;
  else if (pct < 40) state.userLevel = 1;
  else if (pct < 60) state.userLevel = 2;
  else if (pct < 80) state.userLevel = 3;
  else state.userLevel = 4;

  const levels = [
    { name: 'Principiante total', desc: 'Empezarás desde los fundamentos. La ruta está diseñada para que avances a tu ritmo, con explicaciones claras de cada concepto.', badge: 'badge-accent' },
    { name: 'Principiante con nociones', desc: 'Tienes idea general. Reforzarás bases y entrarás directo a trabajar con datos.', badge: 'badge-green' },
    { name: 'Intermedio', desc: 'Conoces los conceptos clave. Tu ruta comienza en machine learning con algoritmos y evaluación.', badge: 'badge-amber' },
    { name: 'Intermedio-avanzado', desc: 'Buen dominio de ML. Seguirás con deep learning, redes neuronales y frameworks.', badge: 'badge-purple' },
    { name: 'Avanzado', desc: 'Conocimiento sólido. Tu ruta se enfoca en NLP, LLMs, agentes y producción.', badge: 'badge-red' }
  ];

  show('results');
  const lv = levels[state.userLevel];
  const circ = document.getElementById('score-circle');
  setTimeout(() => { circ.style.strokeDashoffset = 326.7 - (326.7 * pct / 100); }, 200);
  document.getElementById('score-text').textContent = pct + '%';
  document.getElementById('level-badge').className = `badge ${lv.badge}`;
  document.getElementById('level-badge').textContent = lv.name;
  document.getElementById('result-title').textContent = `Nivel: ${lv.name}`;
  document.getElementById('result-desc').textContent = lv.desc;
  showXP(50, 'Completar test de nivel');
}

function goToCourse() {
  state.currentModule = Math.min(state.userLevel, MODULES.length - 1);
  state.currentLesson = 0;
  state.started = true;
  save();
  show('course');
  renderCourse();
  showTab('ruta');
  setupShare();
}

// Course
function renderCourse() {
  renderStreak();
  renderModules();
  updateStats();
}

function renderStreak() {
  const area = document.getElementById('streak-area');
  if (state.streak > 0) {
    area.innerHTML = `<div class="streak-bar"><i class="ti ti-flame streak-icon" aria-hidden="true"></i><span class="streak-text">${state.streak} día${state.streak > 1 ? 's' : ''} de racha — ¡sigue así!</span></div>`;
  } else {
    area.innerHTML = '';
  }
}

function renderModules() {
  const list = document.getElementById('module-list');
  list.innerHTML = '';
  MODULES.forEach((m, i) => {
    const done = m.lessons.every((_, li) => state.completed.has(`${i}-${li}`));
    const doneCount = m.lessons.filter((_, li) => state.completed.has(`${i}-${li}`)).length;
    const isCurrent = i === state.currentModule;
    const isLocked = !done && i > state.currentModule && !MODULES.slice(0, i).every((mod, mi) => mod.lessons.every((_, li) => state.completed.has(`${mi}-${li}`)));
    const pct = Math.round((doneCount / m.lessons.length) * 100);

    const div = document.createElement('div');
    div.className = `module${done ? ' done' : ''}${isCurrent ? ' current' : ''}${isLocked ? ' locked' : ''}`;
    div.innerHTML = `
      <div class="module-num" style="background:var(--${m.color}-bg);color:var(--${m.color});">${done ? '<i class="ti ti-check" aria-hidden="true"></i>' : i + 1}</div>
      <div class="module-info">
        <div class="module-title">${m.title}</div>
        <div class="module-desc">${m.desc}</div>
        <div class="module-meta"><span class="badge badge-${m.color === 'accent' ? 'accent' : m.color === 'green' ? 'green' : m.color === 'purple' ? 'purple' : m.color === 'blue' ? 'accent' : m.color === 'amber' ? 'amber' : 'red'}">${doneCount}/${m.lessons.length}</span></div>
      </div>
      <div class="module-right">
        <div class="module-progress"><div class="progress"><div class="progress-fill" style="width:${pct}%"></div></div></div>
        ${isLocked ? '<i class="ti ti-lock" style="color:var(--text4)" aria-hidden="true"></i>' : '<i class="ti ti-chevron-right" style="color:var(--text3)" aria-hidden="true"></i>'}
      </div>`;
    if (!isLocked) div.onclick = () => { state.currentModule = i; state.currentLesson = 0; renderCourse(); showTab('leccion'); };
    list.appendChild(div);
  });
}

function updateStats() {
  let total = 0, done = 0;
  MODULES.forEach((m, i) => { m.lessons.forEach((_, li) => { total++; if (state.completed.has(`${i}-${li}`)) done++; }); });
  document.getElementById('s-level').textContent = state.currentModule + 1;
  document.getElementById('s-xp').textContent = state.xp;
  document.getElementById('s-progress').textContent = Math.round((done / total) * 100) + '%';
  document.getElementById('s-lessons').textContent = done;
}

function renderLessonNav() {
  const nav = document.getElementById('lesson-nav');
  const m = MODULES[state.currentModule];
  nav.innerHTML = '';
  m.lessons.forEach((l, i) => {
    const pill = document.createElement('button');
    const done = state.completed.has(`${state.currentModule}-${i}`);
    pill.className = `l-pill${i === state.currentLesson ? ' active' : ''}${done && i !== state.currentLesson ? ' done' : ''}`;
    pill.textContent = i + 1;
    pill.title = l.title;
    pill.onclick = () => { state.currentLesson = i; renderLessonNav(); renderLesson(); };
    nav.appendChild(pill);
  });
}

function renderLesson() {
  const m = MODULES[state.currentModule];
  const l = m.lessons[state.currentLesson];
  const area = document.getElementById('lesson-area');

  let html = `<div class="lesson-header">
    <span class="badge badge-${m.color === 'accent' ? 'accent' : m.color === 'green' ? 'green' : m.color === 'purple' ? 'purple' : m.color === 'blue' ? 'accent' : m.color === 'amber' ? 'amber' : 'red'}">${m.title} — Lección ${state.currentLesson + 1}/${m.lessons.length}</span>
    <h2>${l.title}</h2>
  </div>
  <div class="lesson-body">${l.content}</div>`;

  // Resources
  if (l.resources && l.resources.length) {
    html += `<div style="margin-top:1.5rem;"><p style="font-size:13px;font-weight:600;color:var(--text2);margin-bottom:8px;"><i class="ti ti-external-link" style="font-size:14px;" aria-hidden="true"></i> Recursos de apoyo</p><div class="resources">`;
    l.resources.forEach(r => {
      html += `<a class="resource" href="${r.url}" target="_blank" rel="noopener">
        <div class="resource-icon" style="background:var(--${r.color}-bg);color:var(--${r.color});"><i class="ti ${r.icon}" aria-hidden="true"></i></div>
        <div class="resource-info"><div class="resource-title">${r.title}</div><div class="resource-type">${r.type}</div></div>
        <i class="ti ti-external-link" style="color:var(--text4);font-size:14px;" aria-hidden="true"></i>
      </a>`;
    });
    html += `</div></div>`;
  }

  area.innerHTML = html;
}

function renderQuiz() {
  const m = MODULES[state.currentModule];
  const l = m.lessons[state.currentLesson];
  const area = document.getElementById('quiz-area');

  if (!l.quiz || !l.quiz.length) {
    area.innerHTML = '<p style="text-align:center;color:var(--text3);padding:2rem 0;">No hay quiz para esta lección.</p>';
    return;
  }

  let html = `<p style="font-size:13px;font-weight:600;color:var(--text2);margin-bottom:1rem;"><i class="ti ti-brain" style="font-size:14px;" aria-hidden="true"></i> Quiz — ${l.title}</p>`;

  l.quiz.forEach((q, qi) => {
    const qid = `${state.currentModule}-${state.currentLesson}-${qi}`;
    const answered = state.quizAnswered.has(qid);
    const letters = ['A', 'B', 'C', 'D'];
    html += `<div class="quiz-box" id="quiz-${qi}">
      <div class="quiz-q">${qi + 1}. ${q.q}</div>
      <div class="quiz-opts" id="qopts-${qi}">`;
    q.opts.forEach((o, oi) => {
      html += `<button class="quiz-opt${answered ? ' disabled' : ''}" onclick="answerQuiz(${qi},${oi})" ${answered ? 'disabled' : ''}>
        <span class="opt-letter">${letters[oi]}</span><span>${o}</span>
      </button>`;
    });
    html += `</div></div>`;
  });

  area.innerHTML = html;
}

function answerQuiz(qi, oi) {
  const m = MODULES[state.currentModule];
  const l = m.lessons[state.currentLesson];
  const q = l.quiz[qi];
  const qid = `${state.currentModule}-${state.currentLesson}-${qi}`;
  if (state.quizAnswered.has(qid)) return;
  state.quizAnswered.add(qid);

  const opts = document.querySelectorAll(`#qopts-${qi} .quiz-opt`);
  opts.forEach((o, idx) => {
    o.classList.add('disabled');
    o.disabled = true;
    if (idx === q.correct) o.classList.add('correct');
    else if (idx === oi && oi !== q.correct) o.classList.add('wrong');
  });

  const explain = document.createElement('div');
  explain.className = `quiz-explain ${oi === q.correct ? 'correct' : 'wrong'}`;
  explain.innerHTML = `<strong>${oi === q.correct ? '¡Correcto!' : 'Incorrecto.'}</strong> ${q.explain}`;
  document.getElementById(`quiz-${qi}`).appendChild(explain);

  if (oi === q.correct) showXP(15, 'Respuesta correcta');
  save();
}

function renderGlossary() {
  const area = document.getElementById('glossary-area');
  const searchHtml = `<div style="margin-bottom:1rem;"><input type="text" id="glossary-search" placeholder="Buscar término..." oninput="filterGlossary()" style="width:100%;padding:10px 14px;border:1px solid var(--border);border-radius:var(--radius-sm);background:var(--surface);color:var(--text);font-size:14px;font-family:var(--font);outline:none;" /></div>`;
  let items = GLOSSARY.map(g => `<div class="glossary-item" data-term="${g.term.toLowerCase()}"><div class="glossary-term">${g.term}</div><div class="glossary-def">${g.def}</div></div>`).join('');
  area.innerHTML = `<p style="font-size:16px;font-weight:600;margin-bottom:12px;">${GLOSSARY.length} términos definidos</p>${searchHtml}<div id="glossary-list">${items}</div>`;
}

function filterGlossary() {
  const q = document.getElementById('glossary-search').value.toLowerCase();
  document.querySelectorAll('.glossary-item').forEach(item => {
    item.style.display = item.dataset.term.includes(q) ? '' : 'none';
  });
}

function completeLesson() {
  const key = `${state.currentModule}-${state.currentLesson}`;
  const isNew = !state.completed.has(key);
  state.completed.add(key);
  if (isNew) showXP(25, 'Lección completada');

  const m = MODULES[state.currentModule];
  if (state.currentLesson < m.lessons.length - 1) {
    state.currentLesson++;
  } else {
    const allDone = m.lessons.every((_, i) => state.completed.has(`${state.currentModule}-${i}`));
    if (allDone && state.currentModule < MODULES.length - 1) {
      showXP(100, '¡Módulo completado!');
      state.currentModule++;
      state.currentLesson = 0;
    }
  }
  save();
  renderCourse();
  renderLessonNav();
  renderLesson();
}

function prevLesson() {
  if (state.currentLesson > 0) state.currentLesson--;
  else if (state.currentModule > 0) { state.currentModule--; state.currentLesson = MODULES[state.currentModule].lessons.length - 1; }
  renderCourse();
  renderLessonNav();
  renderLesson();
}

function setupShare() {
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent('Estoy aprendiendo inteligencia artificial con esta plataforma gratuita. Test de nivel + 30 lecciones interactivas + quizzes. 100% gratis 🧠');
  const wa = document.getElementById('share-wa'); if (wa) wa.href = `https://wa.me/?text=${text}%20${url}`;
  const tw = document.getElementById('share-tw'); if (tw) tw.href = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
  const li = document.getElementById('share-li'); if (li) li.href = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
}

function copyLink() {
  navigator.clipboard.writeText(window.location.href).then(() => {
    const btn = event.target.closest('.share-btn');
    const orig = btn.innerHTML;
    btn.innerHTML = '<i class="ti ti-check" aria-hidden="true"></i> Copiado';
    setTimeout(() => btn.innerHTML = orig, 2000);
  });
}

// Init
load();
renderLanding();
setupShare();
