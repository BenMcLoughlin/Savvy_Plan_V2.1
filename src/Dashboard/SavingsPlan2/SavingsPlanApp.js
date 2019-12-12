
import styled from "styled-components"
import React, { useState, useEffect } from 'react'
import {connect} from "react-redux"
import {transaction_action, setInvestmentFactor_action, setOpitmizedValues_action} from "./actions"
import Header from "./Header"
import ControlPanel from "./ControlPanel/ControlPanel"
import SavingsStackedChart from "./Charts/SavingsStackedChart"
import SavingsAreaChart from "./Charts/SavingsAreaChart"
import {presentValue, payment} from "../../services/financialFunctions"
import * as d3 from "d3"
import {setReccomendedSavingaPlan, convertReducerToArrayData, initializeSavingsAndWithdrawals, renderSavings, optimizedWithdrawals, optimizedContribution  } from "./services/localFunctions"
import {inverseLogslider} from "../../services/logorithmicFunctions"



const SavingsPlanApp = ({savingsPerYear_reducer2, transaction_action, incomePerYear_reducer, investmentReturns_reducer, setInvestmentFactor_action, pensionStartAges_reducer, setOpitmizedValues_action}) => {


    const rate1 = investmentReturns_reducer.rate1()
    const rate2 = investmentReturns_reducer.rate2()


    useEffect(() => {
        initializeSavingsAndWithdrawals(incomePerYear_reducer, transaction_action, rate1, rate2)

    }, [])

    const stackedAreaData = Object.values(savingsPerYear_reducer2).map(d => ({
        age: d.rrsp.age, 
        rrspContributions: d.rrsp.totalContributions,
        rrspInterest: d.rrsp.totalInterest,
        tfsaContributions: d.tfsa.totalContributions,
        tfsaInterest: d.tfsa.totalInterest,
        nonRegisteredContributions: d.nonRegistered.totalContributions,
        nonRegisteredInterest: d.nonRegistered.totalInterest,
    }))
    
    
    const stackedBarData = convertReducerToArrayData(savingsPerYear_reducer2)

    const stackedKeys = ["age", "rrspContributions", "tfsaContributions", "nonRegisteredContributions", "rrspInterest", "tfsaInterest",  "nonRegisteredInterest"]
    const stackedKeysBarChart = Object.keys(savingsPerYear_reducer2[18])  
    
        return (
            <UserInterfaceWrapper>
                <Header/>
                <AreaChartPlaceHolder>   
                    <SavingsAreaChart 
                            data={stackedAreaData}
                            stackedKeys={stackedKeys}
                    />
                </AreaChartPlaceHolder>  
                <BarChartPlaceHolder>   
                <SavingsStackedChart
                    data={stackedBarData}
                    stackedKeys={stackedKeysBarChart}
                />
        
                </BarChartPlaceHolder>   
            <ControlPanel
                 savingsPerYear_reducer2={savingsPerYear_reducer2}
                 transaction_action={transaction_action}
                 incomePerYear_reducer={incomePerYear_reducer}
                 investmentReturns_reducer={investmentReturns_reducer}
                 setInvestmentFactor_action={setInvestmentFactor_action}
                 renderSavings={renderSavings}
                 optimizedWithdrawals={optimizedWithdrawals }
                 optimizedContribution ={optimizedContribution }
                 setOpitmizedValues_action={setOpitmizedValues_action}
            />
        </UserInterfaceWrapper>
        )
}



const mapStateToProps = (state) => {
    return {
        savingsPerYear_reducer2: state.savingsPerYear_reducer2,
        incomePerYear_reducer: state.incomePerYear_reducer,
        investmentReturns_reducer: state.investmentReturns_reducer2,
        pensionStartAges_reducer: state.pensionStartAges_reducer,
    }
}

export default connect(mapStateToProps, {transaction_action, setInvestmentFactor_action, setOpitmizedValues_action})(SavingsPlanApp)


//-----------------------------------------------STYLES-----------------------------------------------//

const UserInterfaceWrapper = styled.div`
    grid-area: m;
    background: ${props => props.theme.color.ice};
    display: grid;
    height: 100%;
    grid-template-rows: minmax(8rem, 14rem) minmax(14rem, 16rem) minmax(10rem, 12rem) minmax(22rem, 24rem);
    grid-template-areas:
    'a a a a a a a a a a a a'
    'b b b b b b b b b b b b'
    'c c c c c c c c c c c c'
    'd d d d d d d d d d d d'
`
const AreaChartPlaceHolder = styled.div`
    grid-area: b;
    width: 100%;
    height: 100%;
    position: relative;


`
const BarChartPlaceHolder = styled.div`
    grid-area: c;
    width: 100%;
    height: 100%;
    position: relative;

`


//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
/* Shows the user the control panel, the tile pane and the chart of the LifeTime Income Calculator. 

The main functions for this app are written here in the app. 

*/