/**
 * react-redux-todo
 * EditCardForm Component
 *
 * @author Jasper Valero <contact@jaspervalero.com>
 * https://github.com/jaspervalero/react-redux-todo
 */
import React from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../actions';
import { Link } from 'react-router';

class EditCardForm extends React.Component {

	componentWillMount() {
		if ( this.props.currentEditId ) {
			this.props.fetchCard( this.props.currentEditId );
		}
	}

	render() {
		const { handleSubmit, fields: { title, description, assignee, due_date } } = this.props;

		return (
			<div className="add-card-form content container">
				<form onSubmit={ handleSubmit( this.onFormSubmit.bind( this ) ) }>
					<fieldset className="form-group">
						<label>Title:</label>
						<input { ...title }
							className="form-control"/>
						{ title.touched && title.error && <div className="error">{ title.error }</div> }
					</fieldset>
					<fieldset className="form-group">
						<label>Description:</label>
						<textarea { ...description }
							className="form-control"/>
					</fieldset>
					<fieldset className="form-group">
						<label>Assignee:</label>
						<input { ...assignee }
							className="form-control"/>
						{ assignee.touched && assignee.error && <div className="error">{ assignee.error }</div> }
					</fieldset>
					<fieldset className="form-group">
						<label>Due Date:</label>
						<input { ...due_date }
							className="form-control"/>
						{ due_date.touched && due_date.error && <div className="error">{ due_date.error }</div> }
					</fieldset>
					{ this.renderAlert() }
					<button action="submit" className="btn btn-primary">Update</button>
					&nbsp;<Link to="/boards" className="btn btn-danger">Cancel</Link>
				</form>
			</div>
		);
	}

	onFormSubmit({ title, description, assignee, dueDate }) {
		this.props.editCard({
			boardIndex: this.props.currentBoardIndex,
			id: this.props.currentEditId,
			title,
			description,
			assignee,
			dueDate,
			boardId: this.props.currentBoardId
		});
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

function validate( formProps ) {
	const errors = {};
	const now = new Date();
	let selectedDate = new Date( formProps.due_date );
	selectedDate.setDate( selectedDate.getDate() + 1 );

	if ( ! formProps.title ) {
		errors.title = 'Required';
	}

	if ( ! /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test( formProps.assignee ) ) {
		errors.assignee = 'Invalid email address'
	}

	if ( ! /^\d{4}-\d{1,2}-\d{1,2}$/.test( formProps.due_date ) ) {
		errors.due_date = "You must specify a date in the YYYY-MM-DD format"
	} else if ( selectedDate < now ) {
		errors.due_date = 'Due date is in the past'
	}

	return errors;
}

function mapStateToProps( state ) {
	return {
		errorMessage: state.auth.error,
		currentEditId: state.card.currentEditId,
		currentBoardIndex: state.board.currentParentBoard.index,
		currentBoardId: state.board.currentParentBoard.id,
		initialValues: state.card.currentEditCard
	};
}

export default reduxForm({
	form: 'editCard',
	fields: [ 'title', 'description', 'assignee', 'due_date' ],
	validate
}, mapStateToProps, actions )( EditCardForm );