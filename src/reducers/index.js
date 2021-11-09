import AuthReducer from './AuthReducer';
import UsersReducer from './UsersReducer';
import { combineReducers } from 'redux';
import AccountsReducer from './AccountsReducer';

const allReducers = combineReducers({
  Authentication: AuthReducer,
  userData: UsersReducer,
  Accounts: AccountsReducer,
});

export default allReducers;
