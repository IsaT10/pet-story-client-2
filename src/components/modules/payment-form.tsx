import React from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

import { toast } from 'sonner';
import { useUser } from '@/context/user.provider';
import { updateUserStatus } from '@/services/user';
import { logout } from '@/services/auth';
import { useRouter } from 'next/navigation';
import { useSavePayment } from '@/hooks/payment.hook';
import envConfig from '@/config/envConfig';

export default function PaymentForm() {
  const { user, setIsLoading } = useUser();
  const stripe = useStripe();
  const router = useRouter();
  const elements = useElements();
  const { mutate: handleSavePayment } = useSavePayment();
  const currentDate = new Date(); // Current date and time
  currentDate.setDate(currentDate.getDate() + 30); // Add 30 days

  const expiredDate = currentDate.toISOString();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const sonnerId = toast.loading('Payment completing...');

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement!,
    });

    if (error) {
      toast.error('Something went wrong. Please try again!', { id: sonnerId });
    } else {
      const response = await fetch(
        `${envConfig.baseApi}/payments/create-payment-intent`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: 20 * 100,
          }),
        }
      );

      console.log({ response });

      const { clientSecret } = await response.json();

      const { error: confirmError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: paymentMethod.id,
        });

      if (confirmError) {
        console.log('Payment failed:', confirmError.message);
        toast.success('Payment denied', { id: sonnerId });
      } else if (paymentIntent.status === 'succeeded') {
        try {
          await updateUserStatus(user!._id);

          handleSavePayment(
            { expiredDate },
            {
              onSuccess: () => {
                logout();
                setIsLoading(true);
                router.push('/success');
              },
            }
          );
          toast.success('Payment complete', { id: sonnerId });
        } catch (error) {
          console.log(error);
          toast.error('Something went wrong!', { id: sonnerId });
        } finally {
        }
      }
    }
  };

  return (
    <div className='h-screen flex flex-col items-center justify-center bgst'>
      <div
        className='bg-white flex justify-between shadow-[0_10px_20px_rgba(0,0,0,0.2)] w-[800px] h-[300px] mx-auto divide-x'
        style={{
          padding: '3rem',
        }}
      >
        <div className='w-[45%]'>
          <p>Payment</p>
          <h4 className=' t text-2xl font-semibold  uppercase'>$20</h4>
        </div>

        <div
          style={{
            width: '55%',
            maxWidth: '500px',
            paddingLeft: '40px',
          }}
        >
          <h4 className='text-lg font-semibold mb-6'>Payment with card</h4>
          {/* Single form here */}
          <form
            onSubmit={handleSubmit}
            style={{
              display: 'block',
              width: '100%',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <CardElement
                className='card'
                options={{
                  style: {
                    base: {
                      backgroundColor: 'white',
                    },
                  },
                }}
              />
              <button className='pay-button' type='submit' disabled={!stripe}>
                Pay
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
