import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import '../../../../components-styles/admin/NavBar.css';

class NavBar extends Component {
    logout = () => {
        this.props.auth.logout();
    };
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light rounded admin-nav">
                <div className="container">
                    <img className="navbar-brand"
                         src="https://blog.interlink-ua.com/wp-content/uploads/sites/2/2017/03/logo.png" alt=""/>
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
                                <Link className="nav-link" to="/admin/statistic">Статистика реєстрацій та
                                    відвідувань</Link>
                            </li>
                        </ul>
                        <button type="button" className="btn btn-dark" onClick={this.logout}>Logout</button>
                    </div>
                </div>
            </nav>
        );
    }
}
export default NavBar;