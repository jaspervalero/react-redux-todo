/**
 * react-redux-todo
 * Header Component
 *
 * @author Jasper Valero <contact@jaspervalero.com>
 * https://github.com/jaspervalero/react-redux-todo
 */
import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

class Header extends React.Component {

	render() {
		return (
			<nav className="header navbar navbar-default navbar-fixed-top">
				<Link to="/" className="navbar-brand">
					<span className="todo-icon glyphicon glyphicon-th-list" /> TODO
				</Link>
				<ul className="nav navbar-nav">
					{ this.renderLinks() }
				</ul>
			</nav>
		);
	}

	renderLinks() {
		if ( ! this.props.authenticated ) {
			return [
				<li className="nav-item" key={ 1 }>
					<Link to="/signin" className="nav-link">Sign In</Link>
				</li>,
				<li className="nav-item" key={ 2 }>
					<Link to="/signup" className="nav-link">Sign Up</Link>
				</li>
			];
		}

		return [
			<li className="nav-item" key={ 1 }>
				<Link to="/boards" className="nav-link">Boards</Link>
			</li>,
			<li className="nav-item" key={ 2 }>
				<Link to="/signout" className="nav-link">Sign Out</Link>
			</li>
		];
	}

}

function mapStateToProps( state ) {
	return { authenticated: state.auth.authenticated };
}

export default Header;