import React from "react";
import {Link} from 'react-router-dom'

import '../styles/LogOut.less'

class Logout extends React.Component
{


    render(){
       return  <Link className={"logout"} to={`/`}>
           <p>Log OUT</p>
        </Link>

    }

}

export default Logout;