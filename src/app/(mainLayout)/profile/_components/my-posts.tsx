import { IPost } from '@/types';
import Post from '@/components/modules/post/Post';
import { getPostByUser } from '@/services/post';
import { CreateContentModal } from '@/components/modules/post/create-post-modal';

const MyPosts = async () => {
  const res = await getPostByUser();

  if (res?.data?.result?.length === 0) {
    return (
      <div className='h-[50vh] flex flex-col items-center justify-center overflow-x-hidden'>
        <CreateContentModal />
        <p className='text-3xl font-semibold mt-5 mb-3'>Share posts</p>
        <p> When you share you thought, they will appear on your profile.</p>

        <p className='text-primary font-medium mt-3'>Share your first posts</p>
      </div>
    );
  }

  return (
    <>
      <h2 className='text-2xl max-w-[800px] mx-auto font-semibold mb-5 overflow-hidden'>
        Post
      </h2>
      {res?.data?.result?.map((item: IPost) => (
        <Post key={item._id} post={item} />
      ))}
    </>
  );
};

export default MyPosts;
