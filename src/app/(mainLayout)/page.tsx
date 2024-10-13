/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import dynamic from 'next/dynamic';
const ContentForm = dynamic(() => import('@/components/modules/content-form'), {
  ssr: false,
});
// import ContentForm from '@/components/modules/content-form';
import Post from '@/components/modules/Post';
import SearchingFiltering from '@/components/modules/searchng-filtering';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Filter, Pencil, Search } from '@/components/ui/icon';
import { PostLoadingSkeletonLeft } from '@/components/ui/post-loading-skeleton';
import { useGetAllPosts } from '@/hooks/post.hook';
import useDebounce from '@/hooks/use.debounce';
import { IPost } from '@/types';
import React from 'react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useUser } from '@/context/user.provider';
import Link from 'next/link';

export default function Home() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [category, setCategory] = React.useState('');
  const { user } = useUser();
  const [type, setType] = React.useState('');
  const [isOpen, setIsOpen] = React.useState(false);
  const [sortOption, setSortOption] = React.useState('');
  const isPremium =
    type === 'basic' ? false : type === 'premium' ? true : 'all';

  const delaySearch = useDebounce(searchTerm, 700);

  const { data, isLoading, error } = useGetAllPosts([
    { name: 'searchTerm', value: delaySearch },
    { name: 'category', value: category },
    { name: 'isPremium', value: isPremium },
    { name: 'isPublish', value: true },
  ]);

  const [sortedPosts, setSortedPosts] = React.useState<IPost[]>([]);

  React.useEffect(() => {
    if (data?.data?.result) {
      const posts = [...data.data.result];

      if (
        sortOption === 'rank' ||
        searchTerm.length > 0 ||
        (type !== 'all' && type.length) ||
        (category !== 'all' && category.length)
      ) {
        posts.sort((a, b) => {
          const rankA = a.upvotes.length - a.downvotes.length;
          const rankB = b.upvotes.length - b.downvotes.length;
          return rankB - rankA;
        });
      }

      setSortedPosts(posts);
    }
  }, [data, sortOption, searchTerm, category, type]);

  // // Apply sorting logic with the debounced sortOption
  // React.useEffect(() => {
  //   if (data?.data?.result) {
  //     let posts = [...data.data.result];
  //     setSortedPosts(posts);

  //     if (sortOption === 'rank') {
  //       setSortLoading(true);
  //       const timeoutId = setTimeout(() => {
  //         posts.sort((a, b) => {
  //           const rankA = a.upvotes.length - a.downvotes.length;
  //           const rankB = b.upvotes.length - b.downvotes.length;
  //           return rankB - rankA;
  //         });

  //         setSortedPosts(posts);
  //         setSortLoading(false);
  //       }, 500);

  //       return () => clearTimeout(timeoutId);
  //     }
  //   }
  // }, [data, sortOption]);

  const handlePopularPost = () => {
    if (sortOption === 'rank') {
      setSortOption(''); // Reset sorting
    } else {
      setSortOption('rank'); // Set sorting to rank
    }
  };

  if (error)
    return (
      <div className='h-[calc(100vh-150px)] flex justify-center items-center text-red-600 font-semibold text-2xl'>
        Unable to load data. Please check your internet connection and try
        again.
      </div>
    );

  return (
    <div className='flex items-start '>
      {isLoading ? (
        <div className='w-full md:w-[65%] pr-10  pt-10 '>
          <PostLoadingSkeletonLeft />
        </div>
      ) : (
        <div className='md:w-[65%] md:pr-6 lg:pr-10  pt-10 '>
          <div className='grid grid-cols-[1fr_30px] sm:flex  gap-5 items-start pb-7 sm:pb-4 border-b-2 border-textSecondary'>
            <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
              <DialogTrigger asChild>
                <button className='flex group items-center w-full  pb-3 relative'>
                  <span className='absolute left-4 top-2'>
                    <Pencil color={'#6A5ACD'} />
                  </span>
                  <span className='w-full bg-stone-100 border border-stone-300 duration-200  rounded-md pl-14 py-2.5 text-left'>
                    Create Post
                  </span>
                </button>
              </DialogTrigger>
              {user ? (
                <DialogContent className='md:max-w-[80%] rounded-md max-w-[90%] max-h-[90vh] overflow-y-auto '>
                  <DialogHeader>
                    <DialogTitle>Create Post</DialogTitle>
                  </DialogHeader>
                  <ContentForm setIsOpen={setIsOpen} />
                </DialogContent>
              ) : (
                <DialogContent className='max-w-md py-12 px-5 h-[240px] flex flex-col items-center gap-10'>
                  <p className='text-center text-lg font-medium'>
                    You need to be logged in to write a post. Please login or
                    signup to continue.
                  </p>

                  <div className='flex gap-4'>
                    <Link href='/register' className='w-max'>
                      <Button variant='outline' className='py-2 px-6'>
                        Signup
                      </Button>
                    </Link>
                    <Link href='/login' className='w-max'>
                      <Button className='py-2 px-6 border border-primary'>
                        Login
                      </Button>
                    </Link>
                  </div>
                </DialogContent>
              )}
            </Dialog>
            <div className='relative w-full col-span-2 order-last '>
              <input
                type='text'
                name='search'
                placeholder='Search...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='border pl-10 py-[11px] placeholder:text-textPrimary text-sm rounded-md outline-primary bg-stone-100 border-stone-300 w-full'
              />

              <div className='absolute top-3 left-3'>
                <Search />
              </div>
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <button className='md:hidden pt-1 sm:order-last'>
                  <Filter />
                </button>
              </SheetTrigger>
              <SheetContent className='pt-14'>
                <SearchingFiltering
                  type={type}
                  setType={setType}
                  category={category}
                  setCategory={setCategory}
                />

                <button
                  onClick={handlePopularPost}
                  className={`w-full text-sm duration-200 border ${
                    sortOption === 'rank' ? 'bg-primary text-white' : ''
                  } border-textSecondary rounded-md pl-4 py-3 text-left`}
                >
                  Popular posts
                </button>
                <SheetFooter>
                  <SheetClose asChild></SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
          <div className='pt-6'>
            {data?.data?.result?.length === 0 && (
              <div className='h-[70vh] flex justify-center items-center text-stone-600 font-semibold text-2xl'>
                No posts found for your search criteria.
              </div>
            )}
            {sortedPosts.map((item: IPost) => (
              <Post key={item._id} post={item} />
            ))}
          </div>
        </div>
      )}

      <div className=' md:w-[35%] md:pl-6 lg:pl-10 hidden md:flex flex-col gap-4 pt-10 border-l h-screen sticky top-0 right-0 border-stone-300'>
        <SearchingFiltering
          type={type}
          setType={setType}
          category={category}
          setCategory={setCategory}
        />

        <button
          onClick={handlePopularPost}
          className={`w-full text-sm duration-200 border ${
            sortOption === 'rank' ? 'bg-primary text-white' : ''
          } border-textSecondary rounded-md pl-4 py-3 text-left`}
        >
          Popular posts
        </button>
      </div>
    </div>
  );
}

// 'use client';

// import React, { useEffect, useRef, useState, useCallback } from 'react';
// import { useGetAllPosts } from '@/hooks/post.hook';
// import Post from '@/components/modules/Post';
// import { PostLoadingSkeletonLeft } from '@/components/ui/post-loading-skeleton';
// import SearchingFiltering from '@/components/modules/searchng-filtering';
// import { IPost } from '@/types';
// import useDebounce from '@/hooks/use.debounce';
// import { Pencil } from '@/components/ui/icon';
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from '@/components/ui/dialog';
// import dynamic from 'next/dynamic';
// import { useUser } from '@/context/user.provider';
// import { Button } from '@/components/ui/button';
// import Link from 'next/link';
// const ContentForm = dynamic(() => import('@/components/modules/content-form'), {
//   ssr: false,
// });

// export default function Home() {
//   const [searchTerm, setSearchTerm] = useState('');
//   const { user } = useUser();
//   const [category, setCategory] = useState('');
//   const [isOpen, setIsOpen] = React.useState(false);
//   const [type, setType] = useState('');
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const [sort, setSort] = useState('-createdAt');
//   const [isFetchingMore, setIsFetchingMore] = useState(false);
//   const isPremium =
//     type === 'basic' ? false : type === 'premium' ? true : 'all';
//   const delaySearch = useDebounce(searchTerm, 400);

//   const { data, isLoading, error } = useGetAllPosts([
//     { name: 'searchTerm', value: delaySearch },
//     { name: 'category', value: category },
//     { name: 'isPremium', value: isPremium },
//     { name: 'sort', value: sort },
//     { name: 'page', value: page },
//     { name: 'limit', value: 3 },
// { name: 'isPublish', value: true },
//   ]);

//   const [posts, setPosts] = useState<IPost[]>([]);

//   useEffect(() => {
//     if (data?.data?.result) {
//       if (page === 1) {
//         setPosts(data.data.result); // Reset to new fetched data
//       } else {
//         setPosts((prevPosts) => [...prevPosts, ...data.data.result]);
//       }

//       setHasMore(data.data.result.length > 0);
//     }
//     setIsFetchingMore(false);
//   }, [data, searchTerm, category, isPremium, sort, page]);

//   const observerRef = useRef<IntersectionObserver | null>(null);

//   const lastPostRef = useCallback(
//     (node: any) => {
//       if (isLoading || !hasMore || isFetchingMore) return;

//       if (observerRef.current) observerRef.current.disconnect();

//       observerRef.current = new IntersectionObserver((entries) => {
//         if (entries[0].isIntersecting) {
//           setIsFetchingMore(true);
//           setPage((prevPage) => prevPage + 1);
//         }
//       });

//       if (node) observerRef.current.observe(node);
//     },
//     [isLoading, hasMore, isFetchingMore]
//   );

//   useEffect(() => {
//     setPage(1);
//   }, [searchTerm, category, isPremium]);

//   const handleSort = () => {
//     if (sort === '-upvotes') {
//       setSort('createdAt');
//     }
//     setSort('-upvotes');
//   };

// if (error)
//   return (
//     <div className='h-[calc(100vh-150px)] flex justify-center items-center text-red-600 font-semibold text-2xl'>
//       Unable to load data. Please check your internet connection and try
//       again.
//     </div>
//   );

//   return (
//     <div className='flex items-start'>
//       {isLoading ? (
//         <div className=' w-[65%] pr-6 lg:pr-10  pt-10  '>
//           <PostLoadingSkeletonLeft />
//         </div>
//       ) : (
//         <div className='w-[65%] pr-6 lg:pr-10 pt-10 '>
//           {posts?.map((post, index) => (
//             <div
//               key={index}
//               ref={index === posts.length - 1 ? lastPostRef : null} // Attach ref to the last post
//             >
//               <Post post={post} />
//             </div>
//           ))}

//           {/* {isLoading && <PostLoadingSkeletonLeft />} */}
//           {/* {isLoading && <div>Loading more posts...</div>} */}
//         </div>
//       )}

//       <div className='w-[35%] md:pl-6 lg:pl-10 flex flex-col gap-4 pt-10  border-l h-screen sticky top-0 right-0 border-stone-300'>
//         <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
//           <DialogTrigger asChild>
//             <button className='flex group items-center border-b border-stone-300 pb-3 relative'>
//               <span className='absolute left-4 top-2'>
//                 <Pencil color={'black'} />
//               </span>
//               <span className='w-full bg-[#695acd5a] hover:bg-[#695acd5a]/40 duration-200 border border-stone-200 rounded-md pl-14 py-2.5 text-left'>
//                 What pet tips do you have?
//               </span>
//             </button>
//           </DialogTrigger>
//           {user ? (
//             <DialogContent className='max-w-[70%] max-h-[90vh] overflow-y-auto '>
//               <DialogHeader>
//                 <DialogTitle>Create Post</DialogTitle>
//               </DialogHeader>
//               <ContentForm setIsOpen={setIsOpen} />
//             </DialogContent>
//           ) : (
//             <DialogContent className='max-w-md py-12 px-5 h-[240px] flex flex-col items-center gap-10'>
//               <p className='text-center text-lg font-medium'>
//                 You need to be logged in to write a post. Please log in or sign
//                 up to continue.
//               </p>

//               <div className='flex gap-4'>
//                 <Link href='/register' className='w-max'>
//                   <Button variant='outline' className='py-2 px-6'>
//                     Signup
//                   </Button>
//                 </Link>
//                 <Link href='/login' className='w-max'>
//                   <Button className='py-2 px-6 border border-primary'>
//                     Login
//                   </Button>
//                 </Link>
//               </div>
//             </DialogContent>
//           )}
//         </Dialog>
//         <SearchingFiltering
//           type={type}
//           setType={setType}
//           category={category}
//           setCategory={setCategory}
//         />

//         <button
//           onClick={handleSort}
//           className={`w-full text-sm duration-200 border ${
//             sort === '-upvotes' ? 'bg-primary text-white' : ''
//           } border-textSecondary rounded-md pl-4 py-3 text-left`}
//         >
//           Popular posts
//         </button>
//       </div>
//     </div>
//   );
// }
