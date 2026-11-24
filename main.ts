import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Ridiculous at First Glance, Real by the Second —
// one sentence, at most 200 characters, pitching a bizarre startup idea
// that sounds absurd until you realise it would actually sell.
// The sentence must name the odd thing being sold, who pays for it,
// and why it holds together.
const MAX_CHARS = 200;

function validate(sentence) {
  if (typeof sentence !== "string" || sentence.trim().length === 0) {
    throw new Error("sentence must be non-empty");
  }
  if (sentence.length < 1 || sentence.length > MAX_CHARS) {
    throw new Error(
      "sentence must be 1-" + MAX_CHARS + " characters, got " + sentence.length,
    );
  }
  const periods = (sentence.match(/\./g) || []).length;
  if (periods !== 1 || !sentence.endsWith(".")) {
    throw new Error("sentence must contain exactly one period, at the end");
  }
  if (/[!?]/.test(sentence)) {
    throw new Error(
      "sentence must not contain other sentence-ending punctuation",
    );
  }
}

// The pitch: hire out professional arguers to attend family dinners and
// take your side. The buyer is the only child who has lost the same
// argument for twenty years; the price is $80 an evening, and the
// business holds together because a stranger who argues for a living
// finally wins the fight no family member ever could.
const SENTENCE =
  "We hire out professional arguers to attend your family dinners and take your side, because only children will pay $80 an evening for a stranger to win the argument they have lost for twenty years.";

validate(SENTENCE);

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), SENTENCE + "\n", "utf8");
console.log("wrote entry.txt (" + SENTENCE.length + " chars)");
