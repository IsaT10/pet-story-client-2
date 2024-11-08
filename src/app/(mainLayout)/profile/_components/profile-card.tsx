'use client';

import { IUser } from '@/types';
import Image from 'next/image';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import UserList from './user-list';
import EditProfile from './edit-profile';
import { PremiumUser } from '@/components/ui/icon';
import avatar from '@/assets/images/avatar.png';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import PasswordChange from '@/components/modules/password-change';
import FollowersModal from './followres-modal';
import FollowingModal from './following-modal';

type TProps = {
  profile: IUser;
};
export default function ProfileCard({ profile }: TProps) {
  const { image, followers, following, posts, name, _id, status } = profile;

  return (
    <div className='flex sm:flex-row flex-col gap-4 sm:gap-8 md:gap-16'>
      <div className='relative   w-max'>
        <Image
          src={image || avatar}
          alt='profile-image'
          width={100}
          height={100}
          className='rounded-full size-[70px] md:size-[100px] object-cover'
        />
        {status === 'premium' ? (
          <div className='absolute bottom-0 right-0'>
            <PremiumUser />
          </div>
        ) : (
          ''
        )}
      </div>

      <div>
        <div className='flex gap-20  lg:gap-[116px] items-center'>
          <p className=' font-medium text-xl md:text-2xl'>{name}</p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className='p-3 rounded-full hover:bg-stone-100'>
                <MoreHorizontal className='h-4 w-4' />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className='bg-white  w-[180px] border border-stone-400 shadow-sm rounded-lg p-1'
              align='center'
            >
              <EditProfile image={image} _id={_id} name={name} />
              <PasswordChange />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className='flex gap-5 mt-4'>
          <p>
            <span className='font-medium'>{posts?.length}</span> posts
          </p>

          <FollowersModal followers={followers} />

          <FollowingModal following={following} />
        </div>
      </div>

      {/* <Tabs defaultValue='follower' className='w-full mt-7'>
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
      </Tabs> */}
    </div>
  );
}
