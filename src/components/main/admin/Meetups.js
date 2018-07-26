import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Table from './atoms/Table';
import '../../../components-styles/admin/Meetups.css';

class Meetups extends Component {
    constructor(props) {
        super(props);
        this.state = {
            meetupsList: [],
            isRedirectedToCreating: false
        }
    }
    componentDidMount() {
        fetch('http://localhost:4000/meetups')
            .then(res => res.json())
            .then(res => this.setState({
                meetupsList: res
            }))
    }

    onAddNewMeetupClickHandler = () => {
        this.setState({
            isRedirectedToCreating: true
        })
    };

    render() {
        if(this.state.isRedirectedToCreating)
            return <Redirect to='/admin/create-meetup' />
        return (
            <div className="container meetups">
                <h4>Список усіх Meetup's</h4>
                <div>
                    <button
                        type="button"
                        className="btn btn-info"
                        onClick={this.onAddNewMeetupClickHandler}
                    >Додати новий Meetup</button>
                </div>
                <Table meetupsList={this.state.meetupsList} />
            </div>
        );
    }
}

export default Meetups;