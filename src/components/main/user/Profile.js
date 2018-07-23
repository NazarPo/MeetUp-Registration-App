import React, {Component} from 'react';
import '../../../components-styles/user/Profile.css';
import Gravatar from 'react-gravatar';

class Profile extends Component {
    USER_URL = 'http://localhost:4000/users/5b50830b25dad540c2f90e8c';

    constructor(props){
        super(props);
        this.state = {
            user: {}
        }
    }

    componentWillMount() {
        fetch(this.USER_URL)
            .then(res => res.json())
            .then(res => this.setState({
                user: res
            }))
    }

    onSaveButtonClick = () => {
        fetch(this.USER_URL, {
            method: "PATCH",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this.state.user)
        })
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
            this.addZeroTo(newDate.getMonth() + 1 ) +
            '-' +
            this.addZeroTo(newDate.getDate())
        );
        return result;
    };

    render() {
        return (
            <div className="row justify-content-center user-profile">
                <div className="container">
                    <div className="row my-2">
                        <div className="col-lg-8 order-lg-2">
                            <ul className="nav nav-tabs">
                                <li className="nav-item">
                                    <a href="" data-target="#profile" data-toggle="tab" className="nav-link active"
                                       aria-expanded="false">Профіль</a>
                                </li>
                                <li className="nav-item">
                                    <a href="" data-target="#edit" data-toggle="tab" className="nav-link"
                                       aria-expanded="true">Редагувати профіль</a>
                                </li>
                            </ul>
                            <div className="tab-content py-4">
                                <div className="tab-pane active" id="profile" aria-expanded="false">
                                    <h3>{this.state.user.name + " " + this.state.user.secondName}</h3>
                                    <hr/>
                                    <div>
                                        <i className="material-icons">person</i>
                                        <h5>{this.state.user.login}</h5>
                                    </div>
                                    <hr/>
                                    <div>
                                        <i className="fa fa-envelope-o"></i>
                                        <h5>{this.state.user.email}</h5>
                                    </div>
                                    <hr/>
                                    <div>
                                        <i className="fa fa-phone"></i>
                                        <h5>{this.state.user.phone}</h5>
                                    </div>
                                    <hr/>
                                    <div>
                                        <i className="material-icons">web</i>
                                        <h5><a href="https://www.facebook.com/">{this.state.user.social}</a></h5>
                                    </div>
                                    <hr/>
                                    <div>
                                        <i className="fa fa-birthday-cake"></i>
                                        <h5>{this.dateFormatter(this.state.user.birth)}</h5>
                                    </div>
                                    <hr/>
                                    <div>
                                        <i className="fa fa-university"></i>
                                        <h5>{this.state.user.university}</h5>
                                    </div>
                                </div>

                                <div className="tab-pane" id="edit" aria-expanded="true">
                                    <form role="form">
                                        <h4>Пароль</h4>
                                        <div className="form-group row">
                                            <label
                                                className="col-lg-3 col-form-label form-control-label">Пароль</label>
                                            <div className="col-lg-9">
                                                <input className="form-control"
                                                       name="pass"
                                                       value={this.state.user.pass}
                                                       onChange={this.handleTextInputChange}
                                                       type="password" />
                                            </div>
                                        </div>
                                        <h4>Контактні та особисті дані</h4>
                                        <div className="form-group row">
                                            <label className="col-lg-3 col-form-label form-control-label">Твоє ім'я</label>
                                            <div className="col-lg-9">
                                                <input className="form-control"
                                                       name="name"
                                                       value={this.state.user.name}
                                                       onChange={this.handleTextInputChange} type="text" />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-lg-3 col-form-label form-control-label">Твоє прізвище</label>
                                            <div className="col-lg-9">
                                                <input className="form-control"
                                                       name="secondName"
                                                       value={this.state.user.secondName}
                                                       onChange={this.handleTextInputChange} type="text" />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-lg-3 col-form-label form-control-label">Email</label>
                                            <div className="col-lg-9">
                                                <input className="form-control"
                                                       name="email"
                                                       value={this.state.user.email}
                                                       onChange={this.handleTextInputChange} type="email" />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label
                                                className="col-lg-3 col-form-label form-control-label">Номер телефону</label>
                                            <div className="col-lg-9">
                                                <input className="form-control"
                                                       name="phone"
                                                       value={this.state.user.phone}
                                                       onChange={this.handleTextInputChange} type="text" />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label
                                                className="col-lg-3 col-form-label form-control-label">Посилання на твою сторінку в соціальній мережі (будь-якій)</label>
                                            <div className="col-lg-9">
                                                <input className="form-control"
                                                       name="social"
                                                       value={this.state.user.social}
                                                       onChange={this.handleTextInputChange}
                                                       type="url" />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label
                                                className="col-lg-3 col-form-label form-control-label">Дата народження</label>
                                            <div className="col-lg-9">
                                                <input className="form-control"
                                                       name="birth"
                                                       value={this.dateFormatter(this.state.user.birth)}
                                                       onChange={this.handleTextInputChange}
                                                       type="date" />
                                            </div>
                                        </div>

                                        <h4>Освіта</h4>
                                        <div className="form-group row">
                                            <label
                                                className="col-lg-3 col-form-label form-control-label">ВНЗ</label>
                                            <div className="col-lg-9 radio-form">
                                                <div>
                                                    <input id="1" type="radio"
                                                           value="Черкаський Національний університет ім.Б. Хмельницького"
                                                           checked={this.state.user.university === "Черкаський Національний університет ім.Б. Хмельницького"}
                                                           onChange={this.universityRadioButtonsHandleChange}
                                                           name="universities"/>
                                                    <label htmlFor="1">Черкаський Національний університет ім.Б. Хмельницького</label>
                                                </div>
                                                <div>
                                                    <input id="2" type="radio"
                                                           value="Черкаський державний технічний університет"
                                                           checked={this.state.user.university === "Черкаський державний технічний університет"}
                                                           onChange={this.universityRadioButtonsHandleChange}
                                                           name="universities"/>
                                                    <label htmlFor="2">Черкаський державний технічний університет</label>
                                                </div>
                                                <div>
                                                    <input id="3" type="radio"
                                                           value="Черкаський державний бізнес-коледж"
                                                           checked={this.state.user.university === "Черкаський державний бізнес-коледж"}
                                                           onChange={this.universityRadioButtonsHandleChange}
                                                           name="universities"/>
                                                    <label htmlFor="3">Черкаський державний бізнес-коледж</label>
                                                </div>
                                                <div>
                                                    <input id="4" type="radio"
                                                           value="Черкаський інститут банківської справи"
                                                           checked={this.state.user.university === "Черкаський інститут банківської справи"}
                                                           onChange={this.universityRadioButtonsHandleChange}
                                                           name="universities"/>
                                                    <label htmlFor="4">Черкаський інститут банківської справи</label>
                                                </div>
                                                <div>
                                                    <input id="5" type="radio"
                                                           value="Черкаський політехнічний технікум"
                                                           checked={this.state.user.university === "Черкаський політехнічний технікум"}
                                                           onChange={this.universityRadioButtonsHandleChange}
                                                           name="universities"/>
                                                    <label htmlFor="5">Черкаський політехнічний технікум</label>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label className="col-lg-3 col-form-label form-control-label">Факультет</label>
                                            <div className="col-lg-9">
                                                <input className="form-control"
                                                       name="faculty"
                                                       value={this.state.user.faculty}
                                                       onChange={this.handleTextInputChange}
                                                       type="text" />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label className="col-lg-3 col-form-label form-control-label">Курс</label>
                                            <div className="col-lg-9">
                                                <input className="form-control"
                                                       name="course"
                                                       value={this.state.user.course}
                                                       onChange={this.handleTextInputChange}
                                                       type="text" />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label className="col-lg-3 col-form-label form-control-label">Чи маєш ти ноутбук?</label>
                                            <div className="col-lg-9 radio-form">
                                                <div>
                                                    <input id="notebook-true"
                                                           type="radio"
                                                           value="yes"
                                                           checked={this.state.user.hasLaptop}
                                                           onChange={this.yesNoRadioButtonsHandleChange}
                                                           name="choice"/>
                                                    <label htmlFor="notebook-true">Так</label>
                                                </div>
                                                <div>
                                                    <input id="notebook-false"
                                                           type="radio"
                                                           value="no"
                                                           checked={!this.state.user.hasLaptop}
                                                           onChange={this.yesNoRadioButtonsHandleChange}
                                                           name="choice"/>
                                                    <label htmlFor="notebook-false">Ні</label>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label className="col-lg-3 col-form-label form-control-label"></label>
                                            <div className="col-lg-9 control-buttons">
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
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 order-lg-1 text-center">
                            <Gravatar email={this.state.user.email} size={200} rating="pg" default="wavatar" className="CustomAvatar-image" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Profile;