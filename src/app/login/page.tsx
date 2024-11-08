'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useUserLogin } from '@/hooks/auth.hook';
import { useUser } from '@/context/user.provider';
import Loading from '@/components/ui/loading';
import { loginValidationSchema } from '@/schema/login.schema';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import FormWrapper from '@/components/form/FormWrapper';
import FormInput from '@/components/form/FormInput';

const LoginPage = () => {
  const router = useRouter();
  const { setIsLoading: userLoading } = useUser();
  const { mutate: handleLoginUser, isPending, data } = useUserLogin();

  const [defaultValues, setDefaultValues] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (data && !data?.success) {
      toast.error(data?.message);
    } else if (data && data.success) {
      toast.success('User login successful.');
      userLoading(true);

      router.push('/');
    }
  }, [data, router, userLoading]);

  const onSubmit = (formData: { email: string; password: string }) => {
    handleLoginUser(formData);
  };

  const handleDemoLogin = (role: 'user' | 'admin') => {
    if (role === 'user') {
      setDefaultValues({
        email: 'user@gmail.com',
        password: '123456',
      });
    } else {
      setDefaultValues({
        email: 'admin@gmail.com',
        password: '123456',
      });
    }
  };

  return (
    <>
      {isPending && <Loading />}
      <div className='flex min-h-screen w-full flex-col items-center justify-center bg-background'>
        <h3 className='my-2 text-2xl font-bold text-primary'>Login</h3>
        <p className='mb-4 text-stone-500'>Welcome Back! Let’s Get Started</p>
        <div className='md:w-[55%] sm:w-[65%] w-[80%] lg:w-[45%] xl:w-[35%] bg-white rounded-lg shadow-md p-6'>
          <FormWrapper
            onSubmit={onSubmit}
            resolver={zodResolver(loginValidationSchema)}
            defaultValues={defaultValues}
          >
            <div className='py-3'>
              <FormInput name='email' label='Email' type='email' />
            </div>
            <div className='py-3 pb-4'>
              <FormInput name='password' label='Password' type='password' />
            </div>

            <div className='flex justify-between items-center my-6'>
              <Link
                href='/forget-password'
                className='text-sm font-medium text-primary'
              >
                Forget Password
              </Link>
              <div className='flex gap-2'>
                <Button
                  type='button'
                  variant='outline'
                  className='text-sm py-1'
                  onClick={() => handleDemoLogin('user')}
                >
                  Demo User
                </Button>
                <Button
                  type='button'
                  variant='outline'
                  className='text-sm py-1.5'
                  onClick={() => handleDemoLogin('admin')}
                >
                  Demo Admin
                </Button>
              </div>
            </div>

            <Button className='block w-full mt-1 mb-3' type='submit'>
              Login
            </Button>
          </FormWrapper>
          <div className='text-center text-textSecondary'>
            Don’t have an account?{' '}
            <Link
              href='/register'
              className='text-primary font-medium hover:underline'
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
