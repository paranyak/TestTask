import {combineReducers} from 'redux';
import {assoc} from "ramda";

const initialState = {
    byId: {},
    allIds: [],
    loggedIn: false
};

const byId = (state={}, action) => {

    switch (action.type) {
        case 'FETCH_USER_SUCCESS':
        case 'FETCH_USER_ERROR':
            return {
                ...state,
                ...action.users
            };

        default:
            return state;
    }
}

const allIds = (state=[], action) => {

    switch (action.type) {
        case 'FETCH_USER_SUCCESS':
        case 'FETCH_USER_ERROR':
            return [
                ...state,
                ...action.ids
            ].filter((el, i, arr) => arr.indexOf(el) === i)
        default:
            return state;
    }
}

const loggedIn = (state=[], action) => {

    switch (action.type) {
        case 'FETCH_USER_SUCCESS':
        case 'FETCH_USER_ERROR':
            return {
                ...state,
                loggedIn: true
            };
        default:
            return state;
    }
}



export const getUserById = (state, id) => {return state.byId[id]};

export default combineReducers({
    byId,
    allIds, loggedIn});
