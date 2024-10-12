import PDF from '@/components/modules/pdf';
import { getUserProfile } from '@/services/user';
import ProfileCard from '../profile/_components/profile-card';

const Home: React.FC = async () => {
  const { data: userProfile } = await getUserProfile();
  // const { user } = useUser();
  // const { data = {}, isLoading } = useGetSingleUser(user!._id);
  // console.log(data);

  return (
    <div className='flex md:flex-row flex-col-reverse items-start'>
      <div className='md:w-[65%] w-full pt-20 pb-10 md:pr-10'>
        <PDF />
      </div>

      <div className='md:w-[35%] pt-20 md:pl-6 lg:pl-10 min-h-screen md:border-l md:sticky top-0  right-0 border-stone-200'>
        <ProfileCard profile={userProfile} />
      </div>
    </div>
  );
};

export default Home;
