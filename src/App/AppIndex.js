import React from 'react'
import {StateManager} from "./StateManager"
import Layout from "../Layout/Layout"
import {BrowserRouter} from "react-router-dom"
import { GlobalStyles } from "../Shared/Styles"



export default function App() {
    return (
        <StateManager>
          <GlobalStyles />
          <BrowserRouter>
              <Layout/>
         </BrowserRouter>   
        </StateManager>
    )
}
