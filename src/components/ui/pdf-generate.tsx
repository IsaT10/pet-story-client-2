import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const generatePDF = (nutritionData) => {
  const doc = new jsPDF();

  // Set title
  doc.text(`Pet Nutrition Report - ${nutritionData.petType}`, 10, 10);

  // Add data to PDF
  doc.text(`Age: ${nutritionData.age} years`, 10, 20);
  doc.text(`Weight: ${nutritionData.weight} kg`, 10, 30);
  doc.text(
    `Recommended Food: ${nutritionData.recommendedFood.toFixed(2)} kg/day`,
    10,
    40
  );
  doc.text(`Additional Tips: ${nutritionData.tips}`, 10, 50);

  // Save the PDF
  doc.save('nutrition_report.pdf');
};
