'use client';

import { IPost } from '@/types';
import Post from '@/components/modules/Post';
import { useUser } from '@/context/user.provider';
import { useGetAllPosts } from '@/hooks/post.hook';

const MyPosts = () => {
  const { user } = useUser();

  const { data, isLoading, refetch } = useGetAllPosts([
    { name: 'author', value: user ? user._id : '' },
  ]);
  if (isLoading) {
    return <div>Loading posts...</div>;
  }

  return (
    <>
      {data?.data?.result?.map((item: IPost) => (
        <Post key={item._id} post={item} refetch={refetch} />
      ))}
    </>
  );
};

export default MyPosts;
