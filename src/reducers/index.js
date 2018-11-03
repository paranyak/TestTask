import {combineReducers} from 'redux';
import users, * as fromUsers from './users';
import images, * as fromImages from './images';



import { routerReducer } from 'react-router-redux';

const usersApp = combineReducers({
    users,
    images,
    router: routerReducer
});

export default usersApp;


export const getUserById = (state, id) =>fromUsers.getUserById(state.users, id);
export const getImagesById = (state, id) =>fromImages.getImagesById(state.images, id);
