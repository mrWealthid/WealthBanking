import React from 'react';

const Home = () => {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center'>
      <div>This is my Home route</div>

      <div>
        <p>How to test App</p>
        <p>
          {' '}
          Create an account using email and password(should be at least 6
          characters)
        </p>
        <p>Have another create an account also to test realtime transactions</p>
        <p>Use account number to make a transfer, request loan etc.</p>

        <p>
          Features includes: Protected routes, user authentication, realtime
          database, search, sort, animations etc.
        </p>

        <p>
          Kindly test all functionalities on desktop, mobile responsive view
          will be completed on or before 13/11 2021
        </p>
      </div>
    </div>
  );
};

export default Home;
