/**
 * react-redux-todo
 * Cards Component
 *
 * @author Jasper Valero <contact@jaspervalero.com>
 * https://github.com/jaspervalero/react-redux-todo
 */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Link } from 'react-router';

class Cards extends React.Component {

	componentWillMount() {
		this.props.fetchCards( this.props.boardId, this.props.boardIndex );
	}

	render() {
		return (
			<div className="row">
				<div className="col-sm-12">
					<ul
						onDragEnter={ this.onDragEnter }
						onDragOver={ this.onDragOver }
						onDragLeave={ this.onDragLeave }
						onDrop={ this.onDrop.bind( this ) }
						className="card-list list-group"
						data-board-id={ this.props.boardId }
						data-board-index={ this.props.boardIndex }>
						{ this.renderCards() }
					</ul>
				</div>
			</div>
		);
	}

	renderCards() {
		const boardId = this.props.boardId;
		const boardIndex = this.props.boardIndex;

		if ( this.props.cards[ boardIndex ] ) {
			const cards = this.props.cards[ boardIndex ].map( ( card, index ) => {
				return(
					<li
						onDragStart={ this.onDragStart.bind( this ) }
						draggable="true"
						id={ `card-${ card._id }` }
						className="card list-group-item"
						data-card-id={ card._id }
						data-card-index={ index }
						data-board-id={ boardId }
						data-board-index={ boardIndex }
						key={ card._id }>
						{ card.title } &nbsp;&nbsp;
						<Link
							to="/edit-form"
							onClick={ this.onEdit.bind( this ) }
							data-card-id={ card._id }>
							<span
								className="edit-btn glyphicon glyphicon-pencil"
								data-card-id={ card._id }
								data-card-index={ index }
								data-board-index={ boardIndex }
								title="Edit Card">
							</span>
						</Link>&nbsp;
						<span
							onClick={ this.onDelete.bind( this ) }
							className="delete-btn glyphicon glyphicon-remove"
							data-card-id={ card._id }
							data-card-index={ index }
							data-board-id={ this.props.boardId }
							data-board-index={ boardIndex }
							title="Delete Card">
						</span>
					</li>
				);
			});

			return cards;
		}
	}

	onEdit( e ) {
		let target = e.target;

		if ( target.nodeName === 'SPAN' ) {
			target = target.parentNode;
		}

		this.props.setParentBoard(
			target.dataset.boardId,
			target.dataset.boardIndex
		);

		this.props.setEditCard(
			target.dataset.cardId
		);
	}

	onDelete( e ) {
		const target = e.target;

		if ( window.confirm( 'Delete this card?' ) ) {
			this.props.deleteCard(
				target.dataset.cardId,
				target.dataset.cardIndex,
				target.dataset.boardIndex
			);
		}
	}

	onDragStart( e ) {
		const target = e.target;

		e.dataTransfer.effectAllowed = 'move';
		e.dataTransfer.setData( 'Text', target.id );
		e.dataTransfer.setDragImage( target, 119, 21 );
		return true;
	}

	onDragEnter( e ) {
		e.preventDefault();
		return true;
	}

	onDragOver( e ) {
		let target = e.target;

		while ( target.nodeName !== 'UL' ) {
			target = target.parentNode;
		}

		target.style.border = '1px solid #0067a3';
		target.style.borderRadius = '4px';
		e.preventDefault();
	}

	onDragLeave( e ) {
		let target = e.target;

		while ( target.nodeName !== 'UL' ) {
			target = target.parentNode;
		}

		target.style.border = 'none';
	}

	onDrop( e ) {
		const data = e.dataTransfer.getData( 'Text' );
		const el = document.getElementById( data );
		let target = e.target;

		while ( target.nodeName !== 'UL' ) {
			target = target.parentNode;
		}

		target.appendChild( el );
		target.style.border = 'none';

		this.props.moveCard(
			el.dataset.cardId,
			target.dataset.boardId
		);

		el.dataset.boardId = target.dataset.boardId;
		el.dataset.boardIndex = target.dataset.boardIndex;

		e.stopPropagation();
		return false;
	}

}

function mapStateToProps( state ) {
	return { cards: state.card.cards };
}

export default connect( mapStateToProps, actions )( Cards );