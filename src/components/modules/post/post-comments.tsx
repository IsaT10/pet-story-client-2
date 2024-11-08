import { useUser } from '@/context/user.provider';
import { useCreateComment } from '@/hooks/comment.hook';
import { IComment } from '@/types';
import Image from 'next/image';
import avatar from '@/assets/images/avatar.png';
import React from 'react';
import { Send, Spinner } from '@/components/ui/icon';
import SingleComment from './comment';
type Tprops = {
  _id: string;
  comments: IComment[];
};

export default function PostComments({ _id, comments }: Tprops) {
  const { user } = useUser();
  const [commentText, setCommentText] = React.useState('');
  const { mutate: handleComment, isPending } = useCreateComment();

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment: IComment = {
      comment: commentText,
    };

    handleComment(
      {
        postId: _id,
        commentData: newComment,
      },
      {
        onSuccess: () => {
          // refetch();
          setCommentText('');
        },
      }
    );
  };

  return (
    <>
      <div className='flex w-full items-start mb-4 mt-10'>
        <Image
          src={user?.image || avatar}
          height={35}
          width={35}
          alt='user-profile'
          className='rounded-full mr-2 object-cover'
        />
        <form
          onSubmit={handleCommentSubmit}
          className='flex items-center gap-2 w-full relative'
        >
          <textarea
            value={commentText}
            rows={2}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder='Write a comment...'
            className='resize-none rounded-xl  pl-4 pr-10 py-2 w-full  outline-primary bg-stone-100 border border-stone-200'
          />
          <button className='absolute right-4 top-5'>
            {isPending ? (
              <Spinner className='animate-spin h-5  text-primary' />
            ) : (
              <Send />
            )}
          </button>
        </form>
      </div>

      <div className='space-y-3'>
        {comments.map((comment) => (
          <SingleComment
            key={comment._id}
            comment={comment}
            // refetch={refetch}
          />
        ))}
      </div>
    </>
  );
}
