import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {configureStore, history} from './store';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistStore } from 'redux-persist';
import './index.css';
import App from './App';
import NavBar from "./NavBar";
import { ConnectedRouter } from 'connected-react-router'

const store = configureStore();
const persistor = persistStore(store);

ReactDOM.render(
        <Provider store = {store} >
            <ConnectedRouter history={history}>
                <PersistGate persistor={persistor}>
      <NavBar />
        <App />
                </PersistGate>
            </ConnectedRouter>
        </Provider>,

  document.getElementById('root')
);
