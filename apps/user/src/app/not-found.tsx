'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

const NotFoundPage = () => {
  const router = useRouter();

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='text-center'>
        <h1 className='text-6xl font-bold text-gray-800 mb-4'>404</h1>
        <p className='text-xl text-gray-600 mb-8'>Oops! Page not found.</p>
        <div className='space-y-4'>
          <button
            onClick={() => router.push('/')}
            className='px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300'
          >
            Go to Homepage
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
