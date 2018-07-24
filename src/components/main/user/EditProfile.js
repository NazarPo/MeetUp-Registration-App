import React, { Component } from 'react';

class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        };
    }

    render() {
        return(
            <div className="tab-pane" id="edit" aria-expanded="true">
                <form role="form">
                    <h4>Контактні та особисті дані</h4>
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
                        <label className="col-lg-3 col-form-label form-control-label" />
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
        )
    }
}

export default EditProfile;