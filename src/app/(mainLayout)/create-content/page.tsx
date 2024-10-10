// /* eslint-disable @next/next/no-img-element */
// 'use client';

// import { useCreatePost } from '@/hooks/post.hook';
// import React from 'react';
// import QuillEditor from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
// const Editor = () => {
//   const inputRef = React.useRef<HTMLInputElement | null>(null);
//   const [imageFile, setImageFile] = React.useState<File | null>(null);
//   const [postCategory, setPostCategory] = React.useState('');
//   const [contentType, setContentType] = React.useState('');
//   const [value, setValue] = React.useState('');
//   const { mutate: handleCreatePost } = useCreatePost();
//   function handler() {
//     const formData = new FormData();
//     const postData = {
//       content: value,
//       category: postCategory,
//       isPremium: contentType === 'premium',
//     };

//     formData.append('data', JSON.stringify(postData));

//     if (imageFile) {
//       formData.append('image', imageFile);
//     }

//     handleCreatePost(formData);
//   }

//   const handleOnChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const imgFile = e.target.files![0];
//     // console.log(imgFile);
//     setImageFile(imgFile);
//   };
//   const handleImage = () => {
//     inputRef.current?.click();
//   };

//   const modules = {
//     toolbar: {
//       container: [
//         [{ header: [1, 2, 3, 4, false] }],
//         ['bold', 'italic', 'underline', 'blockquote'],
//         [{ color: [] }],
//         [
//           { list: 'ordered' },
//           { list: 'bullet' },
//           { indent: '-1' },
//           { indent: '+1' },
//         ],
//         ['link'],
//       ],
//       //   handlers: {
//       //     image: imageHandler,
//       //   },
//     },
//     clipboard: {
//       matchVisual: true,
//     },
//   };

//   const formats = [
//     'header',
//     'bold',
//     'italic',
//     'underline',
//     'strike',
//     'blockquote',
//     'list',
//     'bullet',
//     'indent',
//     'link',
//     'color',
//   ];

//   return (
//     <div className='mt-6 mb-32'>
//       <Select onValueChange={(value) => setPostCategory(value)}>
//         <SelectTrigger className='w-[180px]'>
//           <SelectValue placeholder='Select category' />
//         </SelectTrigger>
//         <SelectContent>
//           <SelectGroup>
//             <SelectItem value='Tips'>Tips</SelectItem>
//             <SelectItem value='Story'>Story</SelectItem>
//           </SelectGroup>
//         </SelectContent>
//       </Select>
//       <Select onValueChange={(value) => setContentType(value)}>
//         <SelectTrigger className='w-[180px]'>
//           <SelectValue placeholder='Content type' />
//         </SelectTrigger>
//         <SelectContent>
//           <SelectGroup>
//             <SelectItem value='basic'>Basic</SelectItem>
//             <SelectItem value='premium'>Premium</SelectItem>
//           </SelectGroup>
//         </SelectContent>
//       </Select>
//       <div className=' extraOutline border-primary  border-[3px]  border-dashed  w-full h-full mb-6  row-span-2 mx-auto rounded-md'>
//         <div onClick={handleImage} className='file_upload  relative rounded-lg'>
//           {imageFile ? (
//             <img
//               className='w-full h-[383px] object-cover rounded-md'
//               src={URL.createObjectURL(imageFile)}
//               alt=''
//             />
//           ) : (
//             <div className='py-32'>
//               <svg
//                 className='text-primary w-24  mx-auto '
//                 xmlns='http://www.w3.org/2000/svg'
//                 fill='none'
//                 viewBox='0 0 24 24'
//                 stroke='currentColor'
//               >
//                 <path
//                   strokeLinecap='round'
//                   strokeLinejoin='round'
//                   strokeWidth='1'
//                   d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
//                 />
//               </svg>
//               <p className='text-center text-primary tracking-tight  text-3xl text-blue'>
//                 Choose a Thumbnail
//               </p>
//             </div>
//           )}
//           <div className='input_field flex flex-col w-max mx-auto text-center'>
//             <input
//               ref={inputRef}
//               onChange={handleOnChangeImage}
//               className='text-sm cursor-pointer w-48 hidden'
//               type='file'
//               // {...register('assetImage', { required: true })}
//             />
//           </div>
//         </div>
//       </div>
//       <QuillEditor
//         className='h-[300px]'
//         theme='snow'
//         value={value}
//         formats={formats}
//         modules={modules}
//         onChange={(value) => setValue(value)}
//       />
//       <button onClick={handler} className='mt-20'>
//         Submit
//       </button>
//     </div>
//   );
// };

// export default Editor;
export default function page() {
  return <div>This is page</div>;
}
