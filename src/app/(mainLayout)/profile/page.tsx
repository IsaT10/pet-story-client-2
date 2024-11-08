import ProfileCard from './_components/profile-card';
import MyPosts from './_components/my-posts';
import { getUserProfile } from '@/services/user';

export default async function ProfilePage() {
  const { data: userProfile } = await getUserProfile();

  return (
    <div className='flex  flex-col items-start w-full py-4 md:py-10  md:px-6 xl:px-10 2xl:px-20 '>
      <div className='w-full border-stone-200'>
        <div className='md:max-w-[800px] mx-auto'>
          <ProfileCard profile={userProfile} />
        </div>
      </div>

      <div className='w-full md:mt-16 mt-10 lg:mt-20'>
        <MyPosts />
      </div>
    </div>
  );
}
