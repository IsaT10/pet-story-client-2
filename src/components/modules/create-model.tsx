'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import React from 'react';
import { Pencil } from '../ui/icon';
import dynamic from 'next/dynamic';
const ContentForm = dynamic(() => import('./content-form'), {
  ssr: false,
});

export function CreateContentModal() {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogTrigger asChild>
        <button
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className='flex group items-center space-x-2'
        >
          <Pencil color={isHovered ? '#6A5ACD' : 'currentColor'} />
          <span className='group-hover:text-primary'>Write</span>
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
