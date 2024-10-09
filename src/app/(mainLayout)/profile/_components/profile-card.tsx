'use client';

import { IUser } from '@/types';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UserList from './user-list';
import EditProfile from './edit-profile';
import preimumIcon from '@/assets/images/premiumUser.png';
import { PremiumUser } from '@/components/ui/icon';

type TProps = {
  profile: IUser;
};
export default function ProfileCard({ profile }: TProps) {
  const { image, followers, following, posts, name, _id, status } = profile;

  return (
    <div className=''>
      <div className='relative w-max'>
        <Image
          src={image}
          alt='profile-image'
          width={88}
          height={88}
          className='rounded-full'
        />
        {status === 'premium' ? (
          <div className='absolute bottom-0 right-0'>
            <PremiumUser />
          </div>
        ) : (
          ''
        )}
      </div>

      <div className='flex gap-[116px] items-center'>
        <p className='mt-4 font-medium text-xl'>{name}</p>
        <EditProfile image={image} _id={_id} name={name} />
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

      <Tabs defaultValue='follower' className='max-w-[400px] mt-7'>
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
                <UserList key={user._id} user={user} />
              ))}
            </div>
          ) : (
            <p className='h-[300px] text-stone-500 text- px-5 font- text-center flex flex-col items-center justify-center'>
              You currently have no followers. Don't worry! Keep engaging and
              sharing your sotry.
            </p>
          )}
        </TabsContent>
        <TabsContent value='following'>
          {following && following?.length > 0 ? (
            <div className='flex flex-col  divide-y divide-stone-200'>
              {following?.map((user) => (
                <UserList key={user._id} user={user} isFollowing={true} />
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
