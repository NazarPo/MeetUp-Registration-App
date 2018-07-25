import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import '../../../components-styles/user/Profile.css';

class ViewProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        }
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
                user: res
            }))
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
        if(!this.state.user)
            return (
                <div id="empty-profile-message">
                    <img src="https://png.icons8.com/metro/1600/sad.png" alt=""/>
                    <h5>Вам потрібно редагувати ваш профіль для відображення даних...</h5>
                    <Link to='/edit-profile'>Редагувати профіль</Link>
                </div>
                )
        return (
            <div className="view-profile">
                <img src={this.state.user.picture} alt="User profile"/>
                <div id="profile" aria-expanded="false">
                    <h3>{this.state.user.name}</h3>
                    <hr/>
                    <div>
                        <i className="material-icons">person</i>
                        <h5>{this.state.user.nickname}</h5>
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
            </div>
        )
    }
}

export default ViewProfile;