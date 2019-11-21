import authReducer from './authReducer';
import favoriteReducer from './favoriteReducer';
import teamReducer from './teamReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    auth: authReducer,
    favorite: favoriteReducer,
    team: teamReducer
})

export default rootReducer;