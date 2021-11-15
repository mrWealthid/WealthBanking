import React from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { useBankContext } from '../BankContext/BankAppContext';

const Transactions = ({ Depositor, amount, account, time }) => {
  const {
    convertTime,
    formatDate,
    formatCurrency,
    userData,
  } = useBankContext();

  return (
    <div className='flex group hover:rounded-3xl hover:bg-gray-200 justify-between flex-shrink-0 px-2 sm:border-none font-extralight text-xs w-full py-2  min-w-max items-center transition duration-300 ease-in-out animate-slideIn'>
      <p className='w-4 h-4 bg-white rounded-full flex items-center object-contain p-1 justify-center'>
        {amount < 0 ? (
          <FaArrowUp color='red' />
        ) : (
          <FaArrowDown color='green' className='group-hover:text-green-600' />
        )}
      </p>

      <p className='w-6 group-hover:text-green-700 '>
        {amount < 0 ? 'To' : 'From'}
      </p>
      <p className='w-28 group-hover:text-green-700'>{Depositor}</p>

      <p className='w-10 group-hover:text-green-700'>{account}</p>

      <p className='w-20 group-hover:text-green-700'>{formatDate(time)}</p>

      <p className='w-14 group-hover:text-green-700'>{convertTime(time)}</p>

      <p className='w-10 group-hover:text-green-700'>
        {amount < 0 ? 'Debit' : 'Credit'}
      </p>
      <p
        className={` ${
          amount > 0 ? 'greentxt' : 'text-red-900'
        } w-24 flex justify-start  font-normal`}
      >
        {amount > 0 ? '+' : '-'}
        {formatCurrency('en', userData.currency, amount)}
      </p>
    </div>
  );
};

export default Transactions;
