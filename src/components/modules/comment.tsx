import Image from 'next/image';
import avatar from '@/assets/images/avatar.png';
import { timeCompact } from '@/app/utils/timeCompact';
import { IComment } from '@/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { useUser } from '@/context/user.provider';
import { useDeleteComment, useUpdateComment } from '@/hooks/comment.hook';
import React from 'react';
import { Send } from '../ui/icon';
import { RotatingLines } from 'react-loader-spinner';

export default function SingleComment({
  comment,
}: //   refetch,
{
  comment: IComment;
  //   refetch: () => void;
}) {
  const [commentText, setCommentText] = React.useState(comment.comment);
  const [isEdit, setIsEdit] = React.useState(false);
  const { user } = useUser();
  const { mutate: handleUpdateComment, isPending } = useUpdateComment();
  const { mutate: handleDeleteComment } = useDeleteComment();

  // Ref for the textarea element
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);

  // When isEdit becomes true, set the cursor at the end of the text
  React.useEffect(() => {
    if (isEdit && textareaRef.current) {
      const textarea = textareaRef.current;
      textarea.focus();
      textarea.setSelectionRange(commentText.length, commentText.length); // Set cursor at the end
    }
  }, [isEdit, commentText.length]);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const updatedComment: IComment = {
      comment: commentText,
    };

    handleUpdateComment(
      {
        id: comment._id!,
        commentData: updatedComment,
      },
      {
        onSuccess: () => {
          //   refetch();
          setIsEdit(false);
        },
      }
    );
  };

  const handleDelete = () => {
    handleDeleteComment(
      {
        id: comment._id!,
      },
      {
        onSuccess: () => {
          //   refetch();
        },
      }
    );
  };

  return (
    <div className='flex items-start gap-2 mb-4'>
      <Image
        src={comment?.userId?.image || avatar}
        width={35}
        height={35}
        alt='comment-author-image'
        className='rounded-full'
      />

      {isEdit ? (
        <form
          onSubmit={handleCommentSubmit}
          className='flex items-center gap-2 w-full relative'
        >
          <textarea
            ref={textareaRef}
            value={commentText}
            autoFocus={isEdit}
            rows={2}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder='Write a comment...'
            className='resize-none rounded-xl  pl-4 pr-10 py-2 w-full  outline-primary bg-stone-100 border border-stone-200'
          />
          <button className='absolute right-4 top-5'>
            {isPending ? (
              <RotatingLines
                visible
                height='20'
                width='20'
                strokeWidth='5'
                strokeColor='#6A5ACD'
                animationDuration='0.75'
                ariaLabel='rotating-lines-loading'
                className='text-white stroke-white'
              />
            ) : (
              <Send />
            )}
          </button>
        </form>
      ) : (
        <div className=' flex items-center gap-3'>
          <div className='bg-stone-100 border min-w-[200px] border-stone-200 w-max px-3 py-2 rounded-lg'>
            <div className='flex justify-between items-center'>
              <p className='font-semibold'>{comment?.userId?.name}</p>
              <p className='text-xs  font-semibold '>
                {comment?.createdAt ? timeCompact(comment.createdAt) : ''}
              </p>
            </div>

            <p className='text-[15px]'>{comment.comment}</p>
          </div>

          {comment.userId?._id === user?._id ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild className='cursor-pointer'>
                <button className='rounded-full p-3 hover:bg-stone-100'>
                  <MoreHorizontal className='h-4 w-4' />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className='bg-stone-100 w-[150px] space-y-1 border shadow-sm rounded-lg p-1'
                align='start'
              >
                <button
                  onClick={() => setIsEdit(true)}
                  className='block w-full text-left py-1 rounded-sm hover:bg-primary duration-200 pl-4 hover:text-white '
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className='block w-full text-left py-1 rounded-sm hover:bg-primary duration-200 pl-4 hover:text-white '
                >
                  Delete
                </button>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            ''
          )}
        </div>
      )}
    </div>
  );
}
