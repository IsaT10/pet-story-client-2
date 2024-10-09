import { IPost } from '@/types';
import Post from '@/components/modules/Post';
import { useUser } from '@/context/user.provider';
import { getPostByUser } from '@/services/post';

const MyPosts = async () => {
  const res = await getPostByUser();

  console.log(res.data.result);
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
