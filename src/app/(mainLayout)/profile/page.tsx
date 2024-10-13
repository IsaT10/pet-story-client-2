import ProfileCard from './_components/profile-card';
import MyPosts from './_components/my-posts';
import { getUserProfile } from '@/services/user';

export default async function ProfilePage() {
  const { data: userProfile } = await getUserProfile();

  return (
    <div className='flex md:flex-row flex-col-reverse items-start w-full'>
      <div className='md:w-[65%] w-full pt-10  pb-10 md:pr-6 lg:pr-10'>
        <MyPosts />
      </div>

      <div className='md:w-[35%] w-full pt-10   md:pl-6 lg:pl-10 min-h-screen md:border-l md:sticky top-0  right-0 border-stone-200'>
        <div className='sticky top-0'>
          <ProfileCard profile={userProfile} />
        </div>
      </div>
    </div>
  );
}
