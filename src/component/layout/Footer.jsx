import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

class Footer extends Component {
	render() {
		return(
			<footer className="footer">
	      		<div className="container">
	        		<span className="text-muted">Create By Kender Zambrano.</span>
	      		</div>
	    	</footer>
		);
	}
}

export default Footer;