export const documentStatuses = [
  "processing",
  "needs_review",
  "approved",
  "failed",
  "duplicate",
] as const;

export type DocumentStatus = (typeof documentStatuses)[number];

export const documentTypes = [
  "invoice",
  "purchase_order",
  "delivery_note",
] as const;

export type DocumentType = (typeof documentTypes)[number];

export type PrototypeDocument = Readonly<{
  id: string;
  fileName: string;
  documentNumber: string;
  supplier: string;
  type: DocumentType;
  status: DocumentStatus;
  receivedAt: string;
  amount: number | null;
  currency: "UAH" | "EUR" | "USD" | null;
  issueCount: number;
  details: Readonly<{
    documentDate: string;
    dueDate: string | null;
    purchaseOrder: string | null;
    summary: Readonly<{ uk: string; en: string }>;
    reviewReason: Readonly<{ uk: string; en: string }> | null;
  }>;
}>;

export type DocumentFilter = "all" | DocumentStatus;

export const prototypeDocuments: readonly PrototypeDocument[] = [
  {
    id: "doc-1042",
    fileName: "invoice-dnipro-office-1042.pdf",
    documentNumber: "INV-1042",
    supplier: "Dnipro Office Supply",
    type: "invoice",
    status: "needs_review",
    receivedAt: "2026-10-22T08:42:00+03:00",
    amount: 48_720,
    currency: "UAH",
    issueCount: 2,
    details: {
      documentDate: "2026-10-20",
      dueDate: "2026-11-03",
      purchaseOrder: "PO-2026-184",
      summary: {
        uk: "Офісний папір, теки та витратні матеріали для принтера.",
        en: "Office paper, folders, and printer consumables.",
      },
      reviewReason: {
        uk: "Потрібно підтвердити суму ПДВ і кількість в одній позиції.",
        en: "The VAT amount and one line-item quantity need confirmation.",
      },
    },
  },
  {
    id: "doc-1039",
    fileName: "po-northstar-7781.png",
    documentNumber: "PO-7781",
    supplier: "Northstar Components",
    type: "purchase_order",
    status: "processing",
    receivedAt: "2026-10-22T08:17:00+03:00",
    amount: 2_840,
    currency: "EUR",
    issueCount: 0,
    details: {
      documentDate: "2026-10-21",
      dueDate: null,
      purchaseOrder: null,
      summary: {
        uk: "Запасні підшипники та деталі для технічного обслуговування.",
        en: "Replacement bearings and maintenance parts.",
      },
      reviewReason: null,
    },
  },
  {
    id: "doc-1035",
    fileName: "delivery-note-orion-552.jpg",
    documentNumber: "DN-552",
    supplier: "Orion Logistics Demo",
    type: "delivery_note",
    status: "approved",
    receivedAt: "2026-10-21T16:04:00+03:00",
    amount: null,
    currency: null,
    issueCount: 0,
    details: {
      documentDate: "2026-10-21",
      dueDate: null,
      purchaseOrder: "PO-2026-171",
      summary: {
        uk: "Підтвердження доставки складських стелажів.",
        en: "Delivery confirmation for warehouse shelving.",
      },
      reviewReason: null,
    },
  },
  {
    id: "doc-1031",
    fileName: "invoice-greenline-089.pdf",
    documentNumber: "GL-089",
    supplier: "Greenline Packaging",
    type: "invoice",
    status: "duplicate",
    receivedAt: "2026-10-21T13:26:00+03:00",
    amount: 1_265,
    currency: "USD",
    issueCount: 1,
    details: {
      documentDate: "2026-10-18",
      dueDate: "2026-11-01",
      purchaseOrder: "PO-2026-165",
      summary: {
        uk: "Захисне паковання для вихідних замовлень.",
        en: "Protective packaging for outbound orders.",
      },
      reviewReason: {
        uk: "Документ із таким постачальником і номером уже існує.",
        en: "A document with the same supplier and number already exists.",
      },
    },
  },
  {
    id: "doc-1028",
    fileName: "invoice-urban-catering-414.pdf",
    documentNumber: "UC-414",
    supplier: "Urban Catering Demo",
    type: "invoice",
    status: "failed",
    receivedAt: "2026-10-21T11:08:00+03:00",
    amount: null,
    currency: null,
    issueCount: 1,
    details: {
      documentDate: "2026-10-19",
      dueDate: null,
      purchaseOrder: null,
      summary: {
        uk: "Товари для кейтерингу на вигаданій внутрішній події.",
        en: "Catering supplies for a fictional internal event.",
      },
      reviewReason: {
        uk: "Прототип не зміг прочитати достатньо полів із зображення.",
        en: "The prototype could not read enough fields from the image.",
      },
    },
  },
] as const;

export function filterPrototypeDocuments(
  documents: readonly PrototypeDocument[],
  filter: DocumentFilter,
): readonly PrototypeDocument[] {
  if (filter === "all") {
    return documents;
  }

  return documents.filter((document) => document.status === filter);
}
