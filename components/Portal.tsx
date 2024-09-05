'use client';
import React, { useState } from 'react';
import { Popup } from './Popup';
import {useFormStatus} from 'react-dom'
import { createNewUser } from '@/app/portal/actions';
interface PropsData {
  data: [];
}
interface MappingItem {
  id: string;
  name: string;
  address: string;
}

const PortalCP: React.FC<PropsData> = ({ data }) => {
  const {pending}  = useFormStatus()
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div>
      <div className='w-full flex justify-end'>
        <button
          onClick={() => setIsOpen(true)}
          className='bg-blue-600 text-white font-bold rounded-lg p-[10px]'
        >
          Create New User
        </button>
      </div>
      <div className='mt-10'>
        {data.map((item: MappingItem) => {
          return (
            <ul key={item.id}>
              <li>Name: {item.name}</li>
              <li>Address: {item.address}</li>
            </ul>
          );
        })}
      </div>

      <Popup fullScreen={false} isOpen={isOpen} setIsOpen={setIsOpen}>
        <form action={createNewUser} className='p-[16px]'>
          <div>
            <label htmlFor='username' className='block text-sm text-gray-500'>
              Name
            </label>
            <input
              name='name'
              type='text'
              placeholder='John Doe'
              className='block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-200 dark:bg-gray-100  dark:focus:border-blue-300'
            />
          </div>
          <div className='mt-4'>
            <label htmlFor='username' className='block text-sm text-gray-500'>
              Address
            </label>
            <input
              name='address'
              type='text'
              placeholder='John Doe'
              className='block mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-200 dark:bg-gray-100  dark:focus:border-blue-300'
            />
          </div>
          <button
            type='submit'
            className={`w-full py-2 mt-5 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm flex items-center justify-center ${
              pending && 'opacity-50'
            }`}
          >
            {pending && <span className='loader'></span>}
            <div>{pending ? 'Please wait...' : 'Confirm'}</div>
          </button>
        </form>
      </Popup>
    </div>
  );
};

export default PortalCP;
