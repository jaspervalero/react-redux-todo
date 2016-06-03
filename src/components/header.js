/**
 * react-redux-todo
 * Header Component
 *
 * @author Jasper Valero <contact@jaspervalero.com>
 * https://github.com/jaspervalero/react-redux-todo
 */
import React from 'react';
import { Link } from 'react-router';

class Header extends React.Component {

	render() {
		return (
			<nav className="navbar navbar-default navbar-fixed-top">
				<Link to="/" className="navbar-brand">
					<span className="todo-icon glyphicon glyphicon-th-list" /> TODO
				</Link>
			</nav>
		);
	}

}

export default Header;