import React, { Component } from 'react'
import Header from "./Header"
import Footer from "./Footer"
import {Route} from "react-router-dom"
import Dashboard from "../Dashboard/Dashboard"
import TaxApp from "../Dashboard/Tax/TaxApp"
import NetWorthApp from "../Dashboard/NetWorth/NetWorthApp"
import CreditScoreApp from "../Dashboard/CreditScore/CreditScoreApp"
import LifetimeIncomeApp from "../Dashboard/LifetimeIncome/LifetimeIncomeApp"
import SavingsPlanApp from "../Dashboard/SavingsPlan/SavingsPlanApp"
import SpendingApp from "../Dashboard/Spending/SpendingApp"
import PropertyApp from "../Dashboard/Property/PropertyApp"
import DebtApp from "../Dashboard/Debt/DebtApp"
import UserAccountApp from "../UserAccount/UserAccountApp"
import Login from "../Pages/Login"
import LandingPage from "../Onboarding/LandingPage"
import OnboardingProcess from "../Onboarding/OnboardingProcess"
import SignUp from "../Pages/SignUp"
import {ThemeProvider} from "styled-components"
import { lightTheme} from "../Styles/Themes"
import styled from "styled-components"
import LeftNavBar from "./Navigation/LeftNavBar"
import RightVideoSelector from "./Navigation/RightVideoSelector"

export default class Layout extends Component {

   state = {
       theme: lightTheme,
   }

    render() {
        return (
            <ThemeProvider theme={this.state.theme}>
            <>
            <Header currentUser={this.props.currentUser}/>
            <LeftNavBar/>
            {
                    this.props.currentUser ? 
            <GridContainer>  
                    <Route path="/Onboarding" component={OnboardingProcess}/>
                    <Route exact path="/dashboard" component={Dashboard}/>
                    <Route path="/UserAccount" component={UserAccountApp}/>
                    <Route path="/NetWorth" component={NetWorthApp}/>
                    <Route path="/Tax" component={TaxApp}/>
                    <Route path="/LifeTimeIncome" component={LifetimeIncomeApp}/>  
                    <Route path="/SavingsPlan" component={SavingsPlanApp}/>              
                    <Route path="/CreditScore" component={CreditScoreApp}/>              
                    <Route path="/Spending" component={SpendingApp}/>
                    <Route path="/Property" component={PropertyApp}/>
                    <Route path="/Debt" component={DebtApp}/>
            </GridContainer>
                    :
            <GridContainer>  
                    <Route exact path="/" component={LandingPage}/>
                    <Route path="/LandingPage" component={LandingPage}/>
                    <Route path="/Login" component={Login}/>
                    <Route path="/SignUp" component={SignUp} currentUser={this.props.currentUser}/>
           </GridContainer>
                     }
                    
            <RightVideoSelector/>
            <Footer/>
            </>
            </ThemeProvider>
        )
    }
}


//
//------------------STYLES---------------------------------------------------------------
 const GridContainer = styled.div`
    height: 100%;
    margin: 4px auto;
    width: 80vw;
    display: grid;
    grid-template-rows: 98vh;
    overflow: scroll;
    grid-template-areas: 

    "m"

    /* The Grid container holds the grid item "m" for "main" and "f" for footer. When a sub-app is clicked
     on its grid location becomes m placing it in the "main position" */
`

const Right = styled.div`
    position: absolute;
    top: 10rem;
    right: 2rem;
`

    //-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
    // This is the switch board of the app. The header and footer are rendred and always present. Then the 
    // center panel can be changed using routing to move through and visit various sub apps such as the net worth
    // calculator. 