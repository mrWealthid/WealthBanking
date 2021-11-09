import AuthReducer from './AuthReducer';
import UsersReducer from './UsersReducer';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
  Authentication: AuthReducer,
  userData: UsersReducer,
});

export default allReducers;
