/**
 * react-redux-todo
 * Actions
 *
 * @author Jasper Valero <contact@jaspervalero.com>
 * https://github.com/jaspervalero/react-redux-todo
 */
import axios from 'axios';
import { browserHistory } from 'react-router';
import {
	AUTH_USER,
	DEAUTH_USER,
	AUTH_ERROR,
} from './types';

const API_BASE_URL = 'http://localhost:3090';

export function signupUser({ email, password }) {

	return function( dispatch ) {
		axios.post( `${ API_BASE_URL }/signup`, { email, password })
			.then( response => {
				dispatch({ type: AUTH_USER });
				localStorage.setItem( 'token', response.data.token );
				localStorage.setItem( 'user_id', response.data.user_id );
				browserHistory.push( '/boards' );
			})
			.catch( response => {
				dispatch( authError( response.data.error ) );
			});
	}

}

export function signinUser({ email, password }) {

	return function( dispatch ) {
		// Submit email/password to server
		axios.post( `${ API_BASE_URL }/signin`, { email, password })
			.then( response => {
				// If request is good...
				// - Update state to indicate user is auth'd
				dispatch({ type: AUTH_USER });
				// - Save JWT token
				localStorage.setItem( 'token', response.data.token );
				localStorage.setItem( 'user_id', response.data.user_id );
				// - Redirect to the route '/boards'
				browserHistory.push( '/boards' );
			})
			.catch(() => {
				// If request is bad...
				// - Show an error to the user
				dispatch( authError( 'Bad Login Info' ) );
			});
	};

}

export function authError( error ) {
	return {
		type: AUTH_ERROR,
		payload: error
	};
}

export function signoutUser() {
	localStorage.removeItem( 'token' );
	localStorage.removeItem( 'user_id' );

	return {
		type: DEAUTH_USER
	};
}