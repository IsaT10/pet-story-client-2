import { z } from 'zod';

export const contactValidationSchema = z.object({
  name: z.string().min(1, 'Please enter your name!'),
  email: z.string().trim().email('Please enter a valid email'),

  message: z.string().min(1, 'Please write your message!'),
});
