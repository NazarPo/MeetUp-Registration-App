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
        console.log('Click');
        //TODO: Implementation is here
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
                                isActive={meetup.isActive}
                                onClick={_this.registerBtnClickHandler}
                            />
                    })
                }
            </div>
        );
    }
}

export default News;