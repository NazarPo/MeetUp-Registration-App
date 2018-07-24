import React, {Component} from 'react';
import {Router, Route, Switch, Redirect} from 'react-router-dom';
import UserPage from './main/user/UserPage';
import AdminPage from './main/admin/AdminPage';
import Callback from '../Callback/Callback';
import Auth from '../Auth/Auth.js';
import history from '../Auth/history';

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
        auth.handleAuthentication();
    }
};

class App extends Component {
    render() {
        return (
            <div className="App">
                <Router history={history}>
                    <Switch>
                        <Route path="/admin" render={(props) => (
                            !auth.isAuthenticated() || !auth.userRoleEquals('admin') ? (
                                <Redirect to='/'/>
                            ) : (
                                <AdminPage auth={auth} {...props} />
                            )
                        )}/>
                        <Route path="/callback" render={(props) => {
                            handleAuthentication(props);
                            return <Callback {...props} />
                        }}/>
                        <Route path="/" render={(props) => (
                            auth.userRoleEquals('admin') ? (
                                <Redirect to='/admin'/>
                            ) : (
                                <UserPage auth={auth} {...props} />
                            )
                        )}/>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;