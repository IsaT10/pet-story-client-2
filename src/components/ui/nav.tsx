'use client';

import { useUser } from '@/context/user.provider';
import Image from 'next/image';
import React from 'react';
import avatar from '@/assets/images/avatar.png';
import { Cross, Menu } from 'lucide-react';
import { CreateContentModal } from '../modules/create-model';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from './button';
import { logout } from '@/services/auth';
import { usePathname, useRouter } from 'next/navigation';
import { protectedRoutes } from '@/constant';

export default function Nav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const { user, setIsLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    logout();
    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push('/');
    }
    setIsLoading(true);
  };

  return (
    <nav
      className={`transition-all duration-300  top-0 fixed w-full py-4 z-50 bg-white  border-b border-stone-200`}
    >
      <div className='w-full px-4  md:px-8 lg:px-10 flex items-center justify-between'>
        <h1 className='text-3xl font-semibold'>Pet</h1>
        {/* <img className='h-[30px] md:h-[36px]' src={logo} alt='logo' /> */}
        <div className='flex items-center gap-4 md:hidden'>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className='text-[#6D6D75] hover:text-black '
          >
            <Menu />
          </button>
        </div>
        <ul className='hidden md:flex gap-8'>
          <li>
            <Link href='/'>Home</Link>
          </li>
          <li>
            <Link href='/about-us'>About us</Link>
          </li>
          <li>
            <Link href='/contact-us'>Projects</Link>
          </li>
          <li>
            <Link href='/profile'>Profile</Link>
          </li>
        </ul>

        {user ? (
          <div className='flex items-center gap-6'>
            <CreateContentModal />

            <DropdownMenu>
              <DropdownMenuTrigger asChild className='cursor-pointer'>
                <Image
                  src={user?.image || avatar}
                  width={40}
                  height={40}
                  alt='profile-image'
                  className='rounded-full'
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className='bg-stone-100 w-[150px] space-y-1 border shadow-sm rounded-lg p-1'
                align='end'
              >
                <Link
                  href='/profile'
                  className='block w-full text-left py-1 rounded-sm hover:bg-primary duration-200 pl-4 hover:text-white '
                >
                  Profile
                </Link>
                <button className='block w-full text-left py-1 rounded-sm hover:bg-primary duration-200 pl-4 hover:text-white '>
                  Dashboard
                </button>
                <button
                  onClick={() => handleLogout()}
                  className='w-full text-left pl-4 text-red-600 font-medium hover:bg-red-700 hover:text-white py-1 rounded-md duration-200'
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
        className={`fixed top-0 right-0 w-full  h-full bg-white shadow-lg transition-transform duration-300 transform ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className='flex items-center  justify-end p-4'>
          {/* <img className='h-[43px]' src={logo} alt='logo' /> */}
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className='text-[#6D6D75] hover:text-black '
          >
            <Cross size={24} />
          </button>
        </div>
        <ul className='flex flex-col items-center space-y-6 mt-8'>
          <li>
            <a href='#hero' onClick={() => setIsMobileMenuOpen(false)}>
              Home
            </a>
          </li>
          <li>
            <a href='#about-us' onClick={() => setIsMobileMenuOpen(false)}>
              About us
            </a>
          </li>
          <li>
            <a href='#featured' onClick={() => setIsMobileMenuOpen(false)}>
              Projects
            </a>
          </li>
          <li>
            <a href='#services' onClick={() => setIsMobileMenuOpen(false)}>
              Services
            </a>
          </li>
          <li>
            <a
              href='#contact'
              className='px-6 py-3 rounded-full text-white bg-black font-medium text-[16px]'
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact Us
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
