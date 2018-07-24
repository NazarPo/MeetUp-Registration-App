import React, { Component } from 'react';
import Card from './atoms/Card';

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

    registerBtnClickHandler = () => {
        if(this.props.auth.isAuthenticated())
            console.log('Click');
        else
            this.login();
    };

    login = () => {
        this.props.auth.login();
    };

    render() {
        let _this = this;
        const { isAuthenticated } = this.props.auth;
        return(
            <div className="row justify-content-center">
                {
                    [].map.call(this.state.meetupList, function (meetup) {
                        if(meetup.isActive)
                            return <Card
                                key={meetup._id}
                                meetup={meetup}isActive={meetup.isActive}
                                onClick={_this.registerBtnClickHandler}
                            />
                    })
                }
            </div>
        );
    }
}

export default News;