import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import NavBar from './atoms/NavBar';
import Meetups from './Meetups';
import MeetupInfo from "./MeetupInfo";
import Statistic from './Statistic';
import MeetupUsers from "./MeetupUsers";
import CreateForm from "./atoms/forms/CreateForm";
import EditForm from "./atoms/forms/EditForm";

class UserPage extends Component {
    render() {
        return(
            <div className='AdminPage'>
                <NavBar auth={this.props.auth} />
                <div className='container'>
                    <Switch>
                        <Route exact path="/admin" component={Meetups} />
                        <Route exact path="/admin/meetup/:id" component={MeetupInfo} />
                        <Route path="/admin/statistic" component={Statistic} />
                        <Route path="/admin/meetup/:id/users" component={MeetupUsers} />
                        <Route path="/admin/create-meetup" component={CreateForm} />
                        <Route path="/admin/edit-meetup/:id" component={EditForm} />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default UserPage;