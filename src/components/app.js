/**
 * react-redux-todo
 * App Component
 *
 * @author Jasper Valero <contact@jaspervalero.com>
 * https://github.com/jaspervalero/react-redux-todo
 */
import React from 'react';

import Header from './header';

export default class App extends React.Component {

	render() {
		return (
			<div className="app" id="app">
				<Header />
				{ this.props.children }
			</div>
		);
	}

}