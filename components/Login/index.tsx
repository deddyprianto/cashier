'use client';
import React, { useState } from 'react';
import { Popup } from '../Popup';
import Verification from './Verification';

interface LoginProps {
  createRegisterUser: (formData: FormData) => Promise<{
    success: boolean;
    data?: any;
    error?: string;
  }>;
}

const Login: React.FC<LoginProps> = ({ createRegisterUser }) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dataSenderObj, setDataSenderObj] = useState<object>({});

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const result = await createRegisterUser(
        new FormData(event.currentTarget)
      );
      setIsLoading(false);
      if (result.success) {
        setDataSenderObj(result.data);
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
    <div className='flex justify-center items-center h-screen bg-gray-100'>
      <div className='w-full max-w-md bg-white p-8 rounded-lg shadow-md'>
        <h2 className='text-2xl font-bold mb-6 text-center'>Login</h2>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label
              htmlFor='name'
              className='block text-sm font-medium text-gray-700'
            >
              Name
            </label>
            <input
              id='name'
              name='username'
              type='text'
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
              name='mobilePhone'
              id='mobile'
              type='number'
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
            {isLoading ? 'Please wait...' : 'Login'}
          </button>
        </form>
        {message && <p className='text-center text-red-500'>{message}</p>}
      </div>
      <Popup
        fullScreen={false}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        dataSender={dataSenderObj}
      >
        <Verification />
      </Popup>
    </div>
  );
};

export default Login;
