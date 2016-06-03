/**
 * react-redux-todo
 * Signin Component
 *
 * @author Jasper Valero <contact@jaspervalero.com>
 * https://github.com/jaspervalero/react-redux-todo
 */
import React from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signin extends React.Component {

	render() {
		const { handleSubmit, fields: { email, password } } = this.props;

		return (
			<div className="content">
				<form onSubmit={ handleSubmit( this.onFormSubmit.bind( this ) ) }>
					<fieldset className="form-group">
						<label>Email:</label>
						<input { ...email } className="form-control" />
					</fieldset>
					<fieldset className="form-group">
						<label>Password:</label>
						<input { ...password } type="password" className="form-control" />
					</fieldset>
					{ this.renderAlert() }
					<button action="submit" className="btn btn-primary">Sign In</button>
				</form>
			</div>
		);
	}

	onFormSubmit({ email, password }) {
		this.props.signinUser({ email, password });
	}

	renderAlert() {
		if ( this.props.errorMessage ) {
			return (
				<div className="alert alert-danger">
					<strong>Oops!</strong> { this.props.errorMessage }
				</div>
			);
		}
	}

}

function mapStateToProps( state ) {
	return { errorMessage: state.auth.error };
}

export default reduxForm({
	form: 'signin',
	fields: [ 'email', 'password' ]
}, mapStateToProps, actions )( Signin );