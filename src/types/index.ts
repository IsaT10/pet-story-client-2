import { SVGProps } from 'react';

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface IPost {
  _id: string;
  category: string;
  isPremium: boolean;
  isPublish: boolean;
  upvotes: string[];
  downvotes: string[];
  comments: IComment[];
  content: string;
  thumbnail: string;
  author: IUser;
  createdAt: string;
  updatedAt: string;
}

export interface IComment {
  _id?: string;
  postId?: string;
  userId?: IUser;
  comment: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IPost {
  content: string;
}
export interface IUser {
  _id: string;
  name: string;
  image: string;
  email: string;
  posts?: IPost[];
  status: 'basic' | 'premium' | 'blocked';
  role: 'admin' | 'user';
  followers?: IUser[];
  following?: IUser[];
}

export type TQueryParam = {
  name: string;
  value: boolean | React.Key;
};

export interface ICategory {
  _id: string;
  name: string;
  postCount: number;
  isDeleted: boolean;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface IInput {
  variant?: 'flat' | 'bordered' | 'faded' | 'underlined';
  size?: 'sm' | 'md' | 'lg';
  required?: boolean;
  type?: string;
  label: string;
  name: string;
  disabled?: boolean;
}

export interface IPayment {
  _id: string;
  user: IUser;
  expiredDate: string;
  createdAt: string;
  updatedAt: string;
}
