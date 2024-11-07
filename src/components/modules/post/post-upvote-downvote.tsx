import { useUser } from '@/context/user.provider';
import React from 'react';
import { DownArrow, UpArrow } from '@/components/ui/icon';
import { useDownvotePost, useUpvotePost } from '@/hooks/post.hook';

type Tprops = {
  downvotes: string[];
  upvotes: string[];
  _id: string;
  setIsOpenVote: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function PostUpvoteDownvote({
  upvotes,
  downvotes,
  _id,
  setIsOpenVote,
}: Tprops) {
  const { user, isLoading } = useUser();
  const [userVote, setUserVote] = React.useState<'upvote' | 'downvote' | null>(
    null
  );
  const [upvoteCount, setUpvoteCount] = React.useState(upvotes?.length);
  const [downvoteCount, setDownvoteCount] = React.useState(downvotes?.length);

  const { mutate: handleUpvotesPost } = useUpvotePost();
  const { mutate: handleDownvotesPost } = useDownvotePost();

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
    if (user) {
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
    } else {
      setIsOpenVote(true);
    }
  };
  return (
    <div
      className={`flex gap-2 ${
        userVote === 'upvote'
          ? 'bg-green-500'
          : userVote === 'downvote'
          ? 'bg-red-500'
          : ''
      } items-center border border-stone-400 rounded-full w-max px-5  h-10`}
    >
      <button onClick={() => handleVote('upvote')}>
        <UpArrow />
      </button>
      <span className='font-semibold text-black leading-none'>
        {upvoteCount - downvoteCount}
      </span>
      <button onClick={() => handleVote('downvote')}>
        <DownArrow />
      </button>
    </div>
  );
}
