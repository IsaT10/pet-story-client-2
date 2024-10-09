/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import envConfig from '@/config/envConfig';
import { axiosInstance } from '@/lib/axiosInstance';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

export const savePayemnt = async (data: { expiredDate: string }) => {
  try {
    const res = await axiosInstance.post(`/payments`, data);

    revalidateTag('payments');

    return res?.data;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

export const getPaymentHistory = async () => {
  const accessToken = cookies().get('accessToken')?.value;
  try {
    const res = await fetch(`${envConfig.baseApi}/payments`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      next: { tags: ['payments'] },
    });

    const data = await res.json();

    return data;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};
