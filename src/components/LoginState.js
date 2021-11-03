import React, { useState, useEffect } from 'react';

const LoginState = () => {
  const [counter, setCounter] = useState(4);

  useEffect(() => {
    const timer = setInterval(() => {
      counter > 0 && setCounter(counter - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [counter]);
  return (
    <div className='min-h-screen flex animate-slideIn flex-col items-center justify-center gap-3'>
      <div className='grid rounded-full overflow-hidden animate-pops shadow-2xl grid-cols-2  w-28 h-28'>
        <p className='bg-gray-200'></p>
        <p className='bg-white'></p>
        <p className='bg-yellow-400'></p>
        <p className='bg-gray-700'></p>
      </div>

      {/* <p className='text-2xl'> Logs In Shortly... {counter}</p> */}
    </div>
  );
};

export default LoginState;
