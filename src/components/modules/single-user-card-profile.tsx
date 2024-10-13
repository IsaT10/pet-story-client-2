'use client';

import { IUser } from '@/types';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PremiumUser, Spinner } from '@/components/ui/icon';
import avatar from '@/assets/images/avatar.png';
import SingleUserList from './single-user-list';
import { useUser } from '@/context/user.provider';
import {
  useFollowUser,
  useGetSingleUser,
  useUnfollowUser,
} from '@/hooks/user.hook';
import { Button } from '../ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

type TProps = {
  profile: IUser;
};
export default function SingleUserProfileCard({ profile }: TProps) {
  const { image, followers, following, posts, name, _id, status } = profile;
  const { user } = useUser();
  const { data } = useGetSingleUser(user?._id || '');

  const { mutate: handleUnfollow, isPending: unfollowerLoading } =
    useUnfollowUser();
  const { mutate: handleFollow, isPending: followerLoading } = useFollowUser();

  const followedByMe = data?.data?.following?.some(
    (el: IUser) => el._id === _id
  );
  const handleUnfollowUser = () => {
    handleUnfollow(_id);
  };
  const handleFollowUser = () => {
    handleFollow(_id);
  };
  return (
    <div className=''>
      <div className='relative w-max'>
        <Image
          src={image || avatar}
          alt='profile-image'
          width={88}
          height={88}
          className='rounded-full object-cover h-[88px]'
        />
        {status === 'premium' ? (
          <div className='absolute bottom-0 right-0'>
            <PremiumUser />
          </div>
        ) : (
          ''
        )}
      </div>

      <div className='flex gap-20 items-center mt-4'>
        <p className=' font-medium text-xl'>{name}</p>
        {followedByMe ? (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className='h-8 w-24 border-2 text-sm'>
                {followerLoading || unfollowerLoading ? (
                  <Spinner className='animate-spin h-4' />
                ) : (
                  'Following'
                )}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className='flex flex-col  '>
              <Image
                src={image}
                alt='follower-image'
                width={80}
                height={80}
                className='rounded-full mx-auto'
              />
              <AlertDialogTitle className='text-center mt-6 font-normal'>
                Unfollow {name}
              </AlertDialogTitle>

              <AlertDialogAction
                className='py-3 border-t text-sm border-stone-300 mt-8 font-medium text-red-600'
                onClick={handleUnfollowUser}
              >
                Unfollow
              </AlertDialogAction>
              <AlertDialogCancel className='py-3 text-sm border-t border-stone-300'>
                Cancel
              </AlertDialogCancel>
            </AlertDialogContent>
          </AlertDialog>
        ) : (
          <Button
            onClick={handleFollowUser}
            className='h-8 w-24 border-2 text-sm'
          >
            {followerLoading || unfollowerLoading ? (
              <Spinner className='animate-spin h-4' />
            ) : (
              'Follow'
            )}
          </Button>
        )}
      </div>

      <div className='flex gap-5 mt-4'>
        <p>
          <span className='font-medium'>{posts?.length}</span> posts
        </p>
        <p>
          <span className='font-medium'>{followers?.length}</span> followers
        </p>
        <p>
          <span className='font-medium'>{following?.length}</span> following
        </p>
      </div>

      <Tabs defaultValue='follower' className='w-full mt-7'>
        <TabsList className='grid w-full grid-cols-2 border border-primary px-1 py-0 '>
          <TabsTrigger
            value='follower'
            className='data-[state=active]:bg-primary data-[state=active]:text-white'
          >
            Follower
          </TabsTrigger>
          <TabsTrigger
            value='following'
            className='data-[state=active]:bg-primary  data-[state=active]:text-white'
          >
            Following
          </TabsTrigger>
        </TabsList>
        <TabsContent value='follower'>
          {followers && followers?.length > 0 ? (
            <div className='flex flex-col  divide-y divide-stone-200'>
              {followers?.map((user) => (
                <SingleUserList key={user._id} user={user} />
              ))}
            </div>
          ) : (
            <p className='h-[300px] text-stone-500 text- px-5 font- text-center flex flex-col items-center justify-center'>
              No followers so far. Start following and show some love!
            </p>
          )}
        </TabsContent>
        <TabsContent value='following'>
          {following && following?.length > 0 ? (
            <div className='flex flex-col  divide-y divide-stone-200'>
              {following?.map((user) => (
                <SingleUserList key={user._id} user={user} isFollowing={true} />
              ))}
            </div>
          ) : (
            <p className='h-[300px] text-stone-500 text- px-5 font- text-center flex flex-col items-center justify-center'>
              It looks like you’re not following anyone right now.
            </p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
