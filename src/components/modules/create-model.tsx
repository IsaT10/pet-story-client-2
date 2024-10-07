import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import React from 'react';
import { Pencil } from '../ui/icon';
import ContentForm from './content-form';

export function CreateContentModal() {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <Dialog>
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
      <DialogContent className='max-w-[70%] max-h-[90vh] overflow-y-auto '>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
        </DialogHeader>
        <ContentForm />
      </DialogContent>
    </Dialog>
  );
}
