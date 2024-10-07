'use client';

import { IComment, IPost } from '@/types';
import Image from 'next/image';
import React, { useState } from 'react';
import { Comment, DownArrow, Send, UpArrow } from '../ui/icon';
import { useUser } from '@/context/user.provider';
import { useDownvotePost, useUpvotePost } from '@/hooks/post.hook';
import { useCreateComment } from '@/hooks/comment.hook';
import avatar from '@/assets/images/avatar.png';
import { timeCompact } from '@/app/utils/timeCompact';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, MoreVertical } from 'lucide-react';
import { Button } from '../ui/button';
import { EditContentModal } from './edit-modal';

type TProps = { post: IPost };

export default function Post({ post }: TProps) {
  const {
    thumbnail,
    author,
    content,
    comments,
    category,
    downvotes,
    isPremium,
    createdAt,
    upvotes,
    _id,
  } = post;

  const { user, isLoading } = useUser();

  const [showComment, setShowComment] = useState(false);
  const [showFullContent, setShowFullContent] = React.useState(false);
  const [userVote, setUserVote] = React.useState<'upvote' | 'downvote' | null>(
    null
  );
  const [commentText, setCommentText] = useState('');
  const [upvoteCount, setUpvoteCount] = React.useState(upvotes.length);
  const [downvoteCount, setDownvoteCount] = React.useState(downvotes.length);

  const { mutate: handleUpvotesPost } = useUpvotePost();
  const { mutate: handleDownvotesPost } = useDownvotePost();
  const { mutate: handleComment } = useCreateComment();

  React.useEffect(() => {
    if (!isLoading && user) {
      if (upvotes.includes(user._id)) {
        setUserVote('upvote');
      } else if (downvotes.includes(user._id)) {
        setUserVote('downvote');
      } else {
        setUserVote(null);
      }
    }
  }, [upvotes, downvotes, user, isLoading]);

  const handleVote = (type: 'upvote' | 'downvote') => {
    if (type === 'upvote') {
      if (userVote === 'upvote') {
        setUpvoteCount(upvoteCount - 1);
        setUserVote(null);
      } else {
        setUpvoteCount(upvoteCount + 1);
        if (userVote === 'downvote') setDownvoteCount(downvoteCount - 1);
        setUserVote('upvote');
      }
      handleUpvotesPost(_id, {
        onError: () => {
          setUpvoteCount(
            userVote === 'upvote' ? upvoteCount + 1 : upvoteCount - 1
          );
          setUserVote(userVote === 'upvote' ? null : 'upvote');
        },
      });
    } else {
      if (userVote === 'downvote') {
        setDownvoteCount(downvoteCount - 1);
        setUserVote(null);
      } else {
        setDownvoteCount(downvoteCount + 1);
        if (userVote === 'upvote') setUpvoteCount(upvoteCount - 1);
        setUserVote('downvote');
      }
      handleDownvotesPost(_id, {
        onError: () => {
          setDownvoteCount(
            userVote === 'downvote' ? downvoteCount + 1 : downvoteCount - 1
          );
          setUserVote(userVote === 'downvote' ? null : 'downvote');
        },
      });
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment: IComment = {
      comment: commentText,
    };

    handleComment({
      postId: _id,
      commentData: newComment,
    });
  };
  const previewContent =
    content.length > 300 ? content.substring(0, 500) + '...' : content;
  return (
    <div className='mb-20 pr-10'>
      <div className='flex justify-between items-start'>
        <div className='flex items-start gap-2 mb-6'>
          <Image
            src={author?.image || avatar}
            width={40}
            height={40}
            alt='author-image'
            className='rounded-full'
          />
          <div>
            <p className='font-semibold text-lg leading-none'>{author.name}</p>
            <p className='text-xs font-medium text-stone-500 mt-1'>
              {timeCompact(createdAt)}
            </p>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className='bg--100 p-3 hover:bg-stone-100'>
              <MoreVertical className='h-4 w-4' />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='bg-white border shadow-sm rounded-lg p-1'
            align='end'
          >
            <EditContentModal
              category={category}
              isPremium={isPremium}
              content={content}
              thumbnail={thumbnail}
              postId={_id}
            />
            <DropdownMenuItem
              //   onClick={() => handleDelete(data.id)}
              className='px-4 py-1.5 rounded-md hover:bg-stone-100'
            >
              Delete post
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div
        className='custom-html'
        dangerouslySetInnerHTML={{
          __html: showFullContent ? content : previewContent,
        }}
      ></div>
      {content.length > 300 && (
        <button
          className='text-blue-500 mt-2'
          onClick={() => setShowFullContent(!showFullContent)}
        >
          {showFullContent ? 'Read Less' : 'Read More'}
        </button>
      )}

      <Image
        src={thumbnail}
        height={100}
        width={800}
        alt='post-thumbnail'
        className='my-3 max-h-[400px] rounded-lg'
      />

      <div className='flex gap-6 border-stone-300 items-center border-b pb-4'>
        <div
          className={`flex gap-2 ${
            userVote === 'upvote'
              ? 'bg-green-500'
              : userVote === 'downvote'
              ? 'bg-red-500'
              : ''
          } items-center border border-stone-400 rounded-full w-max px-5 py-1.5`}
        >
          <button onClick={() => handleVote('upvote')}>
            <UpArrow />
          </button>
          {upvoteCount - downvoteCount}
          <button onClick={() => handleVote('downvote')}>
            <DownArrow />
          </button>
        </div>

        <button
          onClick={() => setShowComment(!showComment)}
          className='flex items-center gap-2 border border-stone-400 rounded-full w-max px-5 py-1.5'
        >
          <span className='mt-1'>
            <Comment />
          </span>
          <span>{comments.length}</span>
        </button>
      </div>

      {showComment ? (
        <>
          <div className='flex w-full items-start my-4'>
            <Image
              src={user?.image || avatar}
              height={35}
              width={35}
              alt='user-profile'
              className='rounded-full mr-2 '
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
                <Send />
              </button>
            </form>
          </div>

          <div className='space-y-3'>
            {comments.map((comment) => (
              <div key={comment._id} className='flex items-start gap-2 mb-4 '>
                <Image
                  src={comment?.userId?.image || avatar}
                  width={35}
                  height={35}
                  alt='comment-author-image'
                  className='rounded-full'
                />
                <div className='bg-stone-100 border border-stone-200 w-max px-3 py-2 rounded-lg'>
                  <div className='flex justify-between items-center'>
                    <p className='font-semibold'>{comment?.userId?.name}</p>
                    <p className='text-xs  font-semibold '>
                      {comment?.createdAt ? timeCompact(comment.createdAt) : ''}
                    </p>
                  </div>

                  <p className='text-[15px]'>{comment.comment}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        ''
      )}
    </div>
  );
}
