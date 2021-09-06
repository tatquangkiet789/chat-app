import React from "react";
import SignOut from "../SignOut/SignOut";
import "./Navbar.css"

const Navbar: React.FC = () => {
    return (
        <div className="nav-bar">
            <div className="toggle-dark-mode">
                <button>Change dark mode</button>
            </div>
            <div className="sign-out-button">
                <SignOut />
            </div>
        </div>
    );
}

export default Navbar;