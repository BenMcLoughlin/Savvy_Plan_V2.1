import React from "react"
import ControlPanel from "./ControlPanel/ControlPanel"
import HeaderValues from "./HeaderValues"
import styled from "styled-components"
import {connect} from "react-redux"
import StackedBarChartLifetimeIncome from "./Chart/StackedBarChart.js"
import {setIncome, changeLabel, removeItem, 
        addItem, setRRSPDetails, setAgeRange, 
        setFutureRRSPValue,  
        setAverageLifetimeEarnings, calculateCPP, 
        calculateOAS, 
        clearIncomeBeforeStartAge, setLifetimeIncomeVariable, setValue} from "./actions"


const LifetimeIncomeApp = (props) => {

//DESTRUCTURE REDUCERS TO ASSIGN VARIABLES
        const { fromAge, toAge, rrspDetails,                                                                 //Using nested Object destructing to grab and assign main variables. 
            pensionStartAges : { cppStartAge : {rangeBarValue: cppStartAge }},            
            pensionStartAges : { oasStartAge : {rangeBarValue: oasStartAge }},
        } = props.lifetimeIncomeVariables
     

//DUAL RANGEBAR SETS AGE RANGE
         const setParentDualRangeValues = (lower, higher) => {                                              //passed to dual range bar to set fromAge and toAge
          if (lower >= 18) {                                                                                //minimum age is 18 so if it is less it throws an error
           props.setAgeRange(lower, higher)                                                                 //fires action setting ages in the reducer, all income inputs are now between these ages
          }
       }

//CALCULATE CPP AND OAS 
       const renderCPPandOASIncome = () => {                                                                //takes the year the user selected to begin their pension as the start and fills in
          for (let age = cppStartAge; age <= 95; age++) {                                                   //their pension income until age 95
              props.calculateCPP(cppStartAge, age)                                                          //calculates CPP payment and inserts it into lifetimeIncomeYearList reducer
          }
          for (let age = oasStartAge; age <= 95; age++) {
              props.calculateOAS(oasStartAge, age)
          }
      }

//INCOME INPUT
       const setValueInReducer = (name, financialValue, rangeBarValue, rangeBarProps) => {      //used by rangebars to set values. Rangebars recieve function and pass back the above props. 
          for (let age = fromAge; age < toAge; age++ ) {                                                   //it is here that the function decides what to do with them. In case it will set income. 
            props.setIncome(age, name, financialValue, rangeBarValue, rangeBarProps.contributeToCPP)       //sets the income in the lifetimeIncomeYearList reducer
          }    
          renderCPPandOASIncome()                                                                          //fires the cpp and oas calculation so it is always up to date.
      }

//CHANGE INCOME LABEL
      const handleChangeLabel = (e, rangeBarProps) => {                                                     // eg. the user changes label from "Employment income" to "Wal mart Income"
          for (let age = fromAge; age < toAge; age++ ) {
              props.changeLabel(age, e.target.value, e.target.name)
            }
      }

//REMOVE INCOME TYPE
      const handleRemoveItem = (rangeBarProps) => {                                                         //used to remove income types from reducer
            for (let age = fromAge; age < toAge; age++ ) {
              props.removeItem(age, rangeBarProps.name)
            }
            renderCPPandOASIncome()
      }
  
//ADD NEW ITEM
      const addItemToList = (newItem, listNewItemWillBeAddedToo) => {                                       //used to add new income type to list
                 
          for (let age = 18; age < 95; age++ ) {                                                            // first adds empty value with correct name and label to entire reducer 18 - 95
          props.addItem(
              age,
              newItem.name,
              newItem.label,
              0,
              0,
              0)
          }
          for (let age = fromAge; age < toAge; age++ ) {                                                    //then adds the income for the desired years
              props.addItem(
              age,
              newItem.name,
              newItem.label,
              newItem.financialValue,
              newItem.rangeBarValue,
              newItem.isChecked)
          }
          renderCPPandOASIncome()
      }


//DATA CONVERSTION FOR CHART
        const data = Object.values(props.lifetimeIncomeYearList).map(d => {                           //the year list needs to be converted to an array so the chart can render the data
            const incomeTypeArray = Object.keys(d.incomeType)
            const financialValueArray = Object.keys(d.incomeType).map(income => d.incomeType[income].financialValue)
            var result = {age: d.age};
            incomeTypeArray.forEach((key, i) => result[key] = financialValueArray[i]);          
          return result
        })
     
       const stackedKeys = Object.keys(props.lifetimeIncomeYearList[18].incomeType)                    //this provides and array of the income types that is used in building the chart
       
//DATA CONVERSTION FOR INCOME RANGEBARS
       const incomeTypeArray = Object.values(props.lifetimeIncomeYearList[fromAge]                     //the list of income types is mapped and a rangebar is rendered for each 
        .incomeType).filter(d => d.name !== "oasIncome")                                                    //Only the income the user inputs needs a range bar so these are removed 
                    .filter(d => d.name !== "cppIncome")
                    .filter(d => d.name !== "rrifIncome") 

 //DATA CONVERSTION FOR RRSP RANGEBARS
        const rrspDetailsRangeBarArray = Object.values(rrspDetails).slice(0,2)
console.log(data);

        return (
            <UserInterfaceWrapper>
                <HeaderValues                                                                             
                lifetimeIncomeYearList = {props.lifetimeIncomeYearList} 
                />                                                                                          {/*Displays all the key values along the top of the page */}
                <ChartPlaceHolder>
                <StackedBarChartLifetimeIncome
                    data={data}
                    stackedKeys={stackedKeys}
                />
                </ChartPlaceHolder>                                                                        {/*Holds 3 sections, income input, rrsp input and retirement start age*/}
                <ControlPanel     
                    lower ={fromAge}
                    higher={toAge}
                    setParentDualRangeValues={setParentDualRangeValues } 
                    setValueInReducer = {setValueInReducer}
                    handleChangeLabel = {handleChangeLabel}
                    incomeTypeArray={incomeTypeArray}
                    handleRemoveItem={handleRemoveItem}
                    addItemToList={addItemToList}
                    lifetimeIncomeVariables={props.lifetimeIncomeVariables}
                    rrspDetailsRangeBarArray ={rrspDetailsRangeBarArray}
                    setIncome={props.setIncome}
                    setFutureRRSPValue={props.setFutureRRSPValue}
                    calculateCPP={props.calculateCPP}
                    clearIncomeBeforeStartAge = {props.clearIncomeBeforeStartAge}
                    calculateOAS={props.calculateOAS}
                    lifetimeIncomeYearList={props.lifetimeIncomeYearList}
                    setValue={props.setValue}
                />
            </UserInterfaceWrapper>
        )
}


const mapStateToProps = (state) => {

    return {
        lifetimeIncomeVariables: state.lifetimeIncomeVariables,
        lifetimeIncomeYearList: state.lifetimeIncomeYearList
    }
}

export default connect(mapStateToProps, {setIncome, changeLabel, removeItem, 
                                        addItem, setRRSPDetails, setAgeRange,
                                         setFutureRRSPValue, 
                                          setAverageLifetimeEarnings, calculateCPP, 
                                          clearIncomeBeforeStartAge, calculateOAS, 
                                          clearIncomeBeforeStartAge, setLifetimeIncomeVariable, setValue})(LifetimeIncomeApp)


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
// Shows the user the control panel, the tile pane and the chart of the LifeTime Income Calculator. 

