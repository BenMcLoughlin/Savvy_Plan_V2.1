import styled from "styled-components"
import React, {useEffect} from 'react'
import {connect} from "react-redux"
import {transaction_action} from "redux/savings/savings_actions"
import Header from "pages/savings/components/Header"
import ControlPanel from "pages/savings/components/ControlPanel"
import LandingPageControls from "pages/savings/components/LandingPageControls"
import SavingsStackedChart from "charts/savings/SavingsStackedChart"
import SavingsAreaChart from "charts/savings/SavingsAreaChart"
import {initializeSavingsAndWithdrawals} from "services/savings/savings_functions"
import {rate1, rate2} from "redux/savings/savings_selectors"

const Savings = ({income_reducer, pensionStartAges_reducer,  rate1, rate2, transaction_action, landingPage }) => {

    useEffect(() => {
        initializeSavingsAndWithdrawals(18, income_reducer, rate1, rate2, 65, 65, transaction_action)
    }, [])

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
        income_reducer: state.income_reducer,
    }
}

export default connect(mapStateToProps, {transaction_action})(Savings)


//-----------------------------------------------style-----------------------------------------------//

const UserInterfaceWrapper = styled.div`
   ${props => props.theme.pageBaseStyles}
    grid-template-rows: minmax(5rem, 8rem) minmax(18rem, 20rem) minmax(10rem, 12rem) minmax(22rem, 24rem);
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