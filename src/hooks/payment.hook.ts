import { savePayemnt } from '@/services/payment';
import { useMutation } from '@tanstack/react-query';
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
