import type { SupportedLocale } from "@/lib/app-config";

const uk = {
  localeName: "Українська",
  skipToContent: "Перейти до основного вмісту",
  navigationLabel: "Головна навігація",
  navigation: {
    overview: "Огляд",
    documents: "Документи",
    review: "На перевірці",
    archive: "Архів",
    settings: "Налаштування",
  },
  planned: "Заплановано",
  language: "Мова інтерфейсу",
  account: {
    demo: "Демонстраційний режим",
    user: "Олена Коваль",
    role: "Операційна спеціалістка",
  },
  page: {
    eyebrow: "Робочий простір документів",
    title: "Контроль документів без втрати людського рішення",
    description:
      "DocFlow AI готує документи до перевірки, показує причини уваги та залишає фінальне рішення за фахівцем.",
    milestone: "Milestone 0.3",
    status: "Upload-прототип готовий",
    noticeTitle: "Це безпечний UI-прототип",
    noticeBody:
      "Реальне завантаження, обробка та збереження документів ще не підключені.",
    primaryAction: "Спробувати прототип",
    workspaceTitle: "Модулі робочого простору",
    workspaceDescription:
      "Навігаційна структура готова до наступних погоджених підкроків.",
  },
  upload: {
    eyebrow: "Прототип завантаження",
    title: "Додайте документ для перевірки інтерфейсу",
    description:
      "Оберіть один вигаданий документ. На цьому етапі файл залишається лише у вашому браузері.",
    dropTitle: "Перетягніть файл сюди",
    dropActive: "Відпустіть файл у цій зоні",
    dropHint: "або оберіть його на пристрої",
    chooseFile: "Обрати файл",
    chooseAnother: "Обрати інший",
    formats: "PDF, JPG або PNG · до 10 MB у прототипі",
    selected: "Файл готовий для демонстрації",
    selectedHint: "Його не надіслано й не збережено.",
    remove: "Прибрати файл",
    unsupportedType: "Цей формат не підтримується. Оберіть PDF, JPG або PNG.",
    fileTooLarge: "Файл перевищує демонстраційний ліміт 10 MB.",
    privacyTitle: "Без передачі даних",
    privacyBody:
      "Прототип перевіряє лише назву, формат і розмір у браузері. Серверне завантаження з’явиться у Milestone 1.",
  },
  modules: {
    documents: {
      title: "Документи",
      description: "Черга вхідних рахунків, замовлень і накладних.",
    },
    review: {
      title: "Перевірка",
      description: "Поля, невідповідності та рішення людини.",
    },
    archive: {
      title: "Архів",
      description: "Погоджені та відхилені документи з історією.",
    },
  },
} as const;

type DictionaryShape = {
  [Key in keyof typeof uk]: (typeof uk)[Key] extends string
    ? string
    : {
        [NestedKey in keyof (typeof uk)[Key]]: (typeof uk)[Key][NestedKey] extends string
          ? string
          : {
              [LeafKey in keyof (typeof uk)[Key][NestedKey]]: string;
            };
      };
};

const en: DictionaryShape = {
  localeName: "English",
  skipToContent: "Skip to main content",
  navigationLabel: "Main navigation",
  navigation: {
    overview: "Overview",
    documents: "Documents",
    review: "In review",
    archive: "Archive",
    settings: "Settings",
  },
  planned: "Planned",
  language: "Interface language",
  account: {
    demo: "Demo mode",
    user: "Olena Koval",
    role: "Operations specialist",
  },
  page: {
    eyebrow: "Document workspace",
    title: "Document control that keeps people in charge",
    description:
      "DocFlow AI prepares documents for review, explains what needs attention, and leaves the final decision to a specialist.",
    milestone: "Milestone 0.3",
    status: "Upload prototype ready",
    noticeTitle: "This is a safe UI prototype",
    noticeBody:
      "Real document upload, processing, and storage are not connected yet.",
    primaryAction: "Try the prototype",
    workspaceTitle: "Workspace modules",
    workspaceDescription:
      "The navigation structure is ready for the next approved substeps.",
  },
  upload: {
    eyebrow: "Upload prototype",
    title: "Add a document to test the interface",
    description:
      "Choose one fictional document. At this stage, the file stays in your browser only.",
    dropTitle: "Drag a file here",
    dropActive: "Drop the file in this area",
    dropHint: "or choose it from your device",
    chooseFile: "Choose file",
    chooseAnother: "Choose another",
    formats: "PDF, JPG, or PNG · up to 10 MB in this prototype",
    selected: "File ready for the demonstration",
    selectedHint: "It has not been sent or stored.",
    remove: "Remove file",
    unsupportedType: "This format is not supported. Choose a PDF, JPG, or PNG.",
    fileTooLarge: "The file exceeds the 10 MB demonstration limit.",
    privacyTitle: "No data transfer",
    privacyBody:
      "The prototype checks only the name, format, and size in your browser. Server upload will be introduced in Milestone 1.",
  },
  modules: {
    documents: {
      title: "Documents",
      description: "Incoming invoices, purchase orders, and delivery notes.",
    },
    review: {
      title: "Review",
      description: "Fields, mismatches, and human decisions.",
    },
    archive: {
      title: "Archive",
      description: "Approved and rejected documents with history.",
    },
  },
};

export type Dictionary = DictionaryShape;

export const dictionaries: Record<SupportedLocale, Dictionary> = { uk, en };

export function getDictionary(locale: SupportedLocale): Dictionary {
  return dictionaries[locale];
}
