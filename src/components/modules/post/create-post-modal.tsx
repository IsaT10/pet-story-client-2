'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import React from 'react';
import { Add2, Add2Solid, Pencil } from '../../ui/icon';
import dynamic from 'next/dynamic';
const ContentForm = dynamic(() => import('../content-form'), {
  ssr: false,
});

export function CreateContentModal({ handleCreatePostClick, isButtonActive }) {
  // const [isHovered, setIsHovered] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogTrigger asChild>
        <button
          onClick={handleCreatePostClick}
          className={`group md:w-full flex items-center gap-3 my-2 duration-200 rounded-lg hover:bg-stone-100 py-3 px-3 ${
            isButtonActive('create') ? 'text-primary font-semibold ' : ''
          }`}
        >
          <span className='transition-transform duration-200 group-hover:scale-105'>
            {isButtonActive('create') ? <Add2Solid /> : <Add2 />}
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
