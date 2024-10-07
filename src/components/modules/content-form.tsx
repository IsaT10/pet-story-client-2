'use client';

import { useCreatePost, useUpdatePost } from '@/hooks/post.hook';
import React from 'react';
import QuillEditor from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '../ui/button';
import { RotatingLines } from 'react-loader-spinner';
import { SelectLabel } from '@radix-ui/react-select';
const ContentForm = ({
  category,
  isPremium,
  content,
  thumbnail,
  postId,
  isEdit = false,
}) => {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [imageFile, setImageFile] = React.useState<File | null>(null);
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
      setPostCategory(category);
      setContentType(isPremium ? 'premium' : 'basic');
      setValue(content);
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
    };

    formData.append('data', JSON.stringify(postData));

    if (imageFile) {
      formData.append('image', imageFile);
    }

    if (isEdit) {
      handleUpdatePost({
        postData: formData,
        postId: postId,
      });

      return;
    }

    handleCreatePost(formData);
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

  return (
    <div className='my-6'>
      <div className='flex gap-6 mb-6'>
        <Select
          onValueChange={(value) => setPostCategory(value)}
          value={postCategory} // Set value to the selected state
        >
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Select category' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel className='font-medium text-sm py-1.5 pl-9'>
                Select category
              </SelectLabel>
              <SelectItem value='Tips'>Tips</SelectItem>
              <SelectItem value='Story'>Story</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select
          onValueChange={(value) => setContentType(value)}
          value={contentType} // Set value to the selected state
        >
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Content type' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Content type</SelectLabel>
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
                className='text-primary w-24 mx-auto '
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
              <p className='text-center text-primary tracking-tight text-3xl text-blue'>
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
      <QuillEditor
        className='h-[300px]'
        theme='snow'
        value={value}
        formats={formats}
        modules={modules}
        onChange={(value) => setValue(value)}
      />
      <Button
        onClick={handler}
        className={`${
          createPending || updatePending ? 'px-[29px]' : ''
        } text-sm mt-16`}
      >
        {createPending || updatePending ? (
          <RotatingLines
            visible
            height='20'
            width='20'
            strokeWidth='5'
            strokeColor='white'
            animationDuration='0.75'
            ariaLabel='rotating-lines-loading'
            className='text-white stroke-white'
          />
        ) : (
          'Submit'
        )}
      </Button>
    </div>
  );
};

export default ContentForm;
