import React from "react";
import {Link} from "react-router-dom"
function Navbar(){
     return(
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Loginpage</Link></li>
        </ul>
     )
}

export default Navbar