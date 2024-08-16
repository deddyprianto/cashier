'use client';
import { setInfoToken } from '@/features/dataSlicePersisted';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/hooks';
import React, { useRef, useState } from 'react';
import { useAppSelector } from '@/hooks';

const OTPInput = () => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { email } = useAppSelector((state) => state.data.dataUserLogin);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const otpRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_API}customer/login`,
        {
          method: 'POST',
          body: JSON.stringify({ codeOTP: otpRef.current?.value, email }),
          headers: {
            'Content-type': 'application/json',
          },
        }
      );
      setIsLoading(false);
      const data = await response.json();
      if (data.Status === 'SUCCESS') {
        dispatch(
          setInfoToken({
            accessToken: data?.data?.accessToken,
            domainName: data?.data?.domainName,
            idToken: data?.data?.idToken,
            refreshToken: data?.data?.refreshToken,
            statusCustomer: data?.data?.statusCustomer,
            isLogin: true,
          })
        );
        router.push('/');
      } else {
        setErrorMessage(data?.data?.message);
      }
    } catch (error) {
      console.log(error);
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
