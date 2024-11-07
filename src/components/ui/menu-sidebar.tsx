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
import { useState } from 'react';
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
import WarningMessage from './warning-message';

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
  const [isOpen, setIsOpen] = useState(false);
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
  console.log(unreadNotification?.length);

  function handleNotificationClick() {
    setActiveButton(
      activeButton === 'notifications' ? 'notifications' : 'notifications'
    );

    setShowNotifications(!showNotifications);

    readNotifications();
  }

  function handleSearchClick() {
    setActiveButton(activeButton === 'search' ? 'search' : 'search');
    focusSearchInput();
  }
  function handleCreatePostClick() {
    setActiveButton(activeButton === 'create' ? 'create' : 'create');
  }

  function isLinkActive(href: string) {
    return href === pathname && !activeButton;
  }

  function isButtonActive(id: string) {
    return activeButton === id;
  }

  const handleLogout = () => {
    logout();
    router.push('/');
    setIsLoading(true);
  };

  return (
    <>
      <div className='hidden md:block md:min-w-[200px] lg:min-w-[230px] xl:min-w-[270px] border-r border-stone-300 h-screen sticky left-0 top-0 z-50'>
        <div className='pt-10 pr-6 relative'>
          <Link
            href='/'
            className='text-2xl ml-3 items-center font-semibold text-primary flex gap-1'
            onClick={() => setActiveButton(null)} // Clear active button on link click
          >
            <Logo />
            PetWise
          </Link>
          <div className='mt-10'>
            {NAV_LINK_ITEMS.map((item) => (
              <div key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => setActiveButton(null)}
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
                isButtonActive('notifications')
                  ? 'text-primary font-semibold '
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
              handleCreatePostClick={handleCreatePostClick}
              isButtonActive={isButtonActive}
            />

            <Notifications showNotifications={showNotifications} />
            <Link
              href='/profile'
              onClick={() => setActiveButton(null)}
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

            <button
              onClick={handleLogout}
              className={`group w-full flex items-center gap-3 my-2 duration-200 rounded-lg hover:bg-stone-100 py-3 px-3 ${
                isButtonActive('notifications')
                  ? 'text-primary font-semibold '
                  : ''
              }`}
            >
              <span className='relative transition-transform duration-200 group-hover:scale-105'>
                <Logout />
              </span>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      <WarningMessage
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        message='You need to be logged in and premium to see any premium post. Please login or signup '
      />

      <div className='md:hidden block bg-white border-t border-stone-300 h-20 min-w-full top-[90%] fixed -bottom-10 left-0 right-0 z-50'>
        <div className='flex items-center justify-around w-full'>
          {NAV_LINK_ITEMS.map((item) => (
            <div key={item.label} className=''>
              <Link
                href={item.href}
                onClick={() => setActiveButton(null)}
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

          <CreateContentModal
            handleCreatePostClick={handleCreatePostClick}
            isButtonActive={isButtonActive}
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
                className='block w-full font-medium text-left py-3  hover:bg-primary pl-4 hover:text-white'
              >
                Profile
              </Link>
              <Link
                href={
                  user?.role === 'admin'
                    ? '/admin/user-manage'
                    : 'user-dashboard'
                }
                className='block w-full text-left py-3 font-medium hover:bg-primary pl-4 hover:text-white'
              >
                Dashboard
              </Link>
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
