import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/AppIndex';
import {Provider} from "react-redux"
import {createStore} from "redux"
import reducers from "./reducers"

ReactDOM.render(
    <Provider store={createStore(reducers)}>
            <App style={{fontSize: "100%"}}/>
    </Provider>
    , document.getElementById('root'));