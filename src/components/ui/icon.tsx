export const Spinner = ({ className }: { className?: string }) => (
  <svg
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className={className}
  >
    <path d='M21 12a9 9 0 1 1-6.219-8.56' />
  </svg>
);

export const UpArrow = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    stroke-width='4'
    stroke='black'
    className='size-4 '
  >
    <path
      stroke-linecap='round'
      stroke-linejoin='round'
      d='M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18'
    />
  </svg>
);
export const DownArrow = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    stroke-width='4'
    stroke='black'
    className='size-4'
  >
    <path
      stroke-linecap='round'
      stroke-linejoin='round'
      d='M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3'
    />
  </svg>
);
export const Comment = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    stroke-width='1.5'
    stroke='currentColor'
    className='size-5'
  >
    <path
      stroke-linecap='round'
      stroke-linejoin='round'
      d='M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z'
    />
  </svg>
);
export const Send = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    stroke-width='2'
    stroke='#6A5ACD'
    className='size-6'
  >
    <path
      stroke-linecap='round'
      stroke-linejoin='round'
      d='M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5'
    />
  </svg>
);
export const Pencil = ({ color }: { color?: string }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    stroke-width='1'
    stroke={color}
    className='size-7'
  >
    <path
      stroke-linecap='round'
      stroke-linejoin='round'
      d='m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10'
    />
  </svg>
);
