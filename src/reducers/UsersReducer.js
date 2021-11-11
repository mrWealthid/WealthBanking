const UsersReducer = (usersData = {}, action) => {
  switch (action.type) {
    case 'DEBIT':
      return (usersData = action.payload);

    case 'CREDIT':
      return (usersData = action.payload);

    case 'ALL':
      return (usersData = action.payload);

    case 'SORT_DESC':
      return (usersData = action.payload);

    case 'SORT_ASC':
      return (usersData = action.payload);

      case 'TOTAL_CREDIT':
        return (usersData = action.payload);

        case 'TOTAL_DEBIT':
          return (usersData = action.payload);

    default:
      return usersData;
  }
};

export default UsersReducer;
