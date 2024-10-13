'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useFrogetPassword } from '@/hooks/auth.hook';
import Loading from '@/components/ui/loading';
import FormWrapper from '@/components/form/FormWrapper';
import FormInput from '@/components/form/FormInput';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { useEffect, useState } from 'react';

const ForgetPassword = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  const {
    mutate: handleForgetPassword,
    isPending,
    isSuccess,
  } = useFrogetPassword();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    handleForgetPassword(data);
  };

  useEffect(() => {
    if (!isPending && isSuccess) {
      setIsModalOpen(true);

      const timer = setTimeout(() => {
        router.push('/login');
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isPending, isSuccess, router]);

  const emailValidation = z.object({
    email: z.string().trim().email('Please enter a valid email'),
  });

  return (
    <>
      {isPending && <Loading />}
      <div className='flex min-h-screen w-full flex-col items-center justify-center'>
        <p className='mb-3 text-lg font-medium'>Please provide your email</p>
        <div className='w-[35%]'>
          <FormWrapper
            onSubmit={onSubmit}
            resolver={zodResolver(emailValidation)}
          >
            <div className='py-3'>
              <FormInput name='email' label='Email' type='email' />
            </div>

            <Button className='my-3 w-full ' type='submit'>
              Send
            </Button>
          </FormWrapper>
        </div>
      </div>

      {/* Modal to show after email is sent */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className='sm:max-w-[425px] '>
          <DialogHeader>
            <p className='py-14 text-center'>
              Please check you email. Click the link!
            </p>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ForgetPassword;
