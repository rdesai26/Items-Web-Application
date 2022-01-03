import {createStore, combineReducers, applyMiddleware} from 'redux';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import {items, users} from './items/reducers';
import { connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';

const persistItemsConfig = {
    key: 'items',
    storage,
    stateReconciler: autoMergeLevel2,
}

const persistUsersConfig = {
    key: 'users',
    storage,
    stateReconciler: autoMergeLevel2,
}

const reducers = {
    items: items,
    users: users,
};

export const history = createBrowserHistory();

const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    items: persistReducer(persistItemsConfig, items),
    users: persistReducer(persistUsersConfig, users),

});


export const configureStore = (preloadedState) =>
    createStore(createRootReducer(history),
            preloadedState,
            composeWithDevTools(
            applyMiddleware(
                thunk,
                routerMiddleware(history),

            ),
        ),
    )