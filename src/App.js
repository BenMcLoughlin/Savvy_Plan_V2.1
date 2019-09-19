import React from 'react'
import Layout from "./Layout/Layout"
import {BrowserRouter} from "react-router-dom"
import { GlobalStyles } from "./Styles/Themes"


export default function App() {
    return (
        <>
          <GlobalStyles />
          <BrowserRouter>
              <Layout/>
         </BrowserRouter>   
        </>
    )
}





//
//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
// Here the Global styles are inserted and passed to all children in the app. Browser Router is 
//also initiated to enable routing between pages. 