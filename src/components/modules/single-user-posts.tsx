import { useGetPostBySingleUser } from '@/hooks/post.hook';
import Post from './Post';
import { IPost } from '@/types';
import { PostLoadingSkeletonLeft } from '../ui/post-loading-skeleton';

type TProps = { id: string };

export default function SingleUserPosts({ id }: TProps) {
  const { data, isLoading } = useGetPostBySingleUser(id);
  console.log(data?.data?.result);

  return (
    <div>
      {isLoading ? (
        <div className='w-full'>
          <PostLoadingSkeletonLeft />
        </div>
      ) : (
        <>
          {data?.data?.result?.map((item: IPost) => (
            <Post key={item._id} post={item} />
          ))}
        </>
      )}
    </div>
  );
}
