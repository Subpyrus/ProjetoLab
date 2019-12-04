import authReducer from './authReducer';
import favoriteReducer from './authReducer';
import friendsReducer from './friendsReducer';
import triviaReducer from './triviaReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

const rootReducer = combineReducers({
    auth: authReducer,
    friends: friendsReducer,
    favorite: favoriteReducer,
    trivia: triviaReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
})

export default rootReducer;