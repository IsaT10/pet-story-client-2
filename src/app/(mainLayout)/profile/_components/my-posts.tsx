'use client';

import { IPost } from '@/types';
import Post from '@/components/modules/Post';
import { useUser } from '@/context/user.provider';
import { useGetPostByUser } from '@/hooks/post.hook';

const MyPosts = () => {
  const { user } = useUser();

  const { data, isLoading } = useGetPostByUser(user?._id!);
  if (isLoading) {
    return <div>Loading posts...</div>;
  }

  return (
    <>
      {data?.data?.result?.map((item: IPost) => (
        <Post key={item._id} post={item} />
      ))}
    </>
  );
};

export default MyPosts;
