import { useGetPostBySingleUser } from '@/hooks/post.hook';
import Post from './Post';
import { IPost } from '@/types';
import { PostLoadingSkeletonLeft } from '../ui/post-loading-skeleton';

type TProps = { id: string };

export default function SingleUserPosts({ id }: TProps) {
  const { data, isLoading, error } = useGetPostBySingleUser(id);

  if (error)
    return (
      <div className='h-[calc(100vh-150px)] flex justify-center items-center text-red-600 font-semibold text-2xl'>
        Unable to load data. Please check your internet connection and try
        again.
      </div>
    );

  return (
    <div>
      {isLoading ? (
        <div className='w-full'>
          <PostLoadingSkeletonLeft />
        </div>
      ) : (
        <>
          {data?.data?.result?.length ? (
            <>
              <h2 className='mb-12 text-2xl font-semibold'>All Posts</h2>
              {data?.data?.result?.map((item: IPost) => (
                <Post key={item._id} post={item} />
              ))}
            </>
          ) : (
            <p className='text-xl md:text-2xl font-medium text-center mt-40 flex flex-col items-center justify-center text-primary '>
              No posts from this user at the moment. Check back soon to see what
              they share.
            </p>
          )}
        </>
      )}
    </div>
  );
}
