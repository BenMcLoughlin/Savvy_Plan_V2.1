import React, { useState } from 'react'
import Header from "./Header"
import Footer from "./Footer"
import {Route} from "react-router-dom"
import Dashboard from "pages/dashboard/Dashboard"
import TaxApp from "pages/Tax/TaxApp"
import NetWorthApp from "pages/netWorth/NetWorthApp"
import CreditScoreApp from "pages/CreditScore/CreditScoreApp"
import Income from "pages/income/Income"
import Savings from "pages/savings/Savings"
import SpendingApp from "pages/Spending/SpendingApp"
import PropertyApp from "pages/Property/PropertyApp"
import DebtApp from "pages/Debt/DebtApp"
import Login from "pages/login/Login"
import LandingPage from "pages/landingPage/LandingPage"
import OnboardingProcess from "pages/onboarding/OnboardingProcess"
import SignUp from "pages/login/SignUp"
import {ThemeProvider} from "styled-components"
import { lightTheme} from "styles/Themes"
import styled from "styled-components"
import LeftNavBar from "./navigation/LeftNavBar"
import RightVideoSelector from "./navigation/RightVideoSelector"
import WithSpinner from "HOC/withSpinner/WithSpinner"
import {connect} from "react-redux"

const DashboardWithSpinner = WithSpinner(Dashboard);
const TaxAppWithSpinner = WithSpinner(TaxApp);
const SavingsWithSpinner = WithSpinner(Savings);
const IncomeWithSpinner = WithSpinner(Income);

const Layout = ({auth, state}) => {
console.log(state);
        return (
            <ThemeProvider theme={lightTheme}>
                <>
                <Header auth={auth}/>
                <LeftNavBar/>

                <GridContainer>  
                        <Route path="/Onboarding" component={OnboardingProcess}/>
                        <Route exact path="/" render={props => (<DashboardWithSpinner isLoading={auth} {...props}/>)} />
                        <Route path="/NetWorth" component={NetWorthApp}/>
                        <Route path="/Tax" render={props => (<TaxAppWithSpinner isLoading={auth} {...props}/>)}/>
                        <Route path="/LifeTimeIncome" component={Income}/>  
                        <Route path="/SavingsPlan" component={Savings}/>              
                        <Route path="/CreditScore" component={CreditScoreApp}/>              
                        <Route path="/Spending" component={SpendingApp}/>
                        <Route path="/Property" component={PropertyApp}/>
                        <Route path="/Debt" component={DebtApp}/>
                </GridContainer>

                <GridContainer>  
                            <Route exact path="/landingpage" component={LandingPage}/>
                            <Route path="/LandingPage" component={LandingPage}/>
                            <Route path="/Login" component={Login}/>
                            <Route path="/SignUp" component={SignUp}/>
                </GridContainer>


                        
                <RightVideoSelector/>
                <Footer/>
                </>
            </ThemeProvider>
        )

}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        state: state,
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProps)(Layout)
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


    //-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
    // This is the switch board of the app. The header and footer are rendred and always present. Then the 
    // center panel can be changed using routing to move through and visit various sub apps such as the net worth
    // calculator. 