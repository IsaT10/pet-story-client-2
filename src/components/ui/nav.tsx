'use client';

import { useUser } from '@/context/user.provider';
import Image from 'next/image';
import React from 'react';

export default function Nav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const { user } = useUser();

  return (
    <nav
      className={`transition-all duration-300  top-0 fixed w-full py-4 z-50 bg-white  border-b border-stone-200`}
    >
      <div className='w-full px-4  md:px-8 lg:px-10 flex items-center justify-between'>
        <h1 className='text-3xl font-semibold'>Pet</h1>
        {/* <img className='h-[30px] md:h-[36px]' src={logo} alt='logo' /> */}
        <div className='flex items-center gap-4 md:hidden'></div>

        <Image
          src={user?.image}
          width={40}
          height={40}
          alt='profile-image'
          className='rounded-full'
        />
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
            {/* <Cross size={24} /> */}
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
