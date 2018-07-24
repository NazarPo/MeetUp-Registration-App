import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import '../../../../components-styles/user/NavBar.css';

class NavBar extends Component {
    logout = () => {
        this.props.auth.logout();
    };

    login = () => {
        this.props.auth.login();
    };

    goTo(route) {
        this.props.history.replace(`/${route}`)
    }

    componentWillMount() {
        if (this.props.auth.isAuthenticated()) {
            this.setState({profile: {}});
            const {userProfile, getProfile} = this.props.auth;
            if (!userProfile) {
                getProfile((err, profile) => {
                    this.setState({profile});
                })
            } else {
                this.setState({profile: userProfile});
            }
        }
    }

    render() {
        const {isAuthenticated} = this.props.auth;

        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light rounded home-nav">
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
                                <Link className="nav-link" to="/">InterLink MeetUp</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/meetups">Усі MeetUp'и</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/active-meetup">Новини</Link>
                            </li>
                        </ul>
                        {
                            !isAuthenticated() && (
                                <button type="button" className="btn btn-success" onClick={this.login}>Sign in</button>
                            )
                        }
                        {
                            isAuthenticated() && (
                                <div className="user-profile-div">
                                    <img src={this.state.profile.picture} className="rounded-circle"/>
                                    <ul className="navbar-nav ">
                                        <li className="nav-item dropdown">
                                            <a href="#" className="nav-link dropdown-toggle" id="navDropDownLink"
                                               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                {this.state.profile.nickname}
                                            </a>
                                            <div className="dropdown-menu" aria-labelledby="navDropDownLink">
                                                <a className="dropdown-item" href="#"
                                                   onClick={this.goTo.bind(this, '/user-profile')}>
                                                    Профіль
                                                </a>
                                                <a className="dropdown-item" href="#">Редагувати профіль</a>
                                                <div className="dropdown-divider"/>
                                                <a className="dropdown-item" href="#" onClick={this.logout}>Logout</a>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            )
                        }
                    </div>
                </div>
            </nav>
        );
    }
}

export default NavBar;