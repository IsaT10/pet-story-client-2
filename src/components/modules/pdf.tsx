/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import { generateNutritionData } from '@/app/utils/nuutritionData';
import { useState } from 'react';
import NutritionChart from '../ui/nutrition-chart';
import NutritionForm from '../ui/nutrition-form';

export default function PDF() {
  const [nutritionData, setNutritionData] = useState<any>(null);

  const handleFormSubmit = (formData: any) => {
    const data = generateNutritionData(formData);
    setNutritionData(data);
  };

  return (
    <div className='min-h-screen w-full'>
      {nutritionData ? (
        <div className='mt-6'>
          <NutritionChart nutritionData={nutritionData} />
        </div>
      ) : (
        <NutritionForm onSubmit={handleFormSubmit} />
      )}
    </div>
  );
}
