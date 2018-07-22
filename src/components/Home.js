import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import '../components-styles/Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toAuthorization: false, toRegistration: false
    }
  }
  redirectToAuthorization = () => {
    this.setState({
        toAuthorization: true
    });
  };

  redirectToRegistration = () => {
      this.setState({
          toRegistration: true
      });
  };

  render() {
    if(this.state.toAuthorization) {
        return <Redirect to='/authorization'/>
    }
    if(this.state.toRegistration) {
      return <Redirect to='/registration' />
    }
    return (
      <div className="Home">
          <img className="meet-up-logo" src="https://lh3.googleusercontent.com/KLdN3RBoeu11eVC7kwud5krPgDIRJK_MgNAVoVeT4lvyt9V1LpvLKWKo804uIdby95sUYdG7qg=w2048" alt=""/>
          <div id="home-buttons">
            <button type="button" className="btn btn-success" onClick={ this.redirectToAuthorization }>Sign in</button>
            <button type="button" className="btn btn btn-info" onClick={ this.redirectToRegistration }>Sign up</button>
          </div>
      </div>
    );
  }
}
export default Home;
