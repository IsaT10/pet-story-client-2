/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { axiosInstance } from '@/lib/axiosInstance';
import { IComment } from '@/types';
import { revalidateTag } from 'next/cache';

export const createComment = async (postId: string, commentData: IComment) => {
  try {
    const res = await axiosInstance.post(`/comments/${postId}`, commentData);

    revalidateTag('posts');

    return res?.data;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

export const updateComment = async (id: string, commentData: IComment) => {
  try {
    const res = await axiosInstance.patch(`/comments/${id}`, commentData);
    revalidateTag('posts');

    return res?.data;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};
export const deleteComment = async (id: string) => {
  try {
    const res = await axiosInstance.delete(`/comments/${id}`);
    revalidateTag('posts');

    return res?.data;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};
