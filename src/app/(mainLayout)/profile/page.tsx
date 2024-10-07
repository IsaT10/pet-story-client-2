import { getUserProfile } from '@/services/user';
import ProfileCard from './_components/profile-card';
import { IPost } from '@/types';
import Post from '@/components/modules/Post';
import MyPosts from './_components/my-posts';

export default async function ProfilePage() {
  const { data: userProfile } = await getUserProfile();

  return (
    <div className='flex  items-start'>
      {/* <div className=' w-[65%] py-10 '>
        {userProfile?.posts.map((item: IPost) => (
          <Post post={item} />
        ))}
      </div> */}

      <div className='w-[65%] py-10'>
        <MyPosts />
      </div>

      <div className='w-[35%] pt-10 pl-10 min-h-screen border-l sticky top-0  right-0 border-stone-200'>
        <div className='sticky top-0'>
          <ProfileCard profile={userProfile} />
        </div>
      </div>
    </div>
  );
}
