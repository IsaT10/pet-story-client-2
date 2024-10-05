import {
  getSingleUser,
  getUserProfile,
  unfollowUser,
  updateUser,
} from '@/services/user';
import { IUser } from '@/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { revalidateTag } from 'next/cache';
import { toast } from 'sonner';

type UpdateProfileParams = {
  updateData: FormData;
  id: string;
};

// export const useGetUserProfile = () => {
//   return useQuery({
//     queryKey: ['userProfile'],
//     queryFn: async () => getUserProfile(),
//   });
// };

export const useGetSingleUser = (id: string) => {
  return useQuery({
    queryKey: ['USER', id],
    queryFn: ({ queryKey }) => {
      const [, userId] = queryKey;
      return getSingleUser(userId as string);
    },
    enabled: !!id,
  });
};

export const useUnfollowUser = () => {
  return useMutation({
    mutationKey: ['userProfile'],
    mutationFn: async (id: string) => await unfollowUser(id),
    onSuccess: () => {
      toast.success('Unfollowed.');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUpdateProfile = () => {
  return useMutation<unknown, Error, UpdateProfileParams>({
    mutationKey: ['userProfile'],
    mutationFn: async ({ updateData, id }) => await updateUser(updateData, id),
    onSuccess: () => {
      toast.success('Update profile.');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
