import React from 'react';

function SkeletonCard() {
  return (
    <div className='sm:max-w-3xl lg:max-w-sm rounded overflow-hidden shadow-lg'>
      <div className='px-6 py-4 animate-pulse '>
        <div className='font-bold sm:text-2xl md:text-xl rounded mb-2 bg-slate-500 h-3 '></div>
        <p className='text-gray-700 bg-slate-500 text-base rounded h-24'></p>
      </div>
    </div>
  );
}

export default SkeletonCard;
