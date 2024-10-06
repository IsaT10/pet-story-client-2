'use server';

import { axiosInstance } from '@/lib/axiosInstance';
import { revalidateTag } from 'next/cache';

export const createPost = async (postData: FormData) => {
  try {
    const res = await axiosInstance.post('/posts/create-post', postData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    revalidateTag('posts');

    return res?.data;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};
