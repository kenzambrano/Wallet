import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import SigninForm from '../component/account/SigninForm';
import logo from '../assets/img/logo.png';
import {signin} from '../actions/AuthActions'


class Signin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: null
    }
    this.signin = this.signin.bind(this);
  }

  signin(user){
    return signin(user)
  }

  componentDidMount() {
  }

  render() {
    return (
      <ReactCSSTransitionGroup
        transitionName="fade"
        transitionAppear={true}
        transitionAppearTimeout={500}
        transitionEnter={false}
        transitionLeave={false}>
        <div className="container">
          <div className="center">
            <img src={logo} alt=""/>
            <h2 className="form-signin-heading">Sign in</h2>
          </div>
          <SigninForm signin={this.signin}/>
        </div>
      </ReactCSSTransitionGroup>
    );
  }

}

Signin.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default Signin;