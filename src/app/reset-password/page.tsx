'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, SubmitHandler } from 'react-hook-form';

import { useRouter, useSearchParams } from 'next/navigation';
import { z } from 'zod';
import React, { Suspense } from 'react';
import FormWrapper from '@/components/form/FormWrapper';
import FormInput from '@/components/form/FormInput';
import { Button } from '@/components/ui/button';
import { useResetPassword } from '@/hooks/auth.hook';
import Loading from '@/components/ui/loading';

const ResetPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const token = searchParams.get('token');

  const {
    mutate: handleResetPassword,
    isPending,
    isSuccess,
  } = useResetPassword();
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const formData = { email, newPassword: data.password };

    handleResetPassword({ formData, token });
  };

  if (!isPending && isSuccess) {
    router.push('/login');
  }

  const emailValidation = z.object({
    password: z
      .string()
      .trim()
      .min(6, 'Password needs to be at lest 6 character'),
  });

  return (
    <>
      {isPending && <Loading />}
      <div className='flex min-h-screen w-full flex-col items-center justify-center'>
        <p className='mb-4'></p>
        <div className='w-[35%]'>
          <FormWrapper
            onSubmit={onSubmit}
            resolver={zodResolver(emailValidation)}
          >
            <div className='py-3'>
              <FormInput name='password' label='New Password' type='password' />
            </div>

            <Button className='my-3 w-full rounded-md ' type='submit'>
              Send
            </Button>
          </FormWrapper>
        </div>
      </div>
    </>
  );
};

const WrappedResetPassword = () => {
  return (
    <Suspense fallback={<Loading />}>
      <ResetPassword />
    </Suspense>
  );
};

export default WrappedResetPassword;
