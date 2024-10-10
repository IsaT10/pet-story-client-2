/* eslint-disable @next/next/no-img-element */
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useUpdateProfile } from '@/hooks/user.hook';
import React from 'react';
// import { RotatingLines } from 'react-loader-spinner';

type TProps = { image: string; _id: string; name: string };

export default function EditProfile({ image, _id, name }: TProps) {
  const [open, setOpen] = React.useState(false);
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [editName, setEditName] = React.useState(name);
  const [isModified, setIsModified] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const { mutate: handleUpdate, isPending } = useUpdateProfile();

  const handleImg = () => {
    inputRef.current?.click();
  };

  const handleOnChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imgFile = e.target.files?.[0];
    if (imgFile) {
      setImageFile(imgFile);
      setIsModified(true);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setEditName(newName);
    setIsModified(newName !== name || imageFile !== null);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('data', JSON.stringify({ name: editName }));

    if (imageFile) {
      formData.append('image', imageFile);
    }

    handleUpdate(
      { updateData: formData, id: _id },
      {
        onSuccess: () => {
          setOpen(false);
          setImageFile(null);
        },
      }
    );
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='mt-6 py-1.5 text-sm'>Edit profile</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[525px] px-10 py-8'>
        <DialogHeader>
          <DialogTitle className='text-center mb-10 font-medium text-xl'>
            Profile information
          </DialogTitle>
        </DialogHeader>

        <p className='font-medium text-sm mb-2'>Photo</p>
        <div className='flex items-start'>
          {imageFile ? (
            <img
              className='w-20 h-20 object-cover rounded-full'
              src={URL.createObjectURL(imageFile)}
              alt=''
            />
          ) : (
            <img
              className='w-20 h-20 object-cover rounded-full'
              src={image}
              alt=''
            />
          )}

          <div className='flex flex-col gap-1 ml-6'>
            <div className='flex gap-5'>
              <input
                type='file'
                name=''
                ref={inputRef}
                onChange={handleOnChangeImg}
                className='hidden'
              />
              <button onClick={handleImg} className='text-primary text-sm'>
                Update
              </button>
              <button className='text-red-600 text-sm'>Remove</button>
            </div>
            <p className='text-sm text-stone-400'>
              Recommended: Square JPG or PNG at least 1,000 pixels per side.
            </p>
          </div>
        </div>

        <div className='mt-8'>
          <form onSubmit={onSubmit}>
            <div className='py-3'>
              <label className='block font-medium mb-1 text-sm' htmlFor='name'>
                Name
              </label>
              <input
                id='name'
                type='text'
                value={editName}
                onChange={handleNameChange}
                className='border bg-[#f2f2f2] outline-primary rounded px-3 py-2 w-full'
              />
            </div>

            <Button
              className={`text-sm py-2.5  mt-1 mb-3 ${
                isPending ? 'px-6' : 'px-5'
              }`}
              type='submit'
              disabled={!isModified}
            >
              {isPending ? (
                // <RotatingLines
                //   visible
                //   height='20'
                //   width='20'
                //   strokeWidth='5'
                //   strokeColor='white'
                //   animationDuration='0.75'
                //   ariaLabel='rotating-lines-loading'
                //   className='text-white stroke-white'
                // />
                <span>...</span>
              ) : (
                'Save'
              )}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
