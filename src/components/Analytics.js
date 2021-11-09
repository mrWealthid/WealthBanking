import React from 'react';

const Analytics = ({ counts, color, icon }) => {
  return (
    <section className='close flex flex-col gap-2 text-gray-200 items-center justify-center bg-contain cap h-40 rounded-lg p-5'>
      <div className='bg-white text-green-600 w-8 h-8 rounded-full flex items-center justify-center '>
        {icon}
      </div>

      <p className='text-2xl'>₦{counts}</p>
    </section>
  );
};

export default Analytics;
