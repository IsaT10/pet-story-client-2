// 'use client';

// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from '@/components/ui/dialog';
// import React from 'react';
// import UserList from './user-list';

// export default function FollowAndFollowingModal({ followers, following }) {
//   const [isOpen, setIsOpen] = React.useState(false);
//   const [showFollowing, setShowFollowing] = React.useState(false);

//   return (
//     <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
//       <DialogTrigger asChild>
//         <>
//           <button
//             className={`group md:w-full flex items-center gap-3 my-2 duration-200 rounded-lg hover:bg-stone-100 md:py-3 md:px-3 `}
//           >
//             <span className='transition-transform duration-200 group-hover:scale-105'></span>
//             <span className='md:inline-block hidden'>Followrs</span>
//           </button>

//           <button
//             className={`group md:w-full flex items-center gap-3 my-2 duration-200 rounded-lg hover:bg-stone-100 md:py-3 md:px-3 `}
//           >
//             <span className='transition-transform duration-200 group-hover:scale-105'></span>
//             <span className='md:inline-block hidden'>Following</span>
//           </button>
//         </>
//       </DialogTrigger>
//       <DialogContent className='md:max-w-[400px] rounded-md  p-0'>
//         <DialogHeader className=''>
//           <DialogTitle className='text-center py-4 border-b mb-5 border-stone-300'>
//             Followers
//           </DialogTitle>
//         </DialogHeader>
//         <div className='h-[360px] overflow-y-auto  px-6'>
//           {followers && followers?.length > 0 ? (
//             <div className='flex flex-col  divide-y divide-stone-200'>
//               {followers?.map((user) => (
//                 <UserList key={user._id} user={user} />
//               ))}
//             </div>
//           ) : (
//             <p className='h-[300px] text-stone-500 text- px-5 font- text-center flex flex-col items-center justify-center'>
//               You currently have no followers. Don't worry! Keep engaging and
//               sharing your sotry.
//             </p>
//           )}

//           {/* {showFollowing?} */}

//           {following && following?.length > 0 ? (
//             <div className='flex flex-col  divide-y divide-stone-200'>
//               {following?.map((user) => (
//                 <UserList key={user._id} user={user} isFollowing={true} />
//               ))}
//             </div>
//           ) : (
//             <p className='h-[300px] text-stone-500 text- px-5 font- text-center flex flex-col items-center justify-center'>
//               It looks like you’re not following anyone right now.
//             </p>
//           )}
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }
