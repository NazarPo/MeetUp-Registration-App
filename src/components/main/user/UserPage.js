import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import '../../../components-styles/user/UserPage.css';
import NavBar from './atoms/NavBar';
import Meetups from "./Meetups";
import MeetUp from './MeetUp';
import News from './News';
import ViewProfile from './ViewProfile';
import EditProfile from './EditProfile';

class UserPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {auth} = this.props;
        return (
            <div className='UserPage'>
                <NavBar
                    auth={auth}
                    history={this.props.history}
                />
                <div className='container'>
                    <Route exact path="/" component={MeetUp} />
                    <Route path="/meetups" component={Meetups} />
                    <Route path="/active-meetup" render={(props) => <News auth={auth} {...props} />} />
                    <Route path="/view-profile" render={(props) => (
                        !auth.isAuthenticated() ? (
                            <Redirect to="/" />
                        ) : (
                            <ViewProfile auth={auth} {...props} />
                        )
                    )}/>
                    <Route path="/edit-profile" render={(props) => (
                        !auth.isAuthenticated() ? (
                            <Redirect to="/" />
                        ) : (
                            <EditProfile auth={auth} {...props} />
                        )
                    )}/>
                </div>
            </div>
        );
    }
}

export default UserPage;