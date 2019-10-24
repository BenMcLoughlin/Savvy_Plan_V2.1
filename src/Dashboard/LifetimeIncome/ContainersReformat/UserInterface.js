import React, { Component } from 'react'
import ControlPanel from "./ControlPanel"
import HeaderValues from "./HeaderValues"
import styled from "styled-components"
import {connect} from "react-redux"
import StackedBarChart from "../Chart/StackedBarChart.js"
import {setIncome, changeLabel, removeItem, 
    addItem, setRRSPDetails, setAgeRange, 
    setFutureRRSPValue, setPensionStartAge, 
    setAverageLifetimeEarnings, calculateCPP, 
    clearCPPIncomeBeforeStartAge, calculateOAS, 
    clearOASIncomeBeforeStartAge, setLifetimeIncomeVariable} from "../actions"

 class UserInterface extends Component {
     
          //DUAL RANGEBAR FUNCTIONS
          setParentDualRangeValues = (lower, higher) => {
            if (lower >= 18) {
             this.props.setAgeRange(lower, higher)
            }
         }

         //CPP AND OAS FUNCTIONS
         renderCPPandOASIncome = () => {
            const cppStartAge = this.props.lifetimeIncomeVariableState.pensionAges.cppStartAge.rangeBarValue
       
    
            for (let age = cppStartAge; age <= 95; age++) {
                this.props.calculateCPP(cppStartAge, age)
            }
    
            const oasStartAge = this.props.lifetimeIncomeVariableState.pensionAges.oasStartAge.rangeBarValue
       
            for (let age = oasStartAge; age <= 95; age++) {
                this.props.calculateOAS(oasStartAge, age)
            }
        }

         //INCOME INPUT FUNCTIONS
         handleSetParentRangeBarAndFinancialValue = (name, financialValue, rangeBarValue, rangeBarProps) => {
        
            for (let age = this.props.lifetimeIncomeVariableState.fromAge; age < this.props.lifetimeIncomeVariableState.toAge; age++ ) {
              this.props.setIncome(age, name, financialValue, rangeBarValue, rangeBarProps.contributeToCPP)
            }
            this.renderCPPandOASIncome()
            
    
        }

        handleChangeLabel = (e, rangeBarProps) => {
     
            for (let age = this.props.lifetimeIncomeVariableState.fromAge; age < this.props.lifetimeIncomeVariableState.toAge; age++ ) {
                this.props.changeLabel(age, e.target.value, e.target.name)
              }
        }
    
        handleRemoveItem = (rangeBarProps) => {
    
              for (let age = this.props.lifetimeIncomeVariableState.fromAge; age < this.props.lifetimeIncomeVariableState.toAge; age++ ) {
                this.props.removeItem(age, rangeBarProps.name)
              }
              this.renderCPPandOASIncome()
        }
    
        addItemToList = (newItem, listNewItemWillBeAddedToo) => {
            for (let age = 18; age < 95; age++ ) {
            this.props.addItem(
                age,
                newItem.name,
                newItem.label,
                0,
                0,
                0)
            }
            for (let age = this.props.lifetimeIncomeVariableState.fromAge; age < this.props.lifetimeIncomeVariableState.toAge; age++ ) {
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
            this.props.setRRSPDetails(18, name, financialValue, rangeBarValue)
        }

    render() {
        const data = Object.values(this.props.lifetimeIncomeYearListState).map(d => {
            const incomeTypeArray = Object.keys(d.incomeType)
            const financialValueArray = Object.keys(d.incomeType).map(income => d.incomeType[income].financialValue)
            var result = {age: d.age};
            incomeTypeArray.forEach((key, i) => result[key] = financialValueArray[i]);          
          return result
        })
     
       const stackedKeys = Object.keys(this.props.lifetimeIncomeYearListState[18].incomeType)
       const incomeTypeArray = Object.values(this.props.lifetimeIncomeYearListState[this.props.lifetimeIncomeVariableState.fromAge]
        .incomeType).filter(d => d.name !== "oasIncome")
                    .filter(d => d.name !== "cppIncome")
                    .filter(d => d.name !== "rrifIncome") 


        const totalAnnualIncome = incomeTypeArray.length > 0 ? incomeTypeArray.map(d => Number(d.financialValue)).reduce((acc, num) => acc + num) : 0

        const rrspDetailsRangeBarArray = Object.values(this.props.lifetimeIncomeVariableState.rrspDetails).slice(0,2)
        const rrspDetailsMiniRangeBarArray = Object.values(this.props.lifetimeIncomeVariableState.rrspDetails).slice(2)


        return (
            <UserInterfaceWrapper>
                <HeaderValues
                lifetimeIncomeYearListState = {this.props.lifetimeIncomeYearListState}
                />
                <ChartPlaceHolder>
                <StackedBarChart 
                    data={data}
                    height={320}
                    width={400}
                    stackedKeys={stackedKeys}
                    showOASThreshold = {true}
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
                    totalAnnualIncome={totalAnnualIncome}
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
                                          clearOASIncomeBeforeStartAge, setLifetimeIncomeVariable})(UserInterface )



//-----------------------------------------------STYLES-----------------------------------------------//

const UserInterfaceWrapper = styled.div`
    background: ${props => props.theme.color.background2};
    display: grid;
    height: 100%;
    width: 100%;
    grid-template-rows: minmax(12rem, 20rem) minmax(22rem, 25rem);
    grid-template-areas:
    'a a a a a a a a a a a a'
    'c c c c c c c c c c c c'
    'd d d d d d d d d d d d'
`
const ChartPlaceHolder = styled.div`
    grid-area: c;
    width: 100%;
    height: 100%;
    margin-top: -5rem;
    

`

//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
// Shows the user the control panel, the tile pane and the chart of the LifeTime Income Calculator. 