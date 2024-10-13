import React from 'react';
import FormSelect from '../form/FormSelect';
import { categoryOptions, contentTypeOptions } from '@/constant';

type TProps = {
  type: string;
  setType: (type: string) => void;
  category: string;
  setCategory: (category: string) => void;
};

export default function SearchingFiltering({
  type,
  setType,
  category,
  setCategory,
}: TProps) {
  return (
    <div className='space-y-4'>
      <FormSelect
        allOption={true}
        label='Post Category'
        options={categoryOptions}
        setValue={setCategory}
        value={category}
      />
      <FormSelect
        allOption={true}
        label='Post Type'
        options={contentTypeOptions}
        setValue={setType}
        value={type}
      />
    </div>
  );
}
