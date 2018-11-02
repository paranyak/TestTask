import React from "react";

import {getUserById} from "../reducers";
import {fetchUser} from '../api/fetch';
import {connect} from "react-redux";
import {Link} from 'react-router-dom'

class Album extends React.Component {


    constructor(props) {
        super(props);
    }


    render() {


        const {user} = this.props;

        console.log("USER:", user);

        if (!user || user.id === undefined) {
            this.props.fetchUserById(this.props.match.params.id);
            return null;
        }


        console.log("User in album:", user, user.pictures);

        let albumPreview = <div></div>;

        if (user.error) {
            albumPreview = (
                <h1 className={"error-message"}>USER NOT FOUND </h1>)
        } else {
            let albumsNames = [];
            let mainAlbumPicture =[];

            for (let [key, value] of Object.entries(user.pictures)) {
                albumsNames.push(key);
                let allPictures = [];
                for (let [keys, values] of Object.entries(value)) {
                    allPictures.push(values);
                }
                mainAlbumPicture.push(allPictures[Math.floor(Math.random()*allPictures.length)]);
            }



            albumPreview = (<div>
                <h1 className={"user-name"}>Hi, {user.name} </h1>
                {albumsNames.map((name, ind)=> <div className={"album"} key={ind}>
                    <h3 className={"album-name"}>{name}</h3>
                    <Link to={ {pathname: `/picture/${user.id}/${name}`, state:{pictures: user.pictures[name]}}}>
                        <img src={mainAlbumPicture[ind]}/>
                    </Link>
                </div>)}
            </div>);
        }


        return (<div>{albumPreview}</div>);
    }
}


export default connect((state, props) => {
        let user = getUserById(state, props.match.params.id);
        return {user};
    }, (dispatch) => ({
        fetchUserById: (id) => fetchUser(id)(dispatch)
    })
)(Album);
