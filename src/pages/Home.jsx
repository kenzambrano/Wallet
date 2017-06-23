import React, { Component } from 'react';
import Balance from '../component/balance/Balance'
class Home extends Component {
	render() {
		return (
			<div className="container">
			  	<div className="starter-template">
						<Balance/>
			  	</div>
			</div>

			// <Footer />
		);
	}
}

export default Home;