import { getUserProfile } from '@/services/user';
import ProfileCard from './_components/profile-card';

export default async function ProfilePage() {
  const { data: userProfile } = await getUserProfile();

  return (
    <div className='flex mt-10 items-start'>
      <div className=' w-[65%] h-[3000px]'>post side</div>

      <div className='w-[35%] pl-10 h-full border-l sticky top-0  right-0 border-stone-200'>
        <div className='sticky top-0'>
          <ProfileCard profile={userProfile} />
        </div>
      </div>
    </div>
  );
}
