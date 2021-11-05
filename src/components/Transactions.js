import React from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const Transactions = ({ Depositor, amount, account, time }) => {
  function convertDate(times) {
    const currentDate = new Date(times).toLocaleTimeString();
    return currentDate.slice(0, 4) + ' ' + currentDate.split(':')[2].slice(3);
  }
  return (
    <div className='flex justify-between font-extralight animate-slideIn py-2 px-1 text-xs hover:bg-gray-200 transition duration-200 ease-in-out hover:text-black hover: rounded-lg'>
      <div className='flex justify-between w-10/12  items-center '>
        <p>
          {amount < 0 ? (
            <FaArrowUp color='red' />
          ) : (
            <FaArrowDown color='green' />
          )}
        </p>

        <p className='w-10'> {amount < 0 ? 'To' : 'From'} </p>
        <p className='w-20'>{Depositor}</p>

        <p className='w-20'>{account}</p>

        <p className='w-30'>{new Date(time).toDateString()}</p>

        <p>{convertDate(time)}</p>

        <p>{amount < 0 ? 'Debit' : 'Credit'}</p>
      </div>
      <p>{Math.abs(amount)}</p>
    </div>
  );
};

export default Transactions;
