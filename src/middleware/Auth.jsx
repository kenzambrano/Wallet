import React from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent){
	class Authenticate extends React.Component {
		componentWillMount() {
			if (!this.props.isAuth && this.context.router.location.pathname != '/signin' && localStorage.user == null) {
				this.context.router.push('/signin');
			} else if(!this.props.isAuth && this.context.router.location.pathname != '/' && localStorage.user != null){
				this.context.router.push('/');
			}
		}

		componentWillUpdate(nextProps) {
			if (!nextProps.isAuth && this.context.router.location.pathname != '/signin' && localStorage.user == null) {
				this.context.router.push('/signin');
			} else if (nextProps.isAuth && this.context.router.location.pathname != '/' && localStorage.user != null) {
				this.context.router.push('/');
			}
		}

		render() {
			return(
				<ComposedComponent {...this.props} />
			);
		}
	}
  Authenticate.propTypes = {
    isAuth: React.PropTypes.bool.isRequired,
    //   addFlashMessage: React.PropTypes.func.isRequired
  }

  Authenticate.contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  function mapStateToProps(state) {
    return {
      isAuth: state.auth.isAuth
    };
  }

  return connect(mapStateToProps)(Authenticate);

}