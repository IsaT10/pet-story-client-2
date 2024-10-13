/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { axiosInstance } from '@/lib/axiosInstance';
import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';
import { FieldValues } from 'react-hook-form';

// export const registerUser = async (userData: FieldValues) => {
//   try {
//     const { data } = await axiosInstance.post('/auth/register', userData);

//     if (data.success) {
//       cookies().set('accessToken', data?.data?.accessToken);
//       // cookies().set('refreshToken', data?.data?.refreshToken);
//     }
//     return data;
//   } catch (error: any) {
//     console.log(error);
//     throw new Error(error.message);
//   }
// };

export const registerUser = async (postData: FormData) => {
  try {
    const res = await axiosInstance.post('/auth/register', postData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (res?.data?.success) {
      cookies().set('accessToken', res?.data?.data?.accessToken);
    }

    console.log(res);

    return res?.data;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

export const loginUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post('/auth/login', userData);

    if (data.success) {
      cookies().set('accessToken', data?.data?.accessToken);
      // cookies().set('refreshToken', data?.data?.refreshToken);
    }
    return data;
  } catch (error: any) {
    return error;
  }
};

export const forgetPassword = async (email: FieldValues) => {
  try {
    const { data } = await axiosInstance.post('/auth/forget-password', email);

    return data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const resetPassword = async (formData: FieldValues, token: string) => {
  try {
    const { data } = await axiosInstance.post(
      '/auth/reset-password',
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data;
  } catch (error: any) {
    if (error.message === 'jwt expired') {
      throw new Error('Generated link is expired!');
    }
    throw new Error(error.message);
  }
};

export const logout = () => {
  cookies().delete('accessToken');
  // cookies().delete('refreshToken');
};

export const getUserProfile = async () => {
  const accessToken = cookies().get('accessToken')?.value;

  let decodedToken = null;

  if (accessToken) {
    decodedToken = await jwtDecode(accessToken);

    return {
      _id: decodedToken.id,
      name: decodedToken.name,
      email: decodedToken.email,
      role: decodedToken.role,
      image: decodedToken.image,
      status: decodedToken.status,
    };
  }

  return decodedToken;
};
