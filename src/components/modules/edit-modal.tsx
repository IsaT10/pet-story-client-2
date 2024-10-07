import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import React from 'react';
import ContentForm from './content-form';

export function EditContentModal({
  category,
  isPremium,
  content,
  thumbnail,
  postId,
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className='px-4 py-1.5 text-sm rounded-md w-full text-left hover:bg-stone-100 hover:outine-none'>
          Edit post
        </button>
      </DialogTrigger>
      <DialogContent className='max-w-[70%] max-h-[90vh] overflow-y-auto '>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
        </DialogHeader>
        <ContentForm
          category={category}
          isPremium={isPremium}
          content={content}
          thumbnail={thumbnail}
          postId={postId}
          isEdit={true}
        />
      </DialogContent>
    </Dialog>
  );
}
