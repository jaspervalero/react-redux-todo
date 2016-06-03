/**
 * react-redux-todo
 * Actions
 *
 * @author Jasper Valero <contact@jaspervalero.com>
 * https://github.com/jaspervalero/react-redux-todo
 */
import axios from 'axios';
import { browserHistory } from 'react-router';
import {
	AUTH_USER,
	DEAUTH_USER,
	AUTH_ERROR,
	FETCH_BOARDS,
	ADD_BOARD,
	EDIT_BOARD,
	DELETE_BOARD,
	FETCH_CARDS,
	FETCH_CARD,
	ADD_CARD,
	EDIT_CARD,
	MOVE_CARD,
	DELETE_CARD,
	SET_PARENT_BOARD,
	SET_EDIT_CARD
} from './types';

const API_BASE_URL = 'http://localhost:3090';

export function signupUser({ email, password }) {
	return function( dispatch ) {
		axios.post( `${ API_BASE_URL }/signup`, { email, password })
			.then( response => {
				dispatch({ type: AUTH_USER });
				localStorage.setItem( 'token', response.data.token );
				localStorage.setItem( 'user_id', response.data.user_id );
				browserHistory.push( '/boards' );
			})
			.catch( response => {
				dispatch( authError( response.data.error ) );
			});
	}
}

export function signinUser({ email, password }) {
	return function( dispatch ) {
		axios.post( `${ API_BASE_URL }/signin`, { email, password })
			.then( response => {
				dispatch({ type: AUTH_USER });
				localStorage.setItem( 'token', response.data.token );
				localStorage.setItem( 'user_id', response.data.user_id );
				browserHistory.push( '/boards' );
			})
			.catch(() => {
				dispatch( authError( 'Bad Login Info' ) );
			});
	};
}

export function authError( error ) {
	return {
		type: AUTH_ERROR,
		payload: error
	};
}

export function signoutUser() {
	localStorage.removeItem( 'token' );
	localStorage.removeItem( 'user_id' );

	return {
		type: DEAUTH_USER
	};
}

export function fetchBoards() {
	return function( dispatch ) {
		axios.get( `${ API_BASE_URL }/boards/all/${ localStorage.getItem( 'user_id' ) }`, {
			headers: { authorization: localStorage.getItem( 'token' ) }
		})
			.then( response => {
				dispatch({
					type: FETCH_BOARDS,
					payload: response.data.boards
				});
			});
	}
}

export function addBoard( title ) {
	return function( dispatch ) {
		axios.post( `${ API_BASE_URL }/boards`, {
			headers: { authorization: localStorage.getItem( 'token' ) },
			title,
			user_id: localStorage.getItem( 'user_id' )
		})
			.then( response => {
				dispatch({
					type: ADD_BOARD,
					payload: response.data.board
				});
			});
	};
}

export function editBoard( id, index, newTitle ) {
	return function( dispatch ) {
		axios.put( `${ API_BASE_URL }/boards`, {
			headers: { authorization: localStorage.getItem( 'token' ) },
			board_id: id,
			title: newTitle
		})
			.then( response => {
				dispatch({
					type: EDIT_BOARD,
					payload: {
						index,
						title: newTitle
					}
				});
			});
	};
}

export function deleteBoard( id, index ) {
	return function( dispatch ) {
		axios.delete( `${ API_BASE_URL }/boards/${ id }`, {
			headers: { authorization: localStorage.getItem( 'token' ) }
		})
			.then( response => {
				dispatch({
					type: DELETE_BOARD,
					payload: index
				});
			});
	};
}

export function fetchCards( boardId, boardIndex ) {
	return function( dispatch ) {
		axios.get( `${ API_BASE_URL }/cards/all/${ boardId }`, {
			headers: { authorization: localStorage.getItem( 'token' ) }
		})
			.then( response => {
				dispatch({
					type: FETCH_CARDS,
					payload: {
						data: response.data.cards,
						index: boardIndex
					}
				});
			});
	}
}

export function fetchCard( cardId ) {
	return function( dispatch ) {
		axios.get( `${ API_BASE_URL }/cards/${ cardId }`, {
			headers: { authorization: localStorage.getItem( 'token' ) }
		})
			.then( response => {
				dispatch({
					type: FETCH_CARD,
					payload: {
						data: response.data.card[0]
					}
				});
			});
	}
}

export function addCard({ title, description, assignee, due_date, boardIndex, boardId }) {
	return function( dispatch ) {
		axios.post( `${ API_BASE_URL }/cards`, {
			headers: { authorization: localStorage.getItem( 'token' ) },
			board_id: boardId,
			title,
			description,
			assignee,
			due_date: due_date
		})
			.then( response => {
				dispatch({
					type: ADD_CARD,
					payload: {
						data: response.data.card,
						index: boardIndex
					}
				});

				browserHistory.push( '/boards' );
			});
	};
}

export function editCard({ boardIndex, id, title, description, assignee, due_date }) {
	return function( dispatch ) {
		axios.put( `${ API_BASE_URL }/cards`, {
			headers: { authorization: localStorage.getItem( 'token' ) },
			card_id: id,
			title,
			description,
			assignee,
			due_date: due_date
		})
			.then( response => {
				dispatch({
					type: EDIT_CARD,
					payload: {
						index: boardIndex,
						data: {
							card_id: id,
							title,
							description,
							assignee,
							due_date: due_date
						}
					}
				});

				browserHistory.push( '/boards' );
			});
	};
}

export function moveCard( cardId, boardId ) {
	return function( dispatch ) {
		axios.put( `${ API_BASE_URL }/cards`, {
			headers: { authorization: localStorage.getItem( 'token' ) },
			card_id: cardId,
			board_id: boardId
		});
	};
}

export function deleteCard( id, cardIndex, boardIndex ) {
	return function( dispatch ) {
		axios.delete( `${ API_BASE_URL }/cards/${ id }`, {
			headers: { authorization: localStorage.getItem( 'token' ) }
		})
			.then( response => {
				dispatch({
					type: DELETE_CARD,
					payload: {
						cardIndex,
						boardIndex
					}
				});
			});
	};
}

export function setParentBoard( id, index ) {
	return function( dispatch ) {
		dispatch({
			type: SET_PARENT_BOARD,
			payload: {
				id,
				index
			}
		});
	}
}

export function setEditCard( id ) {
	return function( dispatch ) {
		dispatch({
			type: SET_EDIT_CARD,
			payload: id
		});
	}
}