import { createComment } from '@/services/comment';
import { IComment } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useCreateComment = () => {
  return useMutation({
    mutationKey: ['CREATE_COMMENT'],
    mutationFn: async ({
      postId,
      commentData,
    }: {
      postId: string;
      commentData: IComment;
    }) => await createComment(postId, commentData),
    onSuccess: () => {
      toast.success('Post created successfully.');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
