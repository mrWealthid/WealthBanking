const AuthReducer = (user = {}, action) => {
  switch (action.type) {
    case 'ISLOGGEDIN':
      return (user = action.payload);

    case 'LOGIN':
      return (user = action.payload);

    case 'LOGOUT':
      return (user = {});

    default:
      return user;
  }
};

export default AuthReducer;
