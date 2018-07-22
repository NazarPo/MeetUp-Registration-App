import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import '../../../components-styles/admin/MeetupInfo.css';
import EditModal from './atoms/modals/EditModal';

class MeetupInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            meetup: {},
            isRedirected: false,
            modalIsOpen: false
        };
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        fetch(`http://localhost:4000/meetups/${id}`)
            .then(res => res.json())
            .then(res => this.setState({
                meetup: res
            }))
    }

    componentWillUpdate() {
        this.componentDidMount();
    }

    onDeleteBtnClickHandler = () => {
        const {id} = this.props.match.params;
        fetch(`http://localhost:4000/meetups/${id}`, {
            method: 'DELETE'
        })
            .then(this.setState({isRedirected: true}))
    };

    openEditModal = () => {
        this.setState({ modalIsOpen: true })
    };

    closeEditModal = () => {
        this.setState({ modalIsOpen: false })
    };

    createDatesArray = (dates) => {
        let onlyDates = [];
        if(typeof dates !== 'undefined')
            dates.forEach((item) => {
                onlyDates.push(new Date(item.date).toDateString());
            });
        return onlyDates;
    };

    render() {
        if (this.state.isRedirected)
            return <Redirect to="/admin"/>;
        return (
            <div>
                <div className="card admin-card">
                    <div className="card-header">
                        <img className="card-img-top" src={this.state.meetup.image} alt="Card image cap"/>
                    </div>
                    <div className="card-body">
                        <h3 className="card-title">{this.state.meetup.title}</h3>
                        <p className="card-text">{this.state.meetup.description}</p>
                        <h6 className="card-title"><b>Дата проведення: </b>{this.createDatesArray(this.state.meetup.dates).join(', ')}</h6>
                        <h6><b>Час початку: </b>{this.state.meetup.startTime}</h6>
                        <h6><b>Адреса: </b>м.Черкаси, вул.Грушевського 19/3</h6>
                        <div>
                            <button type="button"
                                    className="btn btn-danger"
                                    onClick={this.onDeleteBtnClickHandler}
                            >Видалити
                            </button>
                            <button type="button"
                                    className="btn btn-warning"
                                    onClick={this.openEditModal}
                            >Редагувати
                            </button>
                        </div>
                    </div>
                </div>
                <EditModal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeEditModal}
                    id={this.props.match.params.id}
                />
            </div>
        );
    }
}

export default MeetupInfo;