export const fetchUserStart = (id) => {
    return {
        type: 'FETCH_USER',
        id
    }
};

export const fetchUserSuccess = (id, ids, users) => {
    return {
        type: 'FETCH_USER_SUCCESS',
        id,
        users,
        ids
    }
};

export const fetchUserError = (id, ids, users) =>{
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

    return {
        type: 'FETCH_IMAGES_SUCCESS',
        id,
        images,
        ids
    }
};

export const fetchImagesError = (id, ids, images) =>{

    return {
        type: 'FETCH_IMAGES_ERROR',
        id,
        images,
        ids
    }
};