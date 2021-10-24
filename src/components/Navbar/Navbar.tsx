import React from "react";
import SignOut from "../SignOut/SignOut";
import "./Navbar.css"

const Navbar: React.FC = () => {
    return (
        <div className="nav-bar">
            <h1 className="title">DoAn Chat</h1>
            <div className="sign-out-box">
                <SignOut />
            </div>
        </div>
    );
}

export default Navbar;