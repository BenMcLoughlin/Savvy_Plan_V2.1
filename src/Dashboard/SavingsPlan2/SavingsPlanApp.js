
import styled from "styled-components"
import React, { useState, useEffect } from 'react'
import {connect} from "react-redux"
import {transaction_action, setInvestmentFactor_action} from "./actions"
import Header from "./Header"
import ControlPanel from "./ControlPanel/ControlPanel"
import SavingsStackedChart from "./Charts/SavingsStackedChart"
import SavingsAreaChart from "./Charts/SavingsAreaChart"
import {presentValue, payment} from "../../services/financialFunctions"
import * as d3 from "d3"
import {setReccomendedSavingaPlan, convertReducerToArrayData, calculateYScaleMax, calculateYScaleMin} from "./services/localFunctions"
import {inverseLogslider} from "../../services/logorithmicFunctions"



const SavingsPlanApp = ({savingsPerYear_reducer2, transaction_action, incomePerYear_reducer, investmentReturns_reducer, setInvestmentFactor_action}) => {


    const rate1 = investmentReturns_reducer.rate1()
    const rate2 = investmentReturns_reducer.rate2()

    const renderSavings = (fromAge, toAge, name, value, rangeBarValue, transaction, transaction_action, rate1, rate2 ) => {

        for (let age = 18; age < fromAge; age++) {
            transaction_action(age, name, transaction, rangeBarValue, value, rate1, rate2)
        } 
        for (let age = fromAge; age < toAge; age++) {
            transaction_action(age, name, transaction, rangeBarValue, value, rate1, rate2)
        } 
        for (let age = toAge; age <= 95; age++) {
            const withdrawalValue = savingsPerYear_reducer2[age][name].withdraw
            const rangeBarValue = inverseLogslider(withdrawalValue )
            transaction_action(age, name, "withdraw", rangeBarValue, withdrawalValue,  rate1, rate2)
        } 
    }


    useEffect(() => {
        ["rrsp", "tfsa", "nonRegistered"].map(account => {
            const reccomendedPayment = incomePerYear_reducer[72][account].financialValue > 0 ? incomePerYear_reducer[72][account].financialValue : 100
            const nestEggValue = presentValue(rate2, 30, reccomendedPayment, 0)
            const value = payment(rate1, 40, 0,nestEggValue) > 0 ? payment(rate1, 40, 0,nestEggValue) : 100
            const rangeBarValueC = inverseLogslider(value )
            const rangeBarValueW = inverseLogslider(reccomendedPayment)
    console.log(value);
            for (let age = 18; age < 65; age++) {
                transaction_action(age, account, "contribute", rangeBarValueC, value, rate1, rate2)
            }
            for (let age = 65; age <= 95; age++) {
                transaction_action(age, account, "withdraw", rangeBarValueW, reccomendedPayment, rate1, rate2)
            } 
        })
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
    

    const stackedKeys = ["age", "rrspContributions", "tfsaContributions", "nonRegisteredContributions", "rrspInterest", "tfsaInterest",  "nonRegisteredInterest"]

    console.log(savingsPerYear_reducer2);
        return (
            <UserInterfaceWrapper>
                <Header
                />
                <AreaChartPlaceHolder>   
                    <SavingsAreaChart 
                            data={stackedAreaData}
                            stackedKeys={stackedKeys}
                    />
                </AreaChartPlaceHolder>  
                <BarChartPlaceHolder>   

        
                </BarChartPlaceHolder>   
            <ControlPanel
                 savingsPerYear_reducer2={savingsPerYear_reducer2}
                 transaction_action={transaction_action}
                 incomePerYear_reducer={incomePerYear_reducer}
                 investmentReturns_reducer={investmentReturns_reducer}
                 setInvestmentFactor_action={setInvestmentFactor_action}
                 renderSavings={renderSavings}
            />
        </UserInterfaceWrapper>
        )
}



const mapStateToProps = (state) => {
    return {
        savingsPerYear_reducer2: state.savingsPerYear_reducer2,
        incomePerYear_reducer: state.incomePerYear_reducer,
        investmentReturns_reducer: state.investmentReturns_reducer2,
        withdrawals_reducer: state.withdrawals_reducer
    }
}

export default connect(mapStateToProps, {transaction_action, setInvestmentFactor_action})(SavingsPlanApp)


//-----------------------------------------------STYLES-----------------------------------------------//

const UserInterfaceWrapper = styled.div`
    grid-area: m;
    background: ${props => props.theme.color.ice};
    display: grid;
    height: 100%;
    grid-template-rows: minmax(8rem, 14rem) minmax(14rem, 16rem) minmax(6rem, 8rem) minmax(22rem, 24rem);
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