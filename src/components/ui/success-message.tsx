'use-client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';

export default function SuccessMessage() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <button className='hidden'>Open Dialog</button>{' '}
          {/* Hidden button for accessibility */}
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <p>Please check your email!</p>
            <DialogClose
              className='absolute top-2 right-2 cursor-pointer text-gray-600 hover:text-gray-900'
              aria-label='Close'
            >
              &times; {/* You can use an icon here */}
            </DialogClose>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
