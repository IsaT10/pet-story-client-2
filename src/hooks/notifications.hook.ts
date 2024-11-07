import {
  getNotificationByUser,
  readNotifications,
} from '@/services/notification';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useGetNotificationByUser = () => {
  return useQuery({
    queryKey: ['NOTIFICATIONS'],
    queryFn: async () => await getNotificationByUser(),
    refetchInterval: 10000,
  });
};

export const useReadNotifications = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['NOTIFICATION_READ'],
    mutationFn: async () => await readNotifications(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['NOTIFICATIONS'] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
