/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';
import { axiosInstance } from '@/lib/axiosInstance';

export const getNotificationByUser = async () => {
  try {
    const res = await axiosInstance.get(`/notifications`);

    return res?.data;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

export const readNotifications = async () => {
  try {
    const res = await axiosInstance.patch(`/notifications/read`);

    return res?.data;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};
