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
  const { data = [], isLoading, error } = useGetSingleUser(params.profileId);

  if (isLoading)
    return (
      <div className='flex md:flex-row flex-col-reverse items-start'>
        <div className='w-full md:w-[65%] pr-10  pt-10 '>
          <PostLoadingSkeletonLeft />
        </div>
        <ProfileLoading />
      </div>
    );

  if (error)
    return (
      <div className='h-[calc(100vh-150px)] flex justify-center items-center text-red-600 font-semibold text-2xl'>
        Unable to load data. Please check your internet connection and try
        again.
      </div>
    );

  return (
    <div className='flex flex-col-reverse md:flex-row flex-start'>
      <div className='md:w-[65%] pt-10  pb-10 md:pr-6 lg:pr-10'>
        <SingleUserPosts id={data?.data?._id} />
      </div>

      <div className='md:w-[35%] pt-10   md:pl-6 lg:pl-10 min-h-screen border-l md:sticky top-0  right-0 border-stone-200'>
        <div className='sticky top-0'>
          <SingleUserProfileCard profile={data?.data} />
        </div>
      </div>
    </div>
  );
}
