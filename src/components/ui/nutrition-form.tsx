import { useState } from 'react';
import FormSelect from '../form/FormSelect';
import { Button } from './button';

interface FormData {
  petType: string;
  age: number;
  weight: number;
}

interface NutritionFormProps {
  onSubmit: (data: FormData) => void;
}

const NutritionForm: React.FC<NutritionFormProps> = ({ onSubmit }) => {
  const [petType, setPetType] = useState<string>('dog');
  const [age, setAge] = useState<number | string>('');
  const [weight, setWeight] = useState<number | string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ petType, age: Number(age), weight: Number(weight) });
  };

  const petOptions = [
    { value: 'dog', label: 'Dog' },
    { value: 'cat', label: 'Cat' },
    { value: 'bird', label: 'Bird' },
    { value: 'rabbit', label: 'Rabbit' },
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className='max-w-md mx-auto py-10 px-10 border border-stone-300  rounded-lg'
    >
      <h2 className='text-xl font-semibold mb-8  text-center'>
        Pet Nutrition Calculator
      </h2>

      <div className='mb-4'>
        <label className='block text-sm font-medium mb-1'>Pet type</label>
        <FormSelect
          value={petType}
          setValue={setPetType}
          options={petOptions}
          label='Pet'
        />
      </div>

      <div className='mb-4'>
        <label className='block text-sm font-medium'>Age (in years)</label>
        <input
          type='number'
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className='mt-1 block w-full px-4 py-2.5 outline-primary border-textSecondary border rounded-md'
          required
        />
      </div>

      <div className='mb-4'>
        <label className='block text-sm font-medium'>Weight (in kg)</label>
        <input
          type='number'
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className='mt-1 block w-full px-4 py-2.5 outline-primary border-textSecondary border rounded-md'
          required
        />
      </div>

      <Button type='submit' className='mt-6 w-full'>
        Generate Nutrition Chart
      </Button>
    </form>
  );
};

export default NutritionForm;
