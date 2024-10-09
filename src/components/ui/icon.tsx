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
    strokeWidth='4'
    stroke='black'
    className='size-4 '
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18'
    />
  </svg>
);
export const DownArrow = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    strokeWidth='4'
    stroke='black'
    className='size-4'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3'
    />
  </svg>
);
export const Comment = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    strokeWidth='1.5'
    stroke='currentColor'
    className='size-5'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z'
    />
  </svg>
);
export const Send = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    strokeWidth='2'
    stroke='#6A5ACD'
    className='size-6'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5'
    />
  </svg>
);
export const Pencil = ({ color }: { color?: string }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    strokeWidth='1'
    stroke={color}
    className='size-7'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10'
    />
  </svg>
);
export const Eyeslash = ({ color }: { color?: string }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    strokeWidth='2.5'
    stroke='black'
    className='size-6'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88'
    />
  </svg>
);
export const Plus = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    strokeWidth='2.5'
    stroke='#EF9A1B'
    className='size-5'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M12 4.5v15m7.5-7.5h-15'
    />
  </svg>
);
export const PremiumPost = () => (
  <svg
    width='24'
    height='50'
    viewBox='0 0 66 96'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path d='M48.7 95.4L33 85.5L17.3 95.4V29.1H48.7V95.4Z' fill='#6A5ACD' />
    <path
      d='M33 65C50.7836 65 65.2 50.5836 65.2 32.8C65.2 15.0164 50.7836 0.599976 33 0.599976C15.2164 0.599976 0.800049 15.0164 0.800049 32.8C0.800049 50.5836 15.2164 65 33 65Z'
      fill='#F5A500'
    />
    <path
      d='M33 58.1C46.9728 58.1 58.3 46.7728 58.3 32.8C58.3 18.8272 46.9728 7.5 33 7.5C19.0272 7.5 7.69995 18.8272 7.69995 32.8C7.69995 46.7728 19.0272 58.1 33 58.1Z'
      fill='#FFB32B'
    />
    <path
      d='M34.1999 17.7L38.4 26.0999C38.6 26.4999 39 26.8 39.4 26.9L48.6999 28.2999C49.7999 28.4999 50.2999 29.7999 49.4999 30.5999L42.8 37.2C42.5 37.5 42.3 38 42.4 38.4L43.9999 47.7C44.1999 48.8 42.9999 49.6999 41.9999 49.0999L33.6999 44.7C33.2999 44.5 32.8 44.5 32.4 44.7L23.9999 49.0999C22.9999 49.5999 21.7999 48.8 21.9999 47.7L23.5999 38.4C23.6999 38 23.4999 37.5 23.1999 37.2L16.4999 30.5999C15.6999 29.7999 16.0999 28.3999 17.2999 28.2999L26.5999 26.9C26.9999 26.8 27.3999 26.5999 27.5999 26.0999L31.7999 17.7C32.2999 16.7 33.6999 16.7 34.1999 17.7Z'
      fill='white'
    />
  </svg>
);

export const PremiumUser = ({
  className = 'size-6',
}: {
  className?: string;
}) => (
  <svg
    viewBox='0 0 93 93'
    className={className}
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M46.3 0L57 6.2H69.4L75.6 17L86.4 23.2V35.6L92.6 46.3L86.4 57V69.4L75.6 75.6L69.4 86.4H57L46.3 92.6L35.6 86.4H23.2L17 75.6L6.2 69.4V57L0 46.3L6.2 35.6V23.2L17 17L23.2 6.2H35.6L46.3 0Z'
      fill='#6A5ACD'
    />
    <path
      d='M46.3 80.2C27.6 80.2 12.4 65 12.4 46.3C12.4 27.6 27.6 12.4 46.3 12.4C65 12.4 80.2 27.6 80.2 46.3C80.2 65 65 80.2 46.3 80.2ZM46.3 15.3C29.2 15.3 15.3 29.2 15.3 46.3C15.3 63.4 29.2 77.3 46.3 77.3C63.4 77.3 77.3 63.4 77.3 46.3C77.3 29.2 63.4 15.3 46.3 15.3Z'
      fill='white'
    />
    <path
      d='M42.6 58.9001L27.9 47.2001C26.7 46.2001 26.5 44.5001 27.5 43.3001C28.5 42.1001 30.2 41.9001 31.4 42.9001L44 53.0001L60.8 34.2001C61.8 33.1001 63.6 33.0001 64.7 34.0001C65.8 35.0001 65.9 36.8001 64.9 37.9001L46.4 58.6001C45.4 59.7001 43.7 59.8001 42.6 58.9001Z'
      fill='#FFF'
    />
  </svg>
);
