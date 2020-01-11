import React, { Component } from 'react'
import Header from "./Header"
import Footer from "./Footer"
import {Route} from "react-router-dom"
import Dashboard from "pages/dashboard/Dashboard"
import TaxApp from "pages/tax/TaxApp"
import NetWorthApp from "pages/netWorth/NetWorthApp"
import CreditScoreApp from "pages/creditScore/CreditScoreApp"
import Income from "pages/income/Income"
import Savings from "pages/savings/Savings"
import SpendingApp from "pages/spending/SpendingApp"
import PropertyApp from "pages/property/PropertyApp"
import DebtApp from "pages/debt/DebtApp"
import Login from "pages/login/Login"
import LandingPage from "pages/landingPage/LandingPage"
import OnboardingProcess from "pages/onboarding/OnboardingProcess"
import SignUp from "pages/login/SignUp"
import {ThemeProvider} from "styled-components"
import { lightTheme} from "styles/Themes"
import styled from "styled-components"
import LeftNavBar from "./navigation/LeftNavBar"
import RightVideoSelector from "./navigation/RightVideoSelector"

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
                    <Route path="/NetWorth" component={NetWorthApp}/>
                    <Route path="/Tax" component={TaxApp}/>
                    <Route path="/LifeTimeIncome" component={Income}/>  
                    <Route path="/SavingsPlan" component={Savings}/>              
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