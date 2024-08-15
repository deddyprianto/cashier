'use client';
import { useAppDispatch } from '@/hooks';
import React, { useRef, useState } from 'react';
import { Popup } from '../Popup';
import SendVerification from '../SendVerification';
import { setDataUser } from '@/features/dataSlice';

const LoginCP = () => {
  const refPhoneNumber = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState<boolean>(false);

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
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              required
            />
          </div>
          <button
            onClick={() => {
              dispatch(
                setDataUser({
                  phoneNumber: refPhoneNumber.current?.value || '',
                  email: ''
                })
              );
              setIsOpen(true);
            }}
            className='bg-indigo-500 rounded-lg flex justify-center items-center py-3 px-3 text-white w-full cursor-pointer'
          >
            Login
          </button>
        </div>
      </div>
      <Popup fullScreen={false} isOpen={isOpen} setIsOpen={setIsOpen}>
        {/* <SendVerification /> */}
        <div>asd</div>
      </Popup>
    </div>
  );
};

export default LoginCP;
