import React from 'react';
import './NavBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faMagnifyingGlass, faTicket, faEye } from '@fortawesome/free-solid-svg-icons'

// import { NavLink } from "react-router";

const NavBar = ({onViewRequest, onCloseNav}) => {
    const handleNavClick = (event) => {
        event.preventDefault();
        onViewRequest (event.target.value);
        onCloseNav();
    }

    const handleNavClose = (event) => {
        onCloseNav();
    };
    return (
        <nav>
            <span className="close" onClick={handleNavClose}>&times;</span>
            <button className="nav-btn" onClick={handleNavClick} value='playing'><FontAwesomeIcon icon={faTicket} /> Now Playing</button>
            <button className="nav-btn" onClick={handleNavClick} value='search'><FontAwesomeIcon icon={faMagnifyingGlass} /> Search</button>
            <button className="nav-btn" onClick={handleNavClick} value='favorites'><FontAwesomeIcon icon={faHeart} /> Favorites</button>
            <button className="nav-btn" onClick={handleNavClick} value='watched'><FontAwesomeIcon icon={faEye} /> Watched</button>
        </nav>
    );
}

export default NavBar;