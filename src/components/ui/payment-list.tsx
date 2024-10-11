import { IPayment, IPost } from '@/types';
import { Button } from './button';
import { updatePostStatus } from '@/services/post';
import { useUpdatePostStatus } from '@/hooks/post.hook';
import { Spinner } from './icon';
import { formatDateToMMDDYYYY } from '@/app/utils/formatDate';
import { useUpdateUserStatus } from '@/hooks/user.hook';

type TProps = { payment: IPayment };

export default function PaymentList({ payment }: TProps) {
  const { mutate: handleUserStaus, isPending } = useUpdateUserStatus(
    payment?.user?._id,
    {
      status: 'basic',
    }
  );

  return (
    <div className='text-xs md:text-sm py-5 px-6 md:px-10 dark:text-stone-100 dark:bg-stone-700  flex gap-4 justify-between items-center'>
      <span className='flex-1 md:ml-6'>{payment?.user?.name}</span>
      <span className='flex-1 text-center'>{payment?.user?.email}</span>
      <span className='flex-1 text-center'>
        {formatDateToMMDDYYYY(payment?.expiredDate)}
      </span>

      <span
        className={`flex-1 font-bold text-xs md:text-sm text-center uppercase ${
          payment?.user?.status === 'premium'
            ? 'text-primary'
            : 'text-green-500'
        }`}
      >
        {payment?.user?.status}
      </span>
      {/* <span className={`flex-1 font-bold text-xs md:text-sm text-center`}>
        {content?.upvotes?.length}
      </span>
      <span className={`flex-1 font-bold text-xs md:text-sm text-center`}>
        {content?.downvotes?.length}
      </span> */}

      <span className='flex-1 text-center'>
        {payment?.user?.status === 'premium' ? (
          <Button
            onClick={() => handleUserStaus()}
            className='h-9 w-40 whitespace-nowrap'
          >
            {isPending ? (
              <Spinner className='animate-spin h-4' />
            ) : (
              <>Change Status</>
            )}
          </Button>
        ) : (
          ''
        )}
      </span>
    </div>
  );
}
