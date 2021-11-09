export const isLoggedIn = (payload) => {
  return {
    type: 'ISLOGGEDIN',
    payload: payload,
  };
};

export const logIn = (payload) => {
  return {
    type: 'LOGIN',
    payload: payload,
  };
};

export const isLoggedOut = () => {
  return {
    type: 'LOGOUT',
  };
};

export const getDebits = (payload) => {
  return {
    type: 'DEBIT',
    payload: payload,
  };
};

export const getCredits = (payload) => {
  return {
    type: 'CREDIT',
    payload: payload,
  };
};

export const getAll = (payload) => {
  return {
    type: 'ALL',
    payload: payload,
  };
};
