(function () {
  'use strict';
  const M = window.TFMath;
  const fmt = (x, digits = 3) => Number(x).toLocaleString('de-DE', {maximumFractionDigits: digits});
  const pct = x => fmt(x * 100, 2) + ' %';
  const by = (root, key) => root.querySelector('[data-role="' + key + '"]');
  const val = (root, key) => Number(by(root, key).value);
  const text = (root, key, value) => {by(root, key).textContent = value;};
  const esc = value => String(value).replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
  function range(role, label, min, max, step, value, note = '') {
    return '<label class="tf-control"><span class="label-line">' + label + '<output data-role="' + role + '-value"></output></span><input data-role="' + role + '" type="range" min="' + min + '" max="' + max + '" step="' + step + '" value="' + value + '"><small>' + note + '</small></label>';
  }
  function numeric(role, label, min, max, value) {
    return '<label class="tf-control"><span class="label-line">' + label + '</span><input data-role="' + role + '" type="number" min="' + min + '" max="' + max + '" step="1" value="' + value + '" required></label>';
  }
  function integerInput(root, key) {
    const input = by(root, key), value = Number(input.value);
    if (input.value === '' || !Number.isSafeInteger(value) || value < Number(input.min) || value > Number(input.max)) {
      throw new RangeError('Bitte ' + (key === 'seed' ? 'einen Seed' : 'eine ganze Zahl') + ' von ' + input.min + ' bis ' + input.max + ' eingeben.');
    }
    return value;
  }
  function stats(items) {return '<div class="tf-stats">' + items.map(([role, label]) => '<div class="tf-stat"><strong data-role="' + role + '">–</strong><span>' + label + '</span></div>').join('') + '</div>';}
  function status(root, message, warn = false, key = 'status') {
    const el = by(root, key); el.textContent = message; el.classList.toggle('warn', warn);
  }
  function safe(root, callback) {
    try {callback();} catch (error) {status(root, error.message || 'Die Berechnung konnte nicht durchgeführt werden.', true);}
  }
  function svgChart(node, traces, maximum) {
    const w = 640, h = 320, x0 = 58, y0 = 26, iw = 554, ih = 238;
    const X = x => x0 + x / maximum * iw, Y = y => y0 + (1 - y) * ih;
    let s = '<svg viewBox="0 0 640 320" role="img" aria-label="Fehlerwahrscheinlichkeit und theoretische Schranke in Abhängigkeit von m">';
    for (let j = 0; j <= 4; j++) {
      const p = j / 4;
      s += '<path d="M' + x0 + ',' + Y(p) + 'H612" stroke="currentColor" opacity=".15"/><text x="48" y="' + (Y(p) + 4) + '" fill="currentColor" font-size="12" text-anchor="end">' + fmt(p) + '</text>';
      s += '<text x="' + X(maximum * p) + '" y="285" fill="currentColor" font-size="12" text-anchor="middle">' + fmt(Math.round(maximum * p), 0) + '</text>';
    }
    for (const trace of traces) {
      if (trace.mode === 'markers') {
        trace.x.forEach((x, i) => {
          if (trace.error_y) s += '<path d="M' + X(x) + ',' + Y(Math.min(1, trace.y[i] + trace.error_y.array[i])) + 'V' + Y(Math.max(0, trace.y[i] - trace.error_y.arrayminus[i])) + '" stroke="' + trace.color + '" stroke-width="2"/>';
          s += '<circle cx="' + X(x) + '" cy="' + Y(trace.y[i]) + '" r="5" fill="' + trace.color + '"/>';
        });
      } else s += '<polyline fill="none" stroke="' + trace.color + '" stroke-width="2.5" ' + (trace.dash ? 'stroke-dasharray="6 5"' : '') + ' points="' + trace.x.map((x, i) => X(x) + ',' + Y(trace.y[i])).join(' ') + '"/>';
    }
    s += '<text x="330" y="313" fill="currentColor" font-size="13" text-anchor="middle">Stichprobengröße m</text></svg>';
    node.innerHTML = s;
  }
  function chart(root, traces, maximum) {
    const node = by(root, 'chart');
    // Keep a full SVG fallback if Plotly fails or is unavailable.
    if (!window.Plotly) {svgChart(node, traces, maximum); return;}
    const dark = document.body.getAttribute('data-md-color-scheme') === 'slate';
    const font = dark ? '#dbe9e4' : '#244440', grid = dark ? '#34494c' : '#dde6e1';
    const data = traces.map(t => ({x: t.x, y: t.y, name: t.name, mode: t.mode || 'lines', type: 'scatter', line: {color: t.color, width: 2.5, dash: t.dash ? 'dash' : 'solid'}, marker: {color: t.color, size: 9}, error_y: t.error_y, hovertemplate: 'm = %{x}<br>Wert = %{y:.4f}<extra>%{fullData.name}</extra>'}));
    window.Plotly.react(node, data, {height: 335, margin: {l: 52, r: 15, t: 18, b: 77}, paper_bgcolor: 'transparent', plot_bgcolor: 'transparent', font: {family: 'system-ui,sans-serif', size: 12, color: font}, xaxis: {title: {text: 'Stichprobengröße m'}, range: [0, maximum], gridcolor: grid, zeroline: false}, yaxis: {title: {text: 'Wahrscheinlichkeit / Schranke'}, range: [0, 1.04], gridcolor: grid, zeroline: false}, legend: {orientation: 'h', x: 0, y: -0.29, font: {size: 10}}, hovermode: 'closest'}, {responsive: true, displaylogo: false, modeBarButtonsToRemove: ['select2d', 'lasso2d', 'autoScale2d'], toImageButtonOptions: {format: 'svg', filename: 'tfoml-schranke'}}).catch(() => svgChart(node, traces, maximum));
  }
  function gridX(maximum) {
    const out = new Set([0, maximum]);
    for (let i = 0; i <= 180; i++) out.add(Math.round(i / 180 * maximum));
    return Array.from(out).sort((a, b) => a - b);
  }
  function connectTheme(root, render) {
    const observer = new MutationObserver(render);
    observer.observe(document.body, {attributes: true, attributeFilter: ['data-md-color-scheme']});
  }
  function finite(root) {
    root.innerHTML = '<div class="lab-heading"><h3>Wie viele Daten genügen?</h3><span>Theoretische Garantie</span></div><div class="tf-controls">' + numeric('size', 'Anzahl Hypothesen |H|', 1, 1000000000, 100) + range('epsilon', 'Fehlertoleranz ε', .01, .5, .01, .1) + range('delta', 'Ausfalltoleranz δ', .001, .3, .001, .05) + range('m', 'Stichprobengröße m', 1, 1200, 1, 40) + '</div>' + stats([['minimum', 'Kleinste ganze Zahl aus der Schranke'], ['bound', 'Obere Schranke bei diesem m'], ['confidence', 'Geforderte Konfidenz 1 − δ']]) + '<div class="tf-actions"><button class="tf-btn" data-role="use">m auf die Garantie setzen</button><button class="tf-btn secondary" data-role="reset">Zurücksetzen</button></div><div class="tf-chart" data-role="chart"></div><p class="tf-status" data-role="status" role="status" aria-live="polite"></p><p class="tf-note">Gezeigt wird min{1, |H| exp(−εm)}. Die tatsächliche Fehlerwahrscheinlichkeit ist unbekannt. Die Begrenzung auf 1 verhindert, dass die Schranke als unmögliche Wahrscheinlichkeit über 100 % erscheint.</p>';
    function render() {safe(root, () => {
      const n = integerInput(root, 'size'), e = val(root, 'epsilon'), d = val(root, 'delta');
      const minimum = M.finiteThreshold(e, d, n), max = Math.max(30, Math.ceil(minimum * 1.5));
      by(root, 'm').max = max; const m = val(root, 'm');
      ['epsilon', 'delta', 'm'].forEach(k => text(root, k + '-value', fmt(val(root, k))));
      text(root, 'minimum', fmt(minimum, 0)); text(root, 'bound', pct(M.finiteBound(e, m, n))); text(root, 'confidence', pct(1 - d));
      const xs = gridX(max);
      chart(root, [{x: xs, y: xs.map(x => M.finiteBound(e, x, n)), name: 'Union-Bound-Schranke', color: '#168876'}, {x: [0, max], y: [d, d], name: 'δ', color: '#b17c2d', dash: true}, {x: [m], y: [M.finiteBound(e, m, n)], name: 'Deine Wahl', color: '#526bc0', mode: 'markers'}], max);
      status(root, m >= minimum ? 'Die Stichprobenschranke ist erfüllt: Mit Wahrscheinlichkeit mindestens ' + pct(1 - d) + ' hat jeder konsistente ERM-Klassifikator Fehler höchstens ' + pct(e) + '.' : 'Diese Schranke zertifiziert deine Wahl noch nicht. Das bedeutet nicht, dass Lernen bei m = ' + m + ' unmöglich ist.', m < minimum);
    });}
    root.addEventListener('input', render);
    by(root, 'use').addEventListener('click', () => safe(root, () => {by(root, 'm').value = M.finiteThreshold(val(root, 'epsilon'), val(root, 'delta'), integerInput(root, 'size')); render();}));
    by(root, 'reset').addEventListener('click', () => {for (const [k, v] of Object.entries({size: 100, epsilon: .1, delta: .05, m: 40})) by(root, k).value = v; render();});
    connectTheme(root, render); render();
  }
  function drawGeometry(root, points, rect, strips, labelsMode = false) {
    const X = x => 55 + x * 490, Y = y => 390 - y * 350;
    const drawRect = (r, attrs) => '<rect x="' + X(r.xmin) + '" y="' + Y(r.ymax) + '" width="' + Math.max(.7, (r.xmax - r.xmin) * 490) + '" height="' + Math.max(.7, (r.ymax - r.ymin) * 350) + '" ' + attrs + '/>';
    let s = '<svg viewBox="0 0 600 440" role="img" aria-label="' + (labelsMode ? 'Punktbeschriftungen und kleinstes Rechteck um die positiven Punkte' : 'Zielrechteck, Stichprobe, Randstreifen und gelerntes Rechteck im Einheitsquadrat') + '">';
    for (let i = 0; i <= 5; i++) {const p = i / 5;s += '<path d="M55,' + Y(p) + 'H545 M' + X(p) + ',40V390" stroke="currentColor" opacity=".13"/><text x="' + X(p) + '" y="412" text-anchor="middle" fill="currentColor" font-size="12">' + fmt(p) + '</text><text x="43" y="' + (Y(p) + 4) + '" text-anchor="end" fill="currentColor" font-size="12">' + fmt(p) + '</text>';}
    s += '<text x="565" y="393" fill="currentColor" font-size="15">x₁</text><text x="42" y="25" fill="currentColor" font-size="15">x₂</text>';
    if (!labelsMode) {
      s += drawRect(M.target, 'fill="#d7a647" fill-opacity=".18" stroke="#af7c2b" stroke-width="2" stroke-dasharray="6 4"');
      strips.forEach(r => {s += drawRect(r, 'fill="#c2a6f2" fill-opacity=".32" stroke="#9873b8" stroke-width=".8"');});
    }
    if (rect) s += drawRect(rect, 'fill="#b7ddce" fill-opacity=".65" stroke="#0e7969" stroke-width="2.4"');
    for (let i = 0; i < points.length; i++) {
      const p = points[i];
      if (p.label) s += '<circle cx="' + X(p.x) + '" cy="' + Y(p.y) + '" r="' + (labelsMode ? 7 : 3.1) + '" fill="#087565" stroke="#fdfdfb" stroke-width=".8"><title>Positiv: (' + fmt(p.x) + ', ' + fmt(p.y) + ')</title></circle>';
      else {const x = X(p.x), y = Y(p.y), r = labelsMode ? 6 : 2.7;s += '<path d="M' + (x-r) + ',' + (y-r) + 'L' + (x+r) + ',' + (y+r) + 'M' + (x-r) + ',' + (y+r) + 'L' + (x+r) + ',' + (y-r) + '" stroke="#c16a55" stroke-width="' + (labelsMode ? 2.5 : 1.2) + '"><title>Negativ: (' + fmt(p.x) + ', ' + fmt(p.y) + ')</title></path>';}
      if (labelsMode) s += '<text x="' + (X(p.x) + 12) + '" y="' + (Y(p.y) - 12) + '" font-size="15" fill="currentColor">' + (i + 1) + '</text>';
    }
    by(root, 'geometry').innerHTML = s + '</svg>';
  }
  function rectangles(root) {
    root.innerHTML = '<div class="lab-heading"><h3>Ein Rechteck aus Beispielen lernen</h3><span>Reproduzierbare Simulation · D = Uniform([0,1]²)</span></div><div class="tf-controls">' + range('m', 'Trainingspunkte m', 1, 1000, 1, 25) + range('epsilon', 'Fehlertoleranz ε', .01, .5, .01, .1) + numeric('seed', 'Zufallsstartwert (Seed)', 0, 4294967295, 42) + '<label class="tf-control"><span class="label-line">Beweisgeometrie</span><span><input type="checkbox" data-role="strips" checked> Vier Randstreifen einblenden</span></label></div><div class="tf-actions"><button class="tf-btn" data-role="new">Neue Stichprobe</button><button class="tf-btn secondary" data-role="reset">Zurücksetzen</button></div><div class="tf-geometry" data-role="geometry"></div><div class="tf-legend"><span><i class="swatch" style="background:#d7a647"></i>Ziel R★ / ungelerntes Gebiet</span><span><i class="swatch" style="background:#168876"></i>Gelernt R(S)</span><span>● positiv</span><span>× negativ</span></div>' + stats([['training', 'Empirischer Trainingsfehler Lₛ'], ['risk', 'Wahrer Fehler Lᴅ unter Uniform-D'], ['positive', 'Positive Trainingspunkte']]) + '<div class="tf-strip-list" data-role="hits"></div><p class="tf-status" data-role="status" role="status" aria-live="polite"></p><p class="tf-note">R★ = [0,15; 0,85] × [0,2; 0,8]. Hier ist Lᴅ = Fläche(R★) − Fläche(R(S)), weil D gleichverteilt und R(S) ⊆ R★ ist. Bei anderem D muss die Wahrscheinlichkeitsmasse berechnet werden. Gleicher Seed + gleiches m ergeben dieselbe Stichprobe; größeres m ergänzt denselben Punktstrom.</p>';
    function render() {safe(root, () => {
      const m = val(root, 'm'), e = val(root, 'epsilon'), seed = integerInput(root, 'seed');
      const points = M.sample(m, seed), rect = M.fitRectangle(points), strips = M.borderStrips(e);
      const hits = strips.map(r => points.some(p => p.label && M.contains(r, p)));
      drawGeometry(root, points, rect, by(root, 'strips').checked ? strips : []);
      text(root, 'm-value', fmt(m)); text(root, 'epsilon-value', fmt(e));
      text(root, 'training', pct(M.trainingRisk(rect, points))); text(root, 'risk', pct(M.uniformRisk(rect))); text(root, 'positive', points.filter(p => p.label).length + ' / ' + m);
      by(root, 'hits').innerHTML = strips.map((r, i) => '<span>' + esc(r.name) + ': ' + (hits[i] ? '✓ getroffen' : '○ leer') + '</span>').join('');
      if (strips.length === 0) status(root, 'Die Zielmasse 0,42 ist höchstens ε. Deshalb gilt Lᴅ ≤ ε bereits für jedes gelernte Teilrechteck, auch für das leere Rechteck.');
      else if (hits.every(Boolean)) status(root, 'Alle vier Streifen wurden getroffen. Das geometrische Beweisargument garantiert Lᴅ ≤ ε.');
      else status(root, 'Mindestens ein Randstreifen ist leer. Das ausreichende Kriterium greift hier nicht; der tatsächliche Fehler kann trotzdem kleiner als ε sein.', true);
    });}
    root.addEventListener('input', render);
    by(root, 'new').addEventListener('click', () => safe(root, () => {by(root, 'seed').value = (integerInput(root, 'seed') + 1) >>> 0; render();}));
    by(root, 'reset').addEventListener('click', () => {by(root, 'm').value = 25; by(root, 'epsilon').value = .1; by(root, 'seed').value = 42; by(root, 'strips').checked = true; render();});
    render();
  }
  function pac(root) {
    root.innerHTML = '<div class="lab-heading"><h3>Garantie und Experiment vergleichen</h3><span>Theorie für jedes D · Simulation für Uniform-D</span></div><div class="tf-controls">' + range('epsilon', 'Fehlertoleranz ε', .01, .4, .01, .1) + range('delta', 'Ausfalltoleranz δ', .001, .3, .001, .05) + range('m', 'Stichprobengröße m', 1, 1000, 1, 40) + numeric('seed', 'Simulations-Seed', 0, 4294967295, 2026) + '<label class="tf-control"><span class="label-line">Unabhängige Trainingsstichproben</span><select data-role="trials"><option value="200">200</option><option value="500" selected>500</option><option value="1000">1.000</option></select></label></div>' + stats([['minimum', 'Hinreichendes m aus dem Satz'], ['bound', 'min{1, 4 exp(−mε/4)}'], ['estimate', 'Simulierter Anteil Lᴅ > ε']]) + '<div class="tf-actions"><button class="tf-btn" data-role="run">Simulation starten</button><button class="tf-btn secondary" data-role="use">m auf die Garantie setzen</button><button class="tf-btn secondary" data-role="reset">Zurücksetzen</button></div><div class="tf-chart" data-role="chart"></div><p class="tf-status" data-role="status" role="status" aria-live="polite"></p><p class="tf-status" data-role="simulation-status" role="status" aria-live="polite">Noch keine Simulation gestartet.</p><p class="tf-note">Der Punkt zeigt Monte-Carlo-Daten, sein Fehlerbalken ein approximatives 95-%-Wilson-Intervall. Dieses Simulationsintervall ist etwas anderes als δ. Null beobachtete Fehlschläge beweisen keine Ausfallwahrscheinlichkeit von null. Eine Simulation ersetzt keinen Beweis.</p>';
    let result = null, running = false, timer = null;
    function render() {safe(root, () => {
      const e = val(root, 'epsilon'), d = val(root, 'delta'), minimum = M.rectThreshold(e, d), max = Math.ceil(minimum * 1.35);
      by(root, 'm').max = max; const m = val(root, 'm');
      ['epsilon', 'delta', 'm'].forEach(k => text(root, k + '-value', fmt(val(root, k))));
      text(root, 'minimum', fmt(minimum, 0)); text(root, 'bound', pct(M.rectBound(e, m))); text(root, 'estimate', result ? pct(result.estimate) : '–');
      const xs = gridX(max), traces = [{x: xs, y: xs.map(x => M.rectBound(e, x)), name: '4 exp(−mε/4)', color: '#168876'}, {x: xs, y: xs.map(x => M.rectBound(e, x, true)), name: '4 (1−ε/4)ᵐ', color: '#6275b4', dash: true}, {x: [0, max], y: [d, d], name: 'δ', color: '#b17c2d', dash: true}];
      if (result) traces.push({x: [result.m], y: [result.estimate], name: 'Monte Carlo ± Intervall', color: '#c16a55', mode: 'markers', error_y: {type: 'data', symmetric: false, array: [result.interval[1] - result.estimate], arrayminus: [result.estimate - result.interval[0]], visible: true}});
      chart(root, traces, max);
      status(root, m >= minimum ? 'Die Voraussetzung m ≥ (4/ε) ln(4/δ) ist erfüllt. Der Satz garantiert eine Ausfallwahrscheinlichkeit von höchstens δ.' : 'Die hinreichende Stichprobengröße ist noch nicht erreicht. Die tatsächliche Ausfallwahrscheinlichkeit kann trotzdem kleiner als δ sein.', m < minimum);
    });}
    function invalidate() {if (timer) clearTimeout(timer); timer = null; running = false; by(root, 'run').disabled = false; result = null; status(root, 'Parameter geändert. Bitte Simulation neu starten.', false, 'simulation-status'); render();}
    root.addEventListener('input', invalidate);
    by(root, 'run').addEventListener('click', () => safe(root, () => {
      if (running) return;
      const e = val(root, 'epsilon'), m = val(root, 'm'), trials = val(root, 'trials'), seed = integerInput(root, 'seed');
      running = true; by(root, 'run').disabled = true; status(root, 'Simuliere ' + trials + ' unabhängige Trainingsstichproben …', false, 'simulation-status');
      timer = setTimeout(() => {
        try {result = {...M.simulate(e, m, trials, seed), m}; render(); status(root, result.failures + ' von ' + trials + ' Stichproben hatten Lᴅ > ε. Approximatives 95-%-Intervall: [' + pct(result.interval[0]) + '; ' + pct(result.interval[1]) + ']. Seed: ' + seed + '.', false, 'simulation-status');}
        catch (error) {status(root, error.message, true, 'simulation-status');}
        finally {running = false; timer = null; by(root, 'run').disabled = false;}
      }, 20);
    }));
    by(root, 'use').addEventListener('click', () => {by(root, 'm').value = M.rectThreshold(val(root, 'epsilon'), val(root, 'delta')); invalidate();});
    by(root, 'reset').addEventListener('click', () => {for (const [k,v] of Object.entries({epsilon:.1,delta:.05,m:40,seed:2026,trials:500})) by(root,k).value=v; invalidate();});
    connectTheme(root, render); render();
  }
  function vc(root) {
    const points4 = [{x:.5,y:.85},{x:.85,y:.5},{x:.5,y:.15},{x:.15,y:.5}];
    let five = false, mask = 15; const visited = new Set();
    root.innerHTML = '<div class="lab-heading"><h3>Alle Beschriftungen ausprobieren</h3><span>Geometrische Konstruktion</span></div><div class="tf-actions"><button class="tf-btn" data-role="four">Vier Extrempunkte</button><button class="tf-btn secondary" data-role="five">Fünf-Punkte-Gegenbeispiel</button><button class="tf-btn secondary" data-role="next">Nächste Beschriftung</button></div><p class="tf-note">Schalte Punkte zwischen positiv (●) und negativ (×) um. Die Nummern im Bild entsprechen den Tasten. Das Rechteck wird automatisch aus den positiven Punkten konstruiert.</p><div class="point-buttons" data-role="buttons"></div><div class="tf-geometry" data-role="geometry"></div><p class="tf-status" data-role="status" role="status" aria-live="polite"></p><p class="tf-note" data-role="count"></p>';
    function render() {
      const points = five ? [...points4, {x:.5,y:.5}] : points4;
      const labels = points.map((p,i) => (mask >> i) & 1), fit = M.labelRealizable(points, labels);
      if (!five) visited.add(mask);
      drawGeometry(root, points.map((p,i)=>({...p,label:labels[i]})), fit.rect, [], true);
      by(root, 'buttons').innerHTML = labels.map((label,i) => '<button class="tf-btn secondary" data-point="' + i + '" aria-pressed="' + !!label + '">Punkt ' + (i+1) + ': ' + (label ? 'positiv' : 'negativ') + '</button>').join('');
      by(root,'four').setAttribute('aria-pressed',String(!five)); by(root,'five').setAttribute('aria-pressed',String(five));
      status(root, fit.possible ? 'Diese Beschriftung ist realisierbar. ' + (fit.rect ? 'Das kleinste Rechteck enthält alle und nur die positiv beschrifteten Punkte dieser Menge.' : 'Für die vollständig negative Beschriftung genügt das leere Rechteck.') : 'Nicht realisierbar: Das Rechteck muss die positiven Extrempunkte einschließen und erfasst dadurch auch den negativen Mittelpunkt.', !fit.possible);
      text(root, 'count', five ? 'Dieses Bild illustriert eine unmögliche Beschriftung für diese fünf Punkte. Der Beweis unterhalb behandelt jede beliebige Fünf-Punkte-Menge.' : 'Erkundet: ' + visited.size + ' von 16 Beschriftungen. Die 16 Fälle dieser Anordnung sind alle realisierbar.');
    }
    root.addEventListener('click', ev => {const button = ev.target.closest('[data-point]'); if (button) {const i = Number(button.dataset.point); mask ^= (1<<i); render();by(root,'buttons').querySelector('[data-point="'+i+'"]').focus();}});
    by(root,'four').addEventListener('click',()=>{five=false;mask=15;render();});
    by(root,'five').addEventListener('click',()=>{five=true;mask=15;render();});
    by(root,'next').addEventListener('click',()=>{mask=(mask+1)%(five?32:16);render();});
    render();
  }
  function proof(root) {
    const steps = Array.from(root.querySelectorAll('details'));
    const toolbar = document.createElement('div'); toolbar.className = 'proof-toolbar';
    toolbar.innerHTML = '<button class="tf-btn" data-next>Nächster Schritt</button><button class="tf-btn secondary" data-all>Alle öffnen</button><button class="tf-btn secondary" data-hide>Alle schließen</button><span class="tf-note" role="status" aria-live="polite"></span>';
    root.prepend(toolbar);
    function counter(){toolbar.querySelector('span').textContent=steps.filter(s=>s.open).length+' / '+steps.length+' Schritte geöffnet';}
    toolbar.querySelector('[data-next]').addEventListener('click',()=>{const next=steps.find(s=>!s.open);if(next){next.open=true;next.querySelector('summary').focus();}counter();});
    toolbar.querySelector('[data-all]').addEventListener('click',()=>{steps.forEach(s=>s.open=true);counter();});
    toolbar.querySelector('[data-hide]').addEventListener('click',()=>{steps.forEach(s=>s.open=false);counter();});
    steps.forEach(s=>s.addEventListener('toggle',counter));counter();
  }
  function quizzes() {
    document.querySelectorAll('.tf-quiz').forEach(root=>{
      root.querySelectorAll('button[data-correct]').forEach(button=>{
        button.setAttribute('aria-pressed','false');
        button.addEventListener('click',()=>{
          root.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
          root.querySelector('.feedback').textContent=(button.dataset.correct==='true'?'Richtig. ':'Noch nicht. ')+button.dataset.feedback;
        });
      });
    });
  }
  function progress() {
    document.querySelectorAll('[data-progress]').forEach(input=>{
      const key='tfoml.progress.'+input.dataset.progress;
      try{input.checked=localStorage.getItem(key)==='done';}catch(e){/* Storage is optional. */}
      input.addEventListener('change',()=>{try{localStorage.setItem(key,input.checked?'done':'todo');}catch(e){/* Reading remains available. */}});
    });
  }
  function start() {
    document.querySelectorAll('[data-tf-lab]').forEach(root=>{
      const registry={finite,rectangles,pac,vc};
      try{registry[root.dataset.tfLab](root);}catch(error){root.innerHTML='<p class="tf-error">Das Experiment konnte nicht geladen werden: '+esc(error.message)+'. Die vollständige Herleitung steht im Text.</p>';}
    });
    document.querySelectorAll('.tf-proof').forEach(proof); quizzes(); progress();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();
