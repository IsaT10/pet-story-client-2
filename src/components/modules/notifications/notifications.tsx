import Image from 'next/image';
import avatar from '@/assets/images/avatar.png';
import { Cross } from '@/components/ui/icon';
import { timeCompact } from '@/app/utils/timeCompact';
import { INotification } from '@/types';

type TProps = {
  showNotifications: boolean;
  notification: { data: INotification[] };
  setShowNotifications: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveButton: React.Dispatch<React.SetStateAction<string | null>>;
};

export default function Notifications({
  showNotifications,
  notification,
  setShowNotifications,
  setActiveButton,
}: TProps) {
  const today = new Date();

  const getNotificationCategory = (createdAt: string) => {
    const notificationDate = new Date(createdAt);
    return notificationDate.toDateString() === today.toDateString()
      ? 'Today'
      : 'Earlier';
  };

  const categorizedNotifications = {
    Today: [] as INotification[],
    Earlier: [] as INotification[],
  };

  notification?.data?.forEach((item) => {
    const category = getNotificationCategory(item?.createdAt);
    categorizedNotifications[category].push(item);
  });

  const handleClose = () => {
    setShowNotifications(false);
    setActiveButton(null);
  };

  const renderNotificationMessage = (item: INotification) => {
    switch (item?.type) {
      case 'follow':
        return <p>{item?.fromUser?.name} started following you!</p>;
      case 'upvote':
        return <p>{item?.fromUser?.name} upvoted your post!</p>;
      case 'downvote':
        return <p>{item?.fromUser?.name} downvoted your post!</p>;
      case 'share':
        return <p>{item?.fromUser?.name} shared your post!</p>;
      case 'comment':
        return <p>{item?.fromUser?.name} commented on your post!</p>;
      default:
        return <p>New notification from {item?.fromUser?.name}</p>;
    }
  };

  return (
    <>
      {showNotifications && (
        <div className='w-[350px] border border-stone-300 pl-8 pr-4 py-8 md:bottom-0 bottom-[60px] bg-white fixed top-0 right-0 md:left-[200px] lg:left-[230px] xl:left-[250px] overflow-y-auto'>
          <div className='flex items-center justify-between'>
            <h2 className='text-2xl font-bold'>Notifications</h2>
            <button onClick={handleClose}>
              <Cross />
            </button>
          </div>
          {notification?.data?.length === 0 ? (
            <p className='flex h-[70vh] items-center justify-center font-medium mx-auto text-stone-500 w-[80%] text-center'>
              You have no notifications at the moment.
            </p>
          ) : (
            <>
              {categorizedNotifications.Today.length > 0 && (
                <div className='mt-6 pb-5 '>
                  <h3 className='text-xl font-semibold'>Today</h3>
                  {categorizedNotifications.Today.map((item) => (
                    <div
                      key={item?.createdAt}
                      className='flex items-center gap-4 py-3'
                    >
                      <Image
                        src={item?.fromUser?.image || avatar}
                        width={20}
                        height={20}
                        alt='profile-image'
                        className='rounded-full object-cover size-10 cursor-pointer'
                      />
                      <div>
                        {renderNotificationMessage(item)}
                        <span className='text-sm font-semibold text-stone-400'>
                          {timeCompact(item?.createdAt)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {categorizedNotifications.Earlier.length > 0 && (
                <div className='pt-5'>
                  <h3 className='text-xl font-semibold'>Earlier</h3>
                  {categorizedNotifications.Earlier.map((item) => (
                    <div
                      key={item?.createdAt}
                      className='flex items-center gap-4 py-3'
                    >
                      <Image
                        src={item?.fromUser?.image || avatar}
                        width={20}
                        height={20}
                        alt='profile-image'
                        className='rounded-full object-cover size-10 cursor-pointer'
                      />
                      <div>
                        {renderNotificationMessage(item)}
                        <span className='text-sm font-semibold text-stone-400'>
                          {timeCompact(item?.createdAt)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
}
