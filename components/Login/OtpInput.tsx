'use client';
import { setInfoToken } from '@/features/dataSlicePersisted';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/hooks';
import React, { useRef, useState } from 'react';

interface OTPInputParams {
  email: string;
}

const OTPInput: React.FC<OTPInputParams> = ({ email }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const otpRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        'https://api-muji.proseller-dev.com/crm/api/customer/login',
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
          })
        );
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center bg-gray-100 p-[16px]'>
      <h2 className='text-2xl font-bold mb-6'>Enter OTP</h2>
      <p className='text-gray-600 mb-8'>
        You will receive a 4-digit verification code via Email at
        <span className='font-semibold'>asdasd2@asd.com</span>
      </p>
      <input
        ref={otpRef}
        type='text'
        className='w-full h-12 border border-gray-300 rounded-md text-center text-xl focus:outline-none focus:ring-2 focus:ring-teal-500'
      />
      <button
        onClick={handleSubmit}
        className={`w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm ${
          isLoading && 'opacity-50'
        }`}
      >
        {isLoading ? 'Please wait...' : 'Confirm'}
      </button>
    </div>
  );
};

export default OTPInput;
