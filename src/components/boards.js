/**
 * react-redux-todo
 * Boards Component
 *
 * @author Jasper Valero <contact@jaspervalero.com>
 * https://github.com/jaspervalero/react-redux-todo
 */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Cards from './cards';
import { Link } from 'react-router';

class Boards extends React.Component {

	componentWillMount() {
		this.props.fetchBoards();
	}

	render() {
		return (
			<div className="boards content" id="content">
				{ this.renderBoards() }
				<div className="column">
					<div className="board-placeholder board panel panel-success">
						<div
							onClick={ this.onAdd.bind( this ) }
							className="panel-heading">
								<span className="glyphicon glyphicon-plus"></span> Click to add a board...
						</div>
					</div>
				</div>
			</div>
		);
	}

	renderBoards() {
		if ( this.props.boards ) {
			const content = document.querySelector( '#content' );
			const boards = this.props.boards.map( ( board, index ) => {
				return(
					<div className="column" key={ board._id }>
						<div className="board panel panel-default">
							<div className="panel-heading">{ board.title }&nbsp;&nbsp;
								<span
									onClick={ this.onEdit.bind( this ) }
									className="edit-btn glyphicon glyphicon-pencil"
									data-board-id={ board._id }
									data-board-index={ index }
									title="Edit Board">
								</span>&nbsp;
								<span
									onClick={ this.onDelete.bind( this ) }
									className="delete-btn glyphicon glyphicon-remove"
									data-board-id={ board._id }
									data-board-index={ index }
									title="Delete Board">
								</span>
							</div>
							<div className="panel-body">
								{ this.renderCards( board._id, index ) }
								<Link
									to="/add-form"
									onClick={ this.onAddCard.bind( this ) }
									data-board-id={ board._id }
									data-board-index={ index }
									className="btn btn-primary">
									<span className="glyphicon glyphicon-plus"></span> Add Card
								</Link>
							</div>
						</div>
					</div>
				);
			});

			// Set width of content based on number of boards
			content.style.width = ( 280 * ( this.props.boards.length + 1 ) ) + 'px';

			return boards;
		}
	}

	renderCards( boardId, boardIndex ) {
		return <Cards boardId={ boardId } boardIndex={ boardIndex } />
	}

	onAdd() {
		const title = prompt( 'Board Name:' );

		if ( title ) {
			this.props.addBoard( title );
		}
	}

	onAddCard( e ) {
		let target = e.target;

		if ( target.nodeName === 'SPAN' ) {
			target = target.parentNode;
		}

		this.props.setParentBoard(
			target.dataset.boardId,
			target.dataset.boardIndex
		);
	}

	onEdit( e ) {
		const target = e.target;
		const newTitle = prompt( 'Board Name:' );

		if ( newTitle ) {
			this.props.editBoard(
				target.dataset.boardId,
				target.dataset.boardIndex,
				newTitle
			);
		}
	}

	onDelete( e ) {
		const target = e.target;
		const cards = target
										.parentNode
											.nextSibling
												.querySelector( '.card-list' )
													.querySelectorAll( 'li' );

		if ( window.confirm( 'Delete this board and all of its cards?' ) ) {
			this.props.deleteBoard( target.dataset.boardId, target.dataset.boardIndex );

			// Delete cards contained within board
			for ( var i = 0; i < cards.length; i++ ) {
				this.props.deleteCard(
					cards[ i ].dataset.cardId,
					cards[ i ].dataset.cardIndex,
					cards[ i ].dataset.boardIndex
				);
			}
		}
	}

}

function mapStateToProps( state ) {
	return {
		boards: state.board.boards
	};
}

export default connect( mapStateToProps, actions )( Boards );