import React from 'react';
import FormSelect from '../form/FormSelect';
import { categoryOptions, contentTypeOptions } from '@/constant';

type TProps = {
  type: string;
  setType: (type: string) => void;
  category: string;
  setCategory: (category: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
};

export default function SearchingFiltering({
  type,
  setType,
  category,
  setCategory,
  searchTerm,
  setSearchTerm,
}: TProps) {
  return (
    <div className='space-y-4'>
      <input
        type='text'
        name='search'
        placeholder='Search...'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className='border px-4 py-3 placeholder:text-textPrimary text-sm rounded-md outline-primary border-textSecondary w-full'
      />
      <FormSelect
        label='Post Category'
        options={categoryOptions}
        setValue={setCategory}
        value={category}
      />
      <FormSelect
        label='Post Type'
        options={contentTypeOptions}
        setValue={setType}
        value={type}
      />
    </div>
  );
}
