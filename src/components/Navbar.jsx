import React from "react";
import { Link } from "react-router-dom";
import "../Navbar.css"

const Navbar = () => {
    return (
        <div id="navbar">
            <h4 className="logo">MyLogo</h4>
            <div className="dropdown">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/jobs">Jobs</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;