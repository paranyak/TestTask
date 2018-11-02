import {combineReducers} from 'redux';
import users, * as fromUsers from './users';



import { routerReducer } from 'react-router-redux';

const usersApp = combineReducers({
    users,
    router: routerReducer
});

export default usersApp;


export const getUserById = (state, id) =>fromUsers.getUserById(state.users, id);
