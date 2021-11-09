const AccountsReducer = (accounts = [], action) => {
  switch (action.type) {
    case 'LOAD_ACCOUNTS':
      return (accounts = action.payload);

    // case 'CREDIT':
    //   return ( = action.payload);

    // case 'ALL':
    //   return (usersData = action.payload);

    default:
      return accounts;
  }
};

export default AccountsReducer;
