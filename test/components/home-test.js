/**
 * react-redux-todo
 * Home Component Tests
 *
 * @author Jasper Valero <contact@jaspervalero.com>
 * https://github.com/jaspervalero/react-redux-todo
 */
import { renderComponent, expect } from '../test-helpers';
import Home from '../../src/components/home';

describe( 'Component:Home', () => {
	let component;

	beforeEach( () =>{
		component  = renderComponent( Home );
	});

	it( 'exists', () => {
		expect( component ).to.exist;
	});

	it( 'has a jumbotron', () => {
		expect( component.find( '.jumbotron' ) ).to.exist;
	});

	it( 'has a <h1> that contains "Hello, doer!"', () => {
		const h1 = component.find( 'h1' );

		expect( h1 ).to.exist;
		expect( h1 ).to.contain( 'Hello, doer!' );
	});

	it( 'has a <h3> that contains "Start tackling your TODO list today!"',
		() => {
		const h2 = component.find( 'h2' );

		expect( h2 ).to.exist;
		expect( h2 ).to.contain( 'Start tackling your TODO list today!' );
	});

	it( 'has a <p> that contains some text', () => {
		const p = component.find( 'p' );

		expect( p ).to.exist;
		expect( p ).not.to.be.empty;
	});
});