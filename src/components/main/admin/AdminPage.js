import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import NavBar from './atoms/NavBar';
import Meetups from './Meetups';
import MeetupInfo from "./MeetupInfo";
import Statistic from './Statistic';

class UserPage extends Component {
    render() {
        return(
            <div className='AdminPage'>
                <NavBar />
                <div className='container'>
                    <Switch>
                        <Route exact path="/admin" component={Meetups} />
                        <Route path="/admin/meetup/:id" component={MeetupInfo} />
                        <Route path="/admin/statistic" component={Statistic} />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default UserPage;