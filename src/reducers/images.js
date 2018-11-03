import {combineReducers} from 'redux';
import {assoc} from "ramda";

const initialState = {
    byId: {},
    allIds: [],
    loggedIn: false
};

const byId = (state={}, action) => {

    switch (action.type) {
        case 'FETCH_IMAGES_SUCCESS':
        case 'FETCH_IMAGES_ERROR':
            return {
                ...state,
                ...action.images
            };

        default:
            return state;
    }
}

const allIds = (state=[], action) => {

    switch (action.type) {
        case 'FETCH_IMAGES_SUCCESS':
        case 'FETCH_IMAGES_ERROR':
            return [
                ...state,
                ...action.ids
            ].filter((el, i, arr) => arr.indexOf(el) === i)
        default:
            return state;
    }
}



export const getImagesById = (state, id) => { return state.byId[id]};

export default combineReducers({
    byId,
    allIds});
