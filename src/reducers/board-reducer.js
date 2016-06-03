/**
 * react-redux-todo
 * Board Reducer
 *
 * @author Jasper Valero <contact@jaspervalero.com>
 * https://github.com/jaspervalero/react-redux-todo
 */
import update from 'react-addons-update';
import {
	FETCH_BOARDS,
	ADD_BOARD,
	EDIT_BOARD,
	DELETE_BOARD,
	SET_PARENT_BOARD
} from '../actions/types';

const initialState = {
	currentParentBoard: {
		index: null,
		id: null
	}
};

export default function( state = initialState, action ) {

	switch( action.type ) {
		case FETCH_BOARDS:
			return { ...state, boards: action.payload };
		case ADD_BOARD:
			let addedBoards = update( state.boards, {
				$push: [ action.payload ]
			});
			return { ...state, boards: addedBoards };
		case EDIT_BOARD:
			let updatedBoards = update( state.boards, {
				[ action.payload.index ]: { title: { $set: action.payload.title } }
			});
			return { ...state, boards: updatedBoards };
		case DELETE_BOARD:
			return { ...state, boards: [
				...state.boards.slice( 0, action.payload ),
				...state.boards.slice( action.payload + 1 )
			]};
		case SET_PARENT_BOARD:
			return { ...state, currentParentBoard: action.payload };
		default:
			return state;
	}

}