/* eslint-disable @typescript-eslint/no-empty-object-type */
import * as React from 'react';

import { cn } from '@/lib/utils';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[130px] w-full rounded-md border border-textSecondary bg-white px-4 py-3.5 text-sm  placeholder:text-stone-500 focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50 dark:border-stone-800 dark:bg-stone-950  dark:placeholder:text-stone-400 ',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };
