/**
 * react-redux-todo
 * Reducers
 *
 * @author Jasper Valero <contact@jaspervalero.com>
 * https://github.com/jaspervalero/react-redux-todo
 */
import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth-reducer';
import boardReducer from './board-reducer';
import cardReducer from './card-reducer';

const rootReducer = combineReducers({
	form,
	auth: authReducer,
	board: boardReducer,
	card: cardReducer
});

export default rootReducer;