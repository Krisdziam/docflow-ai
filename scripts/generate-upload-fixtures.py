from pathlib import Path

from PIL import Image, ImageDraw, ImageFont
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import SimpleDocTemplate, Spacer, Table, TableStyle, Paragraph


PROJECT_ROOT = Path(__file__).resolve().parent.parent
OUTPUT_DIR = PROJECT_ROOT / "test-fixtures" / "upload-api" / "files"
MAX_UPLOAD_BYTES = 10 * 1024 * 1024


def create_pdf(path: Path, title: str, document_number: str, total: str) -> None:
    styles = getSampleStyleSheet()
    document = SimpleDocTemplate(
        str(path),
        pagesize=A4,
        leftMargin=22 * mm,
        rightMargin=22 * mm,
        topMargin=20 * mm,
        bottomMargin=20 * mm,
        title=title,
        author="DocFlow AI fictional fixture generator",
    )
    story = [
        Paragraph(title, styles["Title"]),
        Spacer(1, 8 * mm),
        Paragraph("Fictional test document - not for financial use", styles["Italic"]),
        Spacer(1, 8 * mm),
    ]
    data = [
        ["Document number", document_number],
        ["Supplier", "Northstar Demo Supplies LLC"],
        ["Customer", "DocFlow Fictional Wholesale"],
        ["Document date", "2026-10-22"],
        ["Currency", "UAH"],
        ["Total", total],
    ]
    table = Table(data, colWidths=[55 * mm, 95 * mm])
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (0, -1), colors.HexColor("#EEF2FF")),
                ("TEXTCOLOR", (0, 0), (-1, -1), colors.HexColor("#172033")),
                ("FONTNAME", (0, 0), (0, -1), "Helvetica-Bold"),
                ("FONTNAME", (1, 0), (1, -1), "Helvetica"),
                ("GRID", (0, 0), (-1, -1), 0.5, colors.HexColor("#CBD5E1")),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("TOPPADDING", (0, 0), (-1, -1), 8),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
            ]
        )
    )
    story.extend([table, Spacer(1, 12 * mm)])
    story.append(
        Paragraph(
            "Purpose: validate the DocFlow AI upload boundary using fictional data only.",
            styles["BodyText"],
        )
    )
    document.build(story)


def create_image(path: Path, heading: str, subtitle: str) -> None:
    image = Image.new("RGB", (1200, 1600), "#F8FAFC")
    draw = ImageDraw.Draw(image)
    title_font = ImageFont.load_default(size=54)
    body_font = ImageFont.load_default(size=30)
    small_font = ImageFont.load_default(size=24)

    draw.rounded_rectangle((80, 80, 1120, 1520), radius=40, fill="#FFFFFF", outline="#CBD5E1", width=4)
    draw.rectangle((80, 80, 1120, 270), fill="#1D4ED8")
    draw.text((140, 135), heading, font=title_font, fill="white")
    draw.text((140, 340), subtitle, font=body_font, fill="#172033")
    draw.text((140, 410), "Fictional test document", font=body_font, fill="#172033")

    rows = [
        ("Supplier", "Northstar Demo Supplies LLC"),
        ("Document date", "2026-10-22"),
        ("Reference", "DF-FIXTURE-2026"),
        ("Amount", "12,450.00 UAH"),
    ]
    y = 540
    for label, value in rows:
        draw.text((140, y), label, font=small_font, fill="#64748B")
        draw.text((450, y), value, font=small_font, fill="#172033")
        draw.line((140, y + 50, 1060, y + 50), fill="#E2E8F0", width=2)
        y += 125

    draw.text((140, 1360), "TEST DATA ONLY - DO NOT USE FOR REAL OPERATIONS", font=small_font, fill="#B91C1C")

    if path.suffix.lower() in {".jpg", ".jpeg"}:
        image.save(path, format="JPEG", quality=88, optimize=True)
    else:
        image.save(path, format="PNG", optimize=True)


def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    for existing_file in OUTPUT_DIR.iterdir():
        if existing_file.is_file():
            existing_file.unlink()

    create_pdf(
        OUTPUT_DIR / "01-valid-invoice.pdf",
        "Fictional Invoice",
        "INV-DEMO-1001",
        "12,450.00",
    )
    create_pdf(
        OUTPUT_DIR / "02-valid-purchase-order.pdf",
        "Fictional Purchase Order",
        "PO-DEMO-2042",
        "8,920.00",
    )
    create_image(
        OUTPUT_DIR / "03-valid-delivery-note.jpg",
        "Delivery Note",
        "DN-DEMO-552",
    )
    create_image(
        OUTPUT_DIR / "04-valid-document-photo.png",
        "Document Photo",
        "PNG-DEMO-101",
    )
    create_image(
        OUTPUT_DIR / "05-valid-mobile-scan.jpeg",
        "Mobile Scan",
        "JPEG-DEMO-202",
    )

    (OUTPUT_DIR / "06-invalid-empty.pdf").write_bytes(b"")
    (OUTPUT_DIR / "07-invalid-fake-pdf.pdf").write_text(
        "This is plain text disguised as a PDF. Fictional test data only.\n",
        encoding="utf-8",
    )
    png_bytes = (OUTPUT_DIR / "04-valid-document-photo.png").read_bytes()
    (OUTPUT_DIR / "08-invalid-png-renamed.pdf").write_bytes(png_bytes)
    (OUTPUT_DIR / "09-invalid-unsupported.txt").write_text(
        "Unsupported extension fixture. Fictional test data only.\n",
        encoding="utf-8",
    )
    oversized_path = OUTPUT_DIR / "10-invalid-oversized.pdf"
    with oversized_path.open("wb") as stream:
        stream.write(b"%PDF-1.7\n")
        stream.write(b"0" * (MAX_UPLOAD_BYTES + 1 - stream.tell()))

    generated_files = sorted(path for path in OUTPUT_DIR.iterdir() if path.is_file())
    if len(generated_files) != 10:
        raise RuntimeError(f"Expected 10 fixtures, generated {len(generated_files)}")

    for path in generated_files:
        print(f"{path.name}\t{path.stat().st_size} bytes")


if __name__ == "__main__":
    main()
