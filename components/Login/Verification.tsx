import React, { useState } from 'react';

const Verification: React.FC = () => {
  const [code, setCode] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Verification code:', code);
  };

  return (
    <div className='flex justify-center items-center h-full'>
      <div className='w-full max-w-md bg-white p-8 rounded-lg'>
        <h2 className='text-xl font-bold mb-4 text-center'>Verification</h2>
        <p className='text-gray-700 text-center mb-6'>
          You will receive a 4-digit verification code via Email at{' '}
          <strong>asdasd2@asd.com</strong>
        </p>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label
              htmlFor='code'
              className='block text-sm font-medium text-gray-700'
            >
              Verification Code
            </label>
            <input
              id='code'
              type='text'
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              required
            />
          </div>
          <button
            type='submit'
            className='w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
          >
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
};

export default Verification;
