import {
  followUser,
  getAllUsers,
  getSingleUser,
  unfollowUser,
  updateUser,
  updateUserStatus,
} from '@/services/user';
import { TQueryParam } from '@/types';
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

export const useGetAllUsers = (query: TQueryParam[]) => {
  return useQuery({
    queryKey: ['GET_ALL_USERS', query], // Include page in queryKey for caching
    queryFn: async () => await getAllUsers(query),
  });
};

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

export const useUpdateUserStatus = (
  userId: string,
  payload: { status: string }
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['UPDATE_USER_STATUS', userId],
    mutationFn: () => updateUserStatus(userId, payload),
    onSuccess: () => {
      toast.success('User status updated successfully.');
      queryClient.invalidateQueries({ queryKey: ['ALL_PAYMENTS'] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
