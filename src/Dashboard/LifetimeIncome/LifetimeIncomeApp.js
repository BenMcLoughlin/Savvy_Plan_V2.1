import React, {useState} from "react"
import styled from "styled-components"
import {connect} from "react-redux"
import {setIncome_action, setKeyVariable_action, removeItem_action, calculateCpp_action, setPensionStartAge_action, setRetirementIncome_action} from "./actions"
import {setMaxContribution_action} from "../SavingsPlan/actions"
import Header from "./Header"
import ControlPanel from "./ControlPanel/ControlPanel"
import LifetimeIncomeBarChart from "./Charts/LifetimeIncomeBarChart"
import {adjustOas}from "./services/localFunctions"
import {payment}from "../..//services/financialFunctions"
import {calculateOptimumIncomeStreams} from "./services/localFunctions" 

const LifetimeIncomeAppRefactor = ({setIncome_action, calculateCpp_action, setPensionStartAge_action,                                    // destructure out variables
    incomePerYear_reducer, removeItem_action, pensionStartAges_reducer, setRetirementIncome_action, 
    setMaxContribution_action, keyVariables_reducer, savingsPerYear_reducer,
    pensionStartAges_reducer: {cppStartAge: {rangeBarValue: cppStartAge}},
    pensionStartAges_reducer: {oasStartAge: {rangeBarValue: oasStartAge }}}) => {

        const [fromAge, setFromAge] = useState(18)
        const [toAge, setToAge] = useState(65)    

        const {pensionStartAges_reducer: {rrifStartAge: {rangeBarValue: rrifStartAge}}} = {pensionStartAges_reducer}
        const {pensionStartAges_reducer: {tfsaStartAge: {rangeBarValue: tfsaStartAge}}} = {pensionStartAges_reducer}
   
   
//CALCULATE CPP AND OAS 
const renderCPPandOASIncome = (cacheKey) => {                                                                                              //caclualtes the cpp and oas payments and places them into the incomePeryearReducer               
      for (let age = cppStartAge; age <= 95; age++) {
            calculateCpp_action(age, cppStartAge, cacheKey)                                                                                //to support memoization we are passing in the financial value as a caheKey which the funciton will use to know if it's ran before
        }
      for (let age = 59; age < cppStartAge; age++) {                                                                                       //resets cpp payments to 0 before the selectd start age
            setIncome_action(age, false, 0, "CPP Income", "cppIncome")  
        }
      for (let age = oasStartAge; age <= 95; age++) {                                                                                      //sets OasIncome in the reducer 
            setIncome_action(age, false, 7300, "OAS Income", "oasIncome", 0)  
        }
      for (let age = 59; age < oasStartAge; age++) {
            setIncome_action(age, false,  0, "OAS Income", "oasIncome", 0)  
        }
    }

//INCOME INPUT
    const setIncome = (financialValue, rangeBarValue, {contributeToCpp, label, name}) => {                                                 //used by rangebars to set income in incomeByYear reducer
    const cacheKey = financialValue + name +  (fromAge.toString()) + (toAge.toString())                                                   //creates a unique cacheKey which will be used to check if the function has been run before and return the last answer if it was - memoization
        for (let age = fromAge; age < toAge; age++ ) {                                                           
            setIncome_action(age, contributeToCpp, financialValue, label, name, rangeBarValue)                                            //sets the income for each of the years between the selected ranges
        }    
            contributeToCpp && renderCPPandOASIncome(cacheKey)    
                                                                                 //only recalculates CPP if contributions to CPP are made on the income                                                        
    }

    const incomeTypeArray = Object.values(incomePerYear_reducer[fromAge])                                            //Converts the year list to an array so that it can be mapped through for rangebars  
        .filter(d => d.name !== "oasIncome")                                                                                              //Range Bars only show for income the user is inputting, not retirementIncome, these are filtered out                       
        .filter(d => d.name !== "cppIncome")
        .filter(d => d.name !== "rrsp") 
        .filter(d => d.name !== "tfsa") 
        .filter(d => d.name !== "nonRegistered") 

    const addItemToList = (financialValue, rangeBarValue, {isChecked, label, name}) => {
        let contributeToCpp = isChecked
        for(let age = 18; age < 95; age++) {
        setIncome_action(age, isChecked, 0, label, name, 0)
        }
        setIncome (financialValue, rangeBarValue, {contributeToCpp, label, name})
    }

//CHANGE INCOME LABEL
    const handleChangeLabel = (e,  {financialValue, rangeBarValue, contributeToCpp, label, name}) => {                                   // eg. the user changes label from "Employment income" to "Wal mart Income"
    for (let age = fromAge; age < toAge; age++ ) {
        setIncome_action(age, contributeToCpp, financialValue, e.target.value, name, rangeBarValue) 
    }
    }

//PENSION INCOME CALCULATION
    const setPensionIncome = (x, value, {name})  => {   
        setPensionStartAge_action(name, value)                                                                                           //Takes value from rangeBar and sets it into the pension start age reducer 
        const cacheKey = value+name
        if  (name === "cppStartAge") {                                                                                                   //Checks name of value being changed and sets it into the lifetimeIncomeYearList 
            for (let age = value; age <=95; age ++) {                                                                                    //Runs from the age selected in the rangeBar to age 95 and inserts the income into the reducer
                calculateCpp_action(age, value, cacheKey)
            }
            for (let age = 59; age < value; age++) {
                setIncome_action(age, false, 0, "CPP Income", "cppIncome")  
            }}
        else if  (name === "oasStartAge") {
            const oasPayment = adjustOas(7200, value)
            for (let age = value; age <=95; age ++) {                                                                                     //Runs from the age selected in the rangeBar to age 95 and inserts the income into the reducer
                setIncome_action(age, false, oasPayment, "OAS Income", "oasIncome") 
            }
            for (let age = 64; age < value; age++) {
                setIncome_action(age, false, 0, "OAS Income", "oasIncome")  
            }}
        else {
            setKeyVariable_action(name, value)
        }
        setMaxContributions(incomePerYear_reducer, rrifStartAge)
        addRetirementIncome()
       }

//REMOVE INCOME TYPE
const handleRemoveItem = ({name}) => {                                                                                                      //used to remove income types from reducer
    for (let age = 18; age < 95; age++ ) {
      removeItem_action(age, name)
    }
}

//DATA CONVERSTION FOR STACKED BAR CHART
const data = Object.values(incomePerYear_reducer).map(d => {                                                                               //the year list needs to be converted to an array so the chart can render the data
    const incomeNamesArray = Object.keys(d)                                                                                                 //Creates an array of all the names eg ["employmentIncome", "cppIncome", etc.]
    const financialValueArray = Object.values(d).map(a => a.financialValue)                                                                 //Creates an array of all the financial Values eg ["22000", "1200", etc.]
    var result = {age: d.cppIncome.age};                                                                                                    //I have to go into one of the objects to access its age which acts like id, I just used cppIncome because it wont be deleted
    incomeNamesArray.forEach((key, i) => result[key] = financialValueArray[i]);                                                             //Merges the two arrays into a set of key value pairs eg ["employmentIncome": 22000]   
    return result
})

const {birthYear} = keyVariables_reducer

const retirementPensionIncome = Object.values(incomePerYear_reducer[72]).filter(d => d.name !== "rrsp")
                                        .filter(d => d.name !== "tfsa")
                                        .filter(d => d.name !== "nonRegistered")
                                        .map(d => d.financialValue)
                                        .reduce((acc,num) => acc + num)

                                     

const setMaxContributions = (incomePerYear_reducer, rrifStartAge) => {

for (let age = 18; age < rrifStartAge; age ++) {
   const totalRrspContEligibleIncome = Object.values(incomePerYear_reducer[age]).map(d => d.financialValue).reduce((acc, num) => acc + num)
   const rrspMaxContribution = totalRrspContEligibleIncome * .18 < 26500 ? totalRrspContEligibleIncome * .18 : 26500
   setMaxContribution_action(age, "rrsp", rrspMaxContribution)
   if (birthYear + age > 2009) {
    setMaxContribution_action(age, "tfsa", 5500)
   }
}

}

//SET TOTAL RETIREMENT PENSION INCOME IN KEY VARIABLES REDUCER


const determineMaxRegisteredPayments = (savingsPerYear_reducer) => {
const rrspContributionArray = Object.values(savingsPerYear_reducer).slice(0,47).map(d => d.rrsp.maxContribution)
const maxRrspValue = rrspContributionArray.reduce((acc, num) => (acc * 1.03) + num)
const maxRrspPayment = payment(0.03, 30, maxRrspValue, 0)

const tfsaContributionArray = Object.values(savingsPerYear_reducer).slice(0-47).map(d => d.tfsa.maxContribution)
const maxTfsaValue = tfsaContributionArray.reduce((acc, num) => (acc * 1.04) + num)
const maxTfsaPayment = payment(0.03, 30, maxTfsaValue, 0)


const incomeArray = Object.values(incomePerYear_reducer).map(d => Object.values(d).map(a => a.financialValue).reduce((acc, num) => acc + num)).slice(0,47)

const highestIncomes = incomeArray.sort((a, b)=> b-a).slice(0,10).reduce((acc, num) => acc + num) /10
console.log(maxRrspPayment);
return {
    maxTfsaPayment: -maxTfsaPayment,
    maxRrspPayment: -maxRrspPayment,
    highestIncomes
}

}

const {maxTfsaPayment, maxRrspPayment, highestIncomes, } = determineMaxRegisteredPayments(savingsPerYear_reducer)

const incomeStreams = calculateOptimumIncomeStreams(keyVariables_reducer.retirementIncome.financialValue, retirementPensionIncome, maxRrspPayment, maxTfsaPayment,highestIncomes)

const addRetirementIncome = () => {
for (let age = 50; age < rrifStartAge; age++ ) {
    setIncome_action(age, false, 0, "RRSP Income", "rrsp", 0) 

}
for (let age = rrifStartAge; age <= 95; age++ ) {
    setIncome_action(age, false, incomeStreams.rrsp, "RRSP Income", "rrsp", 0) 
    console.log(incomeStreams.rrsp);

}
for (let age = 50 ; age < tfsaStartAge; age++ ) {
    setIncome_action(age, false, 0, "TFSA Income", "tfsa", 0) 
    setIncome_action(age, false, 0, "Non reg Income", "nonRegistered", 0) 
}
for (let age = tfsaStartAge; age <= 95; age++ ) {
    setIncome_action(age, false, incomeStreams.tfsa, "TFSA Income", "tfsa", 0) 
    setIncome_action(age, false, incomeStreams.nonRegistered, "Non reg Income", "nonRegistered", 0) 
}
}



const setReccomendedRetirementIncome = (financialValue, rangeBarValue) => {

    setRetirementIncome_action(financialValue, rangeBarValue)
    setMaxContributions(incomePerYear_reducer, rrifStartAge)
    addRetirementIncome()
} 


const stackedKeys = Object.keys(incomePerYear_reducer[18])                                                                                   //creates a an array of each of the income type names, which is used in the stacked Income chart
        return (
            <UserInterfaceWrapper>
                <Header
                     incomePerYear_reducer={incomePerYear_reducer}
                />
                <ChartPlaceHolder>
                <LifetimeIncomeBarChart
                    data={data}
                    stackedKeys={stackedKeys}
                />
                </ChartPlaceHolder>    
            <ControlPanel
                    handleChangeLabel = {handleChangeLabel}
                    handleRemoveItem={handleRemoveItem}
                    addItemToList={addItemToList}
                    setFromAge={setFromAge}
                    setToAge={setToAge}
                    fromAge={fromAge}
                    toAge={toAge}
                    savingsPerYear_reducer={savingsPerYear_reducer}
                    setIncome_action={setIncome_action}
                    incomeTypeArray={incomeTypeArray}
                    setIncome={setIncome}
                    setPensionIncome={setPensionIncome}
                    pensionStartAges_reducer={pensionStartAges_reducer}
                    incomePerYear_reducer={incomePerYear_reducer}
                    setRetirementIncome_action={setRetirementIncome_action}
                    keyVariables_reducer={keyVariables_reducer}
                    setMaxContribution_action={setMaxContribution_action}
                    data={data}
                    setKeyVariable_action={setKeyVariable_action}
                    setReccomendedRetirementIncome={setReccomendedRetirementIncome}
            />

            </UserInterfaceWrapper>
        )
}

const mapStateToProps = (state) => {
    return {
        incomePerYear_reducer: state.incomePerYear_reducer,
        keyVariables_reducer: state.keyVariables_reducer,
        pensionStartAges_reducer: state.pensionStartAges_reducer,
        savingsPerYear_reducer: state.savingsPerYear_reducer,
    }
}

export default connect(mapStateToProps, {setIncome_action,  setKeyVariable_action, setMaxContribution_action, calculateCpp_action, setPensionStartAge_action,  removeItem_action, setRetirementIncome_action})(LifetimeIncomeAppRefactor)


//-----------------------------------------------STYLES-----------------------------------------------//

const UserInterfaceWrapper = styled.div`
    grid-area: m;
    background: ${props => props.theme.color.ice};
    display: grid;
    height: 100%;
    width: 90%;
    grid-template-rows: minmax(8rem, 14rem) minmax(18rem, 22rem) minmax(22rem, 24rem);
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