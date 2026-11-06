import type { LessonBlueprint } from "@/domain/types";
import { AUTHORED_LESSON_LOCALIZATION } from "@/curriculum/arabic-localization";
import { registerLessonBlueprint } from "@/blueprints/registry";

export const lessonK9Blueprint: LessonBlueprint = {
  lessonId: "K-9",
  grade: "K",
  lessonNumber: 9,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-9"].titleAr,
  teacherNotes: {
    ...AUTHORED_LESSON_LOCALIZATION["K-9"].teacherNotes,
    classroomActivityNoteAr:
      "نشاط صفّي: رتّب مع الطلاب نمطاً ثنائياً حيّاً (تصفيقة، نقرة، تصفيقة، نقرة) أو باستخدام قطع الأشكال المستوية (مثلث، مربع، مثلث، مربع) واطلب منهم توقّع العنصر الأخير وعدّ أضلاع وزوايا الشكل.",
    commonMisconceptionsAr: [
      "قراءة النمط من اليسار إلى اليمين بدلاً من اتجاه العربية من اليمين إلى اليسار.",
      "اختيار العنصر (أ) بدلاً من العنصر (ب) في الخانة السادسة من النمط الثنائي (أ، ب، أ، ب، أ، ؟).",
    ],
  },
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "PatternComplete",
          promptAr:
            "تتبّع النمط الثنائي (أ، ب، أ، ب، أ، ب) من اليمين إلى اليسار وحوّط الشيء الأخير المفقود:",
          strategyHintAr:
            "لاحظ العنصرين المتناوبين من اليمين إلى اليسار؛ يتكرر العنصر الأول ثم الثاني، لذا فالخانة السادسة تطابق العنصر الثاني (ب).",
          params: {
            unitRule: "AB",
            direction: "forward",
            sequenceLength: 6,
            domainMode: "everyday-objects",
            candidateObjectIds: ["apple", "banana", "flower", "star"],
            choiceCount: 3,
            attributePromptAr:
              "ما العنصران اللذان يتناوبان في هذا النمط الثنائي؟",
            attributeAnswerAr:
              "يتناوب عنصران (أ ثم ب) ثلاث مرّات من اليمين إلى اليسار",
          },
        },
      ],
      practice: [
        {
          archetype: "PatternComplete",
          promptAr:
            "انظر إلى نمط الأشياء (أ، ب، أ، ب، أ، ؟) من اليمين إلى اليسار، ثم حوّط الشيء الأخير المفقود:",
          strategyHintAr:
            "اقرأ الصور بصوت مسموع من اليمين إلى اليسار لاكتشاف العنصر السادس الذي يكمل الزوج الثالث.",
          params: {
            unitRule: "AB",
            direction: "forward",
            sequenceLength: 6,
            domainMode: "everyday-objects",
            candidateObjectIds: ["apple", "strawberry", "cat", "bird"],
            choiceCount: 3,
          },
        },
        {
          archetype: "PatternComplete",
          promptAr:
            "تتبّع نمط الأشكال الهندسية (دائرة، مثلث، دائرة، مثلث...) من اليمين إلى اليسار وحوّط الشكل الأخير المفقود:",
          strategyHintAr:
            "يتناوب شكلان مستويان بالتتالي؛ حدّد الشكل الأول (أ) والشكل الثاني (ب) لتعرف الشكل الأخير في الخانة السادسة.",
          params: {
            unitRule: "AB",
            direction: "forward",
            sequenceLength: 6,
            domainMode: "shapes-2d",
            candidateShapeIds: ["circle", "triangle", "square"],
            choiceCount: 3,
            attributePromptAr: "كم ضلعاً للمثلث؟ وكم زاوية له؟",
            attributeAnswerAr: "للمثلث ٣ أضلاع مستقيمة و٣ زوايا",
          },
        },
      ],
      challenge: [
        {
          archetype: "PatternComplete",
          promptAr:
            "أكمل نمط المضلّعات الثنائي (أ، ب، أ، ب، أ، ؟) ثم أجب عن سؤال الأضلاع والزوايا:",
          strategyHintAr:
            "حدّد وحدة النمط المكونة من شكلين وعدّ أضلاع كل شكل وزواياه للتحقّق من إجابتك.",
          params: {
            unitRule: "AB",
            direction: "forward",
            sequenceLength: 6,
            domainMode: "shapes-2d",
            candidateShapeIds: ["triangle", "square", "pentagon"],
            choiceCount: 3,
            attributePromptAr:
              "كم ضلعاً وكم زاوية للمثلث؟ وكم ضلعاً وكم زاوية للمربع؟",
            attributeAnswerAr:
              "للمثلث ٣ أضلاع و٣ زوايا، وللمربع ٤ أضلاع و٤ زوايا",
          },
        },
      ],
    },
    Intermediate: {
      warmUp: [
        {
          archetype: "PatternComplete",
          promptAr:
            "تتبّع النمط الثنائي من اليمين إلى اليسار وحوّط العنصر الأخير المفقود:",
          strategyHintAr:
            "حدّد الزوج المتكرر (أ، ب) في بداية الشريط ثم طبّق القاعدة نفسها على النهاية.",
          params: {
            unitRule: "AB",
            direction: "forward",
            sequenceLength: 6,
            domainMode: "everyday-objects",
            candidateObjectIds: ["car", "train", "kite", "ball"],
            choiceCount: 3,
          },
        },
      ],
      practice: [
        {
          archetype: "PatternComplete",
          promptAr:
            "اكتشف قاعدة النمط الثنائي (أ، ب، أ، ب، أ، ؟) للأشياء اليومية وحوّط العنصر الأخير المفقود:",
          strategyHintAr:
            "اقرأ النمط من اليمين إلى اليسار: الخانات الفردية (١، ٣، ٥) تحمل العنصر (أ)، والخانات الزوجية (٢، ٤، ٦) تحمل العنصر (ب).",
          params: {
            unitRule: "AB",
            direction: "forward",
            sequenceLength: 6,
            domainMode: "everyday-objects",
            candidateObjectIds: [
              "pencil",
              "book",
              "backpack",
              "crayon",
              "star",
            ],
            choiceCount: 3,
          },
        },
        {
          archetype: "PatternComplete",
          promptAr:
            "تتبّع نمط الأشكال الهندسية (دائرة، مثلث، مربع) من اليمين إلى اليسار وحوّط الشكل الأخير المفقود:",
          strategyHintAr:
            "قارن بين الشكل الأول (أ) والشكل الثاني (ب) في كل زوج متكرر لتحديد الشكل السادس بدقة.",
          params: {
            unitRule: "AB",
            direction: "forward",
            sequenceLength: 6,
            domainMode: "shapes-2d",
            candidateShapeIds: ["circle", "triangle", "square"],
            choiceCount: 3,
            attributePromptAr:
              "كم ضلعاً للمثلث وكم زاوية له؟ وكم ضلعاً وزاوية للمربع؟",
            attributeAnswerAr:
              "للمثلث ٣ أضلاع و٣ زوايا، وللمربع ٤ أضلاع متساوية و٤ زوايا",
          },
        },
      ],
      challenge: [
        {
          archetype: "PatternComplete",
          promptAr:
            "استنتج الشكل الأخير في النمط الثنائي (أ، ب، أ، ب، أ، ؟) ثم قارن عدد الأضلاع والزوايا:",
          strategyHintAr:
            "تذكّر أن عدد أضلاع أي مضلّع مغلق يساوي عدد زواياه (المثلث ٣، المربع ٤، الخماسي ٥، السداسي ٦).",
          params: {
            unitRule: "AB",
            direction: "forward",
            sequenceLength: 6,
            domainMode: "shapes-2d",
            candidateShapeIds: [
              "circle",
              "triangle",
              "square",
              "pentagon",
              "hexagon",
            ],
            choiceCount: 4,
            attributePromptAr:
              "كم ضلعاً وزاوية للمثلث؟ وكم ضلعاً وزاوية للمربع؟ وأيّهما له أضلاع أكثر؟",
            attributeAnswerAr:
              "المثلث له ٣ أضلاع و٣ زوايا، والمربع له ٤ أضلاع و٤ زوايا (المربع أكثر بـ ١)",
          },
        },
      ],
    },
    Advanced: {
      warmUp: [
        {
          archetype: "PatternComplete",
          promptAr: "أكمل النمط الثنائي للأشكال الهندسية من اليمين إلى اليسار:",
          strategyHintAr:
            "حدّد وحدة النمط (أ، ب) وعدّ أضلاع كل مضلّع لتحديد الشكل السادس.",
          params: {
            unitRule: "AB",
            direction: "forward",
            sequenceLength: 6,
            domainMode: "shapes-2d",
            candidateShapeIds: ["triangle", "square", "pentagon", "hexagon"],
            choiceCount: 4,
          },
        },
      ],
      practice: [
        {
          archetype: "PatternComplete",
          promptAr:
            "تتبّع نمط الأشياء الثنائي (أ، ب، أ، ب، أ، ؟) وحوّط العنصر الأخير المفقود من بين أربعة بدائل:",
          strategyHintAr:
            "استبعد البدائل الدخيلة التي لم تظهر في وحدة النمط (أ، ب) واختر العنصر الثاني في الوحدة.",
          params: {
            unitRule: "AB",
            direction: "forward",
            sequenceLength: 6,
            domainMode: "everyday-objects",
            candidateObjectIds: [
              "butterfly",
              "bee",
              "flower",
              "tree",
              "sun",
              "leaf",
            ],
            choiceCount: 4,
          },
        },
        {
          archetype: "PatternComplete",
          promptAr:
            "أكمل نمط المضلّعات الثنائي (مثلث، مربع، خماسي، سداسي) من اليمين إلى اليسار وحوّط الشكل الأخير المفقود:",
          strategyHintAr:
            "قارن عدد الأضلاع والزوايا بين الشكل (أ) والشكل (ب) لاختيار الشكل الذي يكمل التكرار الثالث.",
          params: {
            unitRule: "AB",
            direction: "forward",
            sequenceLength: 6,
            domainMode: "shapes-2d",
            candidateShapeIds: ["triangle", "square", "pentagon", "hexagon"],
            choiceCount: 4,
            attributePromptAr:
              "كم ضلعاً وكم زاوية للمثلث والمربع؟ وكم يزيد السداسي على المربع في عدد الأضلاع؟",
            attributeAnswerAr:
              "للمثلث ٣ أضلاع و٣ زوايا، وللمربع ٤ أضلاع و٤ زوايا، والسداسي (٦) يزيد بضلعين (٢) على المربع",
          },
        },
      ],
      challenge: [
        {
          archetype: "PatternComplete",
          promptAr:
            "أكمل النمط الثنائي للأشكال الهندسية (أ، ب، أ، ب، أ، ؟) ثم أجب عن سؤال خصائص الأضلاع والزوايا:",
          strategyHintAr:
            "تحقّق من تطابق الخانة السادسة مع الخانتين الثانية والرابعة في عدد الأضلاع والزوايا.",
          params: {
            unitRule: "AB",
            direction: "forward",
            sequenceLength: 6,
            domainMode: "shapes-2d",
            candidateShapeIds: ["triangle", "square", "pentagon", "hexagon"],
            choiceCount: 4,
            attributePromptAr:
              "كم ضلعاً وكم زاوية للمثلث؟ وكم ضلعاً وكم زاوية للمربع؟ وكم مجموع أضلاع مثلث ومربع معاً؟",
            attributeAnswerAr:
              "للمثلث ٣ أضلاع و٣ زوايا، وللمربع ٤ أضلاع و٤ زوايا، ومجموع أضلاعهما معاً ٧ أضلاع",
          },
        },
      ],
    },
  },
};

export const lessonK10Blueprint: LessonBlueprint = {
  lessonId: "K-10",
  grade: "K",
  lessonNumber: 10,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-10"].titleAr,
  teacherNotes: {
    ...AUTHORED_LESSON_LOCALIZATION["K-10"].teacherNotes,
    classroomActivityNoteAr:
      "نشاط صفّي: رتّب على الطاولة نمطاً ثلاثياً بالمجسّمات الحسّية (كرة، مخروط، مكعب، كرة، مخروط، ؟) واطلب من الطلاب استنتاج المجسّم السادس ولمس أوجهه المسطّحة ورؤوسه.",
    commonMisconceptionsAr: [
      "العودة إلى النمط الثنائي (أ، ب) ونسيان العنصر الثالث (ج) عند قراءة النمط الثلاثي (أ، ب، ج، أ، ب، ج).",
      "الخلط بين عدد الأوجه المسطّحة وعدد الرؤوس في المجسّمات مثل المكعب (٦ أوجه مسطّحة و٨ رؤوس).",
    ],
  },
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "PatternComplete",
          promptAr:
            "تتبّع النمط (أ، ب، ج، أ، ب، ؟) من اليمين إلى اليسار وحوّط العنصر الأخير المفقود:",
          strategyHintAr:
            "حدّد العناصر الثلاثة الأولى (أ، ب، ج) في بداية النمط؛ تتكرر هذه الثلاثية نفسها، لذا فالخانة السادسة تطابق العنصر الثالث (ج).",
          params: {
            unitRule: "ABC",
            direction: "forward",
            sequenceLength: 6,
            domainMode: "everyday-objects",
            candidateObjectIds: ["apple", "banana", "strawberry", "orange"],
            choiceCount: 3,
          },
        },
      ],
      practice: [
        {
          archetype: "PatternComplete",
          promptAr:
            "تتبّع نمط الأشياء الثلاثي (أ، ب، ج، أ، ب، ؟) من اليمين إلى اليسار وحوّط الشيء الأخير المفقود:",
          strategyHintAr:
            "اقرأ الثلاثية الأولى (١، ٢، ٣) ثم قارنها بالثلاثية الثانية (٤، ٥، ٦) لتجد العنصر السادس.",
          params: {
            unitRule: "ABC",
            direction: "forward",
            sequenceLength: 6,
            domainMode: "everyday-objects",
            candidateObjectIds: ["car", "ball", "kite", "train"],
            choiceCount: 3,
          },
        },
        {
          archetype: "PatternComplete",
          promptAr:
            "انظر إلى نمط المجسّمات الثلاثي (كرة، مخروط، أسطوانة...) من اليمين إلى اليسار وحوّط المجسّم الأخير المفقود:",
          strategyHintAr:
            "حدّد المجسّمات الثلاثة في وحدة النمط (أ، ب، ج)؛ الخانة السادسة تطابق المجسّم الثالث (ج).",
          params: {
            unitRule: "ABC",
            direction: "forward",
            sequenceLength: 6,
            domainMode: "solids-3d",
            candidateSolidIds: ["sphere", "cone", "cylinder"],
            choiceCount: 3,
            attributePromptAr:
              "كم وجهاً مسطّحاً وكم رأساً للكرة؟ وكم وجهاً مسطّحاً ورأساً للمخروط؟",
            attributeAnswerAr:
              "للكرة ٠ أوجه مسطّحة و٠ رؤوس، وللمخروط وجه مسطّح دائري ١ ورأس مدبّب ١",
          },
        },
      ],
      challenge: [
        {
          archetype: "PatternComplete",
          promptAr:
            "أكمل النمط الثلاثي (أ، ب، ج، أ، ب، ؟) ثم أجب عن سؤال الأوجه المسطّحة والرؤوس:",
          strategyHintAr:
            "تذكّر أن المكعب له ٦ أوجه مسطّحة و٨ رؤوس، بينما الكرة ملساء بلا أوجه مسطّحة ولا رؤوس.",
          params: {
            unitRule: "ABC",
            direction: "forward",
            sequenceLength: 6,
            domainMode: "solids-3d",
            candidateSolidIds: ["sphere", "cone", "cube", "pyramid"],
            choiceCount: 3,
            attributePromptAr:
              "كم وجهاً مسطّحاً وكم رأساً للمكعب؟ وكم وجهاً مسطّحاً ورأساً للكرة؟",
            attributeAnswerAr:
              "للمكعب ٦ أوجه مسطّحة و٨ رؤوس، وللكرة ٠ أوجه مسطّحة و٠ رؤوس",
          },
        },
      ],
    },
    Intermediate: {
      warmUp: [
        {
          archetype: "PatternComplete",
          promptAr:
            "تتبّع النمط الثلاثي (أ، ب، ج، أ، ب، ؟) من اليمين إلى اليسار وحوّط المجسّم الأخير المفقود:",
          strategyHintAr:
            "حدّد المجسّمات الثلاثة المتتابعة في بداية الشريط وطبّق الترتيب نفسه لإيجاد المجسّم السادس.",
          params: {
            unitRule: "ABC",
            direction: "forward",
            sequenceLength: 6,
            domainMode: "solids-3d",
            candidateSolidIds: ["sphere", "cone", "cylinder", "cube"],
            choiceCount: 3,
          },
        },
      ],
      practice: [
        {
          archetype: "PatternComplete",
          promptAr:
            "اكتشف قاعدة النمط الثلاثي (أ، ب، ج، أ، ب، ؟) للأشياء الملوّنة وحوّط العنصر الأخير المفقود:",
          strategyHintAr:
            "اقرأ العناصر من اليمين إلى اليسار في مجموعات من ٣ عناصر: (١، ٢، ٣) ثم (٤، ٥، ٦).",
          params: {
            unitRule: "ABC",
            direction: "forward",
            sequenceLength: 6,
            domainMode: "everyday-objects",
            candidateObjectIds: ["butterfly", "cat", "bird", "fish", "bee"],
            choiceCount: 3,
          },
        },
        {
          archetype: "PatternComplete",
          promptAr:
            "تتبّع نمط المجسّمات الثلاثية الأبعاد (كرة، مخروط، أسطوانة، مكعب) وحوّط المجسّم الأخير المفقود:",
          strategyHintAr:
            "افحص الثلاثية الأولى (أ، ب، ج)؛ المجسّم السادس يجب أن يطابق المجسّم الثالث تماماً.",
          params: {
            unitRule: "ABC",
            direction: "forward",
            sequenceLength: 6,
            domainMode: "solids-3d",
            candidateSolidIds: ["sphere", "cone", "cylinder", "cube"],
            choiceCount: 3,
            attributePromptAr:
              "كم وجهاً مسطّحاً وكم رأساً للمكعب؟ وكم وجهاً مسطّحاً ورأساً للكرة والمخروط؟",
            attributeAnswerAr:
              "للمكعب ٦ أوجه مسطّحة و٨ رؤوس، وللكرة ٠ أوجه مسطّحة و٠ رؤوس، وللمخروط وجه مسطّح ١ ورأس ١",
          },
        },
      ],
      challenge: [
        {
          archetype: "PatternComplete",
          promptAr:
            "استنتج المجسّم الأخير في النمط (أ، ب، ج، أ، ب، ؟) ثم قارن الأوجه المسطّحة والرؤوس:",
          strategyHintAr:
            "قارن بين خصائص المكعب والكرة والمخروط والهرم بعد تحديد المجسّم الذي يكمل الثلاثية الثانية.",
          params: {
            unitRule: "ABC",
            direction: "forward",
            sequenceLength: 6,
            domainMode: "solids-3d",
            candidateSolidIds: [
              "sphere",
              "cone",
              "cylinder",
              "cube",
              "pyramid",
            ],
            choiceCount: 4,
            attributePromptAr:
              "كم وجهاً مسطّحاً وكم رأساً للمكعب؟ وأي مجسّم ليس له أي أوجه مسطّحة ولا رؤوس؟",
            attributeAnswerAr:
              "للمكعب ٦ أوجه مسطّحة و٨ رؤوس، والكرة لها ٠ أوجه مسطّحة و٠ رؤوس",
          },
        },
      ],
    },
    Advanced: {
      warmUp: [
        {
          archetype: "PatternComplete",
          promptAr:
            "أكمل النمط الثلاثي للمجسّمات الهندسية من اليمين إلى اليسار:",
          strategyHintAr:
            "حدّد وحدة النمط الثلاثية (أ، ب، ج) واستنتج المجسّم السادس من بين البدائل الأربعة.",
          params: {
            unitRule: "ABC",
            direction: "forward",
            sequenceLength: 6,
            domainMode: "solids-3d",
            candidateSolidIds: [
              "sphere",
              "cone",
              "cylinder",
              "cube",
              "pyramid",
            ],
            choiceCount: 4,
          },
        },
      ],
      practice: [
        {
          archetype: "PatternComplete",
          promptAr:
            "تتبّع النمط الثلاثي للأشياء اليومية (أ، ب، ج، أ، ب، ؟) وحوّط العنصر الأخير المفقود:",
          strategyHintAr:
            "اقسم شريط النمط إلى ثلاثيتين متطابقتين (١-٢-٣ و٤-٥-٦) لتحديد العنصر السادس.",
          params: {
            unitRule: "ABC",
            direction: "forward",
            sequenceLength: 6,
            domainMode: "everyday-objects",
            candidateObjectIds: [
              "pencil",
              "book",
              "backpack",
              "crayon",
              "cupcake",
            ],
            choiceCount: 4,
          },
        },
        {
          archetype: "PatternComplete",
          promptAr:
            "أكمل نمط المجسّمات الثلاثية الأبعاد (كرة، مخروط، أسطوانة، مكعب، هرم) باختيار المجسّم السادس المفقود:",
          strategyHintAr:
            "تحقّق من تطابق المجسّم السادس مع المجسّم الثالث في نوع الأوجه المسطّحة وعدد الرؤوس.",
          params: {
            unitRule: "ABC",
            direction: "forward",
            sequenceLength: 6,
            domainMode: "solids-3d",
            candidateSolidIds: [
              "sphere",
              "cone",
              "cylinder",
              "cube",
              "pyramid",
            ],
            choiceCount: 4,
            attributePromptAr:
              "كم وجهاً مسطّحاً وكم رأساً للمكعب؟ وكم وجهاً مسطّحاً ورأساً لكلٍّ من الكرة والمخروط؟",
            attributeAnswerAr:
              "المكعب: ٦ أوجه مسطّحة و٨ رؤوس؛ الكرة: ٠ أوجه مسطّحة و٠ رؤوس؛ المخروط: وجه مسطّح ١ ورأس ١",
          },
        },
      ],
      challenge: [
        {
          archetype: "PatternComplete",
          promptAr:
            "أكمل النمط الثلاثي للمجسّمات (أ، ب، ج، أ، ب، ؟) ثم أجب عن سؤال خصائص المجسّمات:",
          strategyHintAr:
            "حدّد الثلاثية المتكررة (أ، ب، ج) ثم قارن عدد الأوجه المسطّحة والرؤوس بين المكعب والمخروط والكرة.",
          params: {
            unitRule: "ABC",
            direction: "forward",
            sequenceLength: 6,
            domainMode: "solids-3d",
            candidateSolidIds: [
              "sphere",
              "cone",
              "cylinder",
              "cube",
              "pyramid",
            ],
            choiceCount: 4,
            attributePromptAr:
              "قارن بين المكعب والمخروط والكرة من حيث عدد الأوجه المسطّحة وعدد الرؤوس:",
            attributeAnswerAr:
              "المكعب له ٦ أوجه مسطّحة و٨ رؤوس، والمخروط له وجه مسطّح ١ ورأس ١، والكرة لها ٠ أوجه مسطّحة و٠ رؤوس",
          },
        },
      ],
    },
  },
};

export const lessonK11Blueprint: LessonBlueprint = {
  lessonId: "K-11",
  grade: "K",
  lessonNumber: 11,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-11"].titleAr,
  teacherNotes: {
    ...AUTHORED_LESSON_LOCALIZATION["K-11"].teacherNotes,
    classroomActivityNoteAr:
      "نشاط صفّي: ضع ستة أشياء أو مجسّمات في صفّ ثم غطِّ العنصر الأول في بداية الصف ببطاقة عليها علامة استفهام (؟)، واطلب من الطلاب البدء من نهاية الصف والرجوع للخلف خطوة بخطوة لاكتشاف العنصر المخبّأ.",
    commonMisconceptionsAr: [
      "وضع العنصر الأخير في خانة البداية المفقودة بدلاً من الرجوع خطوة بخطوة من نهاية النمط نحو البداية.",
      "الارتباك عند الانتقال من قراءة النمط للأمام (من اليمين إلى اليسار) إلى قراءته عكسياً من النهاية إلى البداية.",
    ],
  },
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "PatternComplete",
          promptAr:
            "العنصر الأول في بداية النمط مفقود! ابدأ من النهاية وارجع للخلف لتحدّد العنصر الأول وتحوّطه:",
          strategyHintAr:
            "عندما تكون البداية مجهولة، ابدأ من النهاية (يسار الشريط) وارجع للخلف خطوة بخطوة نحو اليمين لتجد العنصر الأول (أ).",
          params: {
            unitRule: "AB",
            direction: "backward",
            sequenceLength: 6,
            domainMode: "everyday-objects",
            candidateObjectIds: ["apple", "banana", "strawberry", "orange"],
            choiceCount: 3,
          },
        },
      ],
      practice: [
        {
          archetype: "PatternComplete",
          promptAr:
            "العنصر الأول مفقود (؟، ب، أ، ب، أ، ب)! ابدأ من نهاية النمط وارجع للخلف لتختار الشيء الأول الصحيح:",
          strategyHintAr:
            "ابدأ من النهاية في الخانة السادسة وارجع للخلف: الخانة الثالثة والخامسة تطابقان الخانة الأولى المفقودة.",
          params: {
            unitRule: "AB",
            direction: "backward",
            sequenceLength: 6,
            domainMode: "everyday-objects",
            candidateObjectIds: ["flower", "star", "tree", "sun"],
            choiceCount: 3,
          },
        },
        {
          archetype: "PatternComplete",
          promptAr:
            "ابدأ من نهاية نمط الأشكال المستوية وارجع للخلف لاكتشاف الشكل الأول المفقود في البداية:",
          strategyHintAr:
            "انظر إلى الجزء المكتمل في نهاية النمط وارجع للخلف من اليسار إلى اليمين لتحديد الشكل الأول (أ).",
          params: {
            unitRule: "AB",
            direction: "backward",
            sequenceLength: 6,
            domainMode: "shapes-2d",
            candidateShapeIds: ["circle", "triangle", "square"],
            choiceCount: 3,
            attributePromptAr:
              "من أين نبدأ عندما يكون الشكل الأول في بداية النمط مفقوداً؟",
            attributeAnswerAr:
              "نبدأ من نهاية النمط المكتملة ونرجع للخلف خطوة بخطوة نحو البداية",
          },
        },
      ],
      challenge: [
        {
          archetype: "PatternComplete",
          promptAr:
            "اقرأ النمط الثنائي من النهاية إلى البداية وحوّط الشكل الأول المفقود ثم أجب:",
          strategyHintAr:
            "ابدأ من النهاية وارجع للخلف بالتناوب حتى تصل إلى الخانة الأولى (١) في يمين الشريط.",
          params: {
            unitRule: "AB",
            direction: "backward",
            sequenceLength: 6,
            domainMode: "shapes-2d",
            candidateShapeIds: ["triangle", "square", "pentagon", "hexagon"],
            choiceCount: 3,
            attributePromptAr:
              "لماذا نبدأ من النهاية ونرجع للخلف في هذا النمط؟ وأي خانات تطابق الخانة الأولى (١)؟",
            attributeAnswerAr:
              "لأن البداية مجهولة؛ والخانتان الثالثة (٣) والخامسة (٥) تطابقان الخانة الأولى (١)",
          },
        },
      ],
    },
    Intermediate: {
      warmUp: [
        {
          archetype: "PatternComplete",
          promptAr:
            "ابدأ من نهاية النمط وارجع للخلف لتحدّد العنصر الأول المفقود في بداية الشريط:",
          strategyHintAr:
            "ابدأ من النهاية في اليسار وارجع للخلف نحو اليمين لاكتشاف العنصر الأول المفقود.",
          params: {
            unitRule: "AB",
            direction: "backward",
            sequenceLength: 6,
            domainMode: "shapes-2d",
            candidateShapeIds: ["circle", "triangle", "square", "pentagon"],
            choiceCount: 3,
          },
        },
      ],
      practice: [
        {
          archetype: "PatternComplete",
          promptAr:
            "بداية النمط الثنائي مفقودة (؟، ب، أ، ب، أ، ب)! ابدأ من النهاية وارجع للخلف لتجد الشيء الأول:",
          strategyHintAr:
            "ابدأ من النهاية (الخانة ٦) وارجع للخلف (٦ ← ٥ ← ٤ ← ٣ ← ٢ ← ١) لتحديد العنصر الأول.",
          params: {
            unitRule: "AB",
            direction: "backward",
            sequenceLength: 6,
            domainMode: "everyday-objects",
            candidateObjectIds: ["car", "train", "kite", "ball", "pencil"],
            choiceCount: 3,
          },
        },
        {
          archetype: "PatternComplete",
          promptAr:
            "بداية النمط الثلاثي مفقودة (؟، ب، ج، أ، ب، ج)! ابدأ من النهاية وارجع للخلف لتجد الشكل الأول:",
          strategyHintAr:
            "ابدأ من النهاية ولاحظ الثلاثية المكتملة (٤، ٥، ٦)؛ عند الرجوع للخلف تجد أن الخانة الأولى (١) تطابق الخانة الرابعة (٤).",
          params: {
            unitRule: "ABC",
            direction: "backward",
            sequenceLength: 6,
            domainMode: "shapes-2d",
            candidateShapeIds: ["circle", "triangle", "square", "hexagon"],
            choiceCount: 3,
            attributePromptAr:
              "في النمط الثلاثي (؟، ب، ج، أ، ب، ج)، أي خانة مكتملة تدلّنا مباشرة على العنصر الأول المفقود؟",
            attributeAnswerAr:
              "الخانة الرابعة (٤) في بداية الثلاثية الثانية تطابق الخانة الأولى (١) تماماً",
          },
        },
      ],
      challenge: [
        {
          archetype: "PatternComplete",
          promptAr:
            "استنتج المجسّم الأول المفقود في بداية النمط الثلاثي ثم اشرح خطواتك:",
          strategyHintAr:
            "ابدأ من النهاية حيث الثلاثية مكتملة وارجع للخلف (ج ← ب ← أ) لتتأكّد من المجسّم الأول (أ).",
          params: {
            unitRule: "ABC",
            direction: "backward",
            sequenceLength: 6,
            domainMode: "solids-3d",
            candidateSolidIds: [
              "sphere",
              "cone",
              "cylinder",
              "cube",
              "pyramid",
            ],
            choiceCount: 4,
            attributePromptAr:
              "كيف ساعدتنا قراءة النمط بالرجوع للخلف من النهاية إلى البداية في معرفة المجسّم الأول؟",
            attributeAnswerAr:
              "قرأنا الثلاثية المكتملة في النهاية ورجعنا للخلف بنفس الترتيب العكسي فطابقنا الخانة الأولى مع الخانة الرابعة",
          },
        },
      ],
    },
    Advanced: {
      warmUp: [
        {
          archetype: "PatternComplete",
          promptAr:
            "ابدأ من نهاية النمط الثلاثي وارجع للخلف لاكتشاف الشكل الأول المفقود:",
          strategyHintAr:
            "ابدأ من النهاية وارجع للخلف عبر الثلاثية المكتملة لتحديد الشكل الأول (أ).",
          params: {
            unitRule: "ABC",
            direction: "backward",
            sequenceLength: 6,
            domainMode: "shapes-2d",
            candidateShapeIds: ["triangle", "square", "pentagon", "hexagon"],
            choiceCount: 4,
          },
        },
      ],
      practice: [
        {
          archetype: "PatternComplete",
          promptAr:
            "ابدأ من نهاية النمط الثلاثي للأشياء (؟، ب، ج، أ، ب، ج) وارجع للخلف لاختيار العنصر الأول من بين أربعة بدائل:",
          strategyHintAr:
            "ابدأ من النهاية وارجع للخلف (٦ ← ٥ ← ٤ ثم ٣ ← ٢ ← ١) لتحديد العنصر الأول واستبعاد البدائل الأخرى.",
          params: {
            unitRule: "ABC",
            direction: "backward",
            sequenceLength: 6,
            domainMode: "everyday-objects",
            candidateObjectIds: [
              "butterfly",
              "cat",
              "bird",
              "fish",
              "bee",
              "cupcake",
            ],
            choiceCount: 4,
          },
        },
        {
          archetype: "PatternComplete",
          promptAr:
            "اقرأ نمط المضلّعات الثلاثي بالرجوع للخلف من النهاية إلى البداية وحوّط المضلّع الأول المفقود:",
          strategyHintAr:
            "ابدأ من النهاية وارجع للخلف؛ قارن عدد أضلاع وزوايا الشكل الرابع لتعرف الشكل الأول.",
          params: {
            unitRule: "ABC",
            direction: "backward",
            sequenceLength: 6,
            domainMode: "shapes-2d",
            candidateShapeIds: [
              "circle",
              "triangle",
              "square",
              "pentagon",
              "hexagon",
            ],
            choiceCount: 4,
          },
        },
      ],
      challenge: [
        {
          archetype: "PatternComplete",
          promptAr:
            "فكّر بمرونة! ابدأ من نهاية النمط الثلاثي وارجع للخلف لتحدّد العنصر الأول المفقود، ثم تحقّق بالقراءة للأمام:",
          strategyHintAr:
            "ابدأ من النهاية وارجع للخلف لاختيار العنصر الأول، ثم اقرأ النمط للأمام من اليمين إلى اليسار للتحقّق من انتظام التكرار.",
          params: {
            unitRule: "ABC",
            direction: "backward",
            sequenceLength: 6,
            domainMode: "mixed",
            candidateShapeIds: ["triangle", "square", "hexagon"],
            candidateSolidIds: ["sphere", "cone", "cube"],
            choiceCount: 4,
            attributePromptAr:
              "كيف نتحقّق من صحة اختيارنا للعنصر الأول بعد إيجاده بطريقة الرجوع للخلف من النهاية؟",
            attributeAnswerAr:
              "نضع العنصر في الخانة الأولى ثم نقرأ النمط للأمام من اليمين إلى اليسار لنتأكّد من تكرار الثلاثية (أ، ب، ج) بانتظام",
          },
        },
      ],
    },
  },
};

registerLessonBlueprint(lessonK9Blueprint);
registerLessonBlueprint(lessonK10Blueprint);
registerLessonBlueprint(lessonK11Blueprint);
