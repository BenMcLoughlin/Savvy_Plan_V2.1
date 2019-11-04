import React, { Component } from 'react'
import ControlPanel from "./Containers/ControlPanel"
import HeaderValues from "./Containers/HeaderValues"
import styled from "styled-components"
import {connect} from "react-redux"
import StackedBarChart from "./Chart/StackedBarChart.js"
import {setIncome, changeLabel, removeItem, 
    addItem, setRRSPDetails, setAgeRange, 
    setFutureRRSPValue, setPensionStartAge, 
    setAverageLifetimeEarnings, calculateCPP, 
    clearCPPIncomeBeforeStartAge, calculateOAS, 
    clearOASIncomeBeforeStartAge, setLifetimeIncomeVariable} from "./actions"

 class LifetimeIncomeApp extends Component {
     
          //DUAL RANGEBAR FUNCTIONS
          setParentDualRangeValues = (lower, higher) => {
              //passed to dual range bar to set fromAge and toAge
            if (lower >= 18) {
              //minimum age is 18 so if it is less it throws and error
             this.props.setAgeRange(lower, higher)
                //fires action setting ages in the rducer
            }
         }

         //CPP AND OAS FUNCTIONS
         renderCPPandOASIncome = () => {
            const cppStartAge = this.props.lifetimeIncomeVariableState.pensionAges.cppStartAge.rangeBarValue
                    //age is selected by user in PensionIncomeStartAges
    
            for (let age = cppStartAge; age <= 95; age++) {
                this.props.calculateCPP(cppStartAge, age)
                //loops through and calculates CPP payment and inserts it into reducer
            }
    
            const oasStartAge = this.props.lifetimeIncomeVariableState.pensionAges.oasStartAge.rangeBarValue
                    //age is selected by user in PensionIncomeStartAges
            for (let age = oasStartAge; age <= 95; age++) {
                this.props.calculateOAS(oasStartAge, age)
            }
        }

         //INCOME INPUT FUNCTIONS
         handleSetParentRangeBarAndFinancialValue = (name, financialValue, rangeBarValue, rangeBarProps) => {
                   //used by rangebars to set values. Rangebars recieve this function and pass back the above props. 
                   //it is here that the function decides what to do with them. In this case it will set income. 
            for (let age = this.props.lifetimeIncomeVariableState.fromAge; age < this.props.lifetimeIncomeVariableState.toAge; age++ ) {
              this.props.setIncome(age, name, financialValue, rangeBarValue, rangeBarProps.contributeToCPP)
            }      //sets the income
            this.renderCPPandOASIncome()
                    //fires this calculation so it is always up to date.
        }

        handleChangeLabel = (e, rangeBarProps) => {
     
            for (let age = this.props.lifetimeIncomeVariableState.fromAge; age < this.props.lifetimeIncomeVariableState.toAge; age++ ) {
                this.props.changeLabel(age, e.target.value, e.target.name)
              }
        }
    
        handleRemoveItem = (rangeBarProps) => {
                    //used to remove income types from reducer
              for (let age = this.props.lifetimeIncomeVariableState.fromAge; age < this.props.lifetimeIncomeVariableState.toAge; age++ ) {
                this.props.removeItem(age, rangeBarProps.name)
              }
              this.renderCPPandOASIncome()
        }
    
        addItemToList = (newItem, listNewItemWillBeAddedToo) => {
                   //used to add new income type to list
            for (let age = 18; age < 95; age++ ) {
                    // first adds empty value with correct name and label to entire reducer 18 - 95
            this.props.addItem(
                age,
                newItem.name,
                newItem.label,
                0,
                0,
                0)
            }
            for (let age = this.props.lifetimeIncomeVariableState.fromAge; age < this.props.lifetimeIncomeVariableState.toAge; age++ ) {
                    //then adds the income for the desired years
                this.props.addItem(
                age,
                newItem.name,
                newItem.label,
                newItem.financialValue,
                newItem.rangeBarValue,
                newItem.isChecked)
            }
            this.renderCPPandOASIncome()
        }

        //RRSP CALCULATIONS

        handleSetRRSPDetails = (name, financialValue, rangeBarValue) => {
                //used to set the rrsp details that will be used to determine rrsp income
            this.props.setRRSPDetails(18, name, financialValue, rangeBarValue)
        }

    render() {
        //DATA CONVERSTION FOR CHART
        const data = Object.values(this.props.lifetimeIncomeYearListState).map(d => {
            const incomeTypeArray = Object.keys(d.incomeType)
            const financialValueArray = Object.keys(d.incomeType).map(income => d.incomeType[income].financialValue)
            var result = {age: d.age};
            incomeTypeArray.forEach((key, i) => result[key] = financialValueArray[i]);          
          return result
        })
     
       const stackedKeys = Object.keys(this.props.lifetimeIncomeYearListState[18].incomeType)
       
       //Data for Income Range Bars
       const incomeTypeArray = Object.values(this.props.lifetimeIncomeYearListState[this.props.lifetimeIncomeVariableState.fromAge]
        .incomeType).filter(d => d.name !== "oasIncome")
                    .filter(d => d.name !== "cppIncome")
                    .filter(d => d.name !== "rrifIncome") 

        //Data for RRSP Range Bars
        const rrspDetailsRangeBarArray = Object.values(this.props.lifetimeIncomeVariableState.rrspDetails).slice(0,2)
        //Data for Mini Range Bars
        const rrspDetailsMiniRangeBarArray = Object.values(this.props.lifetimeIncomeVariableState.rrspDetails).slice(2)

        return (
            <UserInterfaceWrapper>
                <HeaderValues
                lifetimeIncomeYearListState = {this.props.lifetimeIncomeYearListState}
                />
                <ChartPlaceHolder>
                <StackedBarChart 
                    data={data}
                    stackedKeys={stackedKeys}
                />
                </ChartPlaceHolder>
                <ControlPanel
                    lower ={this.props.lifetimeIncomeVariableState.fromAge}
                    higher={this.props.lifetimeIncomeVariableState.toAge}
                    setParentDualRangeValues={this.setParentDualRangeValues } 
                    handleSetParentRangeBarAndFinancialValue = {this.handleSetParentRangeBarAndFinancialValue}
                    handleChangeLabel = {this.handleChangeLabel}
                    incomeTypeArray={incomeTypeArray}
                    handleRemoveItem={this.handleRemoveItem}
                    addItemToList={this.addItemToList}
                    handleSetRRSPDetails={this.handleSetRRSPDetails}
                    lifetimeIncomeVariableState={this.props.lifetimeIncomeVariableState}
                    rrspDetailsRangeBarArray ={rrspDetailsRangeBarArray}
                    rrspDetailsMiniRangeBarArray ={rrspDetailsMiniRangeBarArray}
                    setIncome={this.props.setIncome}
                    setFutureRRSPValue={this.props.setFutureRRSPValue}
                    setPensionStartAge={this.props.setPensionStartAge}
                    calculateCPP={this.props.calculateCPP}
                    clearCPPIncomeBeforeStartAge = {this.props.clearCPPIncomeBeforeStartAge}
                    calculateOAS={this.props.calculateOAS}
                    clearOASIncomeBeforeStartAge = {this.props.clearOASIncomeBeforeStartAge}
                    lifetimeIncomeYearListState={this.props.lifetimeIncomeYearListState}
                />

               
            </UserInterfaceWrapper>
        )
    }
}

const mapStateToProps = (state) => {

    return {
        lifetimeIncomeVariableState: state.lifetimeIncomeVariableState,
        lifetimeIncomeYearListState: state.lifetimeIncomeYearListState
    }
}

export default connect(mapStateToProps, {setIncome, changeLabel, removeItem, 
                                        addItem, setRRSPDetails, setAgeRange,
                                         setFutureRRSPValue, setPensionStartAge,
                                          setAverageLifetimeEarnings, calculateCPP, 
                                          clearCPPIncomeBeforeStartAge, calculateOAS, 
                                          clearOASIncomeBeforeStartAge, setLifetimeIncomeVariable})(LifetimeIncomeApp)



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



//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
//blank slate