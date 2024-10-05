import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center px-4 py-3 whitespace-nowrap rounded-md  font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-stone-950 duration-300 dark:focus-visible:ring-stone-300',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-white hover:bg-[#5A4FC4] font-medium duration-300', // Slate Blue default

        outline:
          'border border-primary bg-white text-primary hover:bg-slate-100 dark:border-primary dark:bg-light-taupe dark:hover:bg-slate-200 dark:text-primary',
        // secondary:
        //   'bg-light-taupe text-primary hover:bg-light-taupe/80 dark:bg-slate-800 dark:text-stone-50 dark:hover:bg-slate-800/80', // Using Light Taupe for secondary
        ghost: 'hover:bg-[#cecae8] hover:text-textPrimary ',
        link: 'text-primary underline-offset-4 hover:underline dark:text-stone-50',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
