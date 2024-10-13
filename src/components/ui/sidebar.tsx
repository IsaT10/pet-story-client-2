'use client';

import { MenuIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { Logo } from './icon';

const SIDEBAR_ITEMS = [
  { href: '/admin/user-manage', label: 'User Manage' },
  { href: '/admin/content-manage', label: 'Content Manage' },
  { href: '/admin/payment-history', label: 'Payment History' },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = React.useState(false);

  // Toggle the sidebar visibility
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const pathname = usePathname();
  return (
    <div className='relative'>
      {/* Hamburger Icon - Visible only on small screens */}
      <div className='lg:hidden fixed w-12 pt-2.5 pl-2.5 bg-primary h-screen z-30'>
        <MenuIcon
          onClick={toggleSidebar}
          className='text-3xl cursor-pointer text-green-50'
        />
      </div>

      {/* Sidebar - Hidden on small screens, visible on larger screens */}
      <div
        className={`fixed top-0 left-0 h-screen  lg:w-64  bg-stone-100 py-9 px-4  z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0  lg:w-64 flex flex-col gap-4`}
      >
        <div>
          <Link
            href='/'
            className='text-2xl md:text-3xl items-center font-semibold text-primary flex gap-1 mb-8'
          >
            <Logo />
            PetWise
          </Link>
          <ul className='flex flex-col gap-3 pt-3'>
            {SIDEBAR_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${
                  item.href === pathname ? 'bg-primary text-white' : ''
                } hover:bg-primary duration-200  py-2 hover:text-white rounded-md font-medium pl-4`}
              >
                {item.label}
              </Link>
            ))}
          </ul>
        </div>
      </div>

      {isOpen && (
        <div
          className='fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden'
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
    // <div className='relative'>
    //   <div className='lg:hidden fixed w-12 pt-2.5 pl-2.5 bg-primary h-screen z-30'>
    //     <MenuIcon
    //       onClick={toggleSidebar}
    //       className='text-3xl cursor-pointer text-green-50'
    //     />
    //   </div>

    // <div
    //   className={`fixed top-0 left-0 h-screen  lg:w-64  bg-stone-100 py-9 px-4  z-40 transform transition-transform duration-300 ease-in-out ${
    //     isOpen ? 'translate-x-0' : '-translate-x-full'
    //   } lg:translate-x-0  lg:w-64 flex flex-col gap-4`}
    // >
    //     <div className='flex flex-col justify-between items-center mb-4'>
    //       <h2 className='text-3xl font-semibold pb-4'>Dashboard</h2>
    // <ul className='flex flex-col gap-3 pt-3'>
    // {SIDEBAR_ITEMS.map((item) => (
    //   <Link
    //     key={item.href}
    //     href={item.href}
    //     className={`${
    //       item.href === pathname ? 'bg-primary text-white' : ''
    //     } hover:bg-primary duration-200  py-2 hover:text-white rounded-md font-medium pl-4`}
    //   >
    //     {item.label}
    //   </Link>
    // ))}
    // </ul>

    //       {isOpen && (
    //         <div
    //           className='fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden'
    //           onClick={toggleSidebar}
    //         ></div>
    //       )}
    //     </div>
    //   </div>
    // </div>
  );
}
