import React from "react";
import SignOut from "../SignOut/SignOut";
import "./Navbar.css"

const Navbar: React.FC = () => {
    return (
        <div className="nav-bar">
            <div className="sign-out-button">
                <SignOut />
            </div>
        </div>
    );
}

export default Navbar;