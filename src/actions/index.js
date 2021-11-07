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

export const selectUser = (payload) => {
  return {
    type: 'Users',
    payload: payload,
  };
};
