import React, {Component} from 'react';
import '../../../components-styles/user/Profile.css';

class ViewProfile extends Component {
    USER_URL = 'http://localhost:4000/users/5b50830b25dad540c2f90e8c';

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            profile: {}
        }
    }

    componentWillMount() {
        if (this.props.auth.isAuthenticated()) {
            this.setState({profile: {}});
            const {userProfile, getProfile} = this.props.auth;
            if (!userProfile) {
                getProfile((err, profile) => {
                    this.setState({profile});
                })
            } else {
                this.setState({profile: userProfile});
            }
        }
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
            this.addZeroTo(newDate.getMonth() + 1) +
            '-' +
            this.addZeroTo(newDate.getDate())
        );
        return result;
    };

    render() {
        return (
            <div className="tab-content py-4">
                <div className="tab-pane active" id="profile" aria-expanded="false">
                    <h3>{this.state.profile.name}</h3>
                    <hr/>
                    <div>
                        <i className="material-icons">person</i>
                        <h5>{this.state.profile.nickname}</h5>
                    </div>
                    <hr/>
                    <div>
                        <i className="fa fa-envelope-o"></i>
                        <h5>{this.state.profile.email}</h5>
                    </div>
                    <hr/>
                    <div>
                        <i className="fa fa-phone"></i>
                        <h5>{this.state.user.phone}</h5>
                    </div>
                    <hr/>
                    <div>
                        <i className="fa fa-group" aria-hidden="true"></i>
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

                <div className="col-lg-4 order-lg-1 text-center">
                    <img src={this.state.profile.picture} alt="User profile"/>
                </div>
            </div>
        )
    }
}

export default ViewProfile;