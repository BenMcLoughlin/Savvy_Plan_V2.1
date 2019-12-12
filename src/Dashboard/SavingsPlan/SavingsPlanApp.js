
import styled from "styled-components"
import React, { useState, useEffect } from 'react'
import {connect} from "react-redux"
import {setSavingsValue_action, calculateSavings_action, calculateRrifWithdrawal_action, setReccomendedSavingsValue_action, calculateReccomendedSavings_action, setInvestmentFactor_action, setWithdrawalValue_action} from "./actions"
import Header from "./Header"
import ControlPanel from "./ControlPanel/ControlPanel"
import SavingsStackedChart from "./Charts/SavingsStackedChart"
import ReccomendedSavingsStackedChart from "./Charts/ReccomendedSavingsStackedChart"
import SavingsAreaChart from "./Charts/SavingsAreaChart"
import ReccomendedSavingsAreaChart from "./Charts/ReccomendedSavingsAreaChart"
import {presentValue, payment} from "../../services/financialFunctions"
import * as d3 from "d3"
import {setReccomendedSavingaPlan, convertReducerToArrayData, calculateYScaleMax, calculateYScaleMin} from "./services/localFunctions"

const SavingsPlanApp = ({withdrawals_reducer, savingsPerYear_reducer, investmentReturns_reducer, setWithdrawalValue_action, incomePerYear_reducer, calculateReccomendedSavings_action, setSavingsValue_action, calculateSavings_action, setReccomendedSavingsValue_action, calculateRrifWithdrawal_action, setInvestmentFactor_action}) => {

    const [fromAge, setFromAge] = useState(18)
    const [toAge, setToAge] = useState(65)    


 const fireSavingsPlan = () => {
    ["rrsp", "tfsa", "nonRegistered"].map(account => setReccomendedSavingaPlan(account, calculateReccomendedSavings_action, incomePerYear_reducer, investmentReturns_reducer, setReccomendedSavingsValue_action))
 }

 useEffect(() => {
    fireSavingsPlan()
  }, []);

      const rrifPayment = incomePerYear_reducer[72].rrsp.financialValue


    const setContribution = (financialValue, rangeBarValue, {label, name}) => {                                                 //used by rangebars to set income in incomeByYear reducer
            for (let age = fromAge; age < toAge; age++ ) {                                                           
                setSavingsValue_action(age, financialValue, label, name, rangeBarValue)                                          //sets the income for each of the years between the selected ranges
              } 
              calculateSavings(name)    
              calculateRrifWithdrawal(65, rrifPayment)                                                     
        }

    const calculateSavings = (name) => {
        for (let age = 20; age < 95; age++ ) { 
            const rate1 = investmentReturns_reducer.rate1()                                       
            const rate2 = investmentReturns_reducer.rate2()                                       
            console.log(age);
            calculateSavings_action(age, name, rate1, rate2)                                                                                 //sets the income for each of the years between the selected ranges
      
        }          
    }    

    const calculateRrifWithdrawal = (rrifStartAge, rrifPayment) => {
        for (let age = rrifStartAge; age <= 95; age++ ) {                                                           
            calculateRrifWithdrawal_action(age, rrifPayment)                                                                              //sets the income for each of the years between the selected ranges
          }  
      
    }

    //DATA CONVERSTION FOR STACKED BAR CHART
const stackedBarData = convertReducerToArrayData(savingsPerYear_reducer, "financialValue")
const reccomendedStackedBarData = convertReducerToArrayData(savingsPerYear_reducer, "reccomendedFinancialValue")
const stackedAreaData = convertReducerToArrayData(savingsPerYear_reducer, "endValue")
const reccomendedStackedAreaData = convertReducerToArrayData(savingsPerYear_reducer, "reccomendedEndValue")



const stackedKeys = Object.keys(savingsPerYear_reducer[18])       

const stackedAreaDataMax = calculateYScaleMax(stackedAreaData, 200000,)
const reccomendedAreaDataMax  = calculateYScaleMax(reccomendedStackedAreaData , 200000,)
const stackedBarDataMax = calculateYScaleMax(stackedBarData , 5000,)
const reccomendedBarDataMax = calculateYScaleMax(reccomendedStackedBarData , 5000,)
const stackedBarDataMin = calculateYScaleMin(stackedBarData , -5000,)
const reccomendedBarDataMin = calculateYScaleMin(reccomendedStackedBarData , -5000,)

const d3Max = Math.max(...[stackedAreaDataMax, reccomendedAreaDataMax])
const d3BarMax = Math.max(...[stackedBarDataMax, reccomendedBarDataMax ])
const d3BarMin = Math.min(...[stackedBarDataMin, reccomendedBarDataMin ])

        return (
            <UserInterfaceWrapper>
                <Header
                 incomePerYear_reducer={incomePerYear_reducer}
                />
                <AreaChartPlaceHolder>   
                <SavingsAreaChart
                  data={stackedAreaData}
                  stackedKeys={stackedKeys}
                  style={{position: "absolute", top: "3px", left: "3px"}}
                  max={d3Max}
                />
                <ReccomendedSavingsAreaChart
                  data={reccomendedStackedAreaData}
                  max={d3Max}
                  stackedKeys={stackedKeys}
                  style={{position: "absolute", top: "3px", left: "3px"}}
                />

                </AreaChartPlaceHolder>  
                <BarChartPlaceHolder>   

                <SavingsStackedChart
                    data={stackedBarData}
                    stackedKeys={stackedKeys}
                    max={d3BarMax}
                    min={d3BarMin}
                />
                <ReccomendedSavingsStackedChart
                    data={reccomendedStackedBarData}
                    stackedKeys={stackedKeys}
                    max={d3BarMax}
                    min={d3BarMin}
                />
                </BarChartPlaceHolder>   
            <ControlPanel
                fromAge={fromAge}
                toAge={toAge}
                setFromAge={setFromAge}
                setToAge={setToAge}
                rangeBarArray={Object.values(savingsPerYear_reducer[fromAge])}
                setContribution={setContribution}
                investmentReturns_reducer={investmentReturns_reducer}
                setInvestmentFactor_action={setInvestmentFactor_action}
                setSavingsValue_action={setSavingsValue_action}
                withdrawals_reducer={withdrawals_reducer}
                setWithdrawalValue_action={setWithdrawalValue_action}
                calculateSavings={calculateSavings}
                fireSavingsPlan={fireSavingsPlan}
            />
        </UserInterfaceWrapper>
        )
}



const mapStateToProps = (state) => {
    return {
        savingsPerYear_reducer: state.savingsPerYear_reducer,
        incomePerYear_reducer: state.incomePerYear_reducer,
        investmentReturns_reducer: state.investmentReturns_reducer,
        withdrawals_reducer: state.withdrawals_reducer,
        pensionStartAges_reducer: state.pensionStartAges_reducer,
    }
}

export default connect(mapStateToProps, {setSavingsValue_action, calculateSavings_action, calculateRrifWithdrawal_action, setReccomendedSavingsValue_action, setWithdrawalValue_action, calculateReccomendedSavings_action, setInvestmentFactor_action})(SavingsPlanApp)


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