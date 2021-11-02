import React, { useRef } from 'react';
import { useBankContext } from '../BankContext/BankAppContext';

const Profile = () => {
  const {
    userDetails,
    total,
    handleLoan,
    closeAcc,
    handleTransfers,
  } = useBankContext();

  const transferAmount = useRef();
  const transferName = useRef();
  const loanRef = useRef();
  const closeUser = useRef();
  const closeUserPin = useRef();
  return (
    <div className='flex flex-col w-11/12 mx-auto'>
      <div className='px-4 '>
        <p className='text-xl'>
          Welcome, <span className='text-gray-700'>{userDetails?.name}!</span>
        </p>

        <div className='flex justify-between  py-16 '>
          <div className='flex  flex-col'>
            Current Balance
            <p>As at {new Date().toDateString()}</p>
          </div>
          <p className='text-lg'>€{total}</p>
        </div>

        <section className='flex gap-5 justify-between w-10/12 mx-auto'>
          <section className='bg-white w-7/12'>
            Transaction shows here
            {/* {currents &&
              transactions.movements
                .map((mov, index) => (
                  <Transactions key={index} index={index} mov={mov} />
                ))
                .reverse()} */}
          </section>

          <section className='flex flex-col w-5/12 gap-3'>
            <section className='transfer p-5'>
              <p>Transfer Money</p>

              <div className='grid grid-cols-3 w-full gap-2 '>
                <form onSubmit={handleTransfers}>
                  <input
                    className='w-full my-input p-0'
                    type='text'
                    name='name'
                    ref={transferName}
                    required
                  />
                  <input
                    className='w-full my-input p-0'
                    type='text'
                    name='amount'
                    ref={transferAmount}
                    required
                  />
                  <button>Send</button>
                </form>
                <p>Transfer To</p>
                <p>Amount</p>
              </div>
            </section>

            <section className='loan p-5'>
              <p>Request Loan</p>

              <div className='grid grid-cols-2 w-full gap-2 '>
                <form onSubmit={handleLoan}>
                  <input
                    className='w-full my-input p-0'
                    type='text'
                    ref={loanRef}
                    required
                  />

                  <input className='w-1/2 p-0' type='submit' value='send' />
                </form>
                <p>Amount</p>
              </div>
            </section>

            <section className='close p-5'>
              <p>Close Account</p>

              <div className='grid grid-cols-3 w-full gap-2 '>
                <form onSubmit={closeAcc}>
                  <input
                    className='w-full my-input p-0'
                    type='text'
                    ref={closeUser}
                  />
                  <input
                    className='w-full my-input p-0'
                    type='text'
                    ref={closeUserPin}
                  />
                  <input type='submit' value='send' />
                </form>
                <p>Username</p>
                <p>Pin</p>
              </div>
            </section>
          </section>
        </section>
      </div>
    </div>
  );
};

export default Profile;
