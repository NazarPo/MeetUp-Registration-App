import React, { Component } from 'react';
import Card from './atoms/Card';

class Meetups extends Component {
    constructor(props) {
        super(props);
        this.state = {
            meetupsList: []
        };
    }
    componentWillMount() {
        fetch('http://localhost:4000/meetUps')
            .then(res => res.json())
            .then(res => {
                this.setState({
                    meetupsList: res
                })
            })
    }

    render() {
        return(
            <div className="row justify-content-center">
                {
                    this.state.meetupsList.map((meetup) => {
                        if(!meetup.isActive)
                            return <Card
                                key={meetup._id}
                                meetup={meetup}
                                isActive={meetup.isActive}
                            />
                    })
                }
            </div>
        );
    }
}

export default Meetups;