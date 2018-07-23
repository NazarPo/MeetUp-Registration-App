import React, { Component } from 'react';
import '../components-styles/Home.css';

class Authorization extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  login = () => {
      this.props.auth.login();
  };

  render() {
    return (
      <div className="Home">
          <img className="meet-up-logo" src="https://lh3.googleusercontent.com/KLdN3RBoeu11eVC7kwud5krPgDIRJK_MgNAVoVeT4lvyt9V1LpvLKWKo804uIdby95sUYdG7qg=w2048" alt=""/>
          <div id="home-buttons">
            <button type="button" className="btn btn-success" onClick={ this.login }>Sign in</button>
            <button type="button" className="btn btn btn-info">Sign up</button>
          </div>
      </div>
    );
  }
}
export default Authorization;
