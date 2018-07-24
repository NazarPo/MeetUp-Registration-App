import React, { Component } from 'react';
import '../../../../../components-styles/admin/EditModal.css';
import Modal from 'react-modal';
//atoms
import DateInput from '../inputs/DateInput';

Modal.setAppElement('#root');

const customStyles = {
    overlay: {
        backgroundColor       : 'rgba(255, 186, 18, 0.75)'
    },
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : '40%',
        bottom                : 'auto',
        marginRight           : '-20%',
        transform             : 'translate(-50%, -50%)',
        border                : '1px solid FFBA08'
    }
};

class EditModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            meetup: {
                title: "",
                description: "",
                image: "",
                blogLink: "",
                dates: [],
                startTime: ""
            }
        }
    }

    componentDidMount() {
        fetch(`http://localhost:4000/meetups/${this.props.id}`)
            .then(res => res.json())
                .then(res => this.setState({
                meetup: res
            }))
    }

    editFormSubmitHandler = (e) => {
        e.preventDefault();
        fetch(`http://localhost:4000/meetups/${this.props.id}`, {
            method: "PATCH",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this.state.meetup)
        })
            .then(this.props.onRequestClose)

    };

    addDateInput = () => {
        let inputs = this.state.meetup.dates;
        let input = {
            id: inputs.length.toString(),
            date: ''
        };
        inputs.push(input);
        this.setState({
            meetup: {
                ...this.state.meetup,
                dates: inputs
            }
        });
    };

    removeDateInput = () => {
        let inputs = this.state.meetup.dates.slice(0, -1);
        this.setState({
            meetup: {
                ...this.state.meetup,
                dates: inputs
            }
        });
    };

    handleChange = ({target: {name, value}}) => {
        this.setState({
            meetup: {
                ...this.state.meetup,
                [name]: value
            }
        })
    };

    onChangeDateHandler = (e) => {
        let temp = this.state.meetup;
        this.addDateToMeetup(this.createNewDate(e), temp.dates);
        this.setState({ meetup: temp });
        this.setActiveField();
    };

    setActiveField = () => {
        let temp = this.state.meetup;
        temp.isActive = this.calculateMeetupActivity();
        this.setState({meetup: temp });
    };

    addDateToMeetup = (date, dates) => {
        let exists = false;
        let index = 0;
        dates.forEach((item) => {
            if (item.id === date.id) {
                exists = true;
                index = dates.indexOf(item)
            }
        });
        if(exists)
            dates[index] = date;
    };

    createNewDate = (e) => {
        let newDate = {};
        newDate.id = e.target.id;
        newDate.date = e.target.value;
        return newDate;
    };

    calculateMeetupActivity = () => {
        let isActive = true;
        let temp = this.state.meetup;
        temp.dates.forEach((item) => {
            let date = new Date(item.date);
            if(new Date().getTime() > date.getTime())
                isActive = false;
        });
        return isActive;
    };

    render() {
        let meetup = this.state.meetup;
        return (
            <Modal
                isOpen={this.props.isOpen}
                onRequestClose={this.props.onRequestClose}
                style={customStyles}
                contentLabel="Edit Modal"
            >
                <div className="modal-header">
                    <h4>Редагування Meetup'у</h4>
                    <button type="button" className="close" onClick={this.props.onRequestClose} aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="container">
                    <form onSubmit={this.editFormSubmitHandler}>
                        <div className="form-group">
                            <label htmlFor="meetup-title">Тема:</label>
                            <input type="text"
                                   value={meetup.title}
                                   className="form-control"
                                   id="meetup-title"
                                   name="title"
                                   onChange={this.handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="meetup-image">Малюнок:</label>
                            <input type="text"
                                   value={meetup.image}
                                   className="form-control"
                                   id="meetup-image"
                                   name="image"
                                   onChange={this.handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="meetup-description">Опис:</label>
                            <textarea className="form-control"
                                      value={meetup.description}
                                      id="meetup-description"
                                      rows="3"
                                      name="description"
                                      onChange={this.handleChange}
                            />
                        </div>

                        <div className="form-group" id="date-adding">
                            <div className="inputs-header">
                                <label htmlFor="meetup-date">Дата проведення:</label>
                                <div className="inputs-control">
                                    <i className="fa fa-plus-square" onClick={this.addDateInput} />
                                    <i className="fa fa-minus-square" onClick={this.removeDateInput} />
                                </div>
                            </div>
                            <div className="inputs-body">
                            {
                                this.state.meetup.dates.map((item, index) => {
                                    return (
                                        <div>
                                            <DateInput id={index}
                                                       key={index}
                                                       value={item.date}
                                                       onChange={this.onChangeDateHandler}
                                            />
                                        </div>
                                    );
                                })
                            }
                            </div>
                        </div>

                        <div className="form-group row">
                            <div className="col-10 time-input">
                                <label htmlFor="example-time-input">Початок Meetup'у о:</label>
                                <input className="form-control"
                                       value={meetup.startTime}
                                       type="time"
                                       id="example-time-input"
                                       name="startTime"
                                       onChange={this.handleChange}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="meetup-link">Посилання на сторінку блогу:</label>
                            <input type="text"
                                   value={meetup.blogLink}
                                   className="form-control"
                                   id="meetup-link"
                                   name="blogLink"
                                   onChange={this.handleChange}
                            />
                        </div>
                        <div className="create-meetup">
                            <button type="submit" className="btn btn-danger">Редагувати</button>
                        </div>
                    </form>
                </div>
            </Modal>
        )
    }
};

export default EditModal;