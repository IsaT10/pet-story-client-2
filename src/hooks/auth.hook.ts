/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from '@tanstack/react-query';
import { FieldValues } from 'react-hook-form';
import { toast } from 'sonner';
import {
  changePassword,
  forgetPassword,
  loginUser,
  registerUser,
  resetPassword,
} from '../services/auth';

export type TPassword = { oldPassword: string; newPassword: string };

export const useUserRegistration = () => {
  return useMutation<any, Error, FormData>({
    mutationKey: ['CREATE_USER'],
    mutationFn: async (postData) => await registerUser(postData),
  });
};
export const useChangePassword = () => {
  return useMutation({
    mutationKey: ['CHANGE_PASSWORD'],
    mutationFn: async (postData: TPassword) => await changePassword(postData),
  });
};

export const useUserLogin = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ['USER_LOGIN'],
    mutationFn: async (userData) => await loginUser(userData),
  });
};

export const useFrogetPassword = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ['FORGET_PASSWORD'],
    mutationFn: async (data) => await forgetPassword(data),
    onSuccess: () => {
      toast.success('Sent email.');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export const useResetPassword = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ['FORGET_PASSWORD'],
    mutationFn: async ({ formData, token }) =>
      await resetPassword(formData, token),
    onSuccess: () => {
      toast.success('Successfully reset password. Now login with new password');
    },
    onError(error) {
      toast.error(error.message);
    },
  });
};
