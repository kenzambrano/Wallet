import React from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent){
	class Authenticate extends React.Component {
		componentWillMount() {
			if (!this.props.isAuth && this.context.router.location.pathname != '/signin' && localStorage.account == null) {
				this.context.router.push('/signin');
			} else if(!this.props.isAuth && this.context.router.location.pathname != '/' && localStorage.account != null){
				this.context.router.push('/');
			}
		}

		componentWillUpdate(nextProps) {
			if (!nextProps.isAuth && this.context.router.location.pathname != '/signin' && localStorage.account == null) {
				this.context.router.push('/signin');
			} else if (nextProps.isAuth && this.context.router.location.pathname != '/' && localStorage.account != null) {
				this.context.router.push('/');
			}
		}

		render() {
			return(
				<ComposedComponent {...this.props} />
			);
		}
	}
}