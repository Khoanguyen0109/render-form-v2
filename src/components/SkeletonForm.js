import React from 'react';

function SkeletonForm() {
  return (
    <div className=' w-full rounded overflow-hidden shadow-lg'>
      <div className='px-6 py-4 animate-pulse '>
        <div className='font-bold sm:text-2xl md:text-xl rounded mb-2 bg-slate-500 h-24 '></div>
        <p className='text-gray-700 bg-slate-500 text-base rounded h-96'></p>
      </div>
    </div>
  );
}

export default SkeletonForm;
