export const fetchUserStart = (id) => {
    return {
        type: 'FETCH_USER',
        id
    }
};

export const fetchUserSuccess = (id, ids, users) => {
    console.log("FETCH SUCCESS");
    return {
        type: 'FETCH_USER_SUCCESS',
        id,
        users,
        ids
    }
};

export const fetchUserError = (id, ids, users) =>{
    console.log("FETCH Error");
    return {
        type: 'FETCH_USER_ERROR',
        id,
        users,
        ids
    }
};