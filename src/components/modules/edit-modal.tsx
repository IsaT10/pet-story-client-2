import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import React from 'react';
import ContentForm from './content-form';
import { IPost } from '@/types';

type TProps = {
  post: IPost;
  refetch: () => void;
};

export function EditContentModal({ post, refetch }: TProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const { thumbnail, content, category, isPremium, _id } = post;
  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
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