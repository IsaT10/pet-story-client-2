import {
  createComment,
  deleteComment,
  updateComment,
} from '@/services/comment';
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
      toast.success('Comment submitted successfully!');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUpdateComment = () => {
  return useMutation({
    mutationKey: ['UPDATE_COMMENT'],
    mutationFn: async ({
      id,
      commentData,
    }: {
      id: string;
      commentData: IComment;
    }) => await updateComment(id, commentData),
    onSuccess: () => {
      toast.success('Comment updated successfully!');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useDeleteComment = () => {
  return useMutation({
    mutationKey: ['DELETE_COMMENT'],
    mutationFn: async ({ id }: { id: string }) => await deleteComment(id),
    onSuccess: () => {
      toast.success('Comment deleted successfully!');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
