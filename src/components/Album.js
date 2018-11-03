import React from "react";

import {getUserById} from "../reducers";
import {fetchUser} from '../api/fetch';
import Image from './Image'
import Logout from './Logout'

import {connect} from "react-redux";
import {Link} from 'react-router-dom'

import "../styles/Album.less";


class Album extends React.Component {


    constructor(props) {
        super(props);
    }


    render() {


        const {user} = this.props;

        if (!user || user.id === undefined) {
            this.props.fetchUserById(this.props.match.params.id);
            return null;
        }

        let albumPreview = <div></div>;

        if (user.error) {
            albumPreview = (
                <h1 className={"error-message"}>USER NOT FOUND </h1>)
        } else {
            albumPreview = (<div>
                <Logout/>
                <h1 className={"album-header"}>Hi, {user.name} </h1>
                {user.pictures.map((album, ind)=> <div className={"album"} key={ind}>
                    <Link className={"album-link"} to={ {pathname: `/picture/${user.id}/${album.title}`, state:{name: album.title, type:"imagesPage", id:album.id}}}>
                        <Image name={album.title} id={album.id}/>
                        <h3 className={"album-name"}>{album.title}</h3>

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
