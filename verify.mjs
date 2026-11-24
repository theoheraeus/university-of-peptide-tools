import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { runInNewContext } from 'node:vm';

const html = await readFile(new URL('./concentration-calculator.html', import.meta.url), 'utf8');
const script = html.match(/<script>([\s\S]*?)<\/script>/)?.[1];
assert.ok(script, 'The standalone calculator script must exist.');
const pure = script.split('const form =')[0];
const calculate = runInNewContext(pure + '\ncalculateConcentration;', {}, { timeout: 1000 });
let assertions = 0;
function equal(actual, expected, message) {
  assert.ok(Math.abs(actual - expected) <= Math.max(1e-12, Math.abs(expected) * 1e-12), message || `${actual} != ${expected}`);
  assertions++;
}
for (const [total, liquid, target, unit, concentration, volume, units] of [
  [10, 2, 250, 'mcg', 5, .05, 5],
  [10, 2, .25, 'mg', 5, .05, 5],
  [10, 4, 250, 'mcg', 2.5, .1, 10],
  [2, 4, 1, 'mg', .5, 2, 200],
  [5, 1, 5, 'mg', 5, 1, 100],
]) {
  const result = calculate(total, liquid, target, unit);
  assert.ok(!result.error);
  equal(result.concentration, concentration); equal(result.targetVolume, volume); equal(result.units, units);
  equal(result.targetVolume * result.concentration, result.targetMg);
}
for (let i = 1; i <= 100; i++) {
  const total = i / 5, liquid = (i % 9 + 1) / 3, target = total / 20;
  const mg = calculate(total, liquid, target, 'mg');
  const mcg = calculate(total, liquid, target * 1000, 'mcg');
  equal(mg.targetVolume, mcg.targetVolume);
  equal(mg.targetVolume * mg.concentration, target);
  equal(mg.targetVolume, liquid / 20);
}
for (const args of [
  ['', 2, 1, 'mg'], [0, 2, 1, 'mg'], [-1, 2, 1, 'mg'], [10, 0, 1, 'mg'], [10, 2, 0, 'mg'],
  [NaN, 2, 1, 'mg'], [Infinity, 2, 1, 'mg'], [10, 2, 11, 'mg'], [10, 2, 10001, 'mcg'],
  [10, 2, 1, 'g'], [1e308, 1e-308, 1, 'mg'], [1e-300, 1e300, 1e-301, 'mg'], [1, 1, 1e-323, 'mcg'],
]) { assert.ok(calculate(...args).error, `Should reject: ${args}`); assertions++; }
assert.ok(!/<(?:script|link|img|iframe)[^>]+(?:src|href)=["']https?:/i.test(html.replace(/<link rel="canonical"[^>]+>/, '')));
assert.ok(!/\b(?:fetch|XMLHttpRequest|WebSocket|sendBeacon|localStorage|sessionStorage)\b/.test(script));
assert.ok(html.includes('noindex, follow'));
assert.ok(html.includes('https://universityofpeptide.com/calculator'));
assertions += 4;
console.log(`CALCULATOR_VERIFIED: ${assertions} arithmetic, input and offline checks`);
