/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import envConfig from '@/config/envConfig';
import { axiosInstance } from '@/lib/axiosInstance';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

// export const getUserProfile = async () => {
//   try {
//     const { data } = await axiosInstance.get('/users/profile/me');

//     // console.log(data);
//     return data;
//   } catch (error: any) {
//     console.log(error);
//     throw new Error(error.message);
//   }
// };

export const getUserProfile = async () => {
  const accessToken = cookies().get('accessToken')?.value;

  try {
    const res = await fetch(`${envConfig.baseApi}/users/profile/me`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      next: { tags: ['userProfile'] },
    });

    const data = await res.json();

    return data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const unfollowUser = async (id: string) => {
  try {
    const { data } = await axiosInstance.patch(`/users/${id}/unfollow`);

    revalidateTag('userProfile');
    return data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const getSingleUser = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(`/users/${id}`);

    // console.log(data);
    return data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const updateUser = async (updateData: FormData, id: string) => {
  try {
    const res = await axiosInstance.patch(`/users/${id}`, updateData);
    revalidateTag('userProfile');

    console.log(res.data);
    return res?.data;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};
export const updateUserStatus = async (id: string) => {
  try {
    const res = await axiosInstance.patch(`/users/change-status/${id}`, {
      status: 'premium',
    });
    revalidateTag('userProfile');

    console.log(res.data);
    return res?.data;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};
