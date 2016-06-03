/**
 * react-redux-todo
 * Action Tests
 *
 * @author Jasper Valero <contact@jaspervalero.com>
 * https://github.com/jaspervalero/react-redux-todo
 */
import { expect } from '../test-helpers';
import { AUTH_ERROR } from '../../src/actions/types';
import { authError } from '../../src/actions';

describe( 'actions', () => {

	describe( 'authError', () => {

		it( 'has the correct type', () => {
			const action = authError();

			expect( action.type ).to.equal( AUTH_ERROR );
		});

		it( 'has the correct payload', () => {
			const action = authError( 'An error message' );

			expect( action.payload ).to.equal( 'An error message' );
		});

	});

});