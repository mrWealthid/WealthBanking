import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useBankContext } from '../BankContext/BankAppContext';

function PrivateRoute({ component: Component, ...rest }) {
  //from a register api
  // const getToken = () => {
  //   return sessionStorage.getItem('token') || null;
  // };

  //from firestore auth
  // const { currentUser } = auth;

  const { users } = useBankContext();

  return (
    <Route
      {...rest}
      render={(props) =>
        // getToken() ? <Component {...props} /> : <Redirect to='/login' />
        users ? <Component {...props} /> : <Redirect to='/login' />
      }
    />
  );
}

export default PrivateRoute;
