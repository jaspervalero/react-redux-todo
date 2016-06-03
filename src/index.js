/**
 * react-redux-todo
 * Main Index - It all begins here...
 *
 * @author Jasper Valero <contact@jaspervalero.com>
 * https://github.com/jaspervalero/react-redux-todo
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {
	Router,
	Route,
	IndexRoute,
	browserHistory
} from 'react-router';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';

import App from './components/app';
import Home from './components/home';

// Create Redux store
const createStoreWithMiddleware = applyMiddleware( reduxThunk )( createStore );
const store = createStoreWithMiddleware( reducers );

ReactDOM.render(
	<Provider store={ store }>
		<Router history={ browserHistory }>
			<Route path="/" component={ App }>
				<IndexRoute component={ Home } />
			</Route>
		</Router>
	</Provider>
	, document.querySelector( '.wrapper' )
);