import React from 'react';
import { useBankContext } from '../BankContext/BankAppContext';

const Profile = () => {
  const { users, userDetails } = useBankContext();
  return (
    <div className='flex flex-col'>
      <div className='px-4 '>
        <p>Welcome, {userDetails.name}!</p>
        <p> This is my Profile Page</p>
      </div>
    </div>
  );
};

export default Profile;
