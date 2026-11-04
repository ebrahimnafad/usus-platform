import { describe, expect, it } from "vitest";
import {
  GRADES,
  getGradeConfig,
  type GradeConfig,
  type GradeColorToken,
} from "@/config/grades";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

describe("Ticket 01 — Shared Grade Config & Framer Motion Setup", () => {
  it("exports a GRADES array covering all 6 grades in strict sequence (K to 5)", () => {
    expect(GRADES).toHaveLength(6);
    expect(GRADES.map((g) => g.id)).toEqual(["K", "1", "2", "3", "4", "5"]);
  });

  it("provides correct Arabic labels and Eastern Arabic short labels", () => {
    expect(GRADES.map((g) => g.label)).toEqual([
      "الروضة",
      "الصف الأول",
      "الصف الثاني",
      "الصف الثالث",
      "الصف الرابع",
      "الصف الخامس",
    ]);

    expect(GRADES.map((g) => g.shortLabel)).toEqual([
      "الروضة K",
      "الصف ١",
      "الصف ٢",
      "الصف ٣",
      "الصف ٤",
      "الصف ٥",
    ]);
  });

  it("assigns the specified Tailwind color tokens across grades", () => {
    const expectedColors: GradeColorToken[] = [
      "rose",
      "orange",
      "amber",
      "emerald",
      "sky",
      "violet",
    ];
    expect(GRADES.map((g) => g.color)).toEqual(expectedColors);
  });

  it("maps visual models per grade according to the design specification", () => {
    expect(GRADES.map((g) => g.visualModel)).toEqual([
      "FiveFrame",
      "TenFrame",
      "NumberLine",
      "ArrayModel",
      "BarModel",
      "CoordinateGrid",
    ]);
  });

  it("defines 12 units and 135 lessons per grade", () => {
    for (const grade of GRADES) {
      expect(grade.unitCount).toBe(12);
      expect(grade.lessonCount).toBe(135);
      expect(grade.descriptionAr).toBeTruthy();
    }
  });

  it("provides getGradeConfig helper that retrieves grade config case-insensitively", () => {
    expect(getGradeConfig("K")?.color).toBe("rose");
    expect(getGradeConfig("k")?.color).toBe("rose");
    expect(getGradeConfig("3")?.color).toBe("emerald");
    expect(getGradeConfig("invalid")).toBeUndefined();
  });

  it("exports useReducedMotion as a hook function", () => {
    expect(typeof useReducedMotion).toBe("function");
  });
});
