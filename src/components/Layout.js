import React from "react";

import {Switch, Route} from 'react-router-dom'
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom';

import Album from "./Album";
import LogIn from "./LogIn"
import Image from "./Image"

let Layout = () => (
    <div className="layout">
        <Switch>
            <Route exact path='/' component={LogIn}/>
            <Route path='/album/:id' component={Album}/>
            <Route path='/picture/:id/:name' component={Image}/>
        </Switch>
    </div>
);

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

Layout = withRouter(connect(null,
    mapDispatchToProps
)(Layout));


export default Layout;
