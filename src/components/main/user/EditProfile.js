import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';

class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            isProfileExist: false,
            isRedirected: false
        };
    }

    componentWillMount() {
        if (this.props.auth.isAuthenticated()) {
            const {userProfile, getProfile} = this.props.auth;
            if (!userProfile) {
                getProfile((err, profile) => {
                    this.getUserFromDB(profile);
                })
            } else {
                this.getUserFromDB(userProfile)
            }
        }
    }

    getUserFromDB = (profile) => {
        fetch(`http://localhost:4000/users/${profile.sub}`)
            .then(res => res.json())
            .then(res => this.setState({
                isProfileExist: res !== null,
                user: {
                    ...res,
                    authId: profile.sub,
                    email: profile.email,
                    picture: profile.picture,
                    nickname: profile.nickname
                }
            }))
    };

    postUserToDB = () => {
        fetch('http://localhost:4000/users', {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this.state.user)
        })
    };

    patchUserInDB = () => {
        fetch(`http://localhost:4000/users/${this.state.user.authId}`, {
            method: "PATCH",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this.state.user)
        })
    };

    onSaveButtonClick = () => {
        this.state.isProfileExist ? this.patchUserInDB() : this.postUserToDB();
        this.setState({ isRedirected: true });
    };

    handleTextInputChange = (e) => {
        this.setState({
            user: {
                ...this.state.user,
                [e.target.name]: e.target.value
            }
        })
    };

    yesNoRadioButtonsHandleChange = (e) => {
        this.setState({
            user: {
                ...this.state.user,
                hasLaptop: e.target.value === "yes" ? true : false
            }
        })
    };

    universityRadioButtonsHandleChange = (e) => {
        this.setState({
            user: {
                ...this.state.user,
                university: e.target.value
            }
        })
    };

    addZeroTo = (number) => {
        return number < 10 ? '0' + number : number;
    };

    dateFormatter = (date) => {
        let newDate = new Date(date);
        let result = this.addZeroTo(newDate.getFullYear() +
            '-' +
            this.addZeroTo(newDate.getMonth() + 1) +
            '-' +
            this.addZeroTo(newDate.getDate())
        );
        return result;
    };

    render() {
        if(this.state.isRedirected)
            return <Redirect to='/view-profile' />
        return (
            <div id="edit-profile">
                <form role="form">
                    <h4>Контактні та особисті дані</h4>
                    <hr/>
                    <div className="form-group row">
                        <label
                            className="col-lg-5 col-form-label form-control-label">Ім'я</label>
                        <div className="col-lg-7">
                            <input className="form-control"
                                   name="name"
                                   value={this.state.user ? this.state.user.name : ''}
                                   onChange={this.handleTextInputChange} type="text"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label
                            className="col-lg-5 col-form-label form-control-label">Прізвище</label>
                        <div className="col-lg-7">
                            <input className="form-control"
                                   name="secondName"
                                   value={this.state.user ? this.state.user.secondName : ''}
                                   onChange={this.handleTextInputChange} type="text"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label
                            className="col-lg-5 col-form-label form-control-label">Номер телефону</label>
                        <div className="col-lg-7">
                            <input className="form-control"
                                   name="phone"
                                   value={this.state.user ? this.state.user.phone : ''}
                                   onChange={this.handleTextInputChange} type="text"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label
                            className="col-lg-5 col-form-label form-control-label">Посилання на твою сторінку в
                            соціальній мережі (будь-якій)</label>
                        <div className="col-lg-7">
                            <input className="form-control"
                                   name="social"
                                   value={this.state.user ? this.state.user.social : ''}
                                   onChange={this.handleTextInputChange}
                                   type="url"/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label
                            className="col-lg-5 col-form-label form-control-label">Дата народження</label>
                        <div className="col-lg-7">
                            <input className="form-control"
                                   name="birth"
                                   value={this.state.user ? this.dateFormatter(this.state.user.birth) : ''}
                                   onChange={this.handleTextInputChange}
                                   type="date"/>
                        </div>
                    </div>

                    <h4>Освіта</h4>
                    <hr/>
                    <div className="form-group row">
                        <label
                            className="col-lg-5 col-form-label form-control-label">ВНЗ</label>
                        <div className="col-lg-7 radio-form">
                            <div>
                                <input id="1" type="radio"
                                       value="Черкаський Національний університет ім.Б. Хмельницького"
                                       checked={this.state.user ? this.state.user.university === "Черкаський Національний університет ім.Б. Хмельницького" : ''}
                                       onChange={this.universityRadioButtonsHandleChange}
                                       name="universities"/>
                                <label htmlFor="1">Черкаський Національний університет ім.Б. Хмельницького</label>
                            </div>
                            <div>
                                <input id="2" type="radio"
                                       value="Черкаський державний технічний університет"
                                       checked={this.state.user ? this.state.user.university === "Черкаський державний технічний університет" : ''}
                                       onChange={this.universityRadioButtonsHandleChange}
                                       name="universities"/>
                                <label htmlFor="2">Черкаський державний технічний університет</label>
                            </div>
                            <div>
                                <input id="3" type="radio"
                                       value="Черкаський державний бізнес-коледж"
                                       checked={this.state.user ? this.state.user.university === "Черкаський державний бізнес-коледж" : ''}
                                       onChange={this.universityRadioButtonsHandleChange}
                                       name="universities"/>
                                <label htmlFor="3">Черкаський державний бізнес-коледж</label>
                            </div>
                            <div>
                                <input id="4" type="radio"
                                       value="Черкаський інститут банківської справи"
                                       checked={this.state.user ? this.state.user.university === "Черкаський інститут банківської справи" : ''}
                                       onChange={this.universityRadioButtonsHandleChange}
                                       name="universities"/>
                                <label htmlFor="4">Черкаський інститут банківської справи</label>
                            </div>
                            <div>
                                <input id="5" type="radio"
                                       value="Черкаський політехнічний технікум"
                                       checked={this.state.user ? this.state.user.university === "Черкаський політехнічний технікум" : ''}
                                       onChange={this.universityRadioButtonsHandleChange}
                                       name="universities"/>
                                <label htmlFor="5">Черкаський політехнічний технікум</label>
                            </div>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-lg-5 col-form-label form-control-label">Факультет</label>
                        <div className="col-lg-7">
                            <input className="form-control"
                                   name="faculty"
                                   value={this.state.user ? this.state.user.faculty : ''}
                                   onChange={this.handleTextInputChange}
                                   type="text"/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-lg-5 col-form-label form-control-label">Курс</label>
                        <div className="col-lg-7">
                            <input className="form-control"
                                   name="course"
                                   value={this.state.user ? this.state.user.course : ''}
                                   onChange={this.handleTextInputChange}
                                   type="text"/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-lg-5 col-form-label form-control-label">Чи маєш ти ноутбук?</label>
                        <div className="col-lg-7 radio-form">
                            <div>
                                <input id="notebook-true"
                                       type="radio"
                                       value="yes"
                                       checked={this.state.user ? this.state.user.hasLaptop : ''}
                                       onChange={this.yesNoRadioButtonsHandleChange}
                                       name="choice"/>
                                <label htmlFor="notebook-true">Так</label>
                            </div>
                            <div>
                                <input id="notebook-false"
                                       type="radio"
                                       value="no"
                                       checked={this.state.user ? !this.state.user.hasLaptop : ''}
                                       onChange={this.yesNoRadioButtonsHandleChange}
                                       name="choice"/>
                                <label htmlFor="notebook-false">Ні</label>
                            </div>
                        </div>
                    </div>

                    <div className="form-group row buttons">
                        <input className="btn btn-secondary"
                               value="Відмінити"
                               type="reset"
                               onClick={this.componentWillMount.bind(this)}
                        />
                        <input className="btn btn-primary"
                               value="Зберегти зміни"
                               type="button"
                               onClick={this.onSaveButtonClick}
                        />
                    </div>
                </form>
            </div>
        )
    }
}

export default EditProfile;