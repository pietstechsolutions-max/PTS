const fs = require('fs');
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, ImageRun, Header, Footer, AlignmentType,
  Table, TableRow, TableCell, WidthType, ShadingType, BorderStyle, PageNumber,
  LevelFormat, TabStopType, HeadingLevel,
} = require('docx');

const NAVY = '011F5D', BLUE = '01A2E8', GRAY = '666666', CYAN = '02D7F5';
const banner = fs.readFileSync(path.join(__dirname, '..', 'brand', 'banner.png'));
const OUT = path.join(__dirname, 'out');
fs.mkdirSync(OUT, { recursive: true });

const FONT = 'Arial';
const noBorder = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' };
const noBorders = { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder };

function bannerHeader() {
  return new Header({
    children: [
      new Paragraph({
        spacing: { after: 160 },
        children: [new ImageRun({ type: 'png', data: banner, transformation: { width: 720, height: 162 } })],
      }),
    ],
  });
}
function plainHeader() {
  return new Header({
    children: [new Paragraph({
      alignment: AlignmentType.RIGHT,
      border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: CYAN, space: 4 } },
      children: [new TextRun({ text: 'PIETS ', bold: true, italics: true, color: NAVY, font: FONT, size: 20 }),
        new TextRun({ text: 'TECHNOLOGY SOLUTIONS  ·  631-871-5957', color: BLUE, font: FONT, size: 16 })],
    })],
  });
}
function footer(label) {
  return new Footer({
    children: [new Paragraph({
      alignment: AlignmentType.CENTER,
      border: { top: { style: BorderStyle.SINGLE, size: 4, color: 'CCCCCC', space: 4 } },
      children: [
        new TextRun({ text: `${label ? label + '   ·   ' : ''}Piets Technology Solutions Inc  ·  631-871-5957  ·  pietstechsolutions@gmail.com  ·  pietstechsolutions.com   ·   Page `, color: GRAY, font: FONT, size: 16 }),
        new TextRun({ children: [PageNumber.CURRENT], color: GRAY, font: FONT, size: 16 }),
      ],
    })],
  });
}
const P = (text, o = {}) => new Paragraph({
  spacing: { after: o.after ?? 120 }, alignment: o.align,
  children: [new TextRun({ text, font: FONT, size: o.size ?? 22, bold: o.bold, color: o.color, italics: o.italics })],
});
const H = (text) => new Paragraph({
  heading: HeadingLevel.HEADING_2, spacing: { before: 240, after: 100 },
  children: [new TextRun({ text, font: FONT, size: 26, bold: true, color: NAVY })],
});
const bullet = (text) => new Paragraph({ numbering: { reference: 'bullets', level: 0 }, spacing: { after: 60 }, children: [new TextRun({ text, font: FONT, size: 22 })] });

function cell(text, w, o = {}) {
  return new TableCell({
    width: { size: w, type: WidthType.DXA },
    shading: o.shade ? { type: ShadingType.CLEAR, fill: o.shade, color: 'auto' } : undefined,
    margins: { top: 80, bottom: 80, left: 100, right: 100 },
    children: [new Paragraph({ alignment: o.align, children: [new TextRun({ text, font: FONT, size: 20, bold: o.bold, color: o.color })] })],
  });
}
function table(rows, widths, headerShade = NAVY) {
  return new Table({
    width: { size: widths.reduce((a, b) => a + b, 0), type: WidthType.DXA }, columnWidths: widths,
    rows: rows.map((r, i) => new TableRow({
      tableHeader: i === 0,
      children: r.map((t, j) => cell(t, widths[j], i === 0 ? { shade: headerShade, bold: true, color: 'FFFFFF' } : { align: j > 0 && j === r.length - 1 ? AlignmentType.RIGHT : undefined })),
    })),
  });
}

function doc(sections, title) {
  return new Document({
    creator: 'Piets Technology Solutions', title,
    numbering: { config: [{ reference: 'bullets', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 540, hanging: 270 } } } }] }] },
    styles: { default: { document: { run: { font: FONT, size: 22 } } } },
    sections,
  });
}
const pageProps = { page: { size: { width: 12240, height: 15840 }, margin: { top: 1080, bottom: 1080, left: 1080, right: 1080 } }, titlePage: true };
function section(children, footLabel) {
  return { properties: pageProps, headers: { first: bannerHeader(), default: plainHeader() }, footers: { first: footer(footLabel), default: footer(footLabel) }, children };
}

async function save(d, name) {
  const buf = await Packer.toBuffer(d);
  fs.writeFileSync(path.join(OUT, name), buf);
  console.log('wrote', name);
}

(async () => {
  // 1. Letterhead
  await save(doc([section([
    P('[Date]', { after: 240 }),
    P('[Client Name]'), P('[Company / Address line 1]'), P('[Address line 2]', { after: 240 }),
    P('Dear [Client Name],', { after: 200 }),
    P('[Start typing your letter here. Keep it short, friendly and plain English. Say what was done or what happens next, and how to reach us.]', { after: 200 }),
    P('Questions? We\'re here 24/7 — call or text 631-871-5957.', { after: 300 }),
    P('Piets Technology Solutions', { bold: true, color: NAVY, after: 40 }),
    P('631-871-5957  ·  pietstechsolutions@gmail.com  ·  pietstechsolutions.com', { size: 20, color: GRAY }),
  ])], 'Letterhead'), 'PIETS_Letterhead_TEMPLATE.docx');

  // 2. Estimate template
  await save(doc([section([
    P('SECURITY CAMERA SYSTEM ESTIMATE', { bold: true, size: 32, color: NAVY, align: AlignmentType.CENTER, after: 60 }),
    P('[Client Name]  ·  [Property Address]  ·  [Date]', { align: AlignmentType.CENTER, color: GRAY, after: 200 }),
    P('[Insert site photo here — full page width]', { align: AlignmentType.CENTER, italics: true, color: GRAY, after: 300 }),
    H('Scope of Work'),
    P('[State the client\'s actual problem first — e.g. cannot view existing cameras installed by someone else.] Then the options below.'),
    H('Option 1 — Recommended: Full InVid Tech Paramont Swap'),
    bullet('[Camera model] × [qty], [recorder model], [drive size]'), bullet('New cable runs where needed, mounting, configuration, app setup and training'),
    H('Option 2 — [Alternate option]'),
    bullet('[Description]'),
    H('Camera Placement'),
    P('[3 per page — caption | location photo | approximate-view photo]', { italics: true, color: GRAY }),
    H('Storage'),
    P('Expected recording history: [14–21] days. A larger drive is available for extended storage.'),
    H('Investment (all prices pre-tax)'),
    table([['Item', 'Qty', 'Price'], ['[Option 1 equipment + install]', '1', '$[0.00]'], ['[Option 2 equipment + install]', '1', '$[0.00]']], [6000, 1400, 2600]),
    P('', { after: 60 }),
    H('Other'),
    table([['Add-on', 'Qty', 'Price'], ['[Network switch / add-on not part of main system]', '1', '$[0.00]']], [6000, 1400, 2600]),
    P('', { after: 60 }),
    H('Warranty & Payment Terms'),
    P('Warranty covers only the camera-side equipment supplied by Piets Technology Solutions (cameras and/or recorder). Existing wiring, client-owned equipment, switches and audio/AV gear are not covered.'),
    P('Payment: [50% deposit / balance on completion]. Zelle, Venmo, Cash App, cash or check at no charge; card payments available by link with a 4% processing fee.'),
    P('This estimate is valid for 7 days from the date shown. Prices may rise after that period.', { bold: true }),
    table([['Total', 'Amount'], ['Subtotal (Option 1)', '$[0.00]'], ['Suffolk County sales tax 8.75%', '$[0.00]'], ['Grand Total', '$[0.00]']], [7000, 3000]),
  ], 'Estimate')], 'Estimate'), 'PIETS_Estimate_TEMPLATE.docx');

  // 3. Invoice template
  await save(doc([section([
    P('INVOICE', { bold: true, size: 36, color: NAVY, after: 60 }),
    table([['Invoice #', 'Invoice Date', 'Service Date', 'Terms'], ['INV-[####]', '[Date]', '[Service date]', 'Due on receipt']], [2500, 2500, 2500, 2580], BLUE),
    P('', { after: 120 }),
    P('Bill To', { bold: true, color: NAVY, after: 40 }), P('[Client Name]'), P('[Address]', { after: 200 }),
    table([['Description', 'Qty', 'Unit', 'Amount'], ['[Service / equipment line]', '1', '$[0.00]', '$[0.00]'], ['[Labor]', '1', '$[0.00]', '$[0.00]']], [5600, 1200, 1600, 1680]),
    P('', { after: 120 }),
    table([['', 'Amount'], ['Subtotal', '$[0.00]'], ['Sales tax 8.75%', '$[0.00]'], ['Total Due', '$[0.00]']], [7000, 3080], NAVY),
    P('', { after: 160 }),
    H('How to Pay'),
    bullet('Zelle, Venmo, Cash App, cash or check — no fee. Checks payable to Piets Technology Solutions Inc.'),
    bullet('Debit/credit card by secure link — 4% processing fee added.'),
    P('Questions? We\'re here 24/7 — 631-871-5957', { bold: true, color: NAVY }),
  ], 'Invoice')], 'Invoice'), 'PIETS_Invoice_TEMPLATE.docx');

  // 4. Receipt
  await save(doc([section([
    P('PAYMENT RECEIPT', { bold: true, size: 36, color: NAVY, after: 120 }),
    table([['Receipt for', 'Invoice #', 'Payment Date', 'Method'], ['[Client Name]', 'INV-[####]', '[Date]', '[Zelle / Venmo / Cash / Check / Card]']], [3000, 2200, 2200, 2680], BLUE),
    P('', { after: 120 }),
    table([['', 'Amount'], ['Invoice total', '$[0.00]'], ['Amount paid', '$[0.00]'], ['Balance remaining', '$[0.00]']], [7000, 3080]),
    P('', { after: 160 }),
    P('Thank you for your payment. Keep this receipt for your records.'),
  ], 'Receipt')], 'Receipt'), 'PIETS_Receipt_TEMPLATE.docx');

  // 5. Proposal / report cover
  await save(doc([section([
    P('', { after: 1200 }),
    P('[DOCUMENT TITLE]', { bold: true, size: 44, color: NAVY, align: AlignmentType.CENTER, after: 120 }),
    P('[Subtitle — e.g. Network Upgrade Proposal]', { size: 26, color: BLUE, align: AlignmentType.CENTER, after: 400 }),
    P('Prepared for: [Client Name]', { align: AlignmentType.CENTER }),
    P('[Property Address]', { align: AlignmentType.CENTER }),
    P('[Date]', { align: AlignmentType.CENTER, color: GRAY, after: 600 }),
    P('Prepared by Piets Technology Solutions', { align: AlignmentType.CENTER, bold: true, color: NAVY }),
  ], 'Proposal')], 'Proposal'), 'PIETS_Proposal_Cover_TEMPLATE.docx');
})();
