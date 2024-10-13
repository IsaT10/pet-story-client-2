import React from 'react';
import { Dialog, DialogContent } from '../ui/dialog';
import Link from 'next/link';
import { Button } from './button';

type TProps = {
  message: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen?: boolean;
};

export default function WarningMessage({
  message,
  setIsOpen,
  isOpen = false,
}: TProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogContent className='max-w-md py-12 px-5 h-[240px] flex flex-col items-center gap-10'>
        <p className='text-center text-lg font-medium'>{message}</p>

        <div className='flex gap-4'>
          <Link href='/register' className='w-max'>
            <Button variant='outline' className='py-2 px-6'>
              Signup
            </Button>
          </Link>
          <Link href='/login' className='w-max'>
            <Button className='py-2 px-6 border border-primary'>Login</Button>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}
