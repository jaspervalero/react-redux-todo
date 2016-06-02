/**
 * react-redux-todo
 * App Component
 *
 * @author Jasper Valero <contact@jaspervalero.com>
 * https://github.com/jaspervalero/react-redux-todo
 */
import React from 'react';

export default class App extends React.Component {

	render() {
		return (
			<div className="app" id="app">
				<p>TODO</p>
				{ this.props.children }
			</div>
		);
	}

}