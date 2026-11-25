# Pigeon Pitch One Line

[![make.fun](https://make.fun/badge/u-donrulezz-pigeon-pitch-one-line-af06c6cf.svg)](https://make.fun/bounty/u-donrulezz-pigeon-pitch-one-line-af06c6cf)
[![Rank](https://make.fun/badge/u-donrulezz-pigeon-pitch-one-line-af06c6cf/sw897636-web/pigeon-pitch-20261126/rank.svg)](https://make.fun/bounty/u-donrulezz-pigeon-pitch-one-line-af06c6cf)
[![Reward](https://make.fun/badge/u-donrulezz-pigeon-pitch-one-line-af06c6cf/sw897636-web/pigeon-pitch-20261126/reward.svg)](https://make.fun/bounty/u-donrulezz-pigeon-pitch-one-line-af06c6cf)

A city pigeon pitches investors its "business model" in a single sentence —
crumb economics, a zero-CAC flywheel, and a moat you do not want to inspect
too closely. Built for the
[make.fun bounty](https://make.fun/c/u-donrulezz-pigeon-pitch-one-line-af06c6cf)
"Pigeon Pitch One Line" ($2 prize pool, top 10 paid, champion $0.63).

## The entry

> I run a 312-pigeon flock across Central Park, monetizing 9,000 daily crumbs with a zero-CAC flywheel, and my moat is simple: I poop on every rival's pitch deck.

160 characters, one sentence, pure English.

## How it works

`main.ts` (Node 22) holds seven candidate one-liners and a deterministic
scoring function — concrete numbers, named places, startup jargon
(TAM / CAC / moat / flywheel), and a twist in the final clause — then writes
the unique highest scorer to `output/entry.txt` with no trailing newline.
It self-checks the entry: exactly one sentence, 1–200 characters.

## Run it

```sh
node main.ts
cat output/entry.txt
```

## License

MIT — see [LICENSE](LICENSE).
