'use client';
/* eslint-disable @next/next/no-img-element */

import {
  useCreatePost,
  // useGetPostByUser,
  useUpdatePost,
} from '@/hooks/post.hook';
import React from 'react';
import QuillEditor from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '../ui/button';
import { useUser } from '@/context/user.provider';
import { Dialog, DialogContent } from '../ui/dialog';
import Link from 'next/link';
import { Spinner } from '../ui/icon';
// import { RotatingLines } from 'react-loader-spinner';

type TProps = {
  postId?: string;
  category?: string;
  isPremium?: boolean;
  content?: string;
  thumbnail?: string;
  setIsOpen: (open: boolean) => void;
  isEdit?: boolean;
};

const ContentForm = ({
  category,
  isPremium,
  setIsOpen,
  content,
  thumbnail,
  postId,
  isEdit = false,
}: TProps) => {
  const { user } = useUser();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [imageFile, setImageFile] = React.useState<File | string | null>(null);
  const [postCategory, setPostCategory] = React.useState('Story');
  const [contentType, setContentType] = React.useState('basic');
  const [value, setValue] = React.useState('');

  const { mutate: handleCreatePost, isPending: createPending } =
    useCreatePost();
  const { mutate: handleUpdatePost, isPending: updatePending } =
    useUpdatePost();

  // Set default values when `isEdit` is true
  React.useEffect(() => {
    if (isEdit) {
      setPostCategory(category!);
      setContentType(isPremium ? 'premium' : 'basic');
      setValue(content!);
      if (thumbnail) {
        setImageFile(thumbnail);
      }
    }
  }, [isEdit, category, isPremium, content, thumbnail]);

  function handler() {
    const formData = new FormData();
    const postData = {
      content: value,
      category: postCategory,
      isPremium: contentType === 'premium',
      isPublish: true,
    };

    formData.append('data', JSON.stringify(postData));

    if (imageFile) {
      formData.append('image', imageFile);
    }

    if (isEdit) {
      handleUpdatePost(
        {
          postData: formData,
          postId: postId!,
        },
        {
          onSuccess: () => {
            // refetch();
            setIsOpen(false);
          },
        }
      );

      return;
    }

    handleCreatePost(formData, {
      onSuccess: () => {
        // refetch();
        setIsOpen(false);
      },
    });
  }

  const handleOnChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imgFile = e.target.files![0];
    setImageFile(imgFile);
  };

  const handleImage = () => {
    inputRef.current?.click();
  };

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, false] }],
        ['bold', 'italic', 'underline', 'blockquote'],
        [{ color: [] }],
        [
          { list: 'ordered' },
          { list: 'bullet' },
          { indent: '-1' },
          { indent: '+1' },
        ],
        ['link'],
      ],
    },
    clipboard: {
      matchVisual: true,
    },
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'color',
  ];

  const handleContentTypeChange = (value: string) => {
    if (value === 'premium' && user?.status !== 'premium') {
      setIsModalOpen(true);
      return;
    }
    setContentType(value);
  };

  return (
    <div className='my-6'>
      <div className='flex sm:flex-row flex-col gap-6 my-6'>
        <Select
          onValueChange={(value) => setPostCategory(value)}
          value={postCategory} // Set value to the selected state
        >
          <SelectTrigger className='sm:w-[180px]'>
            <SelectValue placeholder='Select category' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel className='font-medium text-sm md:py-1.5 pl-8'>
                Select category
              </SelectLabel>
              <SelectItem value='Tips'>Tips</SelectItem>
              <SelectItem value='Story'>Story</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select onValueChange={handleContentTypeChange} value={contentType}>
          <SelectTrigger className='sm:w-[180px]'>
            <SelectValue placeholder='Content type' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel className='font-medium text-sm md:py-1.5 pl-8'>
                Content type
              </SelectLabel>
              <SelectItem value='basic'>Basic</SelectItem>
              <SelectItem value='premium'>Premium</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className='extraOutline border-primary border-[3px] border-dashed w-full h-[383px] mb-6 row-span-2 mx-auto rounded-md'>
        <div
          onClick={handleImage}
          className='file_upload h-[383px] relative rounded-lg'
        >
          {imageFile ? (
            <img
              className='w-full h-[383px] object-cover rounded-md'
              src={
                typeof imageFile === 'string'
                  ? imageFile
                  : URL.createObjectURL(imageFile)
              }
              alt=''
            />
          ) : (
            <div className='py-32'>
              <svg
                className='text-primary w-16 sm:w-24 mx-auto '
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='1'
                  d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
                />
              </svg>
              <p className='text-center text-primary tracking-tight text-xl sm:text-3xl text-blue'>
                Choose a Thumbnail
              </p>
            </div>
          )}
          <div className='input_field flex flex-col w-max mx-auto text-center'>
            <input
              ref={inputRef}
              onChange={handleOnChangeImage}
              className='text-sm cursor-pointer w-48 hidden'
              type='file'
            />
          </div>
        </div>
      </div>
      <Dialog open={isModalOpen} onOpenChange={(open) => setIsModalOpen(open)}>
        <DialogContent className='max-w-lg h-[250px] flex flex-col items-center justify-center gap-8'>
          <p className='text-2xl font-medium text-center '>
            You are not a premium user
          </p>
          <Link href={'/subscription'}>
            <Button className='py-2'>Want to post premium content?</Button>
          </Link>
        </DialogContent>
      </Dialog>
      <QuillEditor
        className='h-[300px]'
        theme='snow'
        value={value}
        formats={formats}
        modules={modules}
        onChange={(value) => setValue(value)}
      />
      <Button onClick={handler} className={` text-sm mt-20 md:mt-16 w-24 h-10`}>
        {createPending || updatePending ? (
          <Spinner className='animate-spin h-4' />
        ) : (
          'Submit'
        )}
      </Button>
    </div>
  );
};

export default ContentForm;
