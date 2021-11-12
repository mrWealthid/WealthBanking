import React from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const Transactions = ({ Depositor, amount, account, time }) => {
  function convertDate(times) {
    const currentDate = new Date(times).toTimeString();
    return currentDate.slice(0, 5);

    //seagreen

    //teal

    //darkslategrey;
  }
  return (
    <div className='flex  gap group hover:rounded-3xl hover:bg-gray-200 justify-between lg:justify-start  gap-4  px-2 sm:border-none font-extralight text-xs w-full py-2  min-w-max items-center transition duration-300 ease-in-out animate-slideIn '>
      <p className='w-4 h-4 bg-white rounded-full flex items-center object-contain p-1 justify-center'>
        {amount < 0 ? (
          <FaArrowUp color='red' />
        ) : (
          <FaArrowDown color='green' className='group-hover:text-green-600' />
        )}
      </p>

      <p className='w-10 group-hover:text-green-700 '>
        {' '}
        {amount < 0 ? 'To' : 'From'}{' '}
      </p>
      <p className='w-28 group-hover:text-green-700'>{Depositor}</p>

      <p className='w-20 group-hover:text-green-700'>{account}</p>

      <p className='w-32 group-hover:text-green-700'>
        {new Date(time).toDateString()}
      </p>

      <p className='w-10 group-hover:text-green-700'>{convertDate(time)}</p>

      <p className='w-10 group-hover:text-green-700'>
        {amount < 0 ? 'Debit' : 'Credit'}
      </p>
      <p className='w-16 flex justify-end group-hover:text-green-700'>
        ₦{Math.abs(amount).toLocaleString()}
      </p>
    </div>
    // </div>
  );
};

export default Transactions;
