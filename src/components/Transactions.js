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
    // <div className='min-w-max font-extralight animate-slideIn py-2 px-1 text-xs hover:bg-gray-200 transition duration-200 ease-in-out hover:text-black hover: rounded-lg'>
    <div className='flex  gap hover:text-green-700 hover: rounded-3xl hover:bg-gray-200 justify-between lg:justify-start  gap-4  px-2 sm:border-none font-extralight text-xs w-full py-2  min-w-max items-center transition duration-300 ease-in-out animate-slideIn '>
      <p className='w-3'>
        {amount < 0 ? <FaArrowUp color='red' /> : <FaArrowDown color='green' />}
      </p>

      <p className='w-10'> {amount < 0 ? 'To' : 'From'} </p>
      <p className='w-28'>{Depositor}</p>

      <p className='w-20'>{account}</p>

      <p className='w-32'>{new Date(time).toDateString()}</p>

      <p className='w-10'>{convertDate(time)}</p>

      <p className='w-10'>{amount < 0 ? 'Debit' : 'Credit'}</p>
      <p className='w-16 flex justify-end'>
        ₦{Math.abs(amount).toLocaleString()}
      </p>
    </div>
    // </div>
  );
};

export default Transactions;
