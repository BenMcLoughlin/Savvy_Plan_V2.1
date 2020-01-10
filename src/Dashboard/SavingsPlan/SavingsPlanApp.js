
import styled from "styled-components"
import React, { useState, useEffect } from 'react'
import {connect} from "react-redux"
import {transaction_action} from "../../redux/savings/savings_actions"
import Header from "./Header"
import ControlPanel from "./ControlPanel/ControlPanel"
import LandingPageControls from "./ControlPanel/Components/LandingPageControls"
import SavingsStackedChart from "./Charts/SavingsStackedChart"
import SavingsAreaChart from "./Charts/SavingsAreaChart"
import {initializeSavingsAndWithdrawals} from "./services/localFunctions"
import {rate1, rate2} from "../../redux/savings/savings_selectors"

const SavingsPlanApp = ({incomePerYear_reducer, pensionStartAges_reducer,  rate1, rate2, transaction_action, landingPage }) => {

    const {pensionStartAges_reducer: {rrspStartAge: {rangeBarValue: rrspStartAge}}} = {pensionStartAges_reducer}
    const {pensionStartAges_reducer: {tfsaStartAge: {rangeBarValue: tfsaStartAge}}} = {pensionStartAges_reducer}

    const currentAge = 18 

    // useEffect(() => {
    //     initializeSavingsAndWithdrawals(currentAge, incomePerYear_reducer, rate1, rate2, rrspStartAge, tfsaStartAge, transaction_action)
    // }, [])

        return (
            <UserInterfaceWrapper>
                 <Header
                 landingPage
                 />
                <AreaChartPlaceHolder>   
                    <SavingsAreaChart  />
                </AreaChartPlaceHolder>  
                <BarChartPlaceHolder>   
                    <SavingsStackedChart/>
                </BarChartPlaceHolder>   
                {
                    landingPage ? 
                    <LandingPageControls
                    initializeSavingsAndWithdrawals={initializeSavingsAndWithdrawals}
                    transaction_action={transaction_action}
                    />
                    :
                    <ControlPanel
                    initializeSavingsAndWithdrawals={initializeSavingsAndWithdrawals}
                    transaction_action={transaction_action}
                    />
                }

        </UserInterfaceWrapper>
        )
}

const mapStateToProps = (state) => {
    return {
        rate1: rate1(state),
        rate2: rate2(state),
        pensionStartAges_reducer: state.pensionStartAges_reducer,
        incomePerYear_reducer: state.incomePerYear_reducer,
    }
}

export default connect(mapStateToProps, {transaction_action})(SavingsPlanApp)


//-----------------------------------------------STYLES-----------------------------------------------//

const UserInterfaceWrapper = styled.div`
    grid-area: m;
    background: ${props => props.theme.color.ice};
    display: grid;
    height: 100%;
    width: 100%;
    margin-letf: 5%;
    grid-template-rows: minmax(6rem, 12rem) minmax(12rem, 14rem) minmax(14rem, 16rem) minmax(22rem, 24rem);
    grid-template-areas:
    'a a a a a a a a a a a a'
    'b b b b b b b b b b b b'
    'c c c c c c c c c c c c'
    'd d d d d d d d d d d d'
`
const AreaChartPlaceHolder = styled.div`
    grid-area: b;
    width: 90%;
    margin-left: 5%;
    height: 100%;
    position: relative;


`
const BarChartPlaceHolder = styled.div`
    grid-area: c;
    width: 90%;
    margin-left: 5%;
    height: 100%;
    position: relative;

`


//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
/* Shows the user the control panel, the tile pane and the chart of the LifeTime Income Calculator. 

The main functions for this app are written here in the app. 

*/