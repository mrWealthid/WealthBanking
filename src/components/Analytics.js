import React from 'react';

const Analytics = ({ counts, color, icon }) => {
  return (
    <section
      className={`${color} flex flex-col w-full gap-2 text-gray-200 items-center justify-center bg-contain cap h-40 rounded-lg p-5 bg-blend-screen items-center  max-w-md mx-auto`}
    >
      <div className='glass text-green-600 w-8 h-8 rounded-full flex items-center justify-center '>
        {icon}
      </div>

      <p className='text-lg'>₦ {counts}</p>
    </section>
  );
};

export default Analytics;
