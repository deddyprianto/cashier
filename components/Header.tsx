'use client';
import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className='sticky top-0 bg-white shadow-md'>
      <div className='container mx-auto px-4 py-2 flex justify-between items-center'>
        <h1 className='text-xl font-bold'>My Sticky Header</h1>
        <nav>
          <ul className='flex space-x-4'>
            <li>
              <a href='#home' className='text-blue-500 hover:underline'>
                Home
              </a>
            </li>
            <li>
              <a href='#about' className='text-blue-500 hover:underline'>
                About
              </a>
            </li>
            <li>
              <Link
                href='/login'
                className='flex justify-center items-center flex-col'
              >
                <p className='text-blue-500 hover:underline'>Login</p>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
