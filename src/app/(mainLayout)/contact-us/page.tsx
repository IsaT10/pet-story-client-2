import ContactForm from '@/components/ui/contact-form';

export default function ContactPage() {
  return (
    <>
      <h2 className='text-3xl text-center mt-10 font-semibold '>
        Reach out to us
      </h2>
      <div className='flex md:flex-row flex-col mt-4'>
        <div className='md:w-[45%] mt-10 px-5'>
          <h2 className='text-xl font-semibold mb-4'>Contect Info</h2>
          <div className='flex flex-col h-[85%] justify-between'>
            <div className='lg:text-base text-sm font-semibold space-y-4'>
              <p className='flex items-center gap-1.5'>
                {/* <Phone /> */}
                <span className='text-stone-600 font-normal'>
                  +1 (555) 123-4567
                </span>
              </p>
              <p className='flex items-center gap-1.5'>
                {/* <Message /> */}
                <span className='text-stone-600 font-normal'>
                  contact@petwise.com
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className='md:w-[55%]'>
          <ContactForm />
        </div>
      </div>
    </>
  );
}
