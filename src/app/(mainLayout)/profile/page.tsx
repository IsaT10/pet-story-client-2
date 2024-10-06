import { getUserProfile } from '@/services/user';
import ProfileCard from './_components/profile-card';

export default async function ProfilePage() {
  const { data: userProfile } = await getUserProfile();

  console.log(userProfile?.posts);

  return (
    <div className='flex  items-start'>
      <div className=' w-[65%] '>
        {userProfile?.posts.map((item) => (
          <div
            className='custom-html'
            dangerouslySetInnerHTML={{ __html: item.content }}
          ></div>
        ))}
      </div>

      <div className='w-[35%] pt-10 pl-10 h-full border-l sticky top-0  right-0 border-stone-200'>
        <div className='sticky top-0'>
          <ProfileCard profile={userProfile} />
        </div>
      </div>
    </div>
  );
}
