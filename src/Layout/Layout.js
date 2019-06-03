import React, { Component } from 'react'
import {LayoutStyled} from "./LayoutStyles"
import Header from "./Header/Header"
import Sidebar from "./Sidebar/Sidebar"
import Main from "./Main/Main"
import Footer from "./Footer/Footer"
import {Route} from "react-router-dom"
import TaxPopup from "../Containers/Popups/TaxPopup/TaxPopup"

export default class Layout extends Component {
    render() {
        return (
            <LayoutStyled>
            <Header/>
            <Sidebar/>
                <Route path="/TaxPopop" component={TaxPopup}/>
                <Route path="/" exact component={Main}/>
            <Footer/>
            </LayoutStyled>
        )
    }
}
