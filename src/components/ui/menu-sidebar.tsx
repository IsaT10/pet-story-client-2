'use client';

import Link from 'next/link';
import {
  Home,
  HomeSolid,
  Logo,
  Logout,
  Notification,
  NotificationSolid,
  Search,
} from './icon';
import avatar from '@/assets/images/avatar.png';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Notifications from '../modules/notifications/notifications';
import {
  useGetNotificationByUser,
  useReadNotifications,
} from '@/hooks/notifications.hook';
import { INotification } from '@/types';
import { CreateContentModal } from '../modules/post/create-post-modal';
import { useUser } from '@/context/user.provider';
import { logout } from '@/services/auth';
import Image from 'next/image';
import { useGetSingleUser } from '@/hooks/user.hook';
import { useFocusContext } from '@/context/focus.provider';
import { LayoutDashboard } from 'lucide-react';

const NAV_LINK_ITEMS = [
  {
    href: '/',
    label: 'Home',
    icon: <Home />,
    activeIcon: <HomeSolid />,
    type: 'link',
  },
];

export default function MenuSidebar() {
  const pathname = usePathname();
  const [hasUnread, setHasUnread] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const { data: notification } = useGetNotificationByUser();
  const { user, setIsLoading } = useUser();
  const router = useRouter();
  const { data } = useGetSingleUser(user?._id || '');
  const { focusSearchInput } = useFocusContext();

  const unreadNotification = notification?.data?.filter(
    (el: INotification) => el.isRead === false
  );
  const { mutate: readNotifications } = useReadNotifications();

  useEffect(() => {
    if (notification?.data) {
      const unreadNotifications = notification.data.some(
        (el: INotification) => !el.isRead
      );
      setHasUnread(unreadNotifications);
    }
  }, [notification]);

  function handleNotificationClick() {
    setShowNotifications(!showNotifications);
    setActiveButton(activeButton === 'notifications' ? null : 'notifications');

    // Immediately hide the red dot
    setHasUnread(false);

    // Call API in the background
    readNotifications();
  }

  function handleSearchClick() {
    setShowNotifications(false);
    setActiveButton('search');
    focusSearchInput();
  }

  function isLinkActive(href: string) {
    return href === pathname && !activeButton;
  }

  function isButtonActive(id: string) {
    return activeButton === id;
  }

  const handleLogout = () => {
    logout();
    router.push('/login');
    setIsLoading(true);
  };

  return (
    <>
      <div className='hidden md:block md:min-w-[200px] lg:min-w-[230px] xl:min-w-[270px] border-r border-stone-300 h-screen sticky left-0 top-0 z-50'>
        <div className='pt-10 pr-6 relative'>
          <Link
            href='/'
            className='text-2xl ml-3 items-center font-semibold text-primary flex gap-1'
            onClick={() => {
              setActiveButton(null);
              setShowNotifications(false);
            }}
          >
            <Logo />
            PetWise
          </Link>
          <div className='mt-10'>
            {NAV_LINK_ITEMS.map((item) => (
              <div key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => {
                    setActiveButton(null);
                    setShowNotifications(false);
                  }}
                  className={`group flex items-center gap-3 my-2 duration-200 rounded-lg hover:bg-stone-100 py-3 px-3 ${
                    isLinkActive(item.href) ? 'text-primary font-semibold' : ''
                  }`}
                >
                  <span
                    className={`transition-transform duration-200 ${
                      isLinkActive(item.href)
                        ? 'scale-105'
                        : 'group-hover:scale-105'
                    }`}
                  >
                    {isLinkActive(item.href) ? item.activeIcon : item.icon}
                  </span>
                  <span>{item.label}</span>
                </Link>
              </div>
            ))}

            <button
              onClick={handleNotificationClick}
              className={`group w-full flex items-center gap-3 my-2 duration-200 rounded-lg hover:bg-stone-100 py-3 px-3 ${
                activeButton === 'notifications'
                  ? 'text-primary font-semibold'
                  : ''
              }`}
            >
              <span className='relative transition-transform duration-200 group-hover:scale-105'>
                {activeButton === 'notifications' ? (
                  <NotificationSolid />
                ) : (
                  <Notification />
                )}
                {hasUnread && (
                  <span className='bg-red-600 p-1 rounded-full absolute right-0 top-0'></span>
                )}
              </span>
              <span>Notifications</span>
            </button>

            <button
              onClick={handleSearchClick}
              className={`group w-full flex items-center gap-3 my-2 duration-200 rounded-lg hover:bg-stone-100 py-3 px-3 ${
                isButtonActive('search') ? 'text-primary font-semibold ' : ''
              }`}
            >
              <span className='transition-transform duration-200 group-hover:scale-105'>
                <Search />
              </span>
              <span>Search</span>
            </button>

            <CreateContentModal
              setShowNotifications={setShowNotifications}
              setActiveButton={setActiveButton}
              isNav={true}
            />

            <Notifications
              showNotifications={showNotifications}
              notification={notification}
              setShowNotifications={setShowNotifications}
              setActiveButton={setActiveButton}
            />
            <Link
              href='/profile'
              onClick={() => {
                setActiveButton(null);
                setShowNotifications(false);
              }}
              className={`group flex items-center gap-3 my-2 duration-200 rounded-lg hover:bg-stone-100 py-3 px-3 ${
                isLinkActive('/profile') ? 'text-primary font-semibold' : ''
              }`}
            >
              <Image
                src={data?.data?.image || avatar}
                width={20}
                height={20}
                alt='profile-image'
                className='rounded-full object-cover size-7 cursor-pointer'
              />
              <span>Profile</span>
            </Link>

            {user?.role === 'admin' ? (
              <Link
                href='/admin/user-manage'
                className={`group w-full flex items-center gap-3 my-2 duration-200 rounded-lg hover:bg-stone-100 py-3 px-3 `}
              >
                <span className='relative transition-transform duration-200 group-hover:scale-105'>
                  <LayoutDashboard />
                </span>
                <span>Dashboard</span>
              </Link>
            ) : (
              ''
            )}
            <button
              onClick={handleLogout}
              className={`group w-full flex items-center gap-3 my-2 duration-200 rounded-lg hover:bg-stone-100 py-3 px-3 `}
            >
              <span className='relative transition-transform duration-200 group-hover:scale-105'>
                <Logout />
              </span>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      <div className='md:hidden block bg-white border-t border-stone-300 py-2 min-w-full fixed bottom-0 left-0 right-0 z-50'>
        <div className='flex items-center justify-around w-full'>
          {NAV_LINK_ITEMS.map((item) => (
            <div key={item.label} className=''>
              <Link
                href={item.href}
                onClick={() => {
                  setActiveButton(null);
                  setShowNotifications(false);
                }}
                className={`group flex items-center gap-3 my-2 duration-200 rounded-lg hover:bg-stone-100 ${
                  isLinkActive(item.href) ? 'text-primary font-semibold' : ''
                }`}
              >
                <span
                  className={`transition-transform duration-200 ${
                    isLinkActive(item.href)
                      ? 'scale-105'
                      : 'group-hover:scale-105'
                  }`}
                >
                  {isLinkActive(item.href) ? item.activeIcon : item.icon}
                </span>
              </Link>
            </div>
          ))}

          <button
            onClick={handleSearchClick}
            className={`group  flex items-center gap-3 my-2 duration-200 rounded-lg hover:bg-stone-100  ${
              isButtonActive('search') ? 'text-primary font-semibold ' : ''
            }`}
          >
            <span className='transition-transform duration-200 group-hover:scale-105'>
              <Search />
            </span>
          </button>

          <CreateContentModal
            setShowNotifications={setShowNotifications}
            setActiveButton={setActiveButton}
          />

          <button
            onClick={handleNotificationClick}
            className={`group  flex items-center gap-3 my-2 duration-200 rounded-lg hover:bg-stone-100 ${
              isButtonActive('notifications')
                ? 'text-primary  font-semibold '
                : ''
            }`}
          >
            <span className='relative transition-transform duration-200 group-hover:scale-105'>
              {isButtonActive('notifications') ? (
                <NotificationSolid />
              ) : (
                <Notification />
              )}
              {unreadNotification?.length > 0 ? (
                <span className='bg-red-600 p-1 rounded-full absolute right-0 top-0'></span>
              ) : (
                ''
              )}
            </span>
          </button>

          <Notifications
            showNotifications={showNotifications}
            notification={notification}
            setShowNotifications={setShowNotifications}
            setActiveButton={setActiveButton}
          />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Image
                src={data?.data?.image || avatar}
                width={20}
                height={20}
                alt='profile-image'
                className='rounded-full object-cover size-8 cursor-pointer'
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className='bg-stone-50 flex shadow-md flex-col divide-y divide-stone-300 w-[200px] md:w-[250px] h-max border-stone-300 border rounded-lg '
              align='end'
            >
              <Link
                href='/profile'
                onClick={() => {
                  setShowNotifications(false);
                  setActiveButton(null);
                }}
                className='block w-full font-medium text-left py-3  hover:bg-primary pl-4 hover:text-white'
              >
                Profile
              </Link>
              {user?.role === 'admin' ? (
                <Link
                  href={'/admin/user-manage'}
                  className='block w-full text-left py-3 font-medium hover:bg-primary pl-4 hover:text-white'
                >
                  Dashboard
                </Link>
              ) : (
                ''
              )}

              <button
                onClick={handleLogout}
                className='w-full text-left pl-4  text-red-600 font-medium hover:bg-red-700 hover:text-white py-3 '
              >
                Logout
              </button>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  );
}
