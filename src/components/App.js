import React, { Component } from 'react';
import { BrowserRouter as Router, Route,  Switch, Redirect } from 'react-router-dom';
import Authorization from "./Authorization";
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
                 <Route exact path="/" render={(props) => <Authorization auth={auth} {...props} />} />
                 <Route path="/admin" render={(props) => (<AdminPage auth={auth} {...props} />)} />
                 <Route path="/home" render={(props) => (
                     !auth.isAuthenticated() ? (
                         <Redirect to="/" />
                     ) : (
                         <UserPage auth={auth} {...props} />
                     )
                 )} />
                 <Route exact path="/callback" render={(props) => {
                     handleAuthentication(props);
                     return <Callback {...props} />
                 }}/>
             </Switch>
         </Router>
      </div>
    );
  }
}

export default App;

/*
*    !auth.isAuthenticated() ? (
                         <Redirect to="/" />
                         ) : (
* */
