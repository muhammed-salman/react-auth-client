import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

class Header extends Component{
	renderLinks(){
		if(this.props.authenticated){
			return(
				<li className="nav-item">
					<Link className="nav-link" to="/signout">Sign Out</Link>
				</li>
				);
		}
		else{
			return[
				<li className="nav-item" key={1}>
					<Link className="nav-link" to="/signin">Sign In</Link>
				</li>,
				<li className="nav-item" key={2}>
					<Link className="nav-link" to="/signup">Sign Up</Link>
				</li>
			];
		}
	}

	render(){
		return (
			<nav className="navbar navbar-light">
				<Link to="/" className="navbar navbar-brand">Redux Auth</Link>
				<ul className="nav navbar-nav">
					{this.renderLinks()}			
				</ul>
			</nav>
			);
	}
}
function mapStateToProps(state){
	return{
		authenticated: state.auth.authenticated
	};
}
export default connect(mapStateToProps)(Header);