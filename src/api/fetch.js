import * as fromFetch from '../actions/index';
import {usersListSchema} from "../helpers/schema";
import {normalize} from 'normalizr';


export const fetchUser = (id) => async (dispatch) => {
    console.log("Fetch user api/fetch 1", id);
    dispatch(fromFetch.fetchUserStart(id));
    console.log("Fetch user api/fetch 2", id);
    let response = await fetch(`http://localhost:3000/users/${id}`);
    let users = await (response).json();
    console.log("res", response);
    if (!response.ok) {
        users = {id, error:true};
        users = normalize([users], usersListSchema);
        dispatch(fromFetch.fetchUserError(id, users.result, users.entities.users));
    } else {
        users = normalize([users], usersListSchema);
        console.log("Fetch user api/fetch 4");
        dispatch(fromFetch.fetchUserSuccess(id, users.result, users.entities.users));
    }
};