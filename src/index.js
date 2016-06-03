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
import Signup from './components/auth/signup';
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import RequireAuth from './components/auth/require-auth';
import Boards from './components/boards';
import AddCardForm from './components/add-card-form';
import EditCardForm from './components/edit-card-form';
import { AUTH_USER } from './actions/types';

// Create Redux store
const createStoreWithMiddleware = applyMiddleware( reduxThunk )( createStore );
const store = createStoreWithMiddleware( reducers );

// Check Auth
const token = localStorage.getItem( 'token' );

// NOTE: In production app, would do more here.
// If we have a token consider user to be signed in
if ( token ) {
	// We need to update application state
	store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
	<Provider store={ store }>
		<Router history={ browserHistory }>
			<Route path="/" component={ App }>
				<IndexRoute component={ Home } />
				<Route path="signup" component={ Signup } />
				<Route path="signin" component={ Signin } />
				<Route path="signout" component={ Signout } />
				<Route path="boards" component={ RequireAuth( Boards ) } />
				<Route path="add-form" component={ RequireAuth( AddCardForm ) } />
				<Route path="edit-form" component={ RequireAuth( EditCardForm ) } />
			</Route>
		</Router>
	</Provider>
	, document.querySelector( '.wrapper' )
);