'use client';

import SingleUserProfileCard from '@/components/modules/single-user-card-profile';
import SingleUserPosts from '@/components/modules/single-user-posts';
import {
  PostLoadingSkeletonLeft,
  ProfileLoading,
} from '@/components/ui/post-loading-skeleton';
import { useGetSingleUser } from '@/hooks/user.hook';

type UserProfileProps = {
  params: {
    profileId: string;
  };
};

export default function UserProfile({ params }: UserProfileProps) {
  const { data = [], isLoading } = useGetSingleUser(params.profileId);

  if (isLoading)
    return (
      <div className='flex items-start'>
        <div className=' w-[65%] pr-10  pt-10 '>
          <PostLoadingSkeletonLeft />
        </div>
        <ProfileLoading />
      </div>
    );
  return (
    <div className='flex flex-start'>
      <div className='w-[65%] py-10 pr-10'>
        <SingleUserPosts id={data?.data?._id} />
      </div>

      <div className='w-[35%] pt-10 pl-10 min-h-screen border-l sticky top-0  right-0 border-stone-200'>
        <div className='sticky top-0'>
          <SingleUserProfileCard profile={data?.data} />
        </div>
      </div>
    </div>
  );
}
