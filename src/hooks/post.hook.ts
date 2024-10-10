/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createPost,
  deletePost,
  downvotePost,
  getAllPost,
  getPostBySingleUser,
  updatePost,
  upvotePost,
} from '../services/post';
import { toast } from 'sonner';
import { TQueryParam } from '@/types';

export const useGetAllPosts = (query: TQueryParam[]) => {
  return useQuery({
    queryKey: ['GET_ALL_POSTS', query],
    queryFn: () => getAllPost(query),
  });
};

export const useGetPostBySingleUser = (userId: string) => {
  return useQuery({
    queryKey: ['POSTS', userId],
    queryFn: () => getPostBySingleUser(userId),
    enabled: !!userId,
  });
};

export const useDeletePost = (postId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['DELETE_POSTS', postId],
    mutationFn: () => deletePost(postId),
    onSuccess: () => {
      toast.success('Post deleted successfully.');
      queryClient.invalidateQueries({ queryKey: ['GET_ALL_POSTS'] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, FormData>({
    mutationKey: ['CREATE_POST'],
    mutationFn: async (postData) => await createPost(postData),
    onSuccess: () => {
      toast.success('Post created successfully.');
      queryClient.invalidateQueries({ queryKey: ['GET_ALL_POSTS'] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['UPDATE_POST'],
    mutationFn: async ({
      postData,
      postId,
    }: {
      postData: FormData;
      postId: string;
    }) => await updatePost(postData, postId),
    onSuccess: () => {
      toast.success('Post updated successfully.');
      queryClient.invalidateQueries({ queryKey: ['GET_ALL_POSTS'] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUpvotePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['UPVOTE'],
    mutationFn: async (id: string) => await upvotePost(id),
    onSuccess: () => {
      toast.success('Upvoted');
      queryClient.invalidateQueries({ queryKey: ['GET_ALL_POSTS'] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useDownvotePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['DOWNVOTE'],
    mutationFn: async (id: string) => await downvotePost(id),
    onSuccess: () => {
      toast.success('Downvoted');
      queryClient.invalidateQueries({ queryKey: ['GET_ALL_POSTS'] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
