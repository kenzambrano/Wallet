import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import { connect } from 'react-redux';

// Test
import Nav from '../component/layout/Nav';
// import Footer from '../component/layout/Footer'

class Home extends Component {
	render() {
		return (
			// <Nav />

			<div className="container">
			  	<div className="starter-template">
			    	<h1>Wallet</h1>
			    	<p className="lead">Home</p>
			  	</div>
			</div>

			// <Footer />
		);
	}
}

export default Home;