import React from 'react';

function Tooltip({ children, message }) {
  return (
    <div class='group flex relative'>
      {children}
      <span
        className=' lg:group-hover:block -top-10 transition-opacity bg-gray-800 px-1 text-sm w-80 text-gray-100 rounded-md absolute left-1/2 
        -translate-x-1/2 -translate-y-full hidden m-4 mx-auto'
      >
        {message}
      </span>
    </div>
  );
}

export default Tooltip;
