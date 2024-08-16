import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <header className='sticky top-0 bg-white shadow-md'>
      <div className='container mx-auto px-4 py-2 flex justify-between items-center'>
        <h1 className='text-xl font-bold'>Web App Order</h1>
        <nav>
          <ul className='flex space-x-4'>
            <li>
              <Link
                href='/'
                className='flex justify-center items-center flex-col'
              >
                <p className='text-blue-500 hover:underline'>Home</p>
              </Link>
            </li>
            <li>
              <Link
                href='/outlet'
                className='flex justify-center items-center flex-col'
              >
                <p className='text-blue-500 hover:underline'>Outlet</p>
              </Link>
            </li>
            <li>
              <Link
                href='/login'
                className='flex justify-center items-center flex-col'
              >
                <p className='text-blue-500 hover:underline'>Login</p>
              </Link>
            </li>
            <li>
              <Link
                href='/register'
                className='flex justify-center items-center flex-col'
              >
                <p className='text-blue-500 hover:underline'>Register</p>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
