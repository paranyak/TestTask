import React from "react";
import {connect} from "react-redux";


import {getImagesById} from "../reducers";
import {fetchImages} from '../api/fetch';

import Logout from './Logout';
import "../styles/Image.less";


class Image extends React.Component {

    constructor(props) {
        super(props);

    }


    getBase64Image(img) {
        let canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        let ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        let dataURL = canvas.toDataURL("image/png");

        return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    }


    readURL(e) {
        document.getElementById("tableBanner").style.display = "block";
        let input = document.querySelector('#uploadBannerImage');

        if (input.files && input.files[0]) {
            let reader = new FileReader();
            let bannerImage = document.getElementById('tableBanner');

            reader.onload = function (e) {
                bannerImage.src = e.target.result;
            };
            reader.readAsDataURL(input.files[0]);
            let imgData = this.getBase64Image(bannerImage);
            localStorage.setItem("imgData", imgData);
        }
    }


    mainImageHandler(e, src, title) {
        let modal = document.getElementById('myModal');
        let modalImg = document.getElementById("img01");
        modal.style.display = "block";
        modalImg.src = src;

        let modalHeader = document.querySelector(".modal-header");
        modalHeader.innerHTML = title;
    }

    closeHandler() {
        let modal = document.getElementById('myModal');
        modal.style.display = 'none';
    }

    render() {

        const {images} = this.props;

        if (!this.props.location && (!images || images.id === undefined)) {
            this.props.fetchImagesById(this.props.id);
            return null;
        }



        if (!this.props.location) {
            return <img src={images.images[0][2]}/>
        }

        return (<div>
            <Logout/>
            <h1 className={"image-header"}>{this.props.location.state.name} </h1>
            <div className={"image"}>
                <div>
                    <img src="" id="tableBanner"/>
                    <input type='file' id="uploadBannerImage" onChange={(e) => this.readURL(e)}/>

                </div>
            </div>


            {images.images.map((element, ind) => <div key={ind} className={"image"}>
                    <div><img className={"images-mini"} src={element[2]}
                              onClick={(e, src, title) => this.mainImageHandler(e, element[1], element[0])}/>
                        <h3 className={"image-name"}>{element[0]}</h3>
                    </div>
                </div>
            )}



            <div id="myModal" className={"modal"}>
                <h3 className={"modal-header"}></h3>
                <span className={"close"} onClick={(e) => this.closeHandler(e)}>&times;</span>
                <img className={"modal-content"} id="img01"/>
            </div>
        </div>)
    }

}

export default connect((state, props) => {
        let images = [];
        if (props.location) images = getImagesById(state, props.location.state.id);
        else images = getImagesById(state, props.id);
        return {images};
    }, (dispatch) => ({
        fetchImagesById: (id) => fetchImages(id)(dispatch)
    })
)(Image);
