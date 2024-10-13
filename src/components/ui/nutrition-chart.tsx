import { useRef } from 'react';
import html2pdf from 'html2pdf.js';
import { Button } from './button';

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

interface NutritionChartProps {
  nutritionData: NutritionData;
}

const NutritionChart: React.FC<NutritionChartProps> = ({ nutritionData }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  const generatePdf = () => {
    if (chartRef.current) {
      html2pdf(chartRef.current, {
        margin: 10,
        filename: 'nutrition-chart.pdf',
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      });
    }
  };

  return (
    <div className='flex flex-col items-center justify-center '>
      <div ref={chartRef} className=' w-full'>
        <h2 className='text-xl font-bold text-center mb-10'>
          {nutritionData.petType.toUpperCase()} Nutrition Chart
        </h2>

        <p className='w-full flex  divide-x-2 divide-textPrimary justify-between border-2 border-textPrimary '>
          <strong className='flex-1 py-3  text-center'>Age</strong>
          <span className='w-1/2 py-3  text-center'>
            {nutritionData.age} years
          </span>
        </p>
        <p className='w-full flex  divide-x-2 border-t-0 divide-textPrimary justify-between border-2 border-textPrimary '>
          <strong className='flex-1 py-3 text-center'>Weight</strong>
          <span className='w-1/2 py-3 text-center'>
            {nutritionData.weight} kg
          </span>
        </p>
        <p className='w-full flex  divide-x-2 border-t-0 divide-textPrimary justify-between border-2 border-textPrimary '>
          <strong className='flex-1 py-3 text-center'>Dry Food</strong>
          <span className='w-1/2 py-3 text-center'>
            {nutritionData.recommendedDryFood} cups/day
          </span>
        </p>
        <p className='w-full flex  divide-x-2 border-t-0 divide-textPrimary justify-between border-2 border-textPrimary '>
          <strong className='flex-1 py-3 text-center'>Wet Food</strong>
          <span className='w-1/2 py-3 text-center'>
            {nutritionData.recommendedWetFood} cups/day
          </span>
        </p>
        <p className='w-full flex  divide-x-2 border-t-0 divide-textPrimary justify-between border-2 border-textPrimary '>
          <strong className='flex-1 py-3 text-center'>Protein</strong>
          <span className='w-1/2 py-3 text-center'>
            {' '}
            {nutritionData.protein} grams/day
          </span>
        </p>
        <p className='w-full flex  divide-x-2 border-t-0 divide-textPrimary justify-between border-2 border-textPrimary '>
          <strong className='flex-1 py-3 text-center'>Carbs</strong>
          <span className='w-1/2 py-3 text-center'>
            {' '}
            {nutritionData.carbs} grams/day
          </span>
        </p>
        <p className='w-full flex  divide-x-2 border-t-0 divide-textPrimary justify-between border-2 border-textPrimary '>
          <strong className='flex-1 py-3 text-center'>Fats</strong>
          <span className='w-1/2 py-3 text-center'>
            {' '}
            {nutritionData.fats} grams/day
          </span>
        </p>
        <p className='w-full flex  divide-x-2 border-t-0 divide-textPrimary justify-between border-2 border-textPrimary '>
          <strong className='flex-1 py-3 text-center'>Vitamins</strong>
          <span className='w-1/2 py-3 text-center'>
            {' '}
            {nutritionData.vitamins}
          </span>
        </p>
        <p className='mt-6 text-center'>
          <strong>Additional Tips:</strong> {nutritionData.tips}
        </p>
      </div>
      <Button onClick={generatePdf} className='mt-10 '>
        Download PDF
      </Button>
    </div>
  );
};

export default NutritionChart;
