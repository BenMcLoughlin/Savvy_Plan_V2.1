import React, { Component } from 'react'
import {GridContainer} from "./LayoutStyles"
import Header from "./Header/Header"
import Sidebar from "./Sidebar/Sidebar"
import Main from "./Main/Main"
import Footer from "./Footer/Footer"
import {Route} from "react-router-dom"
import TaxPopup from "../Containers/Dashboard/Popups/TaxPopup/TaxPopup"
import NetWorthPopup from "../Containers/Dashboard/Popups/NetWorthPopup/NetWorthPopup"
import CashFlowPopup from "../Containers/Dashboard/Popups/CashFlowPopup/CashFlowPopup"
import LifeInsurancePopup from "../Containers/Dashboard/Popups/LifeInsurancePopup/LifeInsurancePopup"
import SavingsPlanPopup from "../Containers/Dashboard/Popups/SavingsPlanPopup/SavingsPlanPopup"
import RetirementIncomePopup from "../Containers/Dashboard/Popups/RetirementIncomePopup/RetirementIncomePopup"
import LifetimeIncomePopup from "../Containers/Dashboard/Popups/LifetimeIncomePopup/LifetimeIncomePopup"
import Learn from "../Containers/Learn/Learn"
import Dashboard from "../Containers/Dashboard/Dashboard"
import Community from "../Containers/Community/Community"
import Home from "../Containers/Home/Home"
import {ThemeProvider} from "styled-components"
import {darkTheme, lightTheme} from "../Shared/Styles"

export default class Layout extends Component {

   state = {
       theme: darkTheme,
   }

   setDarkTheme = () => {
       this.setState({
           theme: darkTheme
       })
   }
   setLightTheme = () => {
       this.setState({
           theme: lightTheme
       })
   }
    
    render() {
        return (
            <ThemeProvider theme={this.state.theme}>
            <>
            <Header setDarkTheme={this.setDarkTheme} setLightTheme={this.setLightTheme}/>
            <GridContainer>
                <Sidebar/>
                    <Route path="/Learn" component={Learn}/>
                    <Route path="/Dashboard" component={Dashboard}/>
                    <Route path="/Community" component={Community}/>
                    <Route path="/Home" component={Home}/>
                    <Route path="/Login" component={Learn}/>

                    <Route path="/TaxPopop" component={TaxPopup}/>
                    <Route path="/NetWorth" component={NetWorthPopup}/>
                    <Route path="/CashFlow" component={CashFlowPopup}/>
                    <Route path="/PersonalFinanceScore" component={TaxPopup}/>
                    <Route path="/Insurance" component={LifeInsurancePopup}/>
                    <Route path="/SavingsPlan" component={SavingsPlanPopup}/>
                    <Route path="RetirementIncome" component={RetirementIncomePopup}/>
                    <Route path="/LifeTimeIncome" component={LifetimeIncomePopup}/>
                    <Route path="/" exact component={Main}/>
                <Footer/>
            </GridContainer>
            </>
            </ThemeProvider>
        )
    }
}
