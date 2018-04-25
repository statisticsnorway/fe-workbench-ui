import { combineReducers } from 'redux';
import user from "./reducers/user";

export default combineReducers({
    // here we can have anything like email , authentication token
    user: () => ({})
});