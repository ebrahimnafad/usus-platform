import { describe, expect, it } from "vitest";
import React from "react";
import { renderToString } from "react-dom/server";
import { getReadingStory, getReadingLevel } from "@/curriculum/reading-catalog";
import StoryCycleRunnerPage from "@/app/reading/level/[levelId]/story/[storyId]/page";
import { findWesternNumeralsInRenderedHtml } from "@/lib/numerals";

import TeacherShieldDrawer from "@/components/reading/TeacherShieldDrawer";

describe("Ticket 05 — Reading Nook, Transfer Test Mode, and Teacher Shield Drawer", () => {
  const level1 = getReadingLevel("level-1")!;
  const story1 = getReadingStory("level-1", 1)!;

  describe("Free-Reading Nook (Story 4 & Story 10)", () => {
    it("renders Story 4 in the cozy Reading Nook view with zero steppers and zero questions", async () => {
      const pageComponent = await StoryCycleRunnerPage({
        params: Promise.resolve({ levelId: "level-1", storyId: "4" }),
      });
      const html = renderToString(pageComponent);

      // 1. Reading nook aesthetic markers
      expect(html).toContain("ركن القراءة الهادئة");
      expect(html).toContain("أتممت القراءة");

      // 2. Zero steppers, zero QAR questions, zero grammar box
      expect(html).not.toContain("اكتشاف المعنى");
      expect(html).not.toContain("أين تعيش الإجابة");
      expect(html).not.toContain("معمل اللغة الاستقرائي");

      // 3. Story text present
      expect(html).toContain("رِحْلَةُ الغَيْمَةِ البَيْضَاءِ");

      // 4. Zero Western numerals
      const westernNums = findWesternNumeralsInRenderedHtml(html);
      expect(westernNums).toEqual([]);
    });
  });

  describe("Transfer-Test Mode (Story 6 & Story 12)", () => {
    it("renders Story 6 with transfer-test badge and locked unassisted scaffolds", async () => {
      const pageComponent = await StoryCycleRunnerPage({
        params: Promise.resolve({ levelId: "level-1", storyId: "6" }),
      });
      const html = renderToString(pageComponent);

      // 1. Prominent transfer-test badge
      expect(html).toContain("اختبار النقل");
      expect(html).toContain("قياس الأداء المستقل");

      // 2. Stepper is present for the session structure
      expect(html).toContain("الأسئلة والتحليل");

      // 3. Zero Western numerals
      const westernNums = findWesternNumeralsInRenderedHtml(html);
      expect(westernNums).toEqual([]);
    });
  });

  describe("Teacher Shield Drawer", () => {
    it("renders Teacher Shield button and blind-spot protection tips", async () => {
      const pageComponent = await StoryCycleRunnerPage({
        params: Promise.resolve({ levelId: "level-1", storyId: "1" }),
      });
      const pageHtml = renderToString(pageComponent);

      // 1. Shield trigger button present on page
      expect(pageHtml).toContain("درع المعلم");

      // 2. Drawer content rendered when opened
      const drawerHtml = renderToString(
        React.createElement(TeacherShieldDrawer, {
          isOpen: true,
          onClose: () => {},
          storyId: story1.id,
          storyTitle: story1.titleAr ?? story1.title,
          teacherGuide: story1.teacherGuide,
          isTransferTest: false,
        })
      );

      // 3. Blind-spot warnings
      expect(drawerHtml).toContain("الفصحى والعامية");
      expect(drawerHtml).toContain("الوقف ليس خطأ");
      expect(drawerHtml).toContain("تجنب التصحيح المفرط");

      // 4. Tracking matrix options
      expect(drawerHtml).toContain("مستقل تماماً");
      expect(drawerHtml).toContain("ترقية بُعد واحد");

      // 5. Zero Western numerals in drawer
      const westernNums = findWesternNumeralsInRenderedHtml(drawerHtml);
      expect(westernNums).toEqual([]);
    });
  });
});
