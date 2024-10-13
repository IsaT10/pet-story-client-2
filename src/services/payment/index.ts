/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { axiosInstance } from '@/lib/axiosInstance';
import { TQueryParam } from '@/types';
import { revalidateTag } from 'next/cache';

export const savePayemnt = async (data: { expiredDate: string }) => {
  try {
    const res = await axiosInstance.post(`/payments`, data);

    revalidateTag('payments');

    return res?.data;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

export const getPaymentHistory = async (query: TQueryParam[]) => {
  try {
    const queryParams = new URLSearchParams();

    if (query) {
      query.forEach((el: TQueryParam) => {
        if (el.value !== 'all' && el.value !== '') {
          queryParams.append(el.name, el.value as string);
        }
      });
    }

    const { data } = await axiosInstance.get(`/payments?${queryParams}`);

    return data;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};
