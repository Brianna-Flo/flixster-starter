import React from 'react';
import './NavBar.css';

// import { NavLink } from "react-router";

const NavBar = ({onViewRequest}) => {
    const handleNavClick = (event) => {
        event.preventDefault();
        onViewRequest (event.target.value);
    }
    return (
        <div>
            <button onClick={handleNavClick} value='playing'>Now Playing</button>
            <button onClick={handleNavClick}value='search'>Search</button>
        </div>
        // <nav>
        //     <NavLink to="/">Now Playing</NavLink>
        //     <NavLink to="/SearchForm">Search Movies</NavLink>
        // </nav>
    );
}

export default NavBar;