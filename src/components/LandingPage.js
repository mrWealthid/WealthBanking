import React from 'react';
import Home from './Home';
import ShowCase from './ShowCase';

const LandingPage = () => {
  return (
    <div className='Apps flex flex-col gap-10'>
      <Home />
      <ShowCase />
    </div>
  );
};

export default LandingPage;
