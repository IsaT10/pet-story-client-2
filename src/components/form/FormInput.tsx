'use client';

import { useFormContext } from 'react-hook-form';
import { Input } from '../ui/input';

type TProps = {
  variant?: 'flat' | 'bordered' | 'faded' | 'underlined';
  size?: 'sm' | 'md' | 'lg';
  required?: boolean;
  type?: string;
  label: string;
  name: string;
};

export default function FormInput({
  required = false,
  type = 'text',
  label,
  name,
}: TProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  console.log(errors);

  return (
    <div>
      <label htmlFor={name} className='font-medium'>
        {label}
      </label>
      <Input {...register(name)} required={required} type={type} />
      {errors ? (
        <span className='text-sm text-red-600'>
          {errors[name]?.message as string}
        </span>
      ) : (
        ''
      )}
    </div>
  );
}
