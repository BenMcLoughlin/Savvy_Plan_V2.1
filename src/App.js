import React, {useEffect} from 'react'
import Layout from "./layout/Layout"
import {BrowserRouter} from "react-router-dom"
import { GlobalStyles } from "./style/Themes"
import {auth, createUserProfileDocument} from "./firebase/firebaseUtils"
import {setUserDetails_action} from "redux/user/user_actions"
import {connect} from "react-redux"
import firebase from "firebase/firebaseUtils"

 function App() {
     return (
        <>
          <GlobalStyles />
          <BrowserRouter>
              <Layout />
         </BrowserRouter>   
        </>
    )
}


export default connect(null, )(App)


//
//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
// Here the Global style are inserted and passed to all children in the app. Browser Router is 
//also initiated to enable routing between pages. 