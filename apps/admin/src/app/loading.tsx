import { LoadingSpinner } from '@jeiltodo/ui/shared';
import React from 'react';

const Loading = () => {
  return (
    <div className='relative w-screen h-screen'>
      <LoadingSpinner />
    </div>
  );
};

export default Loading;
