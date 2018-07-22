import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import '../../../components-styles/user/UserPage.css';
import NavBar from './atoms/NavBar';
import AllMeetUpS from "./AllMeetUpS";
import MeetUp from './MeetUp';
import News from './News';
import Profile from './Profile';

class UserPage extends Component {
    render() {
        return(
            <div className='UserPage'>
                <NavBar />
                <div className='container'>
                    <Switch>
                        <Route exact path="/user" component={MeetUp} />
                        <Route path="/user/all-meet-up-s" component={AllMeetUpS} />
                        <Route path="/user/news" component={News} />
                        <Route path="/user/profile" component={Profile} />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default UserPage;