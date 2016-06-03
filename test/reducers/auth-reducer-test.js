/**
 * react-redux-todo
 * Board Reducer Tests
 *
 * @author Jasper Valero <contact@jaspervalero.com>
 * https://github.com/jaspervalero/react-redux-todo
 */
import { expect } from '../test-helpers';
import authReducer from '../../src/reducers/auth-reducer';
import { AUTH_ERROR } from '../../src/actions/types';

describe( 'authReducer', () => {

	it( 'handles action with unknown type', () => {
		expect( authReducer( undefined, {} ) ).to.eql( {} );
	});

	it( 'handles action of type AUTH_ERROR', () => {
		const action = { type: AUTH_ERROR, payload: 'An error message' };

		expect( authReducer( {}, action ) ).to.eql({ error: 'An error message' });
	});

});