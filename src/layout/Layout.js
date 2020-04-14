import React from 'react'
import Header from "./Header"
import Footer from "./Footer"
import {Route} from "react-router-dom"
import Dashboard from "pages/dashboard/Dashboard"
import NetWorth from "pages/netWorth/NetWorth"
import CreditScoreApp from "pages/credit/CreditScoreApp"
import Income from "pages/income/Income"
import Savings from "pages/savings/Savings"
import PropertyApp from "pages/property/PropertyApp"
import LandingPage from "pages/onboard/LandingPage"
import Login from "pages/login/Login"
import OnboardProcess from "pages/onboard/OnboardProcess"
import SignUp from "pages/login/SignUp"
import {ThemeProvider} from "styled-components"
import { lightTheme} from "style/Themes"
import styled from "styled-components"
import {connect} from "react-redux"
import Spending from "pages/spending/Spending"
import './baseStyles.css'


const Layout = ({auth, state}) => {
        return (
            <ThemeProvider theme={lightTheme}>
                <>
                <Header auth={auth}/>
                <GridContainer>  
                        <Route exact path="/" component={LandingPage}/>
                        <Route path="/onboarding" component={OnboardProcess}/>
                        <Route exact path="/Dashboard" component={Dashboard} />
                        <Route path="/NetWorth" component={NetWorth}/>
                        <Route path="/income" component={Income}/>  
                        <Route path="/Savings" component={Savings}/>              
                        <Route path="/CreditScore" component={CreditScoreApp}/>              
                        <Route path="/Spending" component={Spending}/>                 
                        <Route path="/Property" component={PropertyApp}/>
                        <Route path="/Login" component={Login}/>
                        <Route path="/SignUp" component={SignUp}/>
                </GridContainer>                        
     
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
//------------------style---------------------------------------------------------------
 const GridContainer = styled.div`
    height: 100vh;
    margin: 4px auto;
    width: 100vw;
    display: grid;
    grid-template-rows: 98vh;
    overflow: scroll;
    color: ${props => props.theme.color.slate};
    grid-template-areas: 
    "m"

    /* The Grid container holds the grid item "m" for "main" and "f" for footer. When a sub-app is clicked
     on its grid location becomes m placing it in the "main position" */
`


    //-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
    // This is the switch board of the app. The header and footer are rendred and always present. Then the 
    // center panel can be changed using routing to move through and visit various sub apps such as the net worth
    // calculator. 