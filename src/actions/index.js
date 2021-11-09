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

export const getAccounts = (payload) => {
  return {
    type: 'LOAD_ACCOUNTS',
    payload: payload,
  };
};

export const sortByDesc = (payload) => {
  return {
    type: 'SORT_DESC',
    payload: payload,
  };
};

export const sortByAsc = (payload) => {
  return {
    type: 'SORT_ASC',
    payload: payload,
  };
};
