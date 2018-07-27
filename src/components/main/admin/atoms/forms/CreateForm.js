import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import '../../../../../components-styles/admin/MeetupForm.css';
import DateInput from '../inputs/DateInput';

class CreateForm extends Component {
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
            inputs: [],
            isRedirected: false
        }
    }

    createFormSubmitHandler = (e) => {
        e.preventDefault();
        fetch('http://localhost:4000/meetups', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this.state.newMeetup)
        })
            .then(this.setState({ isRedirected: true }))
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
        if(this.state.isRedirected)
            return <Redirect  to="/admin" />
        return (
            <div className='meetup-form'>
                <div className="modal-header">
                    <h4>Створення нового Meetup</h4>
                </div>
                <div className="container">
                    <form  onSubmit={this.createFormSubmitHandler}>
                        <div className="form-group">
                            <label htmlFor="meetup-title">Тема:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="meetup-title"
                                name="title"
                                onBlur={this.onTitleInputBlur}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="meetup-image">Малюнок:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="meetup-image"
                                name="image"
                                onBlur={this.onImageInputBlur}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="meetup-description">Опис:</label>
                            <textarea
                                className="form-control"
                                name="description"
                                id="meetup-description"
                                rows="3"
                                onBlur={this.onDescriptionInputBlur}
                                required
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
                                       name="startTime"
                                       id="example-time-input"
                                       onBlur={this.onTimeInputBlurHandler}
                                       required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="meetup-link">Посилання на сторінку блогу:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="meetup-link"
                                name="blogLink"
                                onBlur={this.onBlogLinkInputBlur}
                                required
                            />
                        </div>
                        <div className="submit-button">
                            <button type="submit" className="btn btn-success">Створити</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
};

export default CreateForm;