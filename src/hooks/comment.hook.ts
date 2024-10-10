import {
  createComment,
  deleteComment,
  updateComment,
} from '@/services/comment';
import { IComment } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useCreateComment = () => {
  const queryClient = useQueryClient();
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

      queryClient.invalidateQueries({ queryKey: ['GET_ALL_POSTS'] });
      queryClient.invalidateQueries({ queryKey: ['POSTS'] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUpdateComment = () => {
  const queryClient = useQueryClient();
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
      queryClient.invalidateQueries({ queryKey: ['GET_ALL_POSTS'] });
      queryClient.invalidateQueries({ queryKey: ['POSTS'] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['DELETE_COMMENT'],
    mutationFn: async ({ id }: { id: string }) => await deleteComment(id),
    onSuccess: () => {
      toast.success('Comment deleted successfully!');
      queryClient.invalidateQueries({ queryKey: ['GET_ALL_POSTS'] });
      queryClient.invalidateQueries({ queryKey: ['POSTS'] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
