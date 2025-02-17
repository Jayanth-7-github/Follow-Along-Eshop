import React from "react";
import {Link} from "react-router-dom"
function Navbar(){
     return(
        <ul className="flex justify-between ml-10 mr-10">
            <li className="border-4 border-double font-bold  w-[12%] bg-blue-500 text-white hover:bg-green-600   "><Link to="/">Home</Link></li>
            <li className="border-4 border-double font-bold  w-[12%] bg-blue-500 text-white hover:bg-green-600   "><Link to="/login">Login</Link></li>

        </ul>
     )
}

export default Navbar