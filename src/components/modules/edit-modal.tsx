'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import React from 'react';
import dynamic from 'next/dynamic';
// import ContentForm from './content-form';
import { IPost } from '@/types';
const ContentForm = dynamic(() => import('./content-form'), {
  ssr: false,
});

type TProps = {
  post: IPost;
  // refetch: () => void;
};

export function EditContentModal({ post }: TProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const { thumbnail, content, category, isPremium, _id } = post;
  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogTrigger asChild>
        <button className='px-4 py-1.5 text-sm rounded-md w-full text-left hover:bg-stone-100 hover:outine-none'>
          Edit post
        </button>
      </DialogTrigger>
      <DialogContent className='md:max-w-[80%] rounded-md max-w-[90%]  max-h-[90vh] overflow-y-auto '>
        <DialogHeader>
          <DialogTitle>Edit Post</DialogTitle>
        </DialogHeader>
        <ContentForm
          category={category}
          isPremium={isPremium}
          content={content}
          setIsOpen={setIsOpen}
          thumbnail={thumbnail}
          postId={_id}
          //   refetch={refetch}
          isEdit={true}
        />
      </DialogContent>
    </Dialog>
  );
}
