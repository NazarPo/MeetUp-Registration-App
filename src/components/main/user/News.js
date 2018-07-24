import React, { Component } from 'react';
import Card from './atoms/Card';
import { notification } from 'antd';

class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            meetupList: []
        };
    }
    componentWillMount() {
        fetch('http://localhost:4000/meetUps')
            .then(res => res.json())
            .then(res => {
                    this.setState({
                        meetupList: res
                    })
                }
            )
    }

    openNotificationWithIcon = (type) => {
        notification[type]({
            message: 'Notification Title',
            description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
        });
    };

    registerBtnClickHandler = () => {
        if(this.props.auth.isAuthenticated()) {
            this.openNotificationWithIcon('success');
        }
        else
            this.login();
    };

    login = () => {
        this.props.auth.login();
    };

    render() {
        let _this = this;
        return(
            <div className="row justify-content-center">
                {
                    [].map.call(this.state.meetupList, function (meetup) {
                        if(meetup.isActive)
                            return <Card
                                key={meetup._id}
                                meetup={meetup}
                                onClick={_this.registerBtnClickHandler}
                            />
                    })
                }
            </div>
        );
    }
}

export default News;