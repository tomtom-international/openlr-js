# CLAUDE.md

Guidance for Claude Code (and other agents) working in this repository.

## What this project is

`openlr-js` is a JavaScript/TypeScript implementation of [OpenLR](http://www.openlr.org),
a standard for map-agnostic location referencing. It encodes/decodes locations to and from
the OpenLR **binary** format (exchanged as base64 strings).

It is a close port of the original Java reference implementation. Expect Java-flavoured
idioms throughout: classes everywhere, static `fromValues(...)` factory methods instead of
public constructors, `protected` fields with `_underscore` names exposed via `getX()` getters,
and explicit bit-level manipulation. Keep that style when editing existing code — consistency
with the Java original matters more than idiomatic-JS refactors.

Supported geometries: **geo-coordinate**, **line**, **point along line**, **polygon**, **circle**.

## Commands

| Task | Command |
| --- | --- |
| Run tests | `npm test` (vitest, single run) |
| Watch tests | `npm run test:watch` |
| Coverage | `npm run coverage` |
| Lint | `npm run lint` |
| Lint + autofix | `npm run lint:fix` |
| Type-check (no emit) | `npm run typecheck` |
| Full build | `npm run build` |

`npm run build` runs `clean → lint → build:es6 → build:es5 → build:browser`. The three build
steps emit to `lib/es6` (ESM), `lib/es5` (CommonJS), and `lib/browser` (UMD bundles via Rollup).

## Architecture

Source lives in `src/`. The public surface is `src/index.ts` (named exports only).

- `src/binary/` — the binary codec.
  - `bit-stream/` — low-level bit reading/writing.
  - `data/` — binary wire-format field types.
  - `decoder/` — turns binary into raw location references (`AbstractDecoder` + one per geometry).
  - `encoder/` — turns raw location references back into binary (`AbstractEncoder` + one per geometry).
  - `BinaryDecoder.ts` / `BinaryEncoder.ts` — top-level entry points dispatching by location type.
- `src/data/` — location-reference domain model.
  - `raw-location-reference/` — `RawLineLocationReference`, `RawCircleLocationReference`, etc.
  - `LocationReference.ts` — wraps an id + binary buffer (`fromIdAndBuffer`).
  - `Serializer.ts` — converts raw references to/from plain JSON objects (the `serialize` /
    `deserialize` round-trip used in the README and tests).
- `src/geometry/` — geometric helpers.
- `src/map/` — `GeoCoordinates` and map utilities.

Typical flow: base64 → `Buffer` → `LocationReference.fromIdAndBuffer` → `BinaryDecoder.decodeData`
→ raw reference → `Serializer.serialize` (JSON). Encoding is the reverse via
`Serializer.deserialize` → `BinaryEncoder.encodeDataFromRLR` → buffer → base64.

## Invariants — do not break these

- **Binary round-trip equality is the core correctness property.** Decoding a string then
  re-encoding it must yield the same bytes (the test suite asserts this). The one documented
  exception is in `test/polygon.test.ts`: the final latitude differs by one ULP due to an
  OpenLR float-precision limitation — that off-by-one is expected, not a bug to "fix".
- **`Math.fround` is intentional.** It appears in `AbstractEncoder`, `AbstractDecoder`, and
  `PolygonDecoder` to mirror Java's 32-bit `float` arithmetic. Removing it or substituting
  64-bit math will silently change encoded output. Leave it alone.
- **Precision-sensitive constants** in the codec are deliberate. Don't "simplify" arithmetic
  in the binary path without a round-trip test proving the bytes are unchanged.

## Conventions

- TypeScript, `strict` mode. Target is ES2020 for both library builds.
- Every file under `src/` carries the Apache-2.0 copyright header. ESLint enforces this via
  `eslint-plugin-headers` — `npm run lint:fix` will insert/repair it. Note: autofix may rewrite
  a date range like `2020-2025` down to a single year; if you see that, restore the range manually.
- Single quotes, named exports. Add new public symbols to `src/index.ts`.
- ESLint flat config lives in `eslint.config.mjs`. Some rules are relaxed for
  `src/data/Serializer.ts` (it does dynamic JSON work).

## Tests

Tests are in `test/`, named `*.test.ts`, run by vitest (`vitest.config.ts`). They import
directly from `src/` (TypeScript source), so tests are decoupled from the build output — no
build step is needed before testing. When adding a geometry or codec change, add a round-trip
test (decode → serialize → deserialize → encode → compare base64), following the existing files.

## Packaging / publishing

Published to npm with three consumption targets, all of which must keep working:

- **Node.js (CommonJS)** — `main` / `require` → `lib/es5/index.js`.
- **Bundlers / TypeScript** — `module` condition → `lib/es6/index.js`, types → `lib/es6/index.d.ts`.
- **Browser (CDN)** — `lib/browser/bundle.js` and `bundle.min.js` (UMD, global `OpenLR`).

The `exports` map in `package.json` also exposes a `./lib/*` wildcard so deep imports
(documented in the README migration section) keep resolving. `prepublishOnly` runs the full
build. After changing anything in `package.json` exports or the build, verify with
`npm pack` + install into a scratch consumer, and `tsc --noEmit` against the installed package
under both `bundler` and `nodenext` module resolution.
