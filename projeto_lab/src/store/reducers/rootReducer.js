import authReducer from './authReducer';
import favoriteReducer from './authReducer';
import friendsReducer from './friendsReducer';
import triviaReducer from './triviaReducer';
import apiReducer from './apiReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'

const apiPersistConfig = {
    key: 'apiCalls',
    storage: storage,
    whitelist: ['apiData']
  }

const rootReducer = combineReducers({
    auth: authReducer,
    friends: friendsReducer,
    favorite: favoriteReducer,
    trivia: triviaReducer,
    apiCalls: persistReducer(apiPersistConfig, apiReducer),
    firestore: firestoreReducer,
    firebase: firebaseReducer
})

export default rootReducer;