import React from 'react';

const Transactions = ({ Depositor, amount }) => {
  return (
    <div className='flex justify-between'>
      <p>{Depositor}</p>
      <p>{amount}</p>
    </div>
  );
};

export default Transactions;
