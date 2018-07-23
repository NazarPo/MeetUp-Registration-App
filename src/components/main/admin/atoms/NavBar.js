import React from 'react';
import {Link} from 'react-router-dom';
import '../../../../components-styles/admin/NavBar.css';

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
                            <Link className="nav-link" to="/admin">Meetup's</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/admin/statistic">Статистика реєстрацій та відвідувань</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
export default NavBar;