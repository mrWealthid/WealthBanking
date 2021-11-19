const AuthReducer = (user = null, action) => {
  switch (action.type) {
    case 'ISLOGGEDIN':
      return (user = action.payload);

    case 'LOGIN':
      return (user = action.payload);

    case 'LOGOUT':
      return (user = null);

    default:
      return user;
  }
};

export default AuthReducer;
