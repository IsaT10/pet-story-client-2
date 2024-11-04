import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '../ui/button';
import { IPost } from '@/types';
import { useDeletePost } from '@/hooks/post.hook';
import { EditContentModal } from './edit-modal';
import { EditSharedPostModal } from './edit-shared-post-modal';

type Tprops = { post: IPost };

export default function PostThreedotButton({ post }: Tprops) {
  const { mutate: deletePost } = useDeletePost(post?._id);
  const handleDelete = () => {
    deletePost(undefined, {
      onSuccess: () => {
        // refetch();
      },
    });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='bg--100 p-3 rounded-full hover:bg-stone-100'>
          <MoreHorizontal className='h-4 w-4' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='bg-white w-[100px] border shadow-sm rounded-lg p-1'
        align='center'
      >
        {post?.sharedPostId ? (
          <EditSharedPostModal post={post} />
        ) : (
          <EditContentModal post={post} />
        )}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button className='px-4 py-1.5 text-sm rounded-md w-full text-left hover:bg-stone-100 hover:outine-none'>
              Delete post
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent className='px-6 pt-6 h-[240px]'>
            <AlertDialogHeader className=''>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>
                <Button variant='outline' className='py-[7px]'>
                  Cancel
                </Button>
              </AlertDialogCancel>
              <AlertDialogAction>
                <Button
                  onClick={handleDelete}
                  variant='default'
                  className='py-2'
                >
                  Continue
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
