import { jsPDF } from 'jspdf';

interface NutritionData {
  petType: string;
  age: number;
  weight: number;
  recommendedDryFood: string;
  recommendedWetFood: string;
  protein: string;
  carbs: string;
  fats: string;
  vitamins: string;
  tips: string;
}

export const generatePDF = (nutritionData: NutritionData) => {
  const doc = new jsPDF();

  doc.text(`Pet Nutrition Report - ${nutritionData.petType}`, 10, 10);
  doc.text(`Age: ${nutritionData.age} years`, 10, 20);
  doc.text(`Weight: ${nutritionData.weight} kg`, 10, 30);
  doc.text(
    `Dry Food (cups): ${nutritionData.recommendedDryFood} cups/day`,
    10,
    40
  );
  doc.text(
    `Wet Food (cups): ${nutritionData.recommendedWetFood} cups/day`,
    10,
    50
  );
  doc.text(`Protein: ${nutritionData.protein} grams`, 10, 60);
  doc.text(`Carbs: ${nutritionData.carbs} grams`, 10, 70);
  doc.text(`Fats: ${nutritionData.fats} grams`, 10, 80);
  doc.text(`Vitamins: ${nutritionData.vitamins}`, 10, 90);
  doc.text(`Additional Tips: ${nutritionData.tips}`, 10, 100);

  doc.save('nutrition_report.pdf');
};
