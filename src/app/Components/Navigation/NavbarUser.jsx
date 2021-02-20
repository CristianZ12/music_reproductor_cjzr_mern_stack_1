import React from 'react';
import { Link, useHistory } from 'react-router-dom';

const NavbarUser = () => {
    
    const history = useHistory();

    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem('usertoken');
        history.push('/');
    }

    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link to="/profile" className="navbar-brand ml-5">MP3 RP</Link>
                <button className="navbar-toggler mr-5" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto mr-5">
                        <li className="nav-item ml-5">
                            <Link to="/profile" className="nav-link">Music</Link>
                        </li>
                        <li className="nav-item ml-5">
                            <Link to="/artist" className="nav-link">Artist</Link>
                        </li>
                        <li className="nav-item ml-5">
                            <Link to="" className="nav-link" onClick={logout}>Logout</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );      
}

export default NavbarUser;