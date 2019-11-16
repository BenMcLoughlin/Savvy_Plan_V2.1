import React from "react"
import styled from "styled-components"
import {connect} from "react-redux"
import {setPayload} from "./actions"


const LifetimeIncomeAppRefactor = (props) => {

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


//INCOME INPUT
const setValueInReducer = (name, financialValue, rangeBarValue, rangeBarProps) => {                  //used by rangebars to set values. Rangebars recieve function and pass back the above props. 
    for (let age = 18; age < 30; age++ ) {                                                   //it is here that the function decides what to do with them. In case it will set income. 
      props.setPayload(age, name, financialValue, rangeBarValue, rangeBarProps.contributeToCPP)       //sets the income in the lifetimeIncomeYearList reducer
    }                                                                                                //fires the cpp and oas calculation so it is always up to date.
}

//CHANGE INCOME LABEL
const handleChangeLabel = (e, {name, financialValue, rangeBarValue, contributeToCPP}) => {                                                     // eg. the user changes label from "Employment income" to "Wal mart Income"
for (let age = fromAge; age < toAge; age++ ) {
    props.setPayload(age, name, e.target.value, financialValue, rangeBarValue, contributeToCPP)
  }
}

//REMOVE INCOME TYPE
const handleRemoveItem = (rangeBarProps) => {                                                         //used to remove income types from reducer
    for (let age = fromAge; age < toAge; age++ ) {
      props.removeItem(age, rangeBarProps.name)
    }
}

//ADD NEW ITEM
const addItemToList = (newItem, listNewItemWillBeAddedToo) => {                                       //used to add new income type to list
                 
    for (let age = 18; age < 95; age++ ) {                                                            // first adds empty value with correct name and label to entire reducer 18 - 95
        props.setPayload(
        age,
        newItem.name,
        newItem.label,
        0,
        0,
        0)
    }
    for (let age = fromAge; age < toAge; age++ ) {                                                    //then adds the income for the desired years
        props.setPayload(
        age,
        newItem.name,
        newItem.label,
        newItem.financialValue,
        newItem.rangeBarValue,
        newItem.isChecked)
    }
}


const rangeBarProps = {
    age: 18, 
    name: "employmentIncome",
    label: "employment Income",
    financialValue: 5000, 
    rangeBarValue: 20,
    contributeToCPP: true
}

//DATA CONVERSTION FOR STACKED BAR CHART
const data = Object.values(props.incomePerYear).map(d => {                           //the year list needs to be converted to an array so the chart can render the data
    const incomeNamesArray = Object.keys(d)                                          //Creates an array of all the names eg ["employmentIncome", "cppIncome", etc.]
    const financialValueArray = Object.values(d).map(a => a.financialValue)          //Creates an array of all the financial Values eg ["22000", "1200", etc.]
    var result = {age: d.cppIncome.age};                                             //I have to go into one of the objects to access its age which acts like id, I just used cppIncome because it wont be deleted
    incomeNamesArray.forEach((key, i) => result[key] = financialValueArray[i]);      //Merges the two arrays into a set of key value pairs eg ["employmentIncome": 22000]   
    return result
})

//DATA CONVERSTION FOR INCOME RANGEBARS
const incomeTypeArray = Object.values(props.incomePerYear[fromAge]                     //the list of income types is mapped and a rangebar is rendered for each 
               ).filter(d => d.name !== "oasIncome")                                   //Only the income the user inputs needs a range bar so these are removed 
                .filter(d => d.name !== "cppIncome")
                .filter(d => d.name !== "rrifIncome") 

console.log(data);
        return (
            <UserInterfaceWrapper>
                hello this is me testing
                <button onClick={() => setValueInReducer("employmentIncome", 100000, "100", false)}>Button</button>
                <input type="text" onChange={(e) => handleChangeLabel(e, rangeBarProps)}/>
            </UserInterfaceWrapper>
        )
}


const mapStateToProps = (state) => {
    return {
        incomePerYear: state.incomePerYear,
        lifetimeIncomeVariables: state.lifetimeIncomeVariables
    }
}

export default connect(mapStateToProps, {setPayload})(LifetimeIncomeAppRefactor)


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

