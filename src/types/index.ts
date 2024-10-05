import { SVGProps } from 'react';

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface IPost {
  _id: string;
  title: string;
  description: string;
  images: string[];
  location: string;
  city: string;
  dateFound: string;
  status: string;
  isReported: boolean;
  reportCount: number;
  category: ICategory;
  user: IUser;
  questions: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
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
