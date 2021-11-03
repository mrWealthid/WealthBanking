import React from 'react';

const Creating = () => {
  // const [counter, setCounter] = useState(4);

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     counter > 0 && setCounter(counter - 1);
  //   }, 1000);

  //   return () => clearInterval(timer);
  // }, [counter]);

  return (
    <div className='min-h-screen animate-slideIn flex gap-3 flex-col items-center justify-center'>
      <div className='grid rounded-full overflow-hidden animate-bounce grid-cols-2 shadow-2xl w-28 h-28'>
        <p className='bg-gray-200'></p>
        <p className='bg-white'></p>
        <p className='bg-yellow-400'></p>
        <p className='bg-gray-700'></p>
      </div>

      {/* <p className='text-2xl'>Creating Account Shortly... {counter}</p> */}
    </div>
  );
};

export default Creating;
