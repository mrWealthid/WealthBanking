import React from 'react';
import Sidebar from '../Sidebar';

const Home = () => {
  return (
    <div className='flex gap-4'>
      <Sidebar />
      <p> This is my settings Homepage</p>
    </div>
  );
};

export default Home;
