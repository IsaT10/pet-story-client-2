import {
  followUser,
  getSingleUser,
  unfollowUser,
  updateUser,
} from '@/services/user';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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
  });
};

export const useUnfollowUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['userProfile'],
    mutationFn: async (id: string) => await unfollowUser(id),
    onSuccess: () => {
      toast.success('Unfollowed.');
      queryClient.invalidateQueries({ queryKey: ['USER'] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export const useFollowUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['userProfile'],
    mutationFn: async (id: string) => await followUser(id),
    onSuccess: () => {
      toast.success('Followed.');
      queryClient.invalidateQueries({ queryKey: ['USER'] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, UpdateProfileParams>({
    mutationKey: ['userProfile'],
    mutationFn: async ({ updateData, id }) => await updateUser(updateData, id),
    onSuccess: () => {
      toast.success('Update profile.');
      queryClient.invalidateQueries({ queryKey: ['USER'] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
