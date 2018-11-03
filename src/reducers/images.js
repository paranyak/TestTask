import {combineReducers} from 'redux';
import {assoc} from "ramda";

const initialState = {
    byId: {},
    allIds: [],
    loggedIn: false
};

const byId = (state={}, action) => {
    console.log("BY ID IMG : ",  action.images);

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
    console.log("ALL IMG : ", state, action);

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



export const getImagesById = (state, id) => {console.log("in image reducer:", state.byId[id]); return state.byId[id]};

export default combineReducers({
    byId,
    allIds});
