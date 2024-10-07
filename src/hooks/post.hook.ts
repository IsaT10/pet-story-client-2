import { useMutation, useQuery } from '@tanstack/react-query';
import {
  createPost,
  downvotePost,
  getPostByUser,
  updatePost,
  upvotePost,
} from '../services/post';
import { toast } from 'sonner';
import { IPost } from '@/types';

export const useGetPostByUser = (userId: string) => {
  return useQuery({
    queryKey: ['POSTS', userId],
    queryFn: () => getPostByUser(userId),
    enabled: !!userId,
  });
};

export const useCreatePost = () => {
  return useMutation<any, Error, FormData>({
    mutationKey: ['CREATE_POST'],
    mutationFn: async (postData) => await createPost(postData),
    onSuccess: () => {
      toast.success('Post created successfully.');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export const useUpdatePost = () => {
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
      toast.success('Post created successfully.');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUpvotePost = () => {
  return useMutation({
    mutationKey: ['UPVOTE'],
    mutationFn: async (id: string) => await upvotePost(id),
    onSuccess: () => {
      toast.success('Post created successfully.');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useDownvotePost = () => {
  return useMutation({
    mutationKey: ['DOWNVOTE'],
    mutationFn: async (id: string) => await downvotePost(id),
    onSuccess: () => {
      toast.success('Post created successfully.');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
