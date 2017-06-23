import React, { Component } from 'react';
import Nav from './Nav';
class Layout extends Component {
  render() {
    return (
			<div className="body-content container">
				<Nav/>
        {this.props.children}
			</div>
    );
  }
}
export default Layout;