import AuthReducer from './AuthReducer';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
  Authentication: AuthReducer,
});

export default allReducers;
