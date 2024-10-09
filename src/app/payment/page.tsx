'use client';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import '@/styles/payment.css';
import envConfig from '@/config/envConfig';
import PaymentForm from '@/components/modules/payment-form';
// import PaymentForm from '../PaymentForm';

export default function Payment() {
  const publishable_key = envConfig.stripe_publishable_key as string;

  const stripePromise = loadStripe(publishable_key);
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
}
