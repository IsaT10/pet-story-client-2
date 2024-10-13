/* eslint-disable @typescript-eslint/no-empty-object-type */
import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex  w-full  border px-4 py-2.5 md:py-3.5 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-stone-950 placeholder:text-stone-500 focus-visible:outline-primary bg-white text-textPrimary  border-textSecondary focus:border-primary f rounded-md  disabled:cursor-not-allowed disabled:opacity-50 ',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
