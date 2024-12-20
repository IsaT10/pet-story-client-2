/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import envConfig from '@/config/envConfig';
import { axiosInstance } from '@/lib/axiosInstance';
import { ISharePostVariables, TQueryParam } from '@/types';
import { revalidateTag } from 'next/cache';
import { getUserProfile } from '../auth';

export const getAllPost = async (query: TQueryParam[]) => {
  try {
    const queryParams = new URLSearchParams();

    if (query) {
      query.forEach((el: TQueryParam) => {
        if (el.value !== 'all' && el.value !== '') {
          queryParams.append(el.name, el.value as string);
        }
      });
    }

    const res = await fetch(`${envConfig.baseApi}/posts?${queryParams}`, {
      next: { tags: ['allposts'] }, // Next.js caching options
    });

    const data = await res.json();

    return data;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

export const updatePostStatus = async (
  id: string,
  payload: { isPublish: boolean }
) => {
  try {
    const res = await axiosInstance.patch(
      `/posts/change-status/${id}`,
      payload
    );
    // revalidateTag('allposts');

    return res?.data;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

export const getPostByUser = async () => {
  const user = await getUserProfile();
  try {
    const res = await fetch(`${envConfig.baseApi}/posts?author=${user?._id}`, {
      next: { tags: ['posts'] },
    });
    const data = await res.json();

    return data;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};
export const getPostBySingleUser = async (id: string) => {
  try {
    const res = await fetch(`${envConfig.baseApi}/posts?author=${id}`, {
      next: { tags: ['posts'] },
    });
    const data = await res.json();

    return data;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

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

export const sharePost = async ({
  postId,
  sharedData,
}: ISharePostVariables) => {
  try {
    const res = await axiosInstance.post(`/posts/share/${postId}`, sharedData);

    revalidateTag('posts');

    return res?.data;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

export const updateSharePost = async ({
  postId,
  sharedData,
}: ISharePostVariables) => {
  try {
    const res = await axiosInstance.patch(
      `/posts/share/update-post/${postId}`,
      sharedData
    );

    revalidateTag('posts');

    return res?.data;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

export const updatePost = async (postData: FormData, postId: string) => {
  try {
    const res = await axiosInstance.patch(
      `/posts/update-post/${postId}`,
      postData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    revalidateTag('posts');

    return res?.data;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

export const upvotePost = async (postId: string) => {
  try {
    const res = await axiosInstance.patch(`/posts/${postId}/upvote`);

    revalidateTag('posts');

    return res?.data;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

export const downvotePost = async (postId: string) => {
  try {
    const res = await axiosInstance.patch(`/posts/${postId}/downvote`);

    revalidateTag('posts');

    return res?.data;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

export const deletePost = async (postId: string) => {
  try {
    const res = await axiosInstance.delete(`/posts/${postId}`);

    revalidateTag('posts');

    return res?.data;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};
