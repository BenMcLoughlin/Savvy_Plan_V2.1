
import styled from "styled-components"
import React, { useState } from 'react'

import {connect} from "react-redux"
import {setSavingsValue_action, calculateSavings_action} from "./actions"
import Header from "./Header"
import ControlPanel from "./ControlPanel/ControlPanel"
import _ from "lodash"
import SavingsStackedChart from "./Charts/SavingsStackedChart"


const SavingsPlanApp = ({savingsPerYear_reducer, setSavingsValue_action, calculateSavings_action}) => {

    const [fromAge, setFromAge] = useState(18)
    const [toAge, setToAge] = useState(65)    
    const [growthRate, setGrowthRate] = useState(0.05)    
    const [conservativeRate, setConservativeRate] = useState(0.03)    
  
    const setContribution = (financialValue, rangeBarValue, {label, name}) => {                                                 //used by rangebars to set income in incomeByYear reducer
            for (let age = fromAge; age < toAge; age++ ) {                                                           
                setSavingsValue_action(age, financialValue, label, name, rangeBarValue)                                          //sets the income for each of the years between the selected ranges
              } 
              calculateSavings()                                                         
        }

    const calculateSavings = () => {
        for (let age = 19; age < 95; age++ ) {                                                           
            calculateSavings_action(age, "rrsp")                                                                                 //sets the income for each of the years between the selected ranges
          }          
    }    

    //DATA CONVERSTION FOR STACKED BAR CHART
const data = Object.values(savingsPerYear_reducer).map(d => {                                                                               //the year list needs to be converted to an array so the chart can render the data
    const savingAccountNamesArray = Object.keys(d)                                                                                                 //Creates an array of all the names eg ["employmentIncome", "cppIncome", etc.]
    const financialValueArray = Object.values(d).map(a => a.financialValue)                                                                 //Creates an array of all the financial Values eg ["22000", "1200", etc.]
    var result = {age: d.rrsp.age};                                                                                                    //I have to go into one of the objects to access its age which acts like id, I just used cppIncome because it wont be deleted
    savingAccountNamesArray.forEach((key, i) => result[key] = financialValueArray[i]);                                                             //Merges the two arrays into a set of key value pairs eg ["employmentIncome": 22000]   
    return result
})

const stackedKeys = Object.keys(savingsPerYear_reducer[18])       


console.log(data);
        return (
            <UserInterfaceWrapper>
                <Header/>
                <ChartPlaceHolder>   
                <SavingsStackedChart
                    data={data}
                    stackedKeys={stackedKeys}
                />
                </ChartPlaceHolder>   
            <ControlPanel
                fromAge={fromAge}
                toAge={toAge}
                setFromAge={setFromAge}
                setToAge={setToAge}
                rangeBarArray={Object.values(savingsPerYear_reducer[fromAge])}
                setContribution={setContribution}
            />
        </UserInterfaceWrapper>
        )
}



const mapStateToProps = (state) => {
    return {
        savingsPerYear_reducer: state.savingsPerYear_reducer,
    }
}

export default connect(mapStateToProps, {setSavingsValue_action, calculateSavings_action})(SavingsPlanApp)


//-----------------------------------------------STYLES-----------------------------------------------//

const UserInterfaceWrapper = styled.div`
    grid-area: m;
    background: ${props => props.theme.color.background2};
    display: grid;
    height: 100%;
    grid-template-rows: minmax(10rem, 14rem) minmax(22rem, 24rem);
    grid-template-areas:
    'a a a a a a a a a a a a'
    'c c c c c c c c c c c c'
    'd d d d d d d d d d d d'
`
const ChartPlaceHolder = styled.div`
    grid-area: c;
    width: 100%;
    height: 100%;


`

//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
/* Shows the user the control panel, the tile pane and the chart of the LifeTime Income Calculator. 

The main functions for this app are written here in the app. 

*/