import { getPaymentHistory, savePayemnt } from '@/services/payment';
import { TQueryParam } from '@/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useSavePayment = () => {
  //   const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['SAVE_PAYMENTS'],
    mutationFn: async (data: { expiredDate: string }) =>
      await savePayemnt(data),
    onSuccess: () => {
      toast.success('Save Payment History successfully!');

      //   queryClient.invalidateQueries({ queryKey: ['GET_ALL_POSTS'] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useGetPaymentHistory = (query: TQueryParam[]) => {
  return useQuery({
    queryKey: ['ALL_PAYMENTS', query], // Include page in queryKey for caching
    queryFn: async () => await getPaymentHistory(query),
  });
};
