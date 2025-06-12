import React from 'react';
import './NavBar.css';

// import { NavLink } from "react-router";

const NavBar = ({onViewRequest}) => {
    const handleNavClick = (event) => {
        event.preventDefault();
        onViewRequest (event.target.value);
    }
    return (
        <nav>
            <button onClick={handleNavClick} value='playing'>Now Playing</button>
            <button onClick={handleNavClick}value='search'>Search</button>
        </nav>
    );
}

export default NavBar;