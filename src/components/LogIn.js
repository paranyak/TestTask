import React from "react";
import {Redirect} from "react-router";


class LogIn extends React.Component
{

    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            loginID: -1
        };
    }

    logIn(e) {
        e.preventDefault();
        let loginID = document.querySelector('.id-input').value;
        let error = document.querySelector('.error-message');

        if(loginID.length === 0){
            error.style.visibility = "initial";
        }else{
            error.style.visibility = "hidden";
            this.setState({redirect: true, loginID})
        }

    }

   render(){

        let {redirect, loginID} = this.state;
       return <div className="log-in">
           <form className="login-form">
               <h1 className="error-message" style={{ visibility: "hidden" }}>Please enter your ID</h1>
               <input className="id-input" type="number" placeholder="Your id"/>
               <button onClick={(e) => this.logIn(e)}>Log IN</button>
           </form>
           {redirect && (<Redirect to={`/album/${loginID}`}/>)}
    </div>


   }

}

export default LogIn;