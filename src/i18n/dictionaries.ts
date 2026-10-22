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
      "DocFlow AI готує документи до перевірки, виявляє можливі проблеми та залишає остаточне рішення фахівцю.",
    milestone: "Milestone 0.5",
    status: "UI-прототип активний",
    noticeTitle: "Це безпечний UI-прототип",
    noticeBody:
      "Реальне завантаження, обробка та збереження документів ще не підключені.",
    primaryAction: "Спробувати прототип",
    workspaceTitle: "Наступні модулі",
    workspaceDescription:
      "Ці частини лишаються запланованими й не імітують готову бізнес-логіку.",
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
  queue: {
    eyebrow: "Прототип черги",
    title: "Черга документів",
    description:
      "Фільтруйте вигадані документи, обирайте запис і переглядайте його ключові деталі.",
    prototypeNotice: "Локальні mock-дані · без бекенду та збереження",
    scenarioLabel: "Сценарій інтерфейсу",
    scenarioReady: "Черга з даними",
    scenarioLoading: "Завантаження",
    scenarioEmpty: "Порожня черга",
    scenarioError: "Помилка",
    filterLabel: "Фільтр за статусом",
    filterAll: "Усі",
    statusProcessing: "Обробляється",
    statusNeedsReview: "Потребує перевірки",
    statusApproved: "Погоджено",
    statusFailed: "Помилка",
    statusDuplicate: "Можливий дублікат",
    typeInvoice: "Рахунок",
    typePurchaseOrder: "Замовлення",
    typeDeliveryNote: "Накладна",
    detailsEyebrow: "Деталі документа",
    supplier: "Постачальник",
    type: "Тип",
    amount: "Сума",
    documentDate: "Дата документа",
    dueDate: "Сплатити до",
    purchaseOrder: "Замовлення",
    summary: "Короткий зміст",
    attentionReason: "Причина уваги",
    notAvailable: "Не вказано",
    detailsNotice:
      "Це демонстраційний запис. Дані не витягувалися з реального файла.",
    noFilterResults: "За цим фільтром документів немає.",
    loadingTitle: "Завантажуємо чергу",
    loadingBody: "Так виглядатиме очікування відповіді майбутнього API.",
    emptyTitle: "Черга поки порожня",
    emptyBody: "Нові документи з’являться тут після підключення реального завантаження.",
    errorTitle: "Не вдалося отримати чергу",
    errorBody: "Майбутній інтерфейс не приховуватиме помилку й запропонує повторити запит.",
    retry: "Спробувати ще раз",
    showDocuments: "Показати mock-дані",
    stateNotice: "Цей стан увімкнено лише для демонстрації прототипу.",
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
    milestone: "Milestone 0.5",
    status: "UI prototype active",
    noticeTitle: "This is a safe UI prototype",
    noticeBody:
      "Real document upload, processing, and storage are not connected yet.",
    primaryAction: "Try the prototype",
    workspaceTitle: "Next modules",
    workspaceDescription:
      "These areas remain planned and do not pretend that business logic is ready.",
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
  queue: {
    eyebrow: "Queue prototype",
    title: "Document queue",
    description:
      "Filter fictional documents, select a record, and inspect its key details.",
    prototypeNotice: "Local mock data · no backend or persistence",
    scenarioLabel: "Interface scenario",
    scenarioReady: "Queue with data",
    scenarioLoading: "Loading",
    scenarioEmpty: "Empty queue",
    scenarioError: "Error",
    filterLabel: "Filter by status",
    filterAll: "All",
    statusProcessing: "Processing",
    statusNeedsReview: "Needs review",
    statusApproved: "Approved",
    statusFailed: "Failed",
    statusDuplicate: "Possible duplicate",
    typeInvoice: "Invoice",
    typePurchaseOrder: "Purchase order",
    typeDeliveryNote: "Delivery note",
    detailsEyebrow: "Document details",
    supplier: "Supplier",
    type: "Type",
    amount: "Amount",
    documentDate: "Document date",
    dueDate: "Due date",
    purchaseOrder: "Purchase order",
    summary: "Summary",
    attentionReason: "Reason for attention",
    notAvailable: "Not available",
    detailsNotice:
      "This is a demonstration record. No data was extracted from a real file.",
    noFilterResults: "There are no documents for this filter.",
    loadingTitle: "Loading the queue",
    loadingBody: "This is how waiting for the future API response will look.",
    emptyTitle: "The queue is empty",
    emptyBody: "New documents will appear here after real upload is connected.",
    errorTitle: "The queue could not be loaded",
    errorBody: "The future interface will expose the error and offer a retry.",
    retry: "Try again",
    showDocuments: "Show mock data",
    stateNotice: "This state is enabled only for prototype demonstration.",
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
