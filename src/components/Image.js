import React from "react";


import "../styles/Image.less";



class Image extends React.Component
{

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


    readURL(e)
    {
        console.log("READ!!");
        document.getElementById("tableBanner").style.display = "block";
        let input = document.querySelector('#uploadBannerImage');

        if (input.files && input.files[0]) {
            let reader = new FileReader();
            let bannerImage = document.getElementById('tableBanner');

            reader.onload = function (e) {
            bannerImage.src =  e.target.result;
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
        modalHeader.innerHTML  = title;
    }

    closeHandler() {
        let modal = document.getElementById('myModal');
        modal.style.display = 'none';
    }

    render(){
        console.log("PROPS:", this.props.location.state);
        let imagesObject = this.props.location.state;
        let imageNames = [];
        let images =[];

        for (let [key, value] of Object.entries(imagesObject.pictures)) {
            imageNames.push(key);
            images.push(value)
        }

        return (<div >

            <input type='file' id="uploadBannerImage" onChange={(e) => this.readURL(e)} />
            <img src="" id="tableBanner" />


            {imageNames.map((name, ind)=> <div key={ind} className={"image-container"}>
                <h3 className={"image-name"}>{name}</h3>
                <img className={"images-mini"} src={images[ind]} onClick={(e, src, title) => this.mainImageHandler(e, images[ind], name)}/>
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

export default Image;