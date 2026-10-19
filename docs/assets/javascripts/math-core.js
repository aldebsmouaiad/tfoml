/* Pure numerical core. No DOM, network or global random state. */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.TFMath = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  function unitOpen(x, name) {
    if (!Number.isFinite(x) || x <= 0 || x >= 1) throw new RangeError(name + ' muss zwischen 0 und 1 liegen.');
    return x;
  }
  function integer(x, name, minimum = 0) {
    if (!Number.isSafeInteger(x) || x < minimum) throw new RangeError(name + ' ist keine gültige ganze Zahl.');
    return x;
  }
  function finiteThreshold(epsilon, delta, size) {
    unitOpen(epsilon, 'ε'); unitOpen(delta, 'δ'); integer(size, '|H|', 1);
    return Math.ceil((Math.log(size) - Math.log(delta)) / epsilon);
  }
  function rectThreshold(epsilon, delta) {
    unitOpen(epsilon, 'ε'); unitOpen(delta, 'δ');
    return Math.ceil(4 * (Math.log(4) - Math.log(delta)) / epsilon);
  }
  function finiteBound(epsilon, m, size) {
    unitOpen(epsilon, 'ε'); integer(m, 'm'); integer(size, '|H|', 1);
    return Math.min(1, Math.exp(Math.log(size) - epsilon * m));
  }
  function rectBound(epsilon, m, exact = false) {
    unitOpen(epsilon, 'ε'); integer(m, 'm');
    return Math.min(1, 4 * Math.exp(m * (exact ? Math.log1p(-epsilon / 4) : -epsilon / 4)));
  }
  function rng(seed) {
    integer(seed, 'Seed');
    let state = seed >>> 0;
    return function () {
      state = (state + 0x6D2B79F5) | 0;
      let t = Math.imul(state ^ (state >>> 15), 1 | state);
      t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  const target = Object.freeze({xmin: 0.15, xmax: 0.85, ymin: 0.2, ymax: 0.8});
  function contains(rect, p) {
    return !!rect && p.x >= rect.xmin && p.x <= rect.xmax && p.y >= rect.ymin && p.y <= rect.ymax;
  }
  function area(rect) {return rect ? Math.max(0, rect.xmax - rect.xmin) * Math.max(0, rect.ymax - rect.ymin) : 0;}
  function fitRectangle(points) {
    let out = null;
    for (const p of points) if (p.label === 1) {
      if (!out) out = {xmin: p.x, xmax: p.x, ymin: p.y, ymax: p.y};
      else {out.xmin = Math.min(out.xmin, p.x); out.xmax = Math.max(out.xmax, p.x); out.ymin = Math.min(out.ymin, p.y); out.ymax = Math.max(out.ymax, p.y);}
    }
    return out;
  }
  function uniformRisk(rect, truth = target) {
    // D is uniform on the unit square; mass outside its support is zero.
    const clip = r => r ? {xmin: Math.max(0, r.xmin), xmax: Math.min(1, r.xmax), ymin: Math.max(0, r.ymin), ymax: Math.min(1, r.ymax)} : null;
    const a = clip(rect), b = clip(truth);
    const intersection = a && b ? {xmin: Math.max(a.xmin, b.xmin), xmax: Math.min(a.xmax, b.xmax), ymin: Math.max(a.ymin, b.ymin), ymax: Math.min(a.ymax, b.ymax)} : null;
    return Math.max(0, area(a) + area(b) - 2 * area(intersection));
  }
  function sample(m, seed, truth = target) {
    integer(m, 'm'); const random = rng(seed); const points = [];
    for (let i = 0; i < m; i++) {const p = {x: random(), y: random()}; p.label = +contains(truth, p); points.push(p);}
    return points;
  }
  function trainingRisk(rect, points) {
    if (points.length === 0) throw new RangeError('Für den Trainingsfehler wird mindestens ein Punkt benötigt.');
    return points.filter(p => +contains(rect, p) !== p.label).length / points.length;
  }
  function borderStrips(epsilon, truth = target) {
    unitOpen(epsilon, 'ε');
    if (area(truth) <= epsilon) return [];
    const q = epsilon / 4, dx = q / (truth.ymax - truth.ymin), dy = q / (truth.xmax - truth.xmin);
    return [
      {name: 'links', ...truth, xmax: truth.xmin + dx},
      {name: 'rechts', ...truth, xmin: truth.xmax - dx},
      {name: 'unten', ...truth, ymax: truth.ymin + dy},
      {name: 'oben', ...truth, ymin: truth.ymax - dy}
    ];
  }
  function wilson(successes, trials) {
    integer(trials, 'Wiederholungen', 1); integer(successes, 'Treffer');
    if (successes > trials) throw new RangeError('Zu viele Treffer.');
    const z = 1.959963984540054, p = successes / trials, denominator = 1 + z * z / trials;
    const center = (p + z * z / (2 * trials)) / denominator;
    const half = z * Math.sqrt(p * (1 - p) / trials + z * z / (4 * trials * trials)) / denominator;
    return [Math.max(0, center - half), Math.min(1, center + half)];
  }
  function simulate(epsilon, m, trials, seed) {
    unitOpen(epsilon, 'ε'); integer(m, 'm'); integer(trials, 'Wiederholungen', 1); const random = rng(seed);
    let failures = 0;
    for (let i = 0; i < trials; i++) {
      let rect = null;
      for (let j = 0; j < m; j++) {
        const p = {x: random(), y: random()};
        if (contains(target, p)) {
          if (!rect) rect = {xmin: p.x, xmax: p.x, ymin: p.y, ymax: p.y};
          else {rect.xmin = Math.min(rect.xmin, p.x); rect.xmax = Math.max(rect.xmax, p.x); rect.ymin = Math.min(rect.ymin, p.y); rect.ymax = Math.max(rect.ymax, p.y);}
        }
      }
      if (uniformRisk(rect) > epsilon) failures++;
    }
    return {failures, trials, estimate: failures / trials, interval: wilson(failures, trials)};
  }
  function labelRealizable(points, labels) {
    const data = points.map((p, i) => ({...p, label: labels[i]}));
    const rect = fitRectangle(data);
    return {rect, possible: data.every(p => +contains(rect, p) === p.label)};
  }
  return {unitOpen, integer, finiteThreshold, rectThreshold, finiteBound, rectBound, rng, target, contains, area, fitRectangle, uniformRisk, sample, trainingRisk, borderStrips, wilson, simulate, labelRealizable};
});
