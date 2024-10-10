import { IPost } from '@/types';
import Post from '@/components/modules/Post';
import { getPostByUser } from '@/services/post';

const MyPosts = async () => {
  const res = await getPostByUser();

  // if (isLoading) {
  //   return <div>Loading posts...</div>;
  // }

  return (
    <>
      {res?.data?.result?.map((item: IPost) => (
        <Post key={item._id} post={item} />
      ))}
    </>
  );
};

export default MyPosts;
