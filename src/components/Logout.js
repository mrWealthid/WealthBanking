import React, { useEffect, useState } from 'react';

const Logout = () => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter(counter + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [counter]);
  return (
    <div className='min-h-screen cap bg-contain animate-pops flex flex-col items-center justify-center gap-3'>
      <div className='grid rounded-full overflow-hidden  shadow-2xl grid-cols-2  w-28 h-28'>
        <p className='bg-gray-200'></p>
        <p className='bg-white'></p>
        <p className='bg-yellow-400'></p>
        <p className='bg-gray-700'></p>
      </div>

      {/* <p className='text-2xl'> Logging Out Shortly... {counter}</p> */}
    </div>
  );
};

export default Logout;
