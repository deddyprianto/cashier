'use client';
import React, { useState } from 'react';
import { Popup } from '../Popup';
import SendVerification from '../SendVerification';
import { useAppDispatch } from '@/hooks';
import { setDataUser } from '@/features/dataSlice';

interface CreateRegisterUserResults {
  success: boolean;
  data?: any;
  error?: string;
}
interface RegisterProps {
  createRegisterUser: (
    formData: FormData
  ) => Promise<CreateRegisterUserResults>;
}

const Register: React.FC<RegisterProps> = ({ createRegisterUser }) => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // FN
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const result = await createRegisterUser(
        new FormData(event.currentTarget)
      );
      setIsLoading(false);
      if (result.success) {
        dispatch(
          setDataUser({
            phoneNumber: result.data?.data?.phoneNumber,
            email: result.data?.data?.email,
          })
        );
        setIsOpen(true);
        setMessage('Registration successful!');
        console.log('Registration data:', result.data);
      } else {
        setIsOpen(false);
        setMessage(`Registration failed: ${result.error}`);
      }
    } catch (error) {
      setMessage('An unexpected error occurred');
      console.error('Error in handleSubmit:', error);
    }
  };

  return (
    <div className='flex justify-center items-center h-screen bg-gray-100 px-4'>
      <div className='w-full max-w-md bg-white p-8 rounded-lg shadow-md'>
        <h2 className='text-2xl font-bold mb-6 text-center'>Register</h2>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label
              htmlFor='name'
              className='block text-sm font-medium text-gray-700'
            >
              Email
            </label>
            <input
              id='name'
              name='username'
              type='email'
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              required
            />
          </div>
          <div>
            <label
              htmlFor='mobile'
              className='block text-sm font-medium text-gray-700'
            >
              Mobile Phone Number
            </label>
            <input
              name='phoneNumber'
              id='mobile'
              type='text'
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              required
            />
          </div>
          <button
            type='submit'
            disabled={isLoading}
            className={`w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm ${
              isLoading && 'opacity-50'
            }`}
          >
            {isLoading ? 'Please wait...' : 'Register'}
          </button>
        </form>
        {message && <p className='text-center text-red-500'>{message}</p>}
      </div>
      <Popup fullScreen={false} isOpen={isOpen} setIsOpen={setIsOpen}>
        <SendVerification />
      </Popup>
    </div>
  );
};

export default Register;
