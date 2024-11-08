'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import avatar from '@/assets/images/avatar.png';
import { useUser } from '@/context/user.provider';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from './button';
import { logout } from '@/services/auth';
import { useGetSingleUser } from '@/hooks/user.hook';
import { Cross, Logo, Notification } from './icon';
import { useGetNotificationByUser } from '@/hooks/notifications.hook';
import { INotification } from '@/types';

const NAV_ITEMS = [{ href: '/', label: 'Home' }];

export default function Nav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, setIsLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const { data: notification } = useGetNotificationByUser();

  const { data } = useGetSingleUser(user?._id || '');
  const unreadNotification = notification?.data?.filter(
    (el: INotification) => el.isRead === false
  );
  console.log(unreadNotification?.length);

  // Memoized logout handler
  const handleLogout = () => {
    logout();
    router.push('/');
    setIsLoading(true);
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className='transition-all shadow-md duration-300 fixed top-0 w-full py-4 z-50 bg-white border-b border-stone-200'>
      <div className='max-w-7xl md:mx-7 mx-5 xl:mx-auto relative  flex items-center justify-between'>
        <Link
          href='/'
          className='text-2xl md:text-3xl items-center font-semibold text-primary flex gap-1'
        >
          <Logo />
          PetWise
        </Link>

        {/* Mobile Menu Toggle */}

        {/* Desktop Menu */}
        <ul className='hidden md:flex gap-6 lg:gap-8 absolute left-1/2 -translate-x-1/2'>
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`${
                  item.href === pathname
                    ? 'text-primary font-medium'
                    : 'hover:font-medium hover:text-primary'
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* User Actions */}
        {user ? (
          <div className='flex items-center gap-6'>
            <button
              onClick={toggleMobileMenu}
              className='md:hidden text-[#6D6D75] hover:text-black'
            >
              <Menu />
            </button>

            <div className='hidden md:block'>
              {/* <CreateContentModal /> */}
            </div>

            <button>
              <Notification />
            </button>

            <p>{unreadNotification?.length}</p>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Image
                  src={data?.data?.image || avatar}
                  width={40}
                  height={40}
                  alt='profile-image'
                  className='rounded-full h-10 object-cover cursor-pointer'
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
        ) : (
          <Link href='/login'>
            <Button className='py-2 px-6'>Login</Button>
          </Link>
        )}
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 w-full h-full bg-white shadow-lg transition-transform duration-300 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className='flex items-center justify-end px-8 pt-6'>
          <button
            onClick={closeMobileMenu}
            className='text-[#6D6D75] hover:text-black'
          >
            <Cross />
          </button>
        </div>
        <ul className='flex flex-col divide-y divide-stone-400 mt-8 border-b border-b-stone-400'>
          {NAV_ITEMS.map((item) => (
            <li key={item.href} className='text-center py-3'>
              <Link href={item.href} onClick={closeMobileMenu}>
                {item.label}
              </Link>
            </li>
          ))}
          {!user ? (
            <li>
              <Link
                href='/login'
                className='px-6 py-3 rounded-lg text-white bg-primary font-medium text-[16px]'
                onClick={closeMobileMenu}
              >
                Login
              </Link>
            </li>
          ) : (
            ''
          )}
        </ul>
      </div>
    </nav>
  );
}
