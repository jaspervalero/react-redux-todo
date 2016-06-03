/**
 * react-redux-todo
 * App Component Tests
 *
 * @author Jasper Valero <contact@jaspervalero.com>
 * https://github.com/jaspervalero/react-redux-todo
 */
import { renderComponent, expect } from '../test_helper';
import App from '../../src/components/app';

describe( 'Component:App', () => {
	let component;

	beforeEach( () =>{
		component  = renderComponent( App );
	});

	it( 'exists', () => {
		expect( component ).to.exist;
	});
});