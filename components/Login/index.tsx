'use client';
import { useAppDispatch } from '@/hooks';
import React, { useRef, useState } from 'react';
import { Popup } from '../Popup';
import SendVerification from '../SendVerification';
import { setDataUser } from '@/features/dataSlice';
import { handledData } from '@/helper';
import Link from 'next/link';

interface DataType {
  message: string;
  inValid: boolean;
  status: boolean;
}
interface CheckAccountData {
  data: DataType;
}

const LoginCP = () => {
  const refPhoneNumber = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLogIn, setIsLogIn] = useState<boolean>(false);
  // FN
  const handleLoginBtn = async () => {
    setIsLoading(true);
    const { data } = await handledData<CheckAccountData>({
      endPoint: 'customer/login/check-account',
      method: 'POST',
      payload: {
        phoneNumber: `+65${refPhoneNumber.current?.value}`,
      },
      baseURL: 'https://api-newmujicafe.proseller-demo.com/crm/api/',
    });

    setIsLoading(false);
    setIsOpen(true);
    console.log(data?.data?.status);
    if (data?.data?.status) {
      setIsLogIn(true);
      dispatch(
        setDataUser({
          phoneNumber: refPhoneNumber.current?.value || '',
          email: '',
        })
      );
    } else {
      setIsLogIn(false);
    }
  };
  return (
    <div className='flex justify-center items-center h-screen bg-gray-100 px-4'>
      <div className='w-full max-w-md bg-white p-8 rounded-lg shadow-md'>
        <h2 className='text-2xl font-bold mb-6 text-center'>Login</h2>
        <div className='space-y-4'>
          <div>
            <label
              htmlFor='mobile'
              className='block text-sm font-medium text-gray-700'
            >
              Mobile Phone Number
            </label>
            <input
              ref={refPhoneNumber}
              name='phoneNumber'
              id='mobile'
              type='text'
              className='text-center mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              required
            />
          </div>
          <button
            onClick={handleLoginBtn}
            className={`w-full py-2 mt-5 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm flex items-center justify-center ${
              isLoading && 'opacity-50'
            }`}
          >
            {isLoading && <span className='loader'></span>}
            <div>{isLoading ? 'Please wait...' : 'Confirm'}</div>
          </button>
        </div>
      </div>
      <Popup fullScreen={false} isOpen={isOpen} setIsOpen={setIsOpen}>
        {isLogIn ? (
          <SendVerification />
        ) : (
          <div className='text-center bg-white p-20 '>
            <p>Your are not login</p>
            <Link
              href='/register'
              className='flex justify-center items-center flex-col'
            >
              <p className='text-blue-500 hover:underline'>Register Now</p>
            </Link>
          </div>
        )}
      </Popup>
    </div>
  );
};

export default LoginCP;
