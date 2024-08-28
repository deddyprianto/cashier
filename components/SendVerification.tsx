'use client';
import { useAppSelector } from '@/hooks';
import { useFetchData } from '@/hooks/useFetchData';
import React, { useState } from 'react';
import OTPInput from './OtpInput';

interface DataType {
  status: string;
}

const SendVerification = () => {
  const { phoneNumber } = useAppSelector((state) => state.data.dataUserLogin);
  const [isValidOTP, setIsValidOTP] = useState<boolean>(false);
  const { dataRes, isError, isLoading, mutate } = useFetchData<DataType>({
    endpoint: 'customer/login/send-otp',
    body: {
      phoneNumber: `+65${phoneNumber}`,
      sendBy: 'SMSOTP',
      senderName: 'Muji Cafe',
    },
    method: 'POST',
  });
  if (isLoading) return <p className='text-center'>Loading...</p>;
  if (isError)
    return <p className='text-red-500 text-center'>{isError.toString()}</p>;

  if (dataRes?.status === 'SUCCESS' && isValidOTP) {
    return <OTPInput />;
  } else {
    return (
      <div className='p-5'>
        <p className='text-center'>
          You will receive 4-digit verification to this phone number <br />{' '}
          {phoneNumber}
        </p>
        <button
          onClick={() => setIsValidOTP(true)}
          className={`mt-3 w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md `}
        >
          Continue
        </button>
      </div>
    );
  }
};

export default SendVerification;
