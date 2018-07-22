import React, { Component } from 'react';
import Table from './atoms/Table';
import '../../../components-styles/admin/Meetups.css';
import CreateModal from './atoms/modals/CreateModal';

class Meetups extends Component {
    constructor(props) {
        super(props);
        this.state = {
            meetupsList: [],
            modalIsOpen: false
        }
    }

    componentDidMount() {
        fetch('http://localhost:4000/meetups')
            .then(res => res.json())
            .then(res => this.setState({
                meetupsList: res
            }))
    }

    componentWillUpdate() {
        this.componentDidMount();
    }

    openEditModal = () => {
        this.setState({ modalIsOpen: true })
    };

    closeEditModal = () => {
        this.setState({ modalIsOpen: false })
    };

    render() {
        return (
            <div className="container meetups">
                <h2>Список усіх Meetup's</h2>
                <div>
                    <button
                        type="button"
                        className="btn btn-info"
                        onClick={this.openEditModal}
                    >Додати новий Meetup</button>
                </div>
                <Table meetUpsList={this.state.meetupsList} />
                <CreateModal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeEditModal}
                />
            </div>
        );
    }
}

export default Meetups;