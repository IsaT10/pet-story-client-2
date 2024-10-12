// types.ts

export interface FormData {
  petType: string;
  age: number;
  weight: number;
}

// nutritionCalculator.ts

export const generateNutritionData = (formData: FormData) => {
  const { petType, age, weight } = formData;

  // Sample data generation based on petType, age, and weight
  let recommendedDryFood = '';
  let recommendedWetFood = '';
  let protein = '';
  let carbs = '';
  let fats = '';
  let vitamins = '';
  let tips = '';

  if (petType === 'dog') {
    recommendedDryFood = `${(weight * 0.03).toFixed(2)}`; // Dry food in cups/day
    recommendedWetFood = `${(weight * 0.05).toFixed(2)}`; // Wet food in cups/day
    protein = `${(weight * 2.5).toFixed(2)}`; // Protein in grams/day
    carbs = `${(weight * 3.0).toFixed(2)}`; // Carbs in grams/day
    fats = `${(weight * 1.0).toFixed(2)}`; // Fats in grams/day
    vitamins = 'Vitamin A, D, E'; // Suggested vitamins
    tips = 'Provide plenty of water and exercise daily.';
  } else if (petType === 'cat') {
    recommendedDryFood = `${(weight * 0.02).toFixed(2)}`; // Dry food in cups/day
    recommendedWetFood = `${(weight * 0.04).toFixed(2)}`; // Wet food in cups/day
    protein = `${(weight * 3.0).toFixed(2)}`; // Protein in grams/day
    carbs = `${(weight * 2.5).toFixed(2)}`; // Carbs in grams/day
    fats = `${(weight * 0.8).toFixed(2)}`; // Fats in grams/day
    vitamins = 'Vitamin B, E'; // Suggested vitamins
    tips = 'Keep the cat indoors and maintain regular vet checkups.';
  } else if (petType === 'bird') {
    recommendedDryFood = `${(weight * 0.015).toFixed(2)}`; // Dry food in cups/day
    recommendedWetFood = `${(weight * 0.02).toFixed(2)}`; // Wet food in cups/day
    protein = `${(weight * 1.0).toFixed(2)}`; // Protein in grams/day
    carbs = `${(weight * 1.5).toFixed(2)}`; // Carbs in grams/day
    fats = `${(weight * 0.5).toFixed(2)}`; // Fats in grams/day
    vitamins = 'Vitamin A, D'; // Suggested vitamins
    tips = 'Provide fresh fruits and a clean cage.';
  } else if (petType === 'rabbit') {
    recommendedDryFood = `${(weight * 0.025).toFixed(2)}`; // Dry food in cups/day
    recommendedWetFood = `${(weight * 0.03).toFixed(2)}`; // Wet food in cups/day
    protein = `${(weight * 2.0).toFixed(2)}`; // Protein in grams/day
    carbs = `${(weight * 2.8).toFixed(2)}`; // Carbs in grams/day
    fats = `${(weight * 0.7).toFixed(2)}`; // Fats in grams/day
    vitamins = 'Vitamin C, E'; // Suggested vitamins
    tips = 'Ensure the rabbit has a varied diet of hay, vegetables, and water.';
  } else if (petType === 'hamster') {
    recommendedDryFood = `${(weight * 0.01).toFixed(2)}`; // Dry food in cups/day
    recommendedWetFood = `${(weight * 0.015).toFixed(2)}`; // Wet food in cups/day
    protein = `${(weight * 1.5).toFixed(2)}`; // Protein in grams/day
    carbs = `${(weight * 2.0).toFixed(2)}`; // Carbs in grams/day
    fats = `${(weight * 0.6).toFixed(2)}`; // Fats in grams/day
    vitamins = 'Vitamin B, C'; // Suggested vitamins
    tips =
      'Provide a variety of grains, seeds, and occasional fresh vegetables.';
  }

  // Return the generated data
  return {
    petType,
    age,
    weight,
    recommendedDryFood,
    recommendedWetFood,
    protein,
    carbs,
    fats,
    vitamins,
    tips,
  };
};
