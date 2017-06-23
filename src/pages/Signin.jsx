import React, { Component } from 'react';
import { Link } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import SigninForm from '../component/account/SigninForm';
import logo from '../assets/img/logo.png';

class Signin extends Component {

     constructor(props) {
          super(props);
          this.state = {
               data: null        
          }
     }

     /*componentDidMount(){
          if (localStorage.root == null) {
               getConfig().then((res) => {
                    localStorage.setItem('root', JSON.stringify(res.data));
                    this.setState({data: JSON.parse(localStorage.root)})
               });             
          } else {
               this.setState({data: JSON.parse(localStorage.root)})            
          }
    }*/

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
                              <img src={logo} alt="" /> 
                              <h2 className="form-signin-heading">Sign in</h2>
                         </div>
                         <SigninForm />
                    </div> 
               </ReactCSSTransitionGroup>
		);
	}

}

export default Signin;