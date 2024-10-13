/* eslint-disable @next/next/no-img-element */
'use client';

import FormInput from '@/components/form/FormInput';
import { Button } from '@/components/ui/button';
import Loading from '@/components/ui/loading';
import { useUser } from '@/context/user.provider';
import { useUserRegistration } from '@/hooks/auth.hook';
import registerValidationSchema from '@/schema/register.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent } from 'react';
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form';

export default function RegisterPage() {
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [imagePreview, setImagePreview] = React.useState('');
  const { mutate: handleRegisterUser, isPending } = useUserRegistration();
  const router = useRouter();
  const { setIsLoading: userLoading } = useUser();
  const methods = useForm({
    resolver: zodResolver(registerValidationSchema),
  });
  const { handleSubmit, reset } = methods;
  console.log(imageFile);
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const formData = new FormData();
    const postData = {
      ...data,
    };

    formData.append('data', JSON.stringify(postData));

    if (imageFile) {
      formData.append('image', imageFile);
    }

    handleRegisterUser(formData, {
      onSuccess: () => {
        // Reset the form and clear images on success
        router.push('/');
        reset();
        setImageFile(null);
        setImagePreview('');
      },
    });
    userLoading(true);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];

    setImageFile(file);

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      {isPending && <Loading />}
      <div className='flex min-h-screen py-10 overflow-y-auto flex-col items-center justify-center bg-background'>
        <h3 className='my-2 text-2xl font-bold text-primary'>Register</h3>
        <p className='mb-4 text-textSecondary'>
          Help Lost Items Find Their Way Home
        </p>
        <div className='w-[35%] bg-white rounded-lg shadow-md p-6'>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='py-3'>
                <FormInput label='Name' name='name' size='sm' />
              </div>
              <div className='py-3'>
                <FormInput label='Email' name='email' size='sm' />
              </div>
              <div className='py-3'>
                <FormInput
                  label='Password'
                  name='password'
                  size='sm'
                  type='password'
                />
              </div>

              <div className='min-w-fit flex-1 my-5'>
                <label
                  className='flex  text-sm w-full cursor-pointer py-3 px-4 border-textSecondary rounded-md border'
                  htmlFor='image'
                >
                  Upload Image
                </label>
                <input
                  multiple
                  className='hidden'
                  type='file'
                  id='image'
                  name='image'
                  onChange={handleImageChange}
                />
              </div>

              {imagePreview.length > 0 && (
                <div className='flex gap-8 my-5 flex-wrap'>
                  <div className='relative size-48 rounded-xl border-textSecondary border-2 border-dashed border-default-300 p-2'>
                    <img
                      alt='item'
                      className='h-full w-full object-cover object-center rounded-md'
                      src={imagePreview}
                    />
                  </div>
                </div>
              )}

              <Button className='block w-full my-3 bg-primary ' type='submit'>
                Register
              </Button>
            </form>
          </FormProvider>
          <div className='text-center text-textSecondary'>
            Already have an account?{' '}
            <Link
              href={'/login'}
              className='text-primary font-medium hover:underline'
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
