'use client';
import { useAppSelector } from '@/hooks';
import { useFetchData } from '@/hooks/useFetchData';
import React, { useState } from 'react';
import OTPInput from './OtpInput';
interface MyDataStructure {
  status: boolean;
}

interface MyDataType {
  ResultCode: number;
  resultCode: number;
  Status: string;
  status: string;
  Data: MyDataStructure;
  data: MyDataStructure;
  message: string;
}

const SendVerification = () => {
  const { email, phoneNumber } = useAppSelector(
    (state) => state.data.dataUserLogin
  );

  const [isValidOTP, setIsValidOTP] = useState<Boolean>(false);
  const { dataRes, isError, isLoading, mutate } = useFetchData<MyDataType>({
    endpoint: 'customer/login/send-otp',
    body: {
      phoneNumber,
      sendBy: 'SMSOTP',
      senderName: 'Muji Cafe',
    },
    method: 'POST',
  });
  if (isLoading) return <p className='text-center'>Loading...</p>;
  if (isError) return <p className='text-red-500 text-center'>{isError}</p>;

  if (dataRes?.data.status && isValidOTP) {
    return <OTPInput email={email} />;
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
