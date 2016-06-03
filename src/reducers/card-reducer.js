/**
 * react-redux-todo
 * Card Reducer
 *
 * @author Jasper Valero <contact@jaspervalero.com>
 * https://github.com/jaspervalero/react-redux-todo
 */
import update from 'react-addons-update';
import {
	FETCH_CARDS,
	FETCH_CARD,
	ADD_CARD,
	EDIT_CARD,
	MOVE_CARD,
	DELETE_CARD,
	SET_EDIT_CARD
} from '../actions/types';

const initialState = {
	cards: [],
	currentEditId: null,
	currentEditCard: {}
};

export default function( state = initialState, action ) {

	switch( action.type ) {
		case FETCH_CARDS:
			const cards = update( state.cards, {
				[ action.payload.index ]: { $set: action.payload.data }
			});
			return { ...state, cards: cards };
		case FETCH_CARD:
			return { ...state, currentEditCard: action.payload.data };
		case ADD_CARD:
			const addedCards = update( state.cards, {
				[ action.payload.index ]: { $push: [ action.payload.data ] }
			});
			return { ...state, cards: addedCards };
		case EDIT_CARD:
			let updatedCards = update( state.cards, {
				[ action.payload.index ]: { $set: action.payload.data }
			});
			return { ...state, boards: updatedCards };
		case DELETE_CARD:
			const remainingCards = update( state.cards, {
				[ action.payload.boardIndex ]: { $set: [
					...state.cards[ action.payload.boardIndex ].slice( 0, action.payload.cardIndex ),
					...state.cards[ action.payload.boardIndex ].slice( action.payload.cardIndex + 1 )
				]}
			});
			return { ...state, cards: remainingCards };
		case SET_EDIT_CARD:
			return { ...state, currentEditId: action.payload };
		default:
			return state;
	}

}