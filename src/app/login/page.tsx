'use client';

import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { useUserLogin } from '@/hooks/auth.hook';
import { useUser } from '@/context/user.provider';
import Loading from '@/components/ui/loading';
import { loginValidationSchema } from '@/schema/login.schema';
import FormInput from '@/components/form/FormInput';
import FormWrapper from '@/components/form/FormWrapper';
import { Button } from '@/components/ui/button';

const LoginPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const redirect = searchParams.get('redirect');
  const { setIsLoading: userLoading } = useUser();

  const { mutate: handleLoginUser, isPending, isSuccess } = useUserLogin();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    handleLoginUser(data);
    userLoading(true);
  };

  if (!isPending && isSuccess) {
    if (redirect) {
      router.push(redirect);
    } else {
      router.push('/');
    }
  }

  return (
    <>
      {isPending && <Loading />}
      <div className='flex min-h-screen w-full flex-col items-center justify-center bg-background'>
        <h3 className='my-2 text-2xl font-bold text-primary'>
          Login with FoundX
        </h3>
        <p className='mb-4 text-textSecondary'>
          Welcome Back! Let’s Get Started
        </p>
        <div className='w-[35%] bg-white rounded-lg shadow-md p-6'>
          <FormWrapper
            onSubmit={onSubmit}
            resolver={zodResolver(loginValidationSchema)}
          >
            <div className='py-3'>
              <FormInput name='email' label='Email' type='email' />
            </div>
            <div className='py-3 pb-4'>
              <FormInput name='password' label='Password' type='password' />
            </div>

            <Link
              href={'/forget-password'}
              className=' text-sm font-medium text-primary'
            >
              Forget Password
            </Link>

            <Button className='block w-full mt-1 mb-3 ' type='submit'>
              Login
            </Button>
          </FormWrapper>
          <div className='text-center text-textSecondary'>
            Don’t have an account?{' '}
            <Link
              href={'/register'}
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
