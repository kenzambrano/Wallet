import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

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
		      	<button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
		        	<span className="navbar-toggler-icon"></span>
		      	</button>
		      	<a className="navbar-brand" href="#">Wallet</a>

		      	<div className="collapse navbar-collapse" id="navbarsExampleDefault">
		        	<ul className="navbar-nav mr-auto">
		          		<li className="nav-item active">
		            		<a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
		          		</li>
			          	<li className="nav-item">
			            	<a className="nav-link" href="#">Link</a>
			          	</li>
		        	</ul>
			        <form className="form-inline my-2 my-lg-0">
		          		<li className="nav-item dropdown">
		            		<a className="nav-link dropdown-toggle" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</a>
		            		<div className="dropdown-menu" aria-labelledby="dropdown01">
		              			<a className="dropdown-item" href="#">Logout</a>
		            		</div>
		          		</li>
			        </form>
		      	</div>
		    </nav>
		);
	}
}

export default Nav;