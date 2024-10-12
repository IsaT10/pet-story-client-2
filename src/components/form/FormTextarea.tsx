'use client';

import { useFormContext } from 'react-hook-form';
import { Textarea } from '../ui/textarea';

type TProps = {
  variant?: 'flat' | 'bordered' | 'faded' | 'underlined';
  size?: 'sm' | 'md' | 'lg';
  required?: boolean;
  label: string;
  name: string;
};

export default function FormTextarea({
  required = false,
  label,
  name,
}: TProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <label htmlFor={name} className='font-medium text-sm'>
        {label}
      </label>
      <Textarea {...register(name)} required={required} />
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
