
import styled from "styled-components"
import React, {useEffect} from 'react'
import {connect} from "react-redux"
import {transaction_action} from "redux/savings/savings_actions"
import Header from "page/assumptions/components/Header"
import ControlPanel from "page/savings/components/ControlPanel"
import LandingPageControls from "page/savings/components/LandingPageControls"
import SavingsStackedChart from "charts/savings/SavingsStackedChart"
import AssumptionsStackedBarChart from "charts/assumptions/AssumptionsStackedBarChart"
import {initializeSavingsAndWithdrawals} from "services/savings/savings_functions"
import {rate1, rate2} from "redux/savings/savings_selectors"
import InvestmentFactors from "page/savings/components/InvestmentFactors"

const Savings = ({income_reducer, pensionStartAges_reducer,  rate1, rate2, transaction_action, landingPage }) => {

    useEffect(() => {
        initializeSavingsAndWithdrawals(18, income_reducer, rate1, rate2, 65, 65, transaction_action)
    }, [])

        return (
            <UserInterfaceWrapper>
                 <Header
                 landingPage
                 />
                <BarChartPlaceHolder>   
                    <AssumptionsStackedBarChart  />
                </BarChartPlaceHolder>  
                <Section>
                     <InvestmentFactors count={3} />
                </Section>
        </UserInterfaceWrapper>
        )
}

const mapStateToProps = (state) => {
    return {
        rate1: rate1(state),
        rate2: rate2(state),
        pensionStartAges_reducer: state.pensionStartAges_reducer,
        income_reducer: state.income_reducer,
    }
}

export default connect(mapStateToProps, {transaction_action})(Savings)


//-----------------------------------------------style-----------------------------------------------//

const UserInterfaceWrapper = styled.div`
    grid-area: m;
    background: #fcfcfc;
    display: grid;
    height: 100%;
    width: 100%;
    margin-letf: 5%;
    grid-template-rows: minmax(5rem, 8rem) minmax(18rem, 20rem) minmax(10rem, 12rem) minmax(22rem, 24rem);
    grid-template-areas:
    'a a a a a a a a a a a a'
    'b b b b b c c c c c c c'
    'b b b b b c c c c c c c'
    'd d d d d e e e e e e e'
    'd d d d d e e e e e e e'
`
const AreaChartPlaceHolder = styled.div`
    grid-area: b;
    width: 90%;
    margin-left: 5%;
    height: 100%;
    position: relative;


`
const BarChartPlaceHolder = styled.div`
    grid-area: b;
    width: 40rem;
    margin-left: 5%;
    height: 30rem;
    position: relative;

`
const Section = styled.div`
    flex: 1;
    grid-area: d;
    width: 50rem;
    margin-left: 5%;
    height: 30rem;
` 


//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
/* Shows the user the control panel, the tile pane and the chart of the LifeTime Income Calculator. 

The main functions for this app are written here in the app. 

*/