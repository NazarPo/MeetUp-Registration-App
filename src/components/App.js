import React, { Component } from 'react';
import { BrowserRouter as Router, Route,  Switch } from 'react-router-dom';

import Registration from "./Registration";
import Home from "./Home";
import Authorization from "./Authorization";
import UserPage from './main/user/UserPage';
import AdminPage from './main/admin/AdminPage';

class App extends Component {
  render() {
    return (
      <div className="App">
         <Router>
             <Switch>
                 <Route exact path="/" component={Home} />
                 <Route path="/registration" component={Registration} />
                 <Route path="/authorization" component={Authorization} />
                 <Route path="/user" component={UserPage} />
                 <Route path="/admin" component={AdminPage} />
             </Switch>
         </Router>
      </div>
    );
  }
}

export default App;
