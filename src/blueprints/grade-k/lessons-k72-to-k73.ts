import type { LessonBlueprint } from "@/domain/types";
import { AUTHORED_LESSON_LOCALIZATION } from "@/curriculum/arabic-localization";
import { registerLessonBlueprint } from "@/blueprints/registry";

// ============================================================================
// Lesson K-72: Perimeter of Shapes - Count
// ============================================================================
export const lessonK72Blueprint: LessonBlueprint = {
  lessonId: "K-72",
  grade: "K",
  lessonNumber: 72,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-72"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-72"].teacherNotes,
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "MeasureAndCompareLength",
          promptAr:
            "قِسْ أطوال الأشرطة الثلاثة بمشابك الورق واكتب أطوالها، ثم رتّبها من الأقصر إلى الأطول:",
          strategyHintAr:
            "قِسْ الشريط الأقصر أولاً واكتب الأطوال الثلاثة، ثم رتّبها تصاعدياً من الأصغر إلى الأكبر.",
          params: {
            mode: "measure-bars",
            barCount: 3,
            bars: [
              { nameAr: "الشريط (١)", length: 2, colorTheme: "sky" },
              { nameAr: "الشريط (٢)", length: 4, colorTheme: "amber" },
              { nameAr: "الشريط (٣)", length: 6, colorTheme: "emerald" },
            ],
            comparisonTarget: "order-all",
          },
        },
      ],
      practice: [
        {
          archetype: "MeasureAndCompareLength",
          promptAr:
            "عدّ أضلاع كل شكل من الأشكال المستوية ثم اكتب عدد أضلاعه في المربع:",
          strategyHintAr:
            "انظر إلى أضلاع كل شكل وضع علامة صغيرة أثناء العدّ حول الشكل حتى نقطة البدء.",
          params: {
            mode: "polygon-sides",
            polygons: [
              {
                shapeId: "triangle",
                shapeNameAr: "مثلث",
                sideCount: 3,
                colorTheme: "amber",
              },
              {
                shapeId: "square",
                shapeNameAr: "مربع",
                sideCount: 4,
                colorTheme: "sky",
              },
            ],
          },
        },
        {
          archetype: "MeasureAndCompareLength",
          promptAr:
            "عدّ أضلاع كل مضلّع منتظم من الأشكال الآتية ثم اكتب عدد أضلاعه:",
          strategyHintAr:
            "عدّ الأضلاع بالدوران حول الشكل واكتب العدد الكلّي في المربع.",
          params: {
            mode: "polygon-sides",
            polygons: [
              {
                shapeId: "rectangle",
                shapeNameAr: "مستطيل",
                sideCount: 4,
                colorTheme: "emerald",
              },
              {
                shapeId: "pentagon",
                shapeNameAr: "خماسي",
                sideCount: 5,
                colorTheme: "violet",
              },
            ],
          },
        },
      ],
      challenge: [
        {
          archetype: "ConnectMatch",
          promptAr: "صِلْ كل شكل هندسي بالوصف المطابق لعدد أضلاعه:",
          strategyHintAr:
            "عدّ أضلاع كل شكل أولاً، ثم صِلْه بالبطاقة التي تحمل عدد أضلاعه الصحيح.",
          params: {
            matchingMode: "shape-to-description",
            pairCount: 3,
            customCandidatePairs: [
              {
                id: "tri",
                right: {
                  id: "shape-tri",
                  kind: "shape-2d",
                  count: 3,
                  labelAr: "مثلث",
                  colorTheme: "amber",
                },
                left: {
                  id: "desc-tri",
                  kind: "shape-description",
                  count: 3,
                  labelAr: "شكل له ٣ أضلاع مستقيمة و٣ زوايا",
                  meta: { textAr: "شكل له ٣ أضلاع مستقيمة و٣ زوايا" },
                },
                reasonAr: "المثلث له ٣ أضلاع",
              },
              {
                id: "sq",
                right: {
                  id: "shape-sq",
                  kind: "shape-2d",
                  count: 4,
                  labelAr: "مربع",
                  colorTheme: "sky",
                },
                left: {
                  id: "desc-sq",
                  kind: "shape-description",
                  count: 4,
                  labelAr: "شكل له ٤ أضلاع متساوية في الطول",
                  meta: { textAr: "شكل له ٤ أضلاع متساوية في الطول" },
                },
                reasonAr: "المربع له ٤ أضلاع متساوية",
              },
              {
                id: "pent",
                right: {
                  id: "shape-pent",
                  kind: "shape-2d",
                  count: 5,
                  labelAr: "خماسي",
                  colorTheme: "violet",
                },
                left: {
                  id: "desc-pent",
                  kind: "shape-description",
                  count: 5,
                  labelAr: "شكل له ٥ أضلاع مستقيمة و٥ زوايا",
                  meta: { textAr: "شكل له ٥ أضلاع مستقيمة و٥ زوايا" },
                },
                reasonAr: "الخماسي له ٥ أضلاع",
              },
            ],
          },
        },
      ],
    },
    Intermediate: {
      warmUp: [
        {
          archetype: "MeasureAndCompareLength",
          promptAr:
            "قِسْ أطوال الأشرطة الثلاثة بمشابك الورق واكتب أطوالها، ثم رتّبها من الأقصر إلى الأطول:",
          strategyHintAr:
            "قِسْ الشريط الأقصر أولاً واكتب الأطوال الثلاثة، ثم رتّبها تصاعدياً من الأصغر إلى الأكبر.",
          params: {
            mode: "measure-bars",
            barCount: 3,
            bars: [
              { nameAr: "الشريط (١)", length: 3, colorTheme: "emerald" },
              { nameAr: "الشريط (٢)", length: 6, colorTheme: "teal" },
              { nameAr: "الشريط (٣)", length: 8, colorTheme: "violet" },
            ],
            comparisonTarget: "order-all",
          },
        },
      ],
      practice: [
        {
          archetype: "MeasureAndCompareLength",
          promptAr:
            "عدّ أضلاع كل شكل من الأشكال المستوية ثم اكتب عدد أضلاعه في المربع:",
          strategyHintAr:
            "انظر إلى أضلاع كل شكل وضع علامة صغيرة أثناء العدّ حول الشكل حتى نقطة البدء.",
          params: {
            mode: "polygon-sides",
            polygons: [
              {
                shapeId: "square",
                shapeNameAr: "مربع",
                sideCount: 4,
                colorTheme: "sky",
              },
              {
                shapeId: "pentagon",
                shapeNameAr: "خماسي",
                sideCount: 5,
                colorTheme: "violet",
              },
            ],
          },
        },
        {
          archetype: "MeasureAndCompareLength",
          promptAr:
            "عدّ أضلاع كل مضلّع منتظم من الأشكال الآتية ثم اكتب عدد أضلاعه:",
          strategyHintAr:
            "عدّ الأضلاع بالدوران حول الشكل واكتب العدد الكلّي في المربع.",
          params: {
            mode: "polygon-sides",
            polygons: [
              {
                shapeId: "hexagon",
                shapeNameAr: "سداسي",
                sideCount: 6,
                colorTheme: "rose",
              },
              {
                shapeId: "octagon",
                shapeNameAr: "ثماني",
                sideCount: 8,
                colorTheme: "indigo",
              },
            ],
          },
        },
      ],
      challenge: [
        {
          archetype: "ConnectMatch",
          promptAr: "صِلْ كل شكل هندسي بالوصف المطابق لعدد أضلاعه:",
          strategyHintAr:
            "عدّ أضلاع كل شكل أولاً، ثم صِلْه بالبطاقة التي تحمل عدد أضلاعه الصحيح.",
          params: {
            matchingMode: "shape-to-description",
            pairCount: 3,
            customCandidatePairs: [
              {
                id: "sq",
                right: {
                  id: "shape-sq",
                  kind: "shape-2d",
                  count: 4,
                  labelAr: "مربع",
                  colorTheme: "sky",
                },
                left: {
                  id: "desc-sq",
                  kind: "shape-description",
                  count: 4,
                  labelAr: "شكل له ٤ أضلاع متساوية في الطول",
                  meta: { textAr: "شكل له ٤ أضلاع متساوية في الطول" },
                },
                reasonAr: "المربع له ٤ أضلاع",
              },
              {
                id: "pent",
                right: {
                  id: "shape-pent",
                  kind: "shape-2d",
                  count: 5,
                  labelAr: "خماسي",
                  colorTheme: "violet",
                },
                left: {
                  id: "desc-pent",
                  kind: "shape-description",
                  count: 5,
                  labelAr: "شكل له ٥ أضلاع مستقيمة و٥ زوايا",
                  meta: { textAr: "شكل له ٥ أضلاع مستقيمة و٥ زوايا" },
                },
                reasonAr: "الخماسي له ٥ أضلاع",
              },
              {
                id: "hex",
                right: {
                  id: "shape-hex",
                  kind: "shape-2d",
                  count: 6,
                  labelAr: "سداسي",
                  colorTheme: "rose",
                },
                left: {
                  id: "desc-hex",
                  kind: "shape-description",
                  count: 6,
                  labelAr: "شكل له ٦ أضلاع مستقيمة و٦ زوايا",
                  meta: { textAr: "شكل له ٦ أضلاع مستقيمة و٦ زوايا" },
                },
                reasonAr: "السداسي له ٦ أضلاع",
              },
            ],
          },
        },
      ],
    },
    Advanced: {
      warmUp: [
        {
          archetype: "MeasureAndCompareLength",
          promptAr:
            "قِسْ أطوال الأشرطة الثلاثة بمشابك الورق واكتب أطوالها، ثم رتّبها من الأقصر إلى الأطول:",
          strategyHintAr:
            "قِسْ الشريط الأقصر أولاً واكتب الأطوال الثلاثة، ثم رتّبها تصاعدياً من الأصغر إلى الأكبر.",
          params: {
            mode: "measure-bars",
            barCount: 3,
            bars: [
              { nameAr: "الشريط (١)", length: 4, colorTheme: "amber" },
              { nameAr: "الشريط (٢)", length: 7, colorTheme: "teal" },
              { nameAr: "الشريط (٣)", length: 10, colorTheme: "rose" },
            ],
            comparisonTarget: "order-all",
          },
        },
      ],
      practice: [
        {
          archetype: "MeasureAndCompareLength",
          promptAr:
            "عدّ أضلاع كل شكل من الأشكال المستوية ثم اكتب عدد أضلاعه في المربع:",
          strategyHintAr:
            "انظر إلى أضلاع كل شكل وضع علامة صغيرة أثناء العدّ حول الشكل حتى نقطة البدء.",
          params: {
            mode: "polygon-sides",
            polygons: [
              {
                shapeId: "pentagon",
                shapeNameAr: "خماسي",
                sideCount: 5,
                colorTheme: "violet",
              },
              {
                shapeId: "hexagon",
                shapeNameAr: "سداسي",
                sideCount: 6,
                colorTheme: "rose",
              },
            ],
          },
        },
        {
          archetype: "MeasureAndCompareLength",
          promptAr:
            "عدّ أضلاع كل مضلّع منتظم من الأشكال الآتية ثم اكتب عدد أضلاعه:",
          strategyHintAr:
            "عدّ الأضلاع بالدوران حول الشكل واكتب العدد الكلّي في المربع.",
          params: {
            mode: "polygon-sides",
            polygons: [
              {
                shapeId: "heptagon",
                shapeNameAr: "سباعي",
                sideCount: 7,
                colorTheme: "teal",
              },
              {
                shapeId: "octagon",
                shapeNameAr: "ثماني",
                sideCount: 8,
                colorTheme: "indigo",
              },
            ],
          },
        },
      ],
      challenge: [
        {
          archetype: "ConnectMatch",
          promptAr: "صِلْ كل شكل هندسي بالوصف المطابق لعدد أضلاعه:",
          strategyHintAr:
            "عدّ أضلاع كل شكل أولاً، ثم صِلْه بالبطاقة التي تحمل عدد أضلاعه الصحيح.",
          params: {
            matchingMode: "shape-to-description",
            pairCount: 3,
            customCandidatePairs: [
              {
                id: "hex",
                right: {
                  id: "shape-hex",
                  kind: "shape-2d",
                  count: 6,
                  labelAr: "سداسي",
                  colorTheme: "rose",
                },
                left: {
                  id: "desc-hex",
                  kind: "shape-description",
                  count: 6,
                  labelAr: "شكل له ٦ أضلاع مستقيمة و٦ زوايا",
                  meta: { textAr: "شكل له ٦ أضلاع مستقيمة و٦ زوايا" },
                },
                reasonAr: "السداسي له ٦ أضلاع",
              },
              {
                id: "hept",
                right: {
                  id: "shape-hept",
                  kind: "shape-2d",
                  count: 7,
                  labelAr: "سباعي",
                  colorTheme: "teal",
                },
                left: {
                  id: "desc-hept",
                  kind: "shape-description",
                  count: 7,
                  labelAr: "شكل له ٧ أضلاع مستقيمة و٧ زوايا",
                  meta: { textAr: "شكل له ٧ أضلاع مستقيمة و٧ زوايا" },
                },
                reasonAr: "السباعي له ٧ أضلاع",
              },
              {
                id: "oct",
                right: {
                  id: "shape-oct",
                  kind: "shape-2d",
                  count: 8,
                  labelAr: "ثماني",
                  colorTheme: "indigo",
                },
                left: {
                  id: "desc-oct",
                  kind: "shape-description",
                  count: 8,
                  labelAr: "شكل له ٨ أضلاع مستقيمة و٨ زوايا",
                  meta: { textAr: "شكل له ٨ أضلاع مستقيمة و٨ زوايا" },
                },
                reasonAr: "الثماني له ٨ أضلاع",
              },
            ],
          },
        },
      ],
    },
  },
};

// ============================================================================
// Lesson K-73: Perimeter of Shapes - Count & Measure
// ============================================================================
export const lessonK73Blueprint: LessonBlueprint = {
  lessonId: "K-73",
  grade: "K",
  lessonNumber: 73,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-73"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-73"].teacherNotes,
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "MeasureAndCompareLength",
          promptAr:
            "عدّ أضلاع كل شكل من الأشكال المستوية ثم اكتب عدد أضلاعه في المربع:",
          strategyHintAr:
            "انظر إلى أضلاع كل شكل وضع علامة صغيرة أثناء العدّ حول الشكل حتى نقطة البدء.",
          params: {
            mode: "polygon-sides",
            polygons: [
              {
                shapeId: "triangle",
                shapeNameAr: "مثلث",
                sideCount: 3,
                colorTheme: "amber",
              },
              {
                shapeId: "square",
                shapeNameAr: "مربع",
                sideCount: 4,
                colorTheme: "sky",
              },
            ],
          },
        },
      ],
      practice: [
        {
          archetype: "MeasureAndCompareLength",
          promptAr:
            "عدّ مشابك الورق حول محيط كل شكل ثم اكتب قياس المحيط في المربع:",
          strategyHintAr:
            "انظر إلى مشابك الورق المصطفّة على جميع الأضلاع واجمعها لمعرفة المحيط الكلّي.",
          params: {
            mode: "polygon-perimeter",
            polygons: [
              {
                shapeId: "triangle",
                shapeNameAr: "مثلث",
                sideCount: 3,
                clipsPerSide: 1,
                totalClips: 3,
                colorTheme: "amber",
              },
              {
                shapeId: "rectangle",
                shapeNameAr: "مستطيل",
                sideCount: 4,
                clipsPerSide: 1,
                totalClips: 4,
                colorTheme: "emerald",
              },
            ],
          },
        },
        {
          archetype: "MeasureAndCompareLength",
          promptAr:
            "قِسْ محيط كل شكل بعدّ مشابك الورق على أضلاعه ثم اكتب المحيط في المربع:",
          strategyHintAr:
            "عدّ مشابك كل ضلع واجمعها معاً لإيجاد العدد الكلّي للمشابك حول الشكل.",
          params: {
            mode: "polygon-perimeter",
            polygons: [
              {
                shapeId: "square",
                shapeNameAr: "مربع",
                sideCount: 4,
                clipsPerSide: 1,
                totalClips: 4,
                colorTheme: "sky",
              },
              {
                shapeId: "pentagon",
                shapeNameAr: "خماسي",
                sideCount: 5,
                clipsPerSide: 1,
                totalClips: 5,
                colorTheme: "violet",
              },
            ],
          },
        },
      ],
      challenge: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "صِلْ كل شكل بالوصف المطابق لمحيطه ثم اكتب العدد الناقص في المربع:",
          strategyHintAr:
            "عدّ مشابك المحيط لكل مضلّع، ثم صِلْ بالوصف المناسب واكتب عدد المشابك في الفراغ.",
          params: {
            matchingMode: "shape-to-description",
            pairCount: 3,
            customCandidatePairs: [
              {
                id: "tri",
                right: {
                  id: "poly-tri",
                  kind: "polygon-perimeter",
                  count: 3,
                  labelAr: "مثلث",
                  colorTheme: "amber",
                  meta: {
                    shapeId: "triangle",
                    sideCount: 3,
                    clipsPerSide: 1,
                    totalClips: 3,
                    mode: "polygon-perimeter",
                    compact: true,
                  },
                },
                left: {
                  id: "desc-tri",
                  kind: "shape-description",
                  count: 3,
                  labelAr: "مثلث محيطه بمشابك الورق يساوي",
                  meta: {
                    textAr: "مثلث محيطه بمشابك الورق يساوي",
                    missingNumber: 3,
                  },
                },
                reasonAr: "محيط المثلث = ٣ مشابك",
              },
              {
                id: "rect",
                right: {
                  id: "poly-rect",
                  kind: "polygon-perimeter",
                  count: 4,
                  labelAr: "مستطيل",
                  colorTheme: "emerald",
                  meta: {
                    shapeId: "rectangle",
                    sideCount: 4,
                    clipsPerSide: 1,
                    totalClips: 4,
                    mode: "polygon-perimeter",
                    compact: true,
                  },
                },
                left: {
                  id: "desc-rect",
                  kind: "shape-description",
                  count: 4,
                  labelAr: "مستطيل محيطه بمشابك الورق يساوي",
                  meta: {
                    textAr: "مستطيل محيطه بمشابك الورق يساوي",
                    missingNumber: 4,
                  },
                },
                reasonAr: "محيط المستطيل = ٤ مشابك",
              },
              {
                id: "pent",
                right: {
                  id: "poly-pent",
                  kind: "polygon-perimeter",
                  count: 5,
                  labelAr: "خماسي",
                  colorTheme: "violet",
                  meta: {
                    shapeId: "pentagon",
                    sideCount: 5,
                    clipsPerSide: 1,
                    totalClips: 5,
                    mode: "polygon-perimeter",
                    compact: true,
                  },
                },
                left: {
                  id: "desc-pent",
                  kind: "shape-description",
                  count: 5,
                  labelAr: "خماسي محيطه بمشابك الورق يساوي",
                  meta: {
                    textAr: "خماسي محيطه بمشابك الورق يساوي",
                    missingNumber: 5,
                  },
                },
                reasonAr: "محيط الخماسي = ٥ مشابك",
              },
            ],
          },
        },
      ],
    },
    Intermediate: {
      warmUp: [
        {
          archetype: "MeasureAndCompareLength",
          promptAr:
            "عدّ أضلاع كل شكل من الأشكال المستوية ثم اكتب عدد أضلاعه في المربع:",
          strategyHintAr:
            "انظر إلى أضلاع كل شكل وضع علامة صغيرة أثناء العدّ حول الشكل حتى نقطة البدء.",
          params: {
            mode: "polygon-sides",
            polygons: [
              {
                shapeId: "square",
                shapeNameAr: "مربع",
                sideCount: 4,
                colorTheme: "sky",
              },
              {
                shapeId: "pentagon",
                shapeNameAr: "خماسي",
                sideCount: 5,
                colorTheme: "violet",
              },
            ],
          },
        },
      ],
      practice: [
        {
          archetype: "MeasureAndCompareLength",
          promptAr:
            "عدّ مشابك الورق حول محيط كل شكل ثم اكتب قياس المحيط في المربع:",
          strategyHintAr:
            "انظر إلى مشابك الورق المصطفّة على جميع الأضلاع واجمعها لمعرفة المحيط الكلّي.",
          params: {
            mode: "polygon-perimeter",
            polygons: [
              {
                shapeId: "rectangle",
                shapeNameAr: "مستطيل",
                sideCount: 4,
                clipsPerSide: 1,
                totalClips: 4,
                colorTheme: "emerald",
              },
              {
                shapeId: "pentagon",
                shapeNameAr: "خماسي",
                sideCount: 5,
                clipsPerSide: 1,
                totalClips: 5,
                colorTheme: "violet",
              },
            ],
          },
        },
        {
          archetype: "MeasureAndCompareLength",
          promptAr:
            "قِسْ محيط كل شكل بعدّ مشابك الورق على أضلاعه ثم اكتب المحيط في المربع:",
          strategyHintAr:
            "عدّ مشابك كل ضلع واجمعها معاً لإيجاد العدد الكلّي للمشابك حول الشكل.",
          params: {
            mode: "polygon-perimeter",
            polygons: [
              {
                shapeId: "hexagon",
                shapeNameAr: "سداسي",
                sideCount: 6,
                clipsPerSide: 1,
                totalClips: 6,
                colorTheme: "rose",
              },
              {
                shapeId: "square",
                shapeNameAr: "مربع",
                sideCount: 4,
                clipsPerSide: 2,
                totalClips: 8,
                colorTheme: "sky",
              },
            ],
          },
        },
      ],
      challenge: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "صِلْ كل شكل بالوصف المطابق لمحيطه ثم اكتب العدد الناقص في المربع:",
          strategyHintAr:
            "عدّ مشابك المحيط لكل مضلّع، ثم صِلْ بالوصف المناسب واكتب عدد المشابك في الفراغ.",
          params: {
            matchingMode: "shape-to-description",
            pairCount: 3,
            customCandidatePairs: [
              {
                id: "rect",
                right: {
                  id: "poly-rect",
                  kind: "polygon-perimeter",
                  count: 4,
                  labelAr: "مستطيل",
                  colorTheme: "emerald",
                  meta: {
                    shapeId: "rectangle",
                    sideCount: 4,
                    clipsPerSide: 1,
                    totalClips: 4,
                    mode: "polygon-perimeter",
                    compact: true,
                  },
                },
                left: {
                  id: "desc-rect",
                  kind: "shape-description",
                  count: 4,
                  labelAr: "مستطيل محيطه بمشابك الورق يساوي",
                  meta: {
                    textAr: "مستطيل محيطه بمشابك الورق يساوي",
                    missingNumber: 4,
                  },
                },
                reasonAr: "محيط المستطيل = ٤ مشابك",
              },
              {
                id: "pent",
                right: {
                  id: "poly-pent",
                  kind: "polygon-perimeter",
                  count: 5,
                  labelAr: "خماسي",
                  colorTheme: "violet",
                  meta: {
                    shapeId: "pentagon",
                    sideCount: 5,
                    clipsPerSide: 1,
                    totalClips: 5,
                    mode: "polygon-perimeter",
                    compact: true,
                  },
                },
                left: {
                  id: "desc-pent",
                  kind: "shape-description",
                  count: 5,
                  labelAr: "خماسي محيطه بمشابك الورق يساوي",
                  meta: {
                    textAr: "خماسي محيطه بمشابك الورق يساوي",
                    missingNumber: 5,
                  },
                },
                reasonAr: "محيط الخماسي = ٥ مشابك",
              },
              {
                id: "hex",
                right: {
                  id: "poly-hex",
                  kind: "polygon-perimeter",
                  count: 6,
                  labelAr: "سداسي",
                  colorTheme: "rose",
                  meta: {
                    shapeId: "hexagon",
                    sideCount: 6,
                    clipsPerSide: 1,
                    totalClips: 6,
                    mode: "polygon-perimeter",
                    compact: true,
                  },
                },
                left: {
                  id: "desc-hex",
                  kind: "shape-description",
                  count: 6,
                  labelAr: "سداسي محيطه بمشابك الورق يساوي",
                  meta: {
                    textAr: "سداسي محيطه بمشابك الورق يساوي",
                    missingNumber: 6,
                  },
                },
                reasonAr: "محيط السداسي = ٦ مشابك",
              },
            ],
          },
        },
      ],
    },
    Advanced: {
      warmUp: [
        {
          archetype: "MeasureAndCompareLength",
          promptAr:
            "عدّ أضلاع كل شكل من الأشكال المستوية ثم اكتب عدد أضلاعه في المربع:",
          strategyHintAr:
            "انظر إلى أضلاع كل شكل وضع علامة صغيرة أثناء العدّ حول الشكل حتى نقطة البدء.",
          params: {
            mode: "polygon-sides",
            polygons: [
              {
                shapeId: "pentagon",
                shapeNameAr: "خماسي",
                sideCount: 5,
                colorTheme: "violet",
              },
              {
                shapeId: "hexagon",
                shapeNameAr: "سداسي",
                sideCount: 6,
                colorTheme: "rose",
              },
            ],
          },
        },
      ],
      practice: [
        {
          archetype: "MeasureAndCompareLength",
          promptAr:
            "عدّ مشابك الورق حول محيط كل شكل ثم اكتب قياس المحيط في المربع:",
          strategyHintAr:
            "انظر إلى مشابك الورق المصطفّة على جميع الأضلاع واجمعها لمعرفة المحيط الكلّي.",
          params: {
            mode: "polygon-perimeter",
            polygons: [
              {
                shapeId: "hexagon",
                shapeNameAr: "سداسي",
                sideCount: 6,
                clipsPerSide: 1,
                totalClips: 6,
                colorTheme: "rose",
              },
              {
                shapeId: "octagon",
                shapeNameAr: "ثماني",
                sideCount: 8,
                clipsPerSide: 1,
                totalClips: 8,
                colorTheme: "indigo",
              },
            ],
          },
        },
        {
          archetype: "MeasureAndCompareLength",
          promptAr:
            "قِسْ محيط كل شكل بعدّ مشابك الورق على أضلاعه ثم اكتب المحيط في المربع:",
          strategyHintAr:
            "عدّ مشابك كل ضلع واجمعها معاً لإيجاد العدد الكلّي للمشابك حول الشكل.",
          params: {
            mode: "polygon-perimeter",
            polygons: [
              {
                shapeId: "pentagon",
                shapeNameAr: "خماسي",
                sideCount: 5,
                clipsPerSide: 1,
                totalClips: 5,
                colorTheme: "violet",
              },
              {
                shapeId: "square",
                shapeNameAr: "مربع",
                sideCount: 4,
                clipsPerSide: 2,
                totalClips: 8,
                colorTheme: "sky",
              },
            ],
          },
        },
      ],
      challenge: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "صِلْ كل شكل بالوصف المطابق لمحيطه ثم اكتب العدد الناقص في المربع:",
          strategyHintAr:
            "عدّ مشابك المحيط لكل مضلّع، ثم صِلْ بالوصف المناسب واكتب عدد المشابك في الفراغ.",
          params: {
            matchingMode: "shape-to-description",
            pairCount: 3,
            customCandidatePairs: [
              {
                id: "hex",
                right: {
                  id: "poly-hex",
                  kind: "polygon-perimeter",
                  count: 6,
                  labelAr: "سداسي",
                  colorTheme: "rose",
                  meta: {
                    shapeId: "hexagon",
                    sideCount: 6,
                    clipsPerSide: 1,
                    totalClips: 6,
                    mode: "polygon-perimeter",
                    compact: true,
                  },
                },
                left: {
                  id: "desc-hex",
                  kind: "shape-description",
                  count: 6,
                  labelAr: "سداسي محيطه بمشابك الورق يساوي",
                  meta: {
                    textAr: "سداسي محيطه بمشابك الورق يساوي",
                    missingNumber: 6,
                  },
                },
                reasonAr: "محيط السداسي = ٦ مشابك",
              },
              {
                id: "sq-8",
                right: {
                  id: "poly-sq-8",
                  kind: "polygon-perimeter",
                  count: 8,
                  labelAr: "مربع",
                  colorTheme: "sky",
                  meta: {
                    shapeId: "square",
                    sideCount: 4,
                    clipsPerSide: 2,
                    totalClips: 8,
                    mode: "polygon-perimeter",
                    compact: true,
                  },
                },
                left: {
                  id: "desc-sq-8",
                  kind: "shape-description",
                  count: 8,
                  labelAr: "مربع محيطه بمشابك الورق يساوي",
                  meta: {
                    textAr: "مربع محيطه بمشابك الورق يساوي",
                    missingNumber: 8,
                  },
                },
                reasonAr: "محيط المربع = ٨ مشابك",
              },
              {
                id: "oct",
                right: {
                  id: "poly-oct",
                  kind: "polygon-perimeter",
                  count: 8,
                  labelAr: "ثماني",
                  colorTheme: "indigo",
                  meta: {
                    shapeId: "octagon",
                    sideCount: 8,
                    clipsPerSide: 1,
                    totalClips: 8,
                    mode: "polygon-perimeter",
                    compact: true,
                  },
                },
                left: {
                  id: "desc-oct",
                  kind: "shape-description",
                  count: 8,
                  labelAr: "ثماني محيطه بمشابك الورق يساوي",
                  meta: {
                    textAr: "ثماني محيطه بمشابك الورق يساوي",
                    missingNumber: 8,
                  },
                },
                reasonAr: "محيط الثماني = ٨ مشابك",
              },
            ],
          },
        },
      ],
    },
  },
};

registerLessonBlueprint(lessonK72Blueprint);
registerLessonBlueprint(lessonK73Blueprint);
