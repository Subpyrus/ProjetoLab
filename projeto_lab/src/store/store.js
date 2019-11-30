import { createStore, applyMiddleware, compose } from 'redux';
import fbConfig from '../config/fbConfig';
import rootReducer from './reducers/rootReducer';
import thunk from 'redux-thunk';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { getFirebase } from 'react-redux-firebase';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
    key: 'pokeRoot',
    storage,
    whitelist: ['auth']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer,
    composeEnhancers(
        applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
        reduxFirestore(fbConfig)
    )
);

const persistor = persistStore(store)

export { store, persistor };