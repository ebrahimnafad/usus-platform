# ADR-0016: Egyptian Coins Instead of U.S. Money

**Status:** Accepted  
**Date:** 2026-11-25

## Context

The Grade K curriculum (Lessons K-119 and K-120) teaches coin and bill identification under the heading "U.S. Money," featuring pennies, nickels, dimes, quarters, and $1 bills with U.S. presidents. The existing `COIN_CATALOG` in `shapes-solids-coins.tsx` has generic Arabic-labelled coins with denominations 1, 5, 10, 25, 50 used in K-4 (Match Coins by visual attributes).

The platform is Arabic-first, targeting Egyptian students. U.S. currency has no relevance to their daily lives, and the pedagogical objectives (identify coins by visual attributes, learn names and values, discover that size does not always predict value) transfer fully to Egyptian currency.

## Decision

Replace the existing `COIN_CATALOG` with proper Egyptian currency denominations:

| #   | Denomination     | Arabic name | Value    | Visual                      |
| --- | ---------------- | ----------- | -------- | --------------------------- |
| 1   | ٢٥ قرشاً         | ربع جنيه    | ٢٥ قرشاً | Small silver coin           |
| 2   | ٥٠ قرشاً         | نصف جنيه    | ٥٠ قرشاً | Medium silver coin          |
| 3   | ١ جنيه (عملة)    | جنيه واحد   | ١٠٠ قرش  | Bimetallic gold/silver coin |
| 4   | ٥ جنيهات (ورقة)  | خمسة جنيهات | ٥٠٠ قرش  | Green bill                  |
| 5   | ١٠ جنيهات (ورقة) | عشرة جنيهات | ١٠٠٠ قرش | Brown/gold bill             |

Child-facing values use mixed units as in real life: قروش for coins, جنيهات for bills.

## Consequences

- K-4 (Match Coins) adapts automatically — it uses only visual attributes (color, size), not names or values.
- K-119 and K-120 lesson titles change from "U.S. Money" to "النقود المصرية" (Egyptian Money).
- The "size ≠ value" discovery still holds: the ٢٥-piaster coin is physically larger than the ١-pound coin in some minting series.
- The curriculum's mention of U.S. presidents is dropped entirely.
- If the platform later serves non-Egyptian Arabic-speaking markets, the coin catalog may need a locale parameter. That is deferred until the need arises.
