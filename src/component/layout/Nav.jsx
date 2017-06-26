import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { logout } from '../../actions/AuthActions'
class Nav extends Component {
	constructor(props) {
        super(props);
        this.state = {
            currentRoute: '',
            data: {}
        };
    }

	render() {
		return(
			<nav className="navbar navbar-toggleable-md navbar-inverse bg-inverse fixed-top">
				<button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<a className="navbar-brand" href="#">Wallet</a>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav mr-auto">
					</ul>
					<button className="btn btn-outline-danger my-2 my-sm-0" type="submit" onClick={this.logout}>
						Cerrar sesion
					</button>
				</div>
			</nav>
		);
	}
}

Nav.proptypes = {
	logout: React.PropTypes.func.isRequired
}

export default Nav;