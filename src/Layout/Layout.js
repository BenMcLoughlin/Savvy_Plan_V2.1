import React, { Component } from 'react'
import Header from "./Header"
import HeaderNew from "./HeaderNew"
import Footer from "./Footer"
import {Route} from "react-router-dom"
import Dashboard from "../Dashboard/Dashboard/Dashboard"
import TaxApp from "../Dashboard/Tax/TaxApp"
import NetWorthApp from "../Dashboard/NetWorth/NetWorthApp"
import CreditScoreApp from "../Dashboard/CreditScore/CreditScoreApp"
import LifetimeIncomeApp from "../Dashboard/LifetimeIncome/LifetimeIncomeApp"
import SavingsPlanApp from "../Dashboard/SavingsPlan/SavingsPlanApp"
import SpendingApp from "../Dashboard/Spending/SpendingApp"
import PropertyApp from "../Dashboard/Property/PropertyApp"
import DebtApp from "../Dashboard/Debt/DebtApp"
import UserAccountApp from "../UserAccount/UserAccountApp"
import {ThemeProvider} from "styled-components"
import {darkTheme, lightTheme} from "../Styles/Themes"
import styled from "styled-components"

export default class Layout extends Component {

   state = {
       theme: lightTheme,
   }
   //this is the state that holds the theme for the app. 

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
    //these are the functions that change the theme state. These functions are passed to the button called "light Theme" or "dark them"
    //in the header as props through Header.
    
    render() {
        return (
            <ThemeProvider theme={this.state.theme}>
            <>
            <HeaderNew />
            <GridContainer>
                    <Route path="/Dashboard" component={Dashboard}/>
                    <Route path="/UserAccount" component={UserAccountApp}/>
                    <Route path="/NetWorth" component={NetWorthApp}/>
                    <Route path="/Tax" component={TaxApp}/>
                    <Route path="/LifeTimeIncome" component={LifetimeIncomeApp}/>  
                    <Route path="/SavingsPlan" component={SavingsPlanApp}/>              
                    <Route path="/CreditScore" component={CreditScoreApp}/>              
                    <Route path="/Spending" component={SpendingApp}/>
                    <Route path="/Property" component={PropertyApp}/>
                    <Route path="/Debt" component={DebtApp}/>
                <Footer/>
            </GridContainer>
            </>
            </ThemeProvider>
        )
    }
}


//
//------------------STYLES---------------------------------------------------------------
 const GridContainer = styled.div`

    height: 100vh;
    margin: 0 auto;
    width: 80vw;
    display: grid;
    grid-template-rows: 1fr 5rem;
    grid-template-columns: repeat(12, 1fr);
    grid-template-areas: 
    "m m m m m m m m m m m m m"
    "f f f f f f f f f f f f f";
    /* The Grid container holds the grid item "m" for "main" and "f" for footer. When a sub-app is clicked
     on its grid location becomes m placing it in the "main position" */
`

    //-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
    // This is the switch board of the app. The header and footer are rendred and always present. Then the 
    // center panel can be changed using routing to move through and visit various sub apps such as the net worth
    // calculator. 