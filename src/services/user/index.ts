/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import envConfig from '@/config/envConfig';
import { axiosInstance } from '@/lib/axiosInstance';
import { TQueryParam } from '@/types';
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

    console.log(res);

    if (!res.ok) {
      throw new Error(
        `Failed to fetch posts: ${res.statusText} (Status: ${res.status})`
      );
    }

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
export const followUser = async (id: string) => {
  try {
    const { data } = await axiosInstance.patch(`/users/${id}/follow`);

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
    throw new Error(error.message);
  }

  // const accessToken = cookies().get('accessToken')?.value;
  // try {
  //   // const { data } = await axiosInstance.patch(`/users/${id}/unfollow`);

  //   // revalidateTag('userProfile');
  //   // return data;
  //   const res = await fetch(`${envConfig.baseApi}/users/${id}`);

  //   const data = await res.json();

  //   return data;
  // } catch (error: any) {
  //   console.log(error);
  //   throw new Error(error.message);
  // }
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

export const updateUserStatus = async (
  id: string,
  payload: { status: string }
) => {
  try {
    const res = await axiosInstance.patch(
      `/users/change-status/${id}`,
      payload
    );
    revalidateTag('userProfile');

    return res?.data;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};
export const updateUserRole = async (id: string, payload: { role: string }) => {
  try {
    const res = await axiosInstance.patch(`/users/change-role/${id}`, payload);
    revalidateTag('userProfile');

    return res?.data;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

export const getAllUsers = async (query: TQueryParam[]) => {
  try {
    const queryParams = new URLSearchParams();

    if (query) {
      query.forEach((el: TQueryParam) => {
        if (el.value !== 'all' && el.value !== '') {
          queryParams.append(el.name, el.value as string);
        }
      });
    }

    const { data } = await axiosInstance.get(`/users?${queryParams}`);

    // const data = await res.json();

    return data;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};
