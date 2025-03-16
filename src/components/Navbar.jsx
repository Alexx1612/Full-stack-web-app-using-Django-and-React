import React, { useState } from "react";
import "../styles/Navbar.css";

function Navbar() {
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">Cabinet Bingus</div>
            <ul className="navbar-links">
                <li><a href="/">Home</a></li>
                <li><a href="/consultations">Consultations</a></li>
                <li><a href="/doctors">Doctors</a></li>
                <li className="dropdown">
                    <span 
                        className="dropdown-toggle"
                        onClick={toggleDropdown}
                    >
                        Interogations
                    </span>
                    {dropdownVisible && (
                        <ul className="dropdown-menu">
                            <li><a href="/simple-interogations">Simple</a></li>
                            <li><a href="/complex-interogations">Complex</a></li>
                        </ul>
                    )}
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
