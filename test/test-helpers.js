/**
 * react-redux-todo
 * Test Helpers
 *
 * @author Jasper Valero <contact@jaspervalero.com>
 * https://github.com/jaspervalero/react-redux-todo
 */
import _$ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import jsdom from 'jsdom';
import chai, { expect } from 'chai';
import chaiJquery from 'chai-jquery';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../src/reducers';

// Setup virtual DOM
global.document = jsdom.jsdom( '<!doctype html><html><body></body></html>' );
global.window = global.document.defaultView;
const $ = _$( window );

// Setup Chai
chaiJquery( chai, chai.util, $ );

/**
 * Test helper function for easily rendering React components
 * in the test environment.
 * @param  {Object} ComponentClass A component class to be rendered in the
 * test environment.
 * @param  {Object} props          Component props.
 * @param  {Object} state          Component state.
 * @return {Object}                jQuery object reference to rendered
 * component.
 */
function renderComponent( ComponentClass, props = {}, state = {} ) {
	const componentInstance = TestUtils.renderIntoDocument(
		<Provider store={ createStore( reducers, state ) }>
			<ComponentClass { ...props } />
		</Provider>
	);

	return $( ReactDOM.findDOMNode( componentInstance ) );
}

/**
 * Test helper which extends jQuery for easy simulation of events.
 * @param  {String} eventName Name of event to simulate.
 * @param  {String} value     Optional value to be set.
 */
$.fn.simulate = function( eventName, value ) {
	if ( value ) {
		this.val( value );
	}

	TestUtils.Simulate[ eventName ]( this[0] );
};

export { renderComponent, expect };