'use client';

import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Cross, Menu } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import avatar from '@/assets/images/avatar.png';
import { useUser } from '@/context/user.provider';
import { CreateContentModal } from '../modules/create-model';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from './button';
import { logout } from '@/services/auth';
import { protectedRoutes } from '@/constant';

const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/about-us', label: 'About us' },
  { href: '/contact-us', label: 'Projects' },
  { href: '/user-dashboard', label: 'User Dashboard' },
];

export default function Nav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, setIsLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  // Memoized logout handler
  const handleLogout = useCallback(() => {
    logout();
    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push('/');
    }
    setIsLoading(true);
  }, [pathname, router, setIsLoading]);

  // Toggle mobile menu
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // Close mobile menu
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className='transition-all  duration-300 fixed top-0 w-full py-4 z-50 bg-white border-b border-stone-200'>
      <div className='w-full relative px-4 md:px-8 lg:px-10 flex items-center justify-between'>
        <h1 className='text-3xl font-semibold'>Pet</h1>

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
              <CreateContentModal />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Image
                  src={user?.image || avatar}
                  width={40}
                  height={40}
                  alt='profile-image'
                  className='rounded-full cursor-pointer'
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className='bg-stone-100 w-[150px] space-y-1 border shadow-sm rounded-lg p-1'
                align='end'
              >
                <Link
                  href='/profile'
                  className='block w-full text-left py-1 rounded-sm hover:bg-primary pl-4 hover:text-white'
                >
                  Profile
                </Link>
                <Link
                  href='/admin/user-manage'
                  className='block w-full text-left py-1 rounded-sm hover:bg-primary pl-4 hover:text-white'
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className='w-full text-left pl-4 text-red-600 font-medium hover:bg-red-700 hover:text-white py-1 rounded-md'
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
        <div className='flex items-center justify-end p-4'>
          <button
            onClick={closeMobileMenu}
            className='text-[#6D6D75] hover:text-black'
          >
            <Cross size={24} />
          </button>
        </div>
        <ul className='flex flex-col items-center space-y-6 mt-8'>
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a href={item.href} onClick={closeMobileMenu}>
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <Link
              href='/login'
              className='px-6 py-3 rounded-lg text-white bg-primary font-medium text-[16px]'
              onClick={closeMobileMenu}
            >
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
