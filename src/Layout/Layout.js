import React, { Component } from 'react'
import {LayoutStyled} from "./LayoutStyles"
import Header from "./Header/Header"
import Sidebar from "./Sidebar/Sidebar"
import Main from "./Main/Main"
import Footer from "./Footer/Footer"
import {Route} from "react-router-dom"
import TaxPopup from "../Containers/Popups/TaxPopup/TaxPopup"
import NetWorthPopup from "../Containers/Popups/NetWorthPopup/NetWorthPopup"
import CashFlowPopup from "../Containers/Popups/CashFlowPopup/CashFlowPopup"
import LifeInsurancePopup from "../Containers/Popups/LifeInsurancePopup/LifeInsurancePopup"
import SavingsPlanPopup from "../Containers/Popups/SavingsPlanPopup/SavingsPlanPopup"
import RetirementIncomePopup from "../Containers/Popups/RetirementIncomePopup/RetirementIncomePopup"
import LifetimeIncomePopup from "../Containers/Popups/LifetimeIncomePopup/LifetimeIncomePopup"

export default class Layout extends Component {
    render() {
        return (
            <LayoutStyled>
            <Header/>
            <Sidebar/>
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
            </LayoutStyled>
        )
    }
}
