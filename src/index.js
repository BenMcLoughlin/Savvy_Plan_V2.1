import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from "react-redux"
import {createStore} from "redux"
import reducers from "./reducers"
import { devToolsEnhancer } from 'redux-devtools-extension';



ReactDOM.render(
    <Provider store={createStore(reducers,devToolsEnhancer())}>
            <App/>
    </Provider>
    , document.getElementById('root'));

    









    
    //-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
    
// This is the highest-level file that renders the entire application to the DOM. 
// It is here that the state is initiated using the create-store function from redux. 
// It is then passed on to all child components using the Provider keyword. 
// The devToolsEnhancer is a plug in that enables redux to be viewed in the Chrome inspector. 