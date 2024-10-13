import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Spinner } from '../ui/icon';
import { useChangePassword } from '@/hooks/auth.hook';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { logout } from '@/services/auth';
import { useUser } from '@/context/user.provider';

export default function PasswordChange() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [open, setOpen] = useState(false);
  const { setIsLoading } = useUser();
  const [errorOldPassword, setErrorOldPassword] = useState('');
  const [errorNewPassword, setErrorNewPassword] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const { mutate: changePassword, data, isPending } = useChangePassword();
  // Form validation logic
  const router = useRouter();
  useEffect(() => {
    let isValid = true;

    setErrorOldPassword('');
    setErrorNewPassword('');

    if (!oldPassword) {
      setErrorOldPassword('Old password is required');
      isValid = false;
    }

    if (newPassword.length < 6) {
      setErrorNewPassword('New password must be at least 6 characters long');
      isValid = false;
    }

    if (oldPassword && newPassword && oldPassword === newPassword) {
      setErrorNewPassword('New password cannot be the same as old password');
      isValid = false;
    }

    setIsFormValid(isValid);
  }, [oldPassword, newPassword]);

  useEffect(() => {
    if (data && !data?.success) {
      toast.error(data?.message);
    } else if (data && data.success) {
      toast.success(
        'Password change successfully. Now login with new password.'
      );
      logout();
      setIsLoading(true);
      router.push('/login');
    }
  }, [data, router, setIsLoading]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    changePassword({ oldPassword, newPassword });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className='px-4 py-1.5 rounded-md w-full text-left hover:bg-stone-100 hover:outine-none'>
          Change Password
        </button>
      </DialogTrigger>
      <DialogContent className='w-[400px] sm:w-[525px] px-10 py-8'>
        <DialogHeader>
          <DialogTitle className='text-center mb-10 font-medium text-xl'>
            Change Password
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className='py-3'>
            <label
              className='block font-medium mb-1 text-sm'
              htmlFor='oldPassword'
            >
              Old Password
            </label>
            <input
              id='oldPassword'
              type='password'
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className='border bg-[#f2f2f2] outline-primary rounded px-3 py-2 w-full'
            />
            {errorOldPassword && (
              <p className='text-red-500 text-sm'>{errorOldPassword}</p>
            )}
          </div>

          <div className='py-3'>
            <label
              className='block font-medium mb-1 text-sm'
              htmlFor='newPassword'
            >
              New Password
            </label>
            <input
              id='newPassword'
              type='password'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className='border bg-[#f2f2f2] outline-primary rounded px-3 py-2 w-full'
            />
            {errorNewPassword && (
              <p className='text-red-500 text-sm'>{errorNewPassword}</p>
            )}
          </div>

          <Button
            className='text-sm py-2.5 w-20 h-10 mt-4 mb-3'
            type='submit'
            disabled={!isFormValid || isPending}
          >
            {isPending ? <Spinner className='animate-spin h-4' /> : 'Save'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
