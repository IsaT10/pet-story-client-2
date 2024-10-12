import PDF from '@/components/modules/pdf';
import { getUserProfile } from '@/services/user';
import ProfileCard from '../profile/_components/profile-card';

const Home: React.FC = async () => {
  const { data: userProfile } = await getUserProfile();
  // const { user } = useUser();
  // const { data = {}, isLoading } = useGetSingleUser(user!._id);
  // console.log(data);

  return (
    <div className='flex  items-start'>
      <div className='w-[65%] py-10 pr-10'>
        <PDF />
      </div>

      <div className='w-[35%] pt-10 pl-10 min-h-screen border-l sticky top-0  right-0 border-stone-200'>
        <div className='sticky top-0'>
          <ProfileCard profile={userProfile} />
        </div>
      </div>
    </div>
  );
};

export default Home;
