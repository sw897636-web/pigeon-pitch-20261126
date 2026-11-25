// Pigeon Pitch One Line — make.fun bounty u-donrulezz-pigeon-pitch-one-line-af06c6cf
// A city pigeon pitches investors its "business model" in one sentence.
// Deterministic: scores every candidate, writes the unique highest scorer
// to /output/entry.txt (no trailing newline), and self-checks the 1-200 char limit.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const OUT = join(OUTPUT_DIR, "entry.txt");

const CANDIDATES: string[] = [
  "I run a 312-pigeon flock across Central Park, monetizing 9,000 daily crumbs with a zero-CAC flywheel, and my moat is simple: I poop on every rival's pitch deck.",
  "Every morning at 6:12 I claim the same bench outside Katz's Deli, converting 214 tourists' bagel crumbs into recurring revenue, and my ask is just one seed — plus your car, which I already own.",
  "My TAM is every breadcrumb dropped within three blocks of Union Square, my retention is 100% because pigeons never churn, and my exit strategy is pooping on your freshly washed Tesla.",
  "I bootstrapped a 40-block delivery network on stolen fries, my unit economics beat DoorDash because my couriers fly, and my Series A ask is $12 and a statue I can sit on forever.",
  "With 18,000 wingbeats a day I dominate the airspace above Bryant Park, my growth loop is tourists feeding me twice, and my only burn rate is the seed I steal straight off your plate.",
  "I turned one park bench into a 500-pigeon marketplace with zero churn, infinite TAM, and a moat of pure spite, and my ask is simple: fund me, or I move into your air conditioner.",
  "My flock processes 3,200 crumbs an hour outside Grand Central, my CAC is literally zero because I steal the inventory, and my valuation is one statue and your lunch, forever.",
];

const JARGON = [
  "tam",
  "cac",
  "moat",
  "flywheel",
  "churn",
  "retention",
  "unit economics",
  "series a",
  "burn rate",
  "valuation",
  "marketplace",
  "growth loop",
  "recurring revenue",
  "monetizing",
];

const PLACES = [
  "central park",
  "katz's deli",
  "union square",
  "bryant park",
  "grand central",
];

const TWIST_WORDS = ["poop", "own", "steal", "nest", "forever", "fire"];

function score(text: string): number {
  const lower = text.toLowerCase();
  let s = 0;
  const numbers = text.match(/\d[\d,]*/g) ?? [];
  s += numbers.length * 10;
  for (const p of PLACES) if (lower.includes(p)) s += 8;
  for (const j of JARGON) if (lower.includes(j)) s += 6;
  const tail = lower.slice(Math.floor(lower.length * 0.7));
  for (const t of TWIST_WORDS) if (tail.includes(t)) s += 15;
  // Prefer a full, meaty sentence near 170 chars; penalise drifting from it.
  s -= Math.abs(text.length - 170) / 10;
  return s;
}

function isSingleSentence(text: string): boolean {
  const body = text.endsWith(".") ? text.slice(0, -1) : text;
  return !/[.!?]/.test(body);
}

function main(): void {
  const scored = CANDIDATES.map((text) => ({ text, score: score(text) }));
  scored.sort((a, b) => b.score - a.score);
  const best = scored[0];
  const runnerUp = scored[1];
  if (best.score === runnerUp.score) {
    throw new Error(`Tie at the top: ${best.score}`);
  }
  if (!isSingleSentence(best.text)) {
    throw new Error("Winner is not a single sentence");
  }
  const len = [...best.text].length;
  if (len < 1 || len > 200) {
    throw new Error(`Winner length ${len} is outside 1-200 chars`);
  }
  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, best.text, "utf8"); // no trailing newline
  console.log(`Winner (${len} chars, score ${best.score.toFixed(1)}):`);
  console.log(best.text);
  console.log("--- all candidates ---");
  for (const c of scored) {
    console.log(`${c.score.toFixed(1)} | ${[...c.text].length} chars | ${c.text}`);
  }
}

main();
