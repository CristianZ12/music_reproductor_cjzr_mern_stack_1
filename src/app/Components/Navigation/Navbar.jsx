import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand ml-5">MP3 RP</Link>
                <button className="navbar-toggler mr-5" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto mr-5">
                        <li className="nav-item ml-5">
                            <Link to="/" className="nav-link">Home</Link>
                        </li>
                        <li className="nav-item ml-5">
                            <Link to="/" className="nav-link">Documentation</Link>
                        </li>
                        <li className="nav-item ml-5">
                            <Link to="/" className="nav-link">About</Link>
                        </li>
                        <li className="nav-item ml-5">
                            <div className="dropdown">
                                <a href="#" className="nav-link dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-expanded="false">
                                    Login
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <li><Link to="/register" className="dropdown-item">Sign Up</Link></li>
                                    <li><Link to="/login" className="dropdown-item">Sign In</Link></li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;