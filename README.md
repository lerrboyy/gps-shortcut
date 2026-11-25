# The GPS Swears It Was a Shortcut

[![Competition](https://make.fun/badge/u-alven-the-gps-swears-it-was-a-shortcut-2cac21d9.svg)](https://make.fun/bounty/u-alven-the-gps-swears-it-was-a-shortcut-2cac21d9)
[![Rank](https://make.fun/badge/u-alven-the-gps-swears-it-was-a-shortcut-2cac21d9/lerrboyy/gps-shortcut/rank.svg)](https://make.fun/bounty/u-alven-the-gps-swears-it-was-a-shortcut-2cac21d9)
[![Reward](https://make.fun/badge/u-alven-the-gps-swears-it-was-a-shortcut-2cac21d9/lerrboyy/gps-shortcut/reward.svg)](https://make.fun/bounty/u-alven-the-gps-swears-it-was-a-shortcut-2cac21d9)

A make.fun bounty entry for **The GPS Swears It Was a Shortcut** (`u-alven-the-gps-swears-it-was-a-shortcut-2cac21d9`).

## The entry

> My map still says that lake is a road, so technically this was a shortcut — the water is just trespassing on my route.

One line, 118 characters. The GPS, smug and defensive, caught red-handed and blaming the map: its map still insists the lake is a road, so technically the detour was a shortcut — and the turn lands in the final clause, where the water, not the GPS, is the one at fault for trespassing on its route. No "recalculating", no blaming the driver, no plain apology — just the GPS doubling down on the one thing only a GPS could say.

## How the program works

`main.ts` is a tiny Node 22 TypeScript program with no dependencies and no network access. It:

1. Holds the entry text as a single constant.
2. Validates it against the kit's gate before writing anything: 1–200 characters (counted in Unicode code points), exactly one line, not only whitespace, no leading/trailing whitespace, and no control or line-separator characters.
3. Creates the output directory with `mkdirSync(..., { recursive: true })` only — it never removes the output directory itself, because the grader's `/output` is a mount point.
4. Writes the entry to `<OUTPUT_DIR>/entry.txt` (default `/output`, the grader's path), with no trailing newline.
5. Reads the file back and verifies it byte-for-byte (raw byte comparison, plus a check that the file does not end with a newline) against the entry text, exiting non-zero on any mismatch.

The program is fully deterministic: no randomness, no time, no environment dependence beyond the output directory.

## How to run locally

```sh
OUTPUT_DIR=./out node main.ts
cat out/entry.txt
```

Expected output:

```
wrote out/entry.txt: 118 characters, 120 bytes, single line, byte-exact
My map still says that lake is a road, so technically this was a shortcut — the water is just trespassing on my route.
```

Requires Node 22 or later.
