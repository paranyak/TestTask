import * as fromFetch from '../actions/index';
import {usersListSchema, imagesListSchema} from "../helpers/schema";
import {normalize} from 'normalizr';


export const fetchUser = (id) => async (dispatch) => {
    dispatch(fromFetch.fetchUserStart(id));
    let response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    let users = await (response).json();
    if (!response.ok) {
        users = {id, error:true};
        users = normalize([users], usersListSchema);
        dispatch(fromFetch.fetchUserError(id, users.result, users.entities.users));
    } else {
        let response = await fetch(`https://jsonplaceholder.typicode.com/albums?userId=${id}`);
        let album = await (response).json();

        let newUser = {};
        newUser["id"] = users.id;
        newUser["name"] = users.name;
        newUser["pictures"] = album;
        newUser = normalize([newUser], usersListSchema);

        dispatch(fromFetch.fetchUserSuccess(id, newUser.result, newUser.entities.users));
    }
};


export const fetchImages = (id) => async (dispatch) => {
    dispatch(fromFetch.fetchImageStart(id));
    let response = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${id}`);
    let images = await (response).json();

    if (!response.ok) {
        images = {id, error:true};
        images = normalize([images], imagesListSchema);
        dispatch(fromFetch.fetchImagesError(id, images.result, images.entities.images));
    } else {

        let imageAlbum={};
        imageAlbum["id"] = id;
        imageAlbum["images"] = [];
        for(let i in images){
            imageAlbum["images"].push([images[i].title, images[i].url, images[i].thumbnailUrl]);
        }

        imageAlbum = normalize([imageAlbum], imagesListSchema);

        dispatch(fromFetch.fetchImageSuccess(id, imageAlbum.result, imageAlbum.entities.images));
    }
};