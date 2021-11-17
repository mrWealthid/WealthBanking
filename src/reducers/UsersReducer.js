const UsersReducer = (
  usersData = {
    data: {},
    totalCredits: null,
    totalDebits: null,
    total: null,
  },
  action
) => {
  switch (action.type) {
    case 'DEBIT':
      return { ...usersData, data: action.payload };

    case 'CREDIT':
      return { ...usersData, data: action.payload };

    case 'ALL':
      return { ...usersData, data: action.payload };

    case 'SORT_DESC':
      return { ...usersData, data: action.payload };

    case 'SORT_ASC':
      return { ...usersData, data: action.payload };

    case 'TOTAL_CREDIT':
      return { ...usersData, totalCredits: action.payload };

    case 'TOTAL_DEBIT':
      return { ...usersData, totalDebits: action.payload };

    case 'TOTAL':
      return { ...usersData, total: action.payload };

    default:
      return usersData;
  }
};

export default UsersReducer;
