import { describe, expect, it } from "vitest";
import { A4_WIDTH_PX, computeA4FitScale } from "@/lib/use-a4-fit-scale";

describe("computeA4FitScale", () => {
  it("returns 1 when disabled or when container is at least A4 width", () => {
    expect(computeA4FitScale(360, false)).toBe(1);
    expect(computeA4FitScale(A4_WIDTH_PX, true)).toBe(1);
    expect(computeA4FitScale(1024, true)).toBe(1);
    expect(computeA4FitScale(0, true)).toBe(1);
  });

  it("scales proportionally for mobile viewports and clamps at 0.38", () => {
    expect(computeA4FitScale(397, true)).toBeCloseTo(0.5, 4);
    expect(computeA4FitScale(200, true)).toBe(0.38);
  });
});
