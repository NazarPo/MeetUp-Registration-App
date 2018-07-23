import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import '../../../../components-styles/user/NavBar.css';

const NavBar = (props) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light rounded">
            <div className="container">
                <a className="navbar-brand" href="#">
                    <img src="https://blog.interlink-ua.com/wp-content/uploads/sites/2/2017/03/logo.png" alt=""/>
                </a>
                <button className="navbar-toggler collapsed" type="button" data-toggle="collapse"
                        data-target="#navbarsExample07" aria-controls="navbarsExample07" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>

                <div className="navbar-collapse collapse" id="navbarsExample07">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/home">InterLink MeetUp</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/home/meetups">Усі MeetUp'и</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/home/active-meetup">Новини</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/home/user-profile">Профіль</Link>
                        </li>
                        <li className="nav-item">
                            <button onClick={props.logout}>Logout</button>
                        </li>
                        <li className="nav-item">
                            <h2>{props.profile.nickname}</h2>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
export default NavBar;