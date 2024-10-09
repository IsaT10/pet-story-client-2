import { Button } from '@/components/ui/button';
import { Plus } from '@/components/ui/icon';
import Link from 'next/link';

export default function SubscriptionPage() {
  return (
    <div className='flex flex-col items-center justify-center min-h-[calc(100vh-72.8px)]'>
      {/* <h2 className='text-4xl font-bold mb-14 leading-none'>
        Choose your plan
      </h2> */}
      <div className='flex  gap-20 items-start justify-center'>
        <div className='bg-white shadow-[0_5px_15px_rgba(0,0,0,0.15)]  w-[400px] px-8 py-12 rounded-2xl'>
          <p className='text-textPrimary gap-2 flex items-center  font-medium '>
            <span className='p-2 blur-sm rounded-full bg-textPrimary'></span>{' '}
            Basic Plan
          </p>

          <p className='flex items-end gap-1 my-14 '>
            <span className='text-5xl font-semibold leading-none'>$0.00</span>
            <span className='text-stone-400 text-lg font-medium mb-1'>
              / month
            </span>
          </p>

          <div className='space-y-4 mb-14'>
            <p className='font-semibold flex items-center gap-2'>
              <Plus /> Access to basic posts
            </p>
            <p className='font-semibold flex items-center gap-2'>
              <Plus /> Community discussions
            </p>
            <p className='font-semibold flex items-center gap-2'>
              <Plus /> Limited content{' '}
            </p>
          </div>
          <p className='text-lg text-primary font-medium'>Free</p>
        </div>

        <div className='bg-white shadow-[0_5px_15px_rgba(0,0,0,0.15)]  w-[400px] px-8 py-12 rounded-2xl'>
          <p className='text-primary gap-2 flex items-center  font-medium '>
            <span className='p-2 blur-sm rounded-full bg-primary'></span>{' '}
            Premium Plan
          </p>

          <p className='flex items-end gap-1 my-14'>
            <span className='text-5xl font-semibold leading-none'>$20.00</span>
            <span className='text-stone-400 text-lg font-medium mb-1'>
              / month
            </span>
          </p>

          <div className='space-y-4 mb-14'>
            <p className='font-semibold flex items-center gap-2'>
              <Plus /> Access to all premium posts
            </p>
            <p className='font-semibold flex items-center gap-2'>
              <Plus /> Post your premium content
            </p>
            <p className='font-semibold flex items-center gap-2'>
              <Plus /> Exclusive community features
            </p>
          </div>
          <Link href='/payment'>
            <Button className='w-full'>Get Plan</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
