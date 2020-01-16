import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from "react-redux"
import { createStore, applyMiddleware, compose } from 'redux'
import { ReactReduxFirebaseProvider, getFirebase } from 'react-redux-firebase';
import { createFirestoreInstance, reduxFirestore, getFirestore } from 'redux-firestore';
import thunk from 'redux-thunk';
import rootReducer from "./redux/rootReducer"
import { devToolsEnhancer } from 'redux-devtools-extension';
import {persistStore} from "redux-persist"
import {PersistGate} from "redux-persist/integration/react"
import firebase from "firebase/firebaseUtils"

// We enhance compose in order to use Redux DevTools extension
// https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer,
    composeEnhancers(
      applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
      reduxFirestore(firebase), // still need this line to get access to firestore via getFirestore function (in projectActions, for example),
      devToolsEnhancer()
    ));


const persistor = persistStore(store)

// react-redux-firebase config
const rrfConfig = {
    useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
    userProfile: 'users',
    attachAuthIsReady: true,
  };

  const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance, // Create firestore instead of create it in fbConfig.js
  };

ReactDOM.render(
    <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
            <PersistGate persistor={persistor}>
                <App/>
            </PersistGate>
        </ReactReduxFirebaseProvider>
    </Provider>
    , document.getElementById('root'));

    









    
    //-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
    
// This is the highest-level file that renders the entire application to the DOM. 
// It is here that the state is initiated using the create-store function from redux. 
// It is then passed on to all child components using the Provider keyword. 
// The devToolsEnhancer is a plug in that enables redux to be viewed in the Chrome inspector. 


//react-redux-firebase code inspired by https://github.com/Sv1nnet/mario-plan-migrated-on-redux601-and-firebase300-alpha/blob/after-migration/src/index.js