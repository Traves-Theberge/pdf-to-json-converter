// src/utils/pdfToJsonConverter.js
import * as pdfjsLib from 'pdfjs-dist/build/pdf';
import 'pdfjs-dist/build/pdf.worker.entry';

// Extract layout information from a PDF page
const extractLayoutInfo = async (page) => {
  const textContent = await page.getTextContent();
  const viewport = page.getViewport({ scale: 1 });

  // Map each text item to an object with position and style information
  return textContent.items.map(item => ({
    text: item.str,
    x: item.transform[4],
    y: viewport.height - item.transform[5],
    width: item.width,
    height: item.height,
    fontName: item.fontName,
    fontSize: item.transform[0]
  }));
};

// Classify elements based on font size and content
const classifyElements = (layout) => {
  return layout.map(item => {
    if (item.fontSize > 16) return { ...item, type: 'header' };
    if (item.text.trim().startsWith('•')) return { ...item, type: 'listItem' };
    return { ...item, type: 'paragraph' };
  });
};

// Generate structured content from classified elements
const generateStructuredContent = (classifiedElements) => {
  const structure = [];
  let currentParagraph = '';

  classifiedElements.forEach(element => {
    switch(element.type) {
      case 'header':
        // Flush current paragraph if exists
        if (currentParagraph) {
          structure.push({ type: 'paragraph', content: currentParagraph.trim() });
          currentParagraph = '';
        }
        // Add header with calculated level
        structure.push({ type: 'header', content: element.text, level: Math.floor(24 / element.fontSize) });
        break;
      case 'listItem':
        // Flush current paragraph if exists
        if (currentParagraph) {
          structure.push({ type: 'paragraph', content: currentParagraph.trim() });
          currentParagraph = '';
        }
        structure.push({ type: 'listItem', content: element.text.trim() });
        break;
      default:
        // Accumulate paragraph text
        currentParagraph += element.text + ' ';
    }
  });

  // Flush any remaining paragraph text
  if (currentParagraph) {
    structure.push({ type: 'paragraph', content: currentParagraph.trim() });
  }

  return structure;
};

// Convert structured content to JSON string
const generateJsonFromStructure = (structuredContent) => {
  return JSON.stringify(structuredContent, null, 2);
};

// Main function to convert PDF to JSON
const convertPdfToJson = async (pdfFile, setProgress, batchSize = 5) => {
  const loadingTask = pdfjsLib.getDocument(pdfFile);
  const pdf = await loadingTask.promise;
  let jsonContent = [];

  // Process a batch of pages
  const processBatch = async (startPage, endPage) => {
    for (let i = startPage; i <= endPage && i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const layout = await extractLayoutInfo(page);
      const classifiedElements = classifyElements(layout);
      const structuredContent = generateStructuredContent(classifiedElements);
      jsonContent.push({ page: i, content: structuredContent });
      setProgress((i / pdf.numPages) * 100);
    }
  };

  // Process PDF in batches for better performance
  const totalBatches = Math.ceil(pdf.numPages / batchSize);
  for (let batch = 0; batch < totalBatches; batch++) {
    const startPage = batch * batchSize + 1;
    const endPage = Math.min((batch + 1) * batchSize, pdf.numPages);
    await processBatch(startPage, endPage);
  }

  return generateJsonFromStructure(jsonContent);
};

export { convertPdfToJson };