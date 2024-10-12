'use client';
import { useState } from 'react';
import { toast } from 'sonner';
import { Spinner } from './icon';
import { Button } from './button';

const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  // State to store validation errors
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: '',
  });

  // Handle form input change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear validation error for the input being typed in
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  // Form validation logic
  const validate = () => {
    let formIsValid = true;

    const newErrors = {
      name: '',
      email: '',
      message: '',
    };

    if (!formData.name) {
      formIsValid = false;
      newErrors.name = 'Name is required';
    }

    if (!formData.email) {
      formIsValid = false;
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formIsValid = false;
      newErrors.email = 'Invalid email format';
    }

    if (!formData.message) {
      formIsValid = false;
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return formIsValid;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      setTimeout(() => {
        // Show success toast or message
        toast.success('Message sent successfully');
        // Reset the form after successful submission

        setLoading(false);
        setFormData({
          name: '',
          email: '',
          message: '',
        });
      }, 1000);
    }
  };

  return (
    <div className=' bg-white rounded-lg p-6'>
      <form onSubmit={handleSubmit}>
        <div className='py-3'>
          <label htmlFor='name' className='block mb-1'>
            Name
          </label>
          <input
            id='name'
            name='name'
            type='text'
            value={formData.name}
            onChange={handleInputChange}
            className='w-full border border-textSecondary outline-primary p-2 rounded'
          />
          {errors.name && <p className='text-red-500 text-sm'>{errors.name}</p>}
        </div>

        <div className='py-3'>
          <label htmlFor='email' className='block mb-1'>
            Email
          </label>
          <input
            id='email'
            name='email'
            type='text'
            value={formData.email}
            onChange={handleInputChange}
            className='w-full border border-textSecondary outline-primary p-2 rounded'
          />
          {errors.email && (
            <p className='text-red-500 text-sm'>{errors.email}</p>
          )}
        </div>

        <div className='py-3'>
          <label htmlFor='message' className='block mb-1'>
            Message
          </label>
          <textarea
            id='message'
            name='message'
            rows={5}
            value={formData.message}
            onChange={handleInputChange}
            className='w-full border border-textSecondary outline-primary p-2 rounded'
          />
          {errors.message && (
            <p className='text-red-500 text-sm'>{errors.message}</p>
          )}
        </div>

        <Button
          type='submit'
          className='text-center mt-4 mb-3 bg-primary text-white w-full h-10 rounded-md'
        >
          {loading ? <Spinner className='animate-spin h-4' /> : 'Send'}
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
