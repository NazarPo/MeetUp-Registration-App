import React, {Component} from 'react';
import Card from './atoms/Card';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            meetupList: []
        };
    }

    componentWillMount() {
        if (this.props.auth.isAuthenticated()) {
            const {userProfile, getProfile} = this.props.auth;
            if (!userProfile) {
                getProfile((err, profile) => {
                    this.getUserFromDB(profile);
                })
            } else {
                this.getUserFromDB(userProfile)
            }
        }
        fetch('http://localhost:4000/meetUps')
            .then(res => res.json())
            .then(res => {
                    this.setState({
                        meetupList: res
                    })
                }
            )
    }

    getUserFromDB = (profile) => {
        fetch(`http://localhost:4000/users/authId/${profile.sub}`)
            .then(res => res.json())
            .then(res => this.setState({
                isProfileExist: res !== null,
                user: {
                    ...res,
                    authId: profile.sub,
                    email: profile.email,
                    picture: profile.picture,
                    nickname: profile.nickname
                }
            }))
    };

    registerBtnClickHandler = (e) => {
        if (this.props.auth.isAuthenticated()) {
            const meetupId = e.target.id;
            fetch(`http://localhost:4000/meetups/${meetupId}/users`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(this.state.user)
            })
                .then(res => {
                    if (res.status === 403)
                        NotificationManager.error('Ви вже зареєстровані на цей Meetup. :)', 'Помилка!', 5000);
                    if (res.status === 200)
                        NotificationManager.success('Ви успішно зареєструвалися :)', 'Круто!', 5000);
                })
        }
        else
            this.login();
    };

    login = () => {
        this.props.auth.login();
    };

    render() {
        let _this = this;
        return (
            <div className="row justify-content-center">
                {
                    [].map.call(this.state.meetupList, function (meetup) {
                        if (meetup.isActive)
                            return <Card
                                key={meetup._id}
                                id={meetup._id}
                                meetup={meetup}
                                onClick={_this.registerBtnClickHandler}
                            />
                    })
                }
                <NotificationContainer/>
            </div>
        );
    }
}

export default News;