import * as fromFetch from '../actions/index';
import {usersListSchema, imagesListSchema} from "../helpers/schema";
import {normalize} from 'normalizr';


export const fetchUser = (id) => async (dispatch) => {
    console.log("Fetch user api/fetch 1", id);
    dispatch(fromFetch.fetchUserStart(id));
    console.log("Fetch user api/fetch 2", id);
    let response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    let users = await (response).json();
    console.log("USER:", users);
    if (!response.ok) {
        users = {id, error:true};
        users = normalize([users], usersListSchema);
        dispatch(fromFetch.fetchUserError(id, users.result, users.entities.users));
    } else {
        let response = await fetch(`https://jsonplaceholder.typicode.com/albums?userId=${id}`);
        let album = await (response).json();
        console.log("RES2: ", album);

        let newUser = {};
        newUser["id"] = users.id;
        newUser["name"] = users.name;
        newUser["pictures"] = album;
        console.log("new user", newUser);


        newUser = normalize([newUser], usersListSchema);

        console.log("Fetch user api/fetch 4");
        dispatch(fromFetch.fetchUserSuccess(id, newUser.result, newUser.entities.users));
    }
};


export const fetchImages = (id) => async (dispatch) => {
    console.log("Fetch images api/fetch 1", id);
    dispatch(fromFetch.fetchImageStart(id));
    console.log("Fetch images api/fetch 2", id);
    let response = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${id}`);
    let images = await (response).json();
    console.log("IMAGES:", images);

    if (!response.ok) {
        images = {id, error:true};
        images = normalize([images], imagesListSchema);
        dispatch(fromFetch.fetchImagesError(id, images.result, images.entities.images));
    } else {

        let imageAlbum={};
        imageAlbum["id"] = id;
        imageAlbum["images"] = [];
        for(let i in images){
            console.log("I: ", images[i]);
            imageAlbum["images"].push([images[i].title, images[i].url, images[i].thumbnailUrl]);
        }

        console.log("NEW OBJ", imageAlbum);
        imageAlbum = normalize([imageAlbum], imagesListSchema);
        console.log("Fetch images api/fetch 4");
        dispatch(fromFetch.fetchImageSuccess(id, imageAlbum.result, imageAlbum.entities.images));
    }
};