'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import React, { SetStateAction } from 'react';
import { Add2 } from '../../ui/icon';
import dynamic from 'next/dynamic';
const ContentForm = dynamic(() => import('../content-form'), {
  ssr: false,
});

type TProps = {
  isNav?: boolean;
  setShowNotifications?: React.Dispatch<SetStateAction<boolean>>;
  setActiveButton?: React.Dispatch<React.SetStateAction<string | null>>;
};

export function CreateContentModal({
  isNav,
  setShowNotifications,
  setActiveButton,
}: TProps) {
  // const [isHovered, setIsHovered] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogTrigger asChild>
        <button
          onClick={() => {
            if (setShowNotifications && setActiveButton) {
              setShowNotifications(false);
              setActiveButton(null);
            }
          }}
          className={`group ${
            isNav ? 'md:w-full' : ''
          }  text-center flex items-center gap-3 my-2 duration-200 rounded-lg hover:bg-stone-100 md:py-3 md:px-3 `}
        >
          <span className='transition-transform duration-200 group-hover:scale-105'>
            <Add2 />
          </span>
          <span className='md:inline-block hidden'>Create</span>
        </button>
      </DialogTrigger>
      <DialogContent className='md:max-w-[80%] rounded-md max-w-[90%]  max-h-[90vh] overflow-y-auto '>
        <DialogHeader>
          <DialogTitle>Create Post</DialogTitle>
        </DialogHeader>
        <ContentForm setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
}
