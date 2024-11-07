export default function Notifications({ showNotifications }) {
  return (
    <>
      {showNotifications ? (
        <div className='w-[350px] border border-stone-300 px-4 py-8 h-screen bg-white absolute top-0 left-[250px] bottom-2'>
          <h2 className='text-2xl font-bold'>Notification</h2>
        </div>
      ) : (
        ''
      )}
    </>
  );
}
