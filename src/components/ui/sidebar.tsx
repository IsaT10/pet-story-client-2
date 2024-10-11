'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const SIDEBAR_ITEMS = [
  { href: '/admin/user-manage', label: 'User Manage' },
  { href: '/admin/content-manage', label: 'Content Manage' },
  { href: '/admin/payment-history', label: 'Payment History' },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <div className='w-[250px] min-h-screen sticky left-0 top-0 bg-stone-100 px-8 pt-8'>
      <h2 className='text-3xl font-semibold pb-4'>Dashboard</h2>
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
  );
}
