// Set up your root reducer here...
import { combineReducers } from 'redux';

import groupReducer from './group';
import authReducer from './auth';

export default combineReducers({
    groups: groupReducer,
    auth: authReducer,
});