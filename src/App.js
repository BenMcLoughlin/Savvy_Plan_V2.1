import React from 'react'
import Layout from "./layout/Layout"
import {BrowserRouter} from "react-router-dom"
import {connect} from "react-redux"

 function App() {
     return (
        <>
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