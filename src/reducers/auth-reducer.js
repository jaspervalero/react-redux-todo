/**
 * react-redux-todo
 * Auth Reducer
 *
 * @author Jasper Valero <contact@jaspervalero.com>
 * https://github.com/jaspervalero/react-redux-todo
 */
import {
	AUTH_USER,
	DEAUTH_USER,
	AUTH_ERROR
} from '../actions/types';

export default function( state = {}, action ) {

	switch( action.type ) {
		case AUTH_USER:
			return { ...state, error: '', authenticated: true };
		case DEAUTH_USER:
			return { ...state, authenticated: false };
		case AUTH_ERROR:
			return { ...state, error: action.payload };
		default:
			return state;
	}

}