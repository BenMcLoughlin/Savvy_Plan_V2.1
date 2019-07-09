import React from 'react'
import Layout from "./Layout/Layout"
import {BrowserRouter} from "react-router-dom"
import { GlobalStyles } from "./Shared/Styles"

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
