import { LoadingSpinner } from '@jeiltodo/ui/shared';
import React from 'react';

function Loading() {
  return (
    <div className='relative w-screen h-screen'>
      <LoadingSpinner />
    </div>
  );
}

export default Loading;
