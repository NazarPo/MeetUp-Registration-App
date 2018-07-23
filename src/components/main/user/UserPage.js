import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import '../../../components-styles/user/UserPage.css';
import NavBar from './atoms/NavBar';
import Meetups from "./Meetups";
import MeetUp from './MeetUp';
import News from './News';
import Profile from './Profile';

class UserPage extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.setState({ profile: {} });
        const { userProfile, getProfile } = this.props.auth;

        if (!userProfile) {
            getProfile((err, profile) => {
                this.setState({ profile });
            });
        } else {
            this.setState({ profile: userProfile });
        }
    }

    logout = () => {
        this.props.auth.logout();
    };

    render() {
        console.log(this.state.profile);
        return(
            <div className='UserPage'>
                <NavBar logout={this.logout} profile={this.state.profile} />
                <div className='container'>
                    <Switch>
                        <Route exact path="/home" component={MeetUp} />
                        <Route path="/home/meetups" component={Meetups} />
                        <Route path="/home/active-meetup" component={News} />
                        <Route path="/home/user-profile" component={Profile} />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default UserPage;