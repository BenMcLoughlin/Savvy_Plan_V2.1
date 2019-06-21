import React from 'react'
import {StateManager} from "./StateManager"
import Layout from "../Layout/Layout"
import {BrowserRouter} from "react-router-dom"



export default function App() {
    return (
        <StateManager>
          <BrowserRouter>
              <Layout/>
         </BrowserRouter>   
        </StateManager>
    )
}
