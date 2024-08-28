'use client';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks';
import axios from 'axios';

const OTPInput = () => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { email, phoneNumber } = useAppSelector(
    (state) => state.data.dataUserLogin
  );
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const otpRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    const payload = {
      codeOTP: otpRef.current?.value,
      phoneNumber: `+65${phoneNumber}`,
    };
    try {
      const response = await axios.post('/api/otp', payload, {
        headers: {
          'Content-type': 'application/json',
        },
      });
      console.log(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.response?.data);
      } else {
        console.error('An unexpected error occurred:', error);
      }
    } finally {
      if (otpRef.current) {
        otpRef.current.value = '';
      }
    }
  };

  return (
    <div className='flex flex-col items-center justify-center bg-gray-100 p-[16px]'>
      <h2 className='text-2xl font-bold mb-6'>Enter OTP</h2>
      <p className='text-gray-600 mb-8'>
        You will receive a 4-digit verification code via Email at{' '}
        <span className='font-semibold'>{email}</span>
      </p>
      <input
        ref={otpRef}
        type='text'
        className='w-full h-12 border border-gray-300 rounded-md text-center text-xl focus:outline-none focus:ring-2 focus:ring-teal-500'
      />
      <button
        onClick={handleSubmit}
        className={`w-full py-2 mt-5 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm flex items-center justify-center ${
          isLoading && 'opacity-50'
        }`}
      >
        {isLoading && <span className='loader'></span>}
        <div>{isLoading ? 'Please wait...' : 'Confirm'}</div>
      </button>
      <p className='italic text-red-500 font-bold text-[12px]'>
        {errorMessage}
      </p>
    </div>
  );
};

export default OTPInput;
