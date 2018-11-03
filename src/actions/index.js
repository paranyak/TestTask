export const fetchUserStart = (id) => {
    return {
        type: 'FETCH_USER',
        id
    }
};

export const fetchUserSuccess = (id, ids, users) => {
    console.log("FETCH SUCCESS", users);
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


export const fetchImageStart = (id) => {
    return {
        type: 'FETCH_IMAGES',
        id
    }
};

export const fetchImageSuccess = (id, ids, images) => {
    console.log("FETCH SUCCESS", images);
    return {
        type: 'FETCH_IMAGES_SUCCESS',
        id,
        images,
        ids
    }
};

export const fetchImagesError = (id, ids, images) =>{
    console.log("FETCH Error");
    return {
        type: 'FETCH_IMAGES_ERROR',
        id,
        images,
        ids
    }
};