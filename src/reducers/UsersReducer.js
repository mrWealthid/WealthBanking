const UsersReducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return (state = true);
      break;

    case LOGOUT:
      return (state = false);
      break;

    case USERS:
      return (state = action.payload);
      break;

    default:
      return state;
      break;
  }
};
