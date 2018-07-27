import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import '../../../components-styles/admin/MeetupInfo.css';

class MeetupInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            meetup: {},
            isRedirected: false,
            isRedirectedToUsers: false
        };
    }

    componentWillMount() {
        const {id} = this.props.match.params;
        fetch(`http://localhost:4000/meetups/${id}`)
            .then(res => res.json())
            .then(res => this.setState({
                meetup: res
            }));
    }

    onDeleteBtnClickHandler = () => {
        const {id} = this.props.match.params;
        fetch(`http://localhost:4000/meetups/${id}`, {
            method: 'DELETE'
        })
            .then(this.setState({isRedirected: true}))
    };

    createDatesArray = (dates) => {
        let onlyDates = [];
        if (typeof dates !== 'undefined')
            dates.forEach((item) => {
                onlyDates.push(new Date(item.date).toDateString());
            });
        return onlyDates;
    };

    onOpenUsersPageClickHandler = () => {
        this.setState({ isRedirectedToUsers: true })
    };

    onEditBtnClickHandler = () => {
        this.setState({isRedirectedToEdit: true})
    };

    render() {
        if (this.state.isRedirected)
            return <Redirect to="/admin" />
        if(this.state.isRedirectedToUsers) {
            const url = `/admin/meetup/${this.state.meetup._id}/users`;
            return <Redirect to={url} />
        }
        if(this.state.isRedirectedToEdit) {
            const url = `/admin/edit-meetup/${this.state.meetup._id}`;
            return <Redirect to={url}/>
        }
        return (
            <div>
                <div className="card admin-card">
                    <div className="card-header">
                        <img className="card-img-top" src={this.state.meetup.image} alt="Card image cap"/>
                    </div>
                    <div className="card-body">
                        <h3 className="card-title">{this.state.meetup.title}</h3>
                        <p className="card-text">{this.state.meetup.description}</p>
                        <h6 className="card-title"><b>Дата
                            проведення: </b>{this.createDatesArray(this.state.meetup.dates).join(', ')}</h6>
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
                                    onClick={this.onEditBtnClickHandler}
                            >Редагувати
                            </button>
                            <button type="button"
                                    className="btn btn-light"
                                    onClick={this.onOpenUsersPageClickHandler}
                            >Переглянути реєстрації
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MeetupInfo;