import React, { Component } from 'react';
import '../components-styles/Authorization.css';
import Auth from '../Auth/Auth.js';

const auth = new Auth();

class Authorization extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() {
        return (
            <div className="Authorization">

                <div className="container">
                    <form className="form-signin">
                        <h2 className="form-signin-heading">Please sign in</h2>
                        <label htmlFor="inputLogin" className="sr-only">Email address</label>
                        <input id="inputLogin" className="form-control" placeholder="Login" required=""
                               autoFocus="" type="text" />
                        <label htmlFor="inputPassword" className="sr-only">Password</label>
                        <input id="inputPassword" className="form-control" placeholder="Password" required=""
                                   type="password" />
                        <div className="checkbox">
                            <input id="remember_checkbox" value="remember-me" type="checkbox" />
                            <label htmlFor="remember_checkbox">Remember me</label>
                        </div>
                        <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                    </form>
                </div>

            </div>
        );
    }
}

export default Authorization;
