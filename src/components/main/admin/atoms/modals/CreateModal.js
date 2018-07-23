import React, { Component } from 'react';
import '../../../../../components-styles/admin/EditModal.css';
import Modal from 'react-modal';
//atoms
import DateInput from '../inputs/DateInput';

Modal.setAppElement('#root');

const customStyles = {
    overlay: {
        backgroundColor       : 'rgba(20, 141, 161, 0.75)'
    },
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : '40%',
        bottom                : 'auto',
        marginRight           : '-20%',
        transform             : 'translate(-50%, -50%)',
        border                : '1px solid 138496'
    }
};

class CreateModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newMeetup: {
                title: "",
                description: "",
                image: "",
                blogLink: "",
                dates: [],
                startTime: ""
            },
            inputs: []
        }
    }

    createFormSubmitHandler = (e) => {
        e.preventDefault();
        fetch('http://localhost:4000/meetups', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this.state.newMeetup)
        })
            .then(this.props.onRequestClose)
    };

    inputEventHandler = (e) => {
        let temp = this.state.newMeetup;
        temp[e.target.name] = e.target.value;
        this.setState({ newMeetup: temp });
    };

    onTitleInputBlur = (e) => {
        this.inputEventHandler(e);
    };

    onImageInputBlur = (e) => {
        this.inputEventHandler(e);
    };

    onDescriptionInputBlur = (e) => {
        this.inputEventHandler(e);
    };

    onBlogLinkInputBlur = (e) => {
        this.inputEventHandler(e);
    };

    onTimeInputBlurHandler = (e) => {
        this.inputEventHandler(e);
    };

    onChangeDateInputHandler = (e) => {
        let temp = this.state.newMeetup;
        this.addDateToMeetup(this.createNewDate(e), temp.dates);
        this.setState({ newMeetup: temp });
        this.setActiveField();
    };

    setActiveField = () => {
        let temp = this.state.newMeetup;
        temp.isActive = this.calculateMeetupActivity();
        this.setState({ newMeetup: temp });
    };

    addDateInput = () => {
        let inputs = this.state.inputs.concat(DateInput);
        this.setState({ inputs });
    };

    removeDateInput = () => {
        let inputs = this.state.inputs.slice(0, -1);
        let newDates= this.state.newMeetup.dates.slice(0, -1);
        this.setState({
            inputs,
            newMeetup: {
                ...this.state.newMeetup,
                dates: newDates
            }
        });
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
        else dates.push(date);
    };

    createNewDate = (e) => {
        let newDate = {};
        newDate.id = e.target.id;
        newDate.date = e.target.value;
        return newDate;
    };

    calculateMeetupActivity = () => {
        let isActive = true;
        let temp = this.state.newMeetup;
        temp.dates.forEach((item) => {
            let date = new Date(item.date);
            if(new Date().getTime() > date.getTime())
                isActive = false;
        });
        return isActive;
    };

    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                onRequestClose={this.props.onRequestClose}
                style={customStyles}
                contentLabel="Create Modal"
            >
                <div className="modal-header">
                    <h4>Створення нового Meetup</h4>
                    <button type="button" className="close" onClick={this.props.onRequestClose} aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="container">
                    <form  onSubmit={this.createFormSubmitHandler}>
                        <div className="form-group">
                            <label htmlFor="meetup-title">Тема:</label>
                            <input type="text" className="form-control" id="meetup-title" onBlur={this.onTitleInputBlur} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="meetup-image">Малюнок:</label>
                            <input type="text" className="form-control" id="meetup-image" onBlur={this.onImageInputBlur} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="meetup-description">Опис:</label>
                            <textarea className="form-control" id="meetup-description" rows="3" onBlur={this.onDescriptionInputBlur} />
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
                                this.state.inputs.map((Element, index) => {
                                    return (
                                        <div>
                                            <Element
                                                id={index}
                                                key={index}
                                                onChange={this.onChangeDateInputHandler}
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
                                       type="time"
                                       id="example-time-input"
                                       onBlur={this.onTimeInputBlurHandler}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="meetup-link">Посилання на сторінку блогу:</label>
                            <input type="text" className="form-control" id="meetup-link" onBlur={this.onBlogLinkInputBlur} />
                        </div>
                        <div className="create-meetup">
                            <button type="submit" className="btn btn-success">Створити</button>
                        </div>
                    </form>
                </div>
            </Modal>
        )
    }
};

export default CreateModal;