import { IPost } from '@/types';
import { Button } from './button';
import { useUpdatePostStatus } from '@/hooks/post.hook';
import { Spinner } from './icon';

type TProps = { content: IPost };

export default function ContentList({ content }: TProps) {
  const { mutate: handlePostStatus, isPending } = useUpdatePostStatus(
    content._id,
    {
      isPublish: !content.isPublish,
    }
  );

  return (
    <div className='text-xs md:text-sm py-5 px-6 md:px-10 dark:text-stone-100 dark:bg-stone-700  flex gap-4 justify-between items-center'>
      <span className='flex-1 md:ml-6'>
        <div
          dangerouslySetInnerHTML={{
            __html: content?.content?.substring(0, 100) + '...',
          }}
        ></div>
      </span>
      <span className='flex-1 text-center'>{content.author.name}</span>
      <span className='flex-1 text-center'>{content.category}</span>
      <span
        className={`flex-1 font-bold text-xs md:text-sm text-center ${
          content?.isPremium ? 'text-primary' : 'text-green-500'
        }`}
      >
        {content?.isPremium ? 'Premium' : 'Basic'}
      </span>
      {/* <span className={`flex-1 font-bold text-xs md:text-sm text-center`}>
        {content?.upvotes?.length}
      </span>
      <span className={`flex-1 font-bold text-xs md:text-sm text-center`}>
        {content?.downvotes?.length}
      </span> */}

      <span className='flex-[.5] text-center'>
        <Button
          onClick={() => handlePostStatus()}
          className='h-9 w-28 whitespace-nowrap'
        >
          {isPending ? (
            <Spinner className='animate-spin h-4' />
          ) : (
            <> {content.isPublish ? 'Un Publish' : 'Publish'}</>
          )}
        </Button>
      </span>
    </div>
  );
}
