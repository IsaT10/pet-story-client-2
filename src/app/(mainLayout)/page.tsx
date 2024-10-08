'use client';

import FormSelect from '@/components/form/FormSelect';
import ContentForm from '@/components/modules/content-form';
import Post from '@/components/modules/Post';
import SearchingFiltering from '@/components/modules/searchng-filtering';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Pencil } from '@/components/ui/icon';
import { categoryOptions, contentTypeOptions } from '@/constant';
import { useGetAllPosts } from '@/hooks/post.hook';
import useDebounce from '@/hooks/use.debounce';
import React from 'react';

export default function Home() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [type, setType] = React.useState('');
  const [isOpen, setIsOpen] = React.useState(false);
  const isPremium =
    type === 'basic' ? false : type === 'premium' ? true : 'all';
  const delaySearch = useDebounce(searchTerm, 400);

  console.log(category, type === 'premium');

  const { data, isLoading } = useGetAllPosts([
    { name: 'searchTerm', value: delaySearch },
    { name: 'category', value: category },
    { name: 'isPremium', value: isPremium },
  ]);

  console.log(isLoading);
  return (
    <div className='flex items-start '>
      <div className='w-[65%] pr-10  pt-10 '>
        {data?.data?.result?.map((item) => (
          <Post key={item._id} post={item} />
        ))}
      </div>

      <div className='w-[35%] pl-10 flex flex-col gap-4 pt-10 border-l h-screen sticky top-0 right-0 border-stone-300'>
        <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
          <DialogTrigger asChild>
            <button className='flex group items-center border-b border-stone-300 pb-3 relative'>
              <span className='absolute left-4 top-2'>
                <Pencil color={'black'} />
              </span>
              <span className='w-full bg-[#695acd5a] hover:bg-[#695acd5a]/40 duration-200 border border-stone-200 rounded-md pl-14 py-2.5 text-left'>
                What pet tips do you have?
              </span>
            </button>
          </DialogTrigger>
          <DialogContent className='max-w-[70%] max-h-[90vh] overflow-y-auto '>
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
            </DialogHeader>
            <ContentForm setIsOpen={setIsOpen} />
          </DialogContent>
        </Dialog>

        <SearchingFiltering
          type={type}
          setType={setType}
          category={category}
          setCategory={setCategory}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>
    </div>
  );
}
