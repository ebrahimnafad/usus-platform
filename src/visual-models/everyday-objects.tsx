import React from "react";
import type {
  ColorThemeId,
  EverydayObjectCategory,
  EverydayObjectId,
  VisualModelSpec,
} from "@/domain/types";

export interface EverydayObjectDefinition {
  id: EverydayObjectId;
  category: EverydayObjectCategory;
  labelAr: string;
  colorTheme: ColorThemeId;
  silhouetteNoteAr: string;
}

export const EVERYDAY_OBJECT_CATALOG: EverydayObjectDefinition[] = [
  // Fruits (فواكه)
  {
    id: "apple",
    category: "fruits",
    labelAr: "تفاحة حمراء",
    colorTheme: "coral",
    silhouetteNoteAr: "شكل دائري مع ورقة خضراء وساق علوية",
  },
  {
    id: "banana",
    category: "fruits",
    labelAr: "موزة صفراء",
    colorTheme: "amber",
    silhouetteNoteAr: "شكل هلالي منحنٍ مع خطوط طولية",
  },
  {
    id: "strawberry",
    category: "fruits",
    labelAr: "فراولة منقّطة",
    colorTheme: "rose",
    silhouetteNoteAr: "شكل قلبي منقّط ببذور وتاج أخضر",
  },
  {
    id: "orange",
    category: "fruits",
    labelAr: "برتقالة",
    colorTheme: "amber",
    silhouetteNoteAr: "شكل كروي مسامي مع ورقة جانبية",
  },

  // Animals (حيوانات)
  {
    id: "butterfly",
    category: "animals",
    labelAr: "فراشة ملوّنة",
    colorTheme: "violet",
    silhouetteNoteAr: "أربعة أجنحة متناظرة وقرنا استشعار",
  },
  {
    id: "cat",
    category: "animals",
    labelAr: "قطة لطيفة",
    colorTheme: "amber",
    silhouetteNoteAr: "وجه دائري مع أذنين مثلثتين وشوارب",
  },
  {
    id: "bird",
    category: "animals",
    labelAr: "عصفور مغرّد",
    colorTheme: "sky",
    silhouetteNoteAr: "جسم انسيابي مع جناح ومنقار صغير",
  },
  {
    id: "fish",
    category: "animals",
    labelAr: "سمكة بحرية",
    colorTheme: "teal",
    silhouetteNoteAr: "جسم بيضاوي بقشور وذيل مثلثي",
  },
  {
    id: "bee",
    category: "animals",
    labelAr: "نحلة مخطّطة",
    colorTheme: "amber",
    silhouetteNoteAr: "جسم مخطط بالأسود والأصفر مع جناحين شفافين",
  },

  // Toys (ألعاب)
  {
    id: "car",
    category: "toys",
    labelAr: "سيارة صغيرة",
    colorTheme: "coral",
    silhouetteNoteAr: "هيكل سيارة مع عجلتين دائريتين ونافذة",
  },
  {
    id: "ball",
    category: "toys",
    labelAr: "كرة الشاطئ",
    colorTheme: "sky",
    silhouetteNoteAr: "كرة مقسّمة إلى شرائح منحنية متعددة الألوان",
  },
  {
    id: "kite",
    category: "toys",
    labelAr: "طائرة ورقية",
    colorTheme: "violet",
    silhouetteNoteAr: "معيّن هندسي مقسّم بأقطار وذيل ذي أشرطة",
  },
  {
    id: "train",
    category: "toys",
    labelAr: "قطار خشبي",
    colorTheme: "emerald",
    silhouetteNoteAr: "قاطرة ذات مدخنة وثلاث عجلات",
  },

  // School supplies (أدوات مدرسية)
  {
    id: "pencil",
    category: "school",
    labelAr: "قلم رصاص",
    colorTheme: "amber",
    silhouetteNoteAr: "عمود مسدس طويل برأس مدبب وممحاة وردية",
  },
  {
    id: "book",
    category: "school",
    labelAr: "كتاب القراءة",
    colorTheme: "indigo",
    silhouetteNoteAr: "غلاف مستطيل مع صفحات بيضاء وشريط فاصل",
  },
  {
    id: "backpack",
    category: "school",
    labelAr: "حقيبة مدرسية",
    colorTheme: "emerald",
    silhouetteNoteAr: "حقيبة بقوس علوي وجيب أمامي وسحّاب",
  },
  {
    id: "crayon",
    category: "school",
    labelAr: "قلم تلوين شمعي",
    colorTheme: "rose",
    silhouetteNoteAr: "قلم أسطواني بشريطين متموجين وسنّ مخروطي",
  },

  // Nature & Treats (طبيعة وحلوى)
  {
    id: "flower",
    category: "nature",
    labelAr: "زهرة متفتّحة",
    colorTheme: "rose",
    silhouetteNoteAr: "ست بتلات دائرية حول قرص أوسط وساق مورقة",
  },
  {
    id: "star",
    category: "nature",
    labelAr: "نجمة مضيئة",
    colorTheme: "amber",
    silhouetteNoteAr: "نجمة خماسية الرؤوس بوجه مبتسم",
  },
  {
    id: "tree",
    category: "nature",
    labelAr: "شجرة خضراء",
    colorTheme: "emerald",
    silhouetteNoteAr: "تاج شجري كثيف ثلاثي الفصوص على جذع بني",
  },
  {
    id: "sun",
    category: "nature",
    labelAr: "شمس مشرقة",
    colorTheme: "amber",
    silhouetteNoteAr: "قرص دائري محاط بثمانية أشعة مثلثية",
  },
  {
    id: "leaf",
    category: "nature",
    labelAr: "ورقة شجر",
    colorTheme: "teal",
    silhouetteNoteAr: "ورقة مدببة بعروق متفرعة واضحة",
  },
  {
    id: "cupcake",
    category: "treats",
    labelAr: "كعكة الكرز",
    colorTheme: "rose",
    silhouetteNoteAr: "قاعدة مضلّعة وكريمة ملتفة تعلوها كرزة",
  },
];

export function getEverydayObjectById(id: string): EverydayObjectDefinition {
  return (
    EVERYDAY_OBJECT_CATALOG.find((item) => item.id === id) ??
    EVERYDAY_OBJECT_CATALOG[0]
  );
}

export function createEverydayObjectSpec(
  def: EverydayObjectDefinition,
  overrides?: Partial<VisualModelSpec>
): VisualModelSpec {
  return {
    kind: "everyday-object",
    id: def.id,
    labelAr: def.labelAr,
    category: def.category,
    colorTheme: def.colorTheme,
    size: "medium",
    ...overrides,
  };
}

/**
 * Renders a vibrant, children's-book-grade full-color inline SVG for an everyday object.
 * Pairs rich colors with distinct silhouettes and internal patterns so it remains crystal-clear
 * both in full color and on grayscale printers (ADR-0006).
 */
export function EverydayObjectSvg({
  objectId,
  size = "medium",
}: {
  objectId: string;
  size?: "tiny" | "small" | "medium" | "large";
}): React.ReactElement {
  const px =
    size === "tiny" ? 30 : size === "small" ? 32 : size === "large" ? 42 : 34;

  switch (objectId as EverydayObjectId) {
    case "apple":
      return (
        <svg
          width={px}
          height={px}
          viewBox="0 0 64 64"
          fill="none"
          aria-label="تفاحة حمراء"
        >
          {/* Stem */}
          <path
            d="M32 14 C32 8, 36 5, 39 5"
            stroke="#5C3A21"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Leaf with vein */}
          <path
            d="M33 12 C39 6, 49 8, 46 15 C42 18, 36 16, 33 12 Z"
            fill="#22C55E"
            stroke="#15803D"
            strokeWidth="2"
          />
          <path
            d="M35 12 L44 13"
            stroke="#15803D"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Apple body */}
          <path
            d="M32 17 C24 14, 12 19, 12 33 C12 47, 22 57, 29 57 C31 57, 32 55, 32 55 C32 55, 33 57, 35 57 C42 57, 52 47, 52 33 C52 19, 40 14, 32 17 Z"
            fill="#EF4444"
            stroke="#991B1B"
            strokeWidth="2.5"
          />
          {/* Glossy highlight */}
          <path
            d="M18 27 C17 33, 19 40, 22 44"
            stroke="#FCA5A5"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="21" cy="23" r="2.2" fill="#FEE2E2" />
        </svg>
      );

    case "banana":
      return (
        <svg
          width={px}
          height={px}
          viewBox="0 0 64 64"
          fill="none"
          aria-label="موزة صفراء"
        >
          <path
            d="M14 46 C26 54, 46 44, 52 18 C53 14, 50 11, 47 13 C40 32, 26 40, 14 38 C10 38, 10 43, 14 46 Z"
            fill="#FACC15"
            stroke="#A16207"
            strokeWidth="2.5"
          />
          {/* Ridges for grayscale texture */}
          <path
            d="M18 42 C30 45, 42 36, 48 18"
            stroke="#CA8A04"
            strokeWidth="1.8"
            strokeDasharray="4 2"
            strokeLinecap="round"
          />
          <path
            d="M47 11 L51 15"
            stroke="#5C3A21"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </svg>
      );

    case "strawberry":
      return (
        <svg
          width={px}
          height={px}
          viewBox="0 0 64 64"
          fill="none"
          aria-label="فراولة منقّطة"
        >
          {/* Body */}
          <path
            d="M32 56 C20 50, 14 34, 16 24 C18 16, 26 16, 32 20 C38 16, 46 16, 48 24 C50 34, 44 50, 32 56 Z"
            fill="#F43F5E"
            stroke="#9F1239"
            strokeWidth="2.5"
          />
          {/* Calyx crown */}
          <path
            d="M20 18 L27 22 L32 14 L37 22 L44 18 L39 25 L25 25 Z"
            fill="#22C55E"
            stroke="#15803D"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* Seeds */}
          <circle cx="25" cy="31" r="1.7" fill="#FEF08A" />
          <circle cx="33" cy="30" r="1.7" fill="#FEF08A" />
          <circle cx="39" cy="32" r="1.7" fill="#FEF08A" />
          <circle cx="28" cy="39" r="1.7" fill="#FEF08A" />
          <circle cx="36" cy="40" r="1.7" fill="#FEF08A" />
          <circle cx="32" cy="47" r="1.7" fill="#FEF08A" />
        </svg>
      );

    case "orange":
      return (
        <svg
          width={px}
          height={px}
          viewBox="0 0 64 64"
          fill="none"
          aria-label="برتقالة"
        >
          <circle
            cx="32"
            cy="35"
            r="20"
            fill="#FB923C"
            stroke="#9A3412"
            strokeWidth="2.5"
          />
          <path
            d="M32 15 L32 9"
            stroke="#5C3A21"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M33 13 C39 8, 47 10, 44 16 C40 18, 35 16, 33 13 Z"
            fill="#22C55E"
            stroke="#15803D"
            strokeWidth="1.8"
          />
          {/* Dimples */}
          <circle cx="23" cy="28" r="1.5" fill="#FDBA74" />
          <circle cx="20" cy="35" r="1.5" fill="#FDBA74" />
          <circle cx="26" cy="33" r="1.5" fill="#FDBA74" />
          <circle cx="39" cy="42" r="1.5" fill="#C2410C" />
          <circle cx="43" cy="36" r="1.5" fill="#C2410C" />
        </svg>
      );

    case "butterfly":
      return (
        <svg
          width={px}
          height={px}
          viewBox="0 0 64 64"
          fill="none"
          aria-label="فراشة ملوّنة"
        >
          {/* Upper wings */}
          <path
            d="M30 30 C16 12, 8 18, 12 31 C14 37, 23 36, 30 33 Z"
            fill="#A855F7"
            stroke="#581C87"
            strokeWidth="2.2"
          />
          <path
            d="M34 30 C48 12, 56 18, 52 31 C50 37, 41 36, 34 33 Z"
            fill="#A855F7"
            stroke="#581C87"
            strokeWidth="2.2"
          />
          {/* Lower wings */}
          <path
            d="M30 35 C18 37, 13 48, 21 53 C27 56, 30 46, 30 37 Z"
            fill="#EC4899"
            stroke="#831843"
            strokeWidth="2.2"
          />
          <path
            d="M34 35 C46 37, 51 48, 43 53 C37 56, 34 46, 34 37 Z"
            fill="#EC4899"
            stroke="#831843"
            strokeWidth="2.2"
          />
          {/* Wing decorative rings */}
          <circle
            cx="19"
            cy="26"
            r="3.5"
            fill="#FEF08A"
            stroke="#581C87"
            strokeWidth="1.4"
          />
          <circle
            cx="45"
            cy="26"
            r="3.5"
            fill="#FEF08A"
            stroke="#581C87"
            strokeWidth="1.4"
          />
          {/* Body & antennae */}
          <rect x="29.5" y="20" width="5" height="28" rx="2.5" fill="#3B0764" />
          <path
            d="M31 20 C28 13, 23 11, 21 13"
            stroke="#3B0764"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M33 20 C36 13, 41 11, 43 13"
            stroke="#3B0764"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );

    case "cat":
      return (
        <svg
          width={px}
          height={px}
          viewBox="0 0 64 64"
          fill="none"
          aria-label="قطة لطيفة"
        >
          {/* Ears */}
          <path
            d="M16 28 L14 11 L27 20 Z"
            fill="#F59E0B"
            stroke="#78350F"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <path
            d="M48 28 L50 11 L37 20 Z"
            fill="#F59E0B"
            stroke="#78350F"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          {/* Head */}
          <circle
            cx="32"
            cy="36"
            r="18"
            fill="#FBBF24"
            stroke="#78350F"
            strokeWidth="2.5"
          />
          {/* Eyes & nose */}
          <circle cx="25" cy="33" r="2.6" fill="#1E293B" />
          <circle cx="39" cy="33" r="2.6" fill="#1E293B" />
          <polygon points="32,37 29,41 35,41" fill="#F43F5E" />
          {/* Whiskers */}
          <path
            d="M11 36 L21 38 M11 41 L21 41"
            stroke="#78350F"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M53 36 L43 38 M53 41 L43 41"
            stroke="#78350F"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      );

    case "bird":
      return (
        <svg
          width={px}
          height={px}
          viewBox="0 0 64 64"
          fill="none"
          aria-label="عصفور مغرّد"
        >
          <path
            d="M16 38 C16 24, 28 16, 40 20 C48 22, 50 32, 46 40 C40 48, 22 48, 16 38 Z"
            fill="#38BDF8"
            stroke="#0369A1"
            strokeWidth="2.5"
          />
          {/* Wing */}
          <path
            d="M24 31 C30 27, 38 31, 35 39 C30 41, 24 38, 24 31 Z"
            fill="#0284C7"
            stroke="#0C4A6E"
            strokeWidth="2"
          />
          {/* Beak */}
          <polygon
            points="48,26 57,30 48,34"
            fill="#F59E0B"
            stroke="#B45309"
            strokeWidth="1.8"
          />
          {/* Eye */}
          <circle cx="42" cy="27" r="2.5" fill="#0F172A" />
          {/* Legs */}
          <path
            d="M29 46 L27 54 M36 46 L38 54"
            stroke="#B45309"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      );

    case "fish":
      return (
        <svg
          width={px}
          height={px}
          viewBox="0 0 64 64"
          fill="none"
          aria-label="سمكة بحرية"
        >
          {/* Tail */}
          <polygon
            points="16,32 6,20 6,44"
            fill="#F97316"
            stroke="#9A3412"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          {/* Body */}
          <ellipse
            cx="35"
            cy="32"
            rx="19"
            ry="13"
            fill="#14B8A6"
            stroke="#115E59"
            strokeWidth="2.5"
          />
          {/* Scales */}
          <path
            d="M28 26 Q32 32 28 38 M35 24 Q39 32 35 40"
            stroke="#99F6E4"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="45" cy="29" r="2.5" fill="#0F172A" />
        </svg>
      );

    case "bee":
      return (
        <svg
          width={px}
          height={px}
          viewBox="0 0 64 64"
          fill="none"
          aria-label="نحلة مخطّطة"
        >
          {/* Wings */}
          <ellipse
            cx="28"
            cy="19"
            rx="7"
            ry="9"
            fill="#E0F2FE"
            stroke="#0284C7"
            strokeWidth="2"
          />
          <ellipse
            cx="37"
            cy="19"
            rx="7"
            ry="9"
            fill="#E0F2FE"
            stroke="#0284C7"
            strokeWidth="2"
          />
          {/* Body */}
          <ellipse
            cx="32"
            cy="36"
            rx="18"
            ry="12"
            fill="#FACC15"
            stroke="#713F12"
            strokeWidth="2.5"
          />
          {/* Stripes */}
          <path
            d="M26 25 L26 47 M33 24 L33 48 M40 26 L40 46"
            stroke="#1E293B"
            strokeWidth="3.5"
          />
          <circle cx="20" cy="33" r="2.2" fill="#1E293B" />
        </svg>
      );

    case "car":
      return (
        <svg
          width={px}
          height={px}
          viewBox="0 0 64 64"
          fill="none"
          aria-label="سيارة صغيرة"
        >
          <path
            d="M10 38 L16 24 L42 24 L50 34 L56 36 L56 46 L10 46 Z"
            fill="#EF4444"
            stroke="#991B1B"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <polygon
            points="20,27 39,27 44,34 17,34"
            fill="#BAE6FD"
            stroke="#0369A1"
            strokeWidth="1.8"
          />
          <circle
            cx="21"
            cy="46"
            r="7"
            fill="#334155"
            stroke="#0F172A"
            strokeWidth="2.2"
          />
          <circle cx="21" cy="46" r="3" fill="#E2E8F0" />
          <circle
            cx="45"
            cy="46"
            r="7"
            fill="#334155"
            stroke="#0F172A"
            strokeWidth="2.2"
          />
          <circle cx="45" cy="46" r="3" fill="#E2E8F0" />
        </svg>
      );

    case "ball":
      return (
        <svg
          width={px}
          height={px}
          viewBox="0 0 64 64"
          fill="none"
          aria-label="كرة الشاطئ"
        >
          <circle
            cx="32"
            cy="32"
            r="21"
            fill="#38BDF8"
            stroke="#0C4A6E"
            strokeWidth="2.5"
          />
          <path
            d="M32 11 C22 22, 22 42, 32 53 C42 42, 42 22, 32 11 Z"
            fill="#FACC15"
            stroke="#0C4A6E"
            strokeWidth="2"
          />
          <path d="M11 32 L53 32" stroke="#0C4A6E" strokeWidth="2" />
          <circle
            cx="32"
            cy="32"
            r="4.5"
            fill="#F43F5E"
            stroke="#0C4A6E"
            strokeWidth="2"
          />
        </svg>
      );

    case "kite":
      return (
        <svg
          width={px}
          height={px}
          viewBox="0 0 64 64"
          fill="none"
          aria-label="طائرة ورقية"
        >
          <polygon
            points="32,8 50,26 32,48 14,26"
            fill="#A855F7"
            stroke="#581C87"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <line
            x1="32"
            y1="8"
            x2="32"
            y2="48"
            stroke="#FEF08A"
            strokeWidth="2"
          />
          <line
            x1="14"
            y1="26"
            x2="50"
            y2="26"
            stroke="#FEF08A"
            strokeWidth="2"
          />
          <path
            d="M32 48 C35 53, 29 56, 36 60"
            stroke="#581C87"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      );

    case "train":
      return (
        <svg
          width={px}
          height={px}
          viewBox="0 0 64 64"
          fill="none"
          aria-label="قطار خشبي"
        >
          <rect
            x="14"
            y="28"
            width="36"
            height="16"
            rx="3"
            fill="#10B981"
            stroke="#065F46"
            strokeWidth="2.5"
          />
          <rect
            x="34"
            y="16"
            width="16"
            height="14"
            rx="2"
            fill="#34D399"
            stroke="#065F46"
            strokeWidth="2.2"
          />
          <rect
            x="18"
            y="18"
            width="7"
            height="10"
            rx="1"
            fill="#F59E0B"
            stroke="#78350F"
            strokeWidth="2"
          />
          <circle
            cx="22"
            cy="47"
            r="5.5"
            fill="#EF4444"
            stroke="#7F1D1D"
            strokeWidth="2"
          />
          <circle
            cx="42"
            cy="47"
            r="5.5"
            fill="#EF4444"
            stroke="#7F1D1D"
            strokeWidth="2"
          />
        </svg>
      );

    case "pencil":
      return (
        <svg
          width={px}
          height={px}
          viewBox="0 0 64 64"
          fill="none"
          aria-label="قلم رصاص"
        >
          <g transform="rotate(-35 32 32)">
            <rect
              x="25"
              y="14"
              width="14"
              height="30"
              fill="#FACC15"
              stroke="#854D0E"
              strokeWidth="2.2"
            />
            <rect
              x="25"
              y="8"
              width="14"
              height="6"
              rx="2"
              fill="#F472B6"
              stroke="#9D174D"
              strokeWidth="2.2"
            />
            <polygon
              points="25,44 39,44 32,56"
              fill="#FDE68A"
              stroke="#854D0E"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />
            <polygon points="29.5,51 34.5,51 32,56" fill="#1E293B" />
          </g>
        </svg>
      );

    case "book":
      return (
        <svg
          width={px}
          height={px}
          viewBox="0 0 64 64"
          fill="none"
          aria-label="كتاب القراءة"
        >
          <rect
            x="15"
            y="10"
            width="34"
            height="44"
            rx="4"
            fill="#6366F1"
            stroke="#312E81"
            strokeWidth="2.5"
          />
          <rect
            x="20"
            y="14"
            width="24"
            height="12"
            rx="2"
            fill="#E0E7FF"
            stroke="#312E81"
            strokeWidth="1.8"
          />
          <line
            x1="20"
            y1="10"
            x2="20"
            y2="54"
            stroke="#312E81"
            strokeWidth="2.5"
          />
          <polygon points="36,10 42,10 42,23 39,20 36,23" fill="#F43F5E" />
        </svg>
      );

    case "backpack":
      return (
        <svg
          width={px}
          height={px}
          viewBox="0 0 64 64"
          fill="none"
          aria-label="حقيبة مدرسية"
        >
          <path
            d="M24 14 C24 8, 40 8, 40 14"
            stroke="#065F46"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <rect
            x="16"
            y="14"
            width="32"
            height="40"
            rx="10"
            fill="#10B981"
            stroke="#065F46"
            strokeWidth="2.5"
          />
          <rect
            x="21"
            y="32"
            width="22"
            height="16"
            rx="4"
            fill="#A7F3D0"
            stroke="#065F46"
            strokeWidth="2"
          />
          <line
            x1="25"
            y1="38"
            x2="39"
            y2="38"
            stroke="#065F46"
            strokeWidth="2"
            strokeDasharray="3 2"
          />
        </svg>
      );

    case "crayon":
      return (
        <svg
          width={px}
          height={px}
          viewBox="0 0 64 64"
          fill="none"
          aria-label="قلم تلوين شمعي"
        >
          <g transform="rotate(30 32 32)">
            <polygon
              points="26,18 38,18 34,8 30,8"
              fill="#FB7185"
              stroke="#881337"
              strokeWidth="2.2"
            />
            <rect
              x="24"
              y="18"
              width="16"
              height="34"
              rx="2"
              fill="#F43F5E"
              stroke="#881337"
              strokeWidth="2.5"
            />
            <rect x="24" y="24" width="16" height="5" fill="#FECDD3" />
            <rect x="24" y="40" width="16" height="5" fill="#FECDD3" />
          </g>
        </svg>
      );

    case "flower":
      return (
        <svg
          width={px}
          height={px}
          viewBox="0 0 64 64"
          fill="none"
          aria-label="زهرة متفتّحة"
        >
          <line
            x1="32"
            y1="32"
            x2="32"
            y2="57"
            stroke="#15803D"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <circle
            cx="32"
            cy="15"
            r="7.5"
            fill="#F472B6"
            stroke="#9D174D"
            strokeWidth="2"
          />
          <circle
            cx="32"
            cy="39"
            r="7.5"
            fill="#F472B6"
            stroke="#9D174D"
            strokeWidth="2"
          />
          <circle
            cx="20"
            cy="21"
            r="7.5"
            fill="#F472B6"
            stroke="#9D174D"
            strokeWidth="2"
          />
          <circle
            cx="44"
            cy="21"
            r="7.5"
            fill="#F472B6"
            stroke="#9D174D"
            strokeWidth="2"
          />
          <circle
            cx="20"
            cy="33"
            r="7.5"
            fill="#F472B6"
            stroke="#9D174D"
            strokeWidth="2"
          />
          <circle
            cx="44"
            cy="33"
            r="7.5"
            fill="#F472B6"
            stroke="#9D174D"
            strokeWidth="2"
          />
          <circle
            cx="32"
            cy="27"
            r="7.5"
            fill="#FACC15"
            stroke="#854D0E"
            strokeWidth="2.2"
          />
        </svg>
      );

    case "star":
      return (
        <svg
          width={px}
          height={px}
          viewBox="0 0 64 64"
          fill="none"
          aria-label="نجمة مضيئة"
        >
          <polygon
            points="32,8 39,23 55,25 43,36 46,52 32,44 18,52 21,36 9,25 25,23"
            fill="#FACC15"
            stroke="#A16207"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <circle cx="28" cy="29" r="2" fill="#713F12" />
          <circle cx="36" cy="29" r="2" fill="#713F12" />
          <path
            d="M28 35 Q32 39 36 35"
            stroke="#713F12"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );

    case "tree":
      return (
        <svg
          width={px}
          height={px}
          viewBox="0 0 64 64"
          fill="none"
          aria-label="شجرة خضراء"
        >
          <rect
            x="27"
            y="38"
            width="10"
            height="18"
            rx="2"
            fill="#92400E"
            stroke="#451A03"
            strokeWidth="2.2"
          />
          <circle
            cx="23"
            cy="31"
            r="11"
            fill="#22C55E"
            stroke="#14532D"
            strokeWidth="2.2"
          />
          <circle
            cx="41"
            cy="31"
            r="11"
            fill="#22C55E"
            stroke="#14532D"
            strokeWidth="2.2"
          />
          <circle
            cx="32"
            cy="20"
            r="12"
            fill="#4ADE80"
            stroke="#14532D"
            strokeWidth="2.2"
          />
        </svg>
      );

    case "sun":
      return (
        <svg
          width={px}
          height={px}
          viewBox="0 0 64 64"
          fill="none"
          aria-label="شمس مشرقة"
        >
          <g stroke="#D97706" strokeWidth="3" strokeLinecap="round">
            <line x1="32" y1="6" x2="32" y2="13" />
            <line x1="32" y1="51" x2="32" y2="58" />
            <line x1="6" y1="32" x2="13" y2="32" />
            <line x1="51" y1="32" x2="58" y2="32" />
            <line x1="14" y1="14" x2="19" y2="19" />
            <line x1="45" y1="45" x2="50" y2="50" />
            <line x1="50" y1="14" x2="45" y2="19" />
            <line x1="19" y1="45" x2="14" y2="50" />
          </g>
          <circle
            cx="32"
            cy="32"
            r="14"
            fill="#FACC15"
            stroke="#B45309"
            strokeWidth="2.5"
          />
        </svg>
      );

    case "leaf":
      return (
        <svg
          width={px}
          height={px}
          viewBox="0 0 64 64"
          fill="none"
          aria-label="ورقة شجر"
        >
          <path
            d="M14 50 C14 24, 32 12, 50 14 C48 32, 36 50, 14 50 Z"
            fill="#10B981"
            stroke="#064E3B"
            strokeWidth="2.5"
          />
          <path
            d="M12 52 L44 20"
            stroke="#064E3B"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M24 40 L24 30 M32 32 L41 32"
            stroke="#A7F3D0"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );

    case "cupcake":
    default:
      return (
        <svg
          width={px}
          height={px}
          viewBox="0 0 64 64"
          fill="none"
          aria-label="كعكة الكرز"
        >
          <polygon
            points="18,34 46,34 41,54 23,54"
            fill="#F59E0B"
            stroke="#78350F"
            strokeWidth="2.2"
          />
          <line
            x1="26"
            y1="34"
            x2="28"
            y2="54"
            stroke="#78350F"
            strokeWidth="1.8"
          />
          <line
            x1="38"
            y1="34"
            x2="36"
            y2="54"
            stroke="#78350F"
            strokeWidth="1.8"
          />
          <path
            d="M15 34 C15 24, 24 20, 32 20 C40 20, 49 24, 49 34 Z"
            fill="#F472B6"
            stroke="#831843"
            strokeWidth="2.2"
          />
          <circle
            cx="32"
            cy="15"
            r="5"
            fill="#EF4444"
            stroke="#7F1D1D"
            strokeWidth="2"
          />
        </svg>
      );
  }
}
