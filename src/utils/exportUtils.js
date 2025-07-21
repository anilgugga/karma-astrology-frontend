import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

/**
 * Captures a DOM element and exports it to a downloadable PDF file.
 * @param {string} divId - The ID of the DOM element to export.
 * @param {string} fileName - The name of the PDF file to download.
 */
export async function exportToPDF(divId, fileName = "report.pdf") {
  const element = document.getElementById(divId);
  if (!element) {
    console.error(`Element with ID "${divId}" not found.`);
    return;
  }

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
  });

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "pt", "a4");
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  pdf.save(fileName);
}

/**
 * Same as exportToPDF but returns the PDF as a base64 string (Data URI).
 * Useful for emailing or uploading without downloading locally.
 * @param {string} divId - The ID of the DOM element to export.
 * @returns {Promise<string>} - A promise that resolves to the base64 Data URI string.
 */
export async function exportToBase64PDF(divId) {
  const element = document.getElementById(divId);
  if (!element) {
    console.error(`Element with ID "${divId}" not found.`);
    return null;
  }

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
  });

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "pt", "a4");
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  return pdf.output("datauristring");
}
