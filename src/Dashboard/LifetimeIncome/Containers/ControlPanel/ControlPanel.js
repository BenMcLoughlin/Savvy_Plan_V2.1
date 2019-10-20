import React, { Component } from 'react'
import EarningYearsSelector from "./EarningYearsSelector"
import IncomeInput from "./IncomeInput"
import RRSPDetails from "./RRSPDetails"
import PensionIncomeStartAges from "./PensionIncomeStartAges"
import styled from "styled-components"
import {connect} from "react-redux"
import {setIncome, changeLabel, removeItem, addItem, setRRSPDetails, setAgeRange, setFutureRRSPValue, setPensionStartAge, setAverageLifetimeEarnings} from "../../actions"
import {adjustCPP, adjustOAS} from "../../../../services/financialFunctions"

class ControlPanel extends Component {

    state = {
        rrspSectionOpen: false,
        incomeSectionOpen: true,
    }

    toggleOpenAndClosed = ()=> {
        const showRRSP = this.state.rrspSectionOpen
        const showIncome = this.state.incomeSectionOpen
        this.setState({
            rrspSectionOpen: !showRRSP,
            incomeSectionOpen: !showIncome
        })
    
    }

    fromAge = this.props.lifetimeIncomeVariableState.fromAge
    toAge = this.props.lifetimeIncomeVariableState.toAge

 
    handleSetRRSPDetails = (name, financialValue, rangeBarValue) => {
        this.props.setRRSPDetails(18, name, financialValue, rangeBarValue)
    }

     handleSetParentRangeBarAndFinancialValue = (name, financialValue, rangeBarValue, rangeBarProps) => {
        
        for (let age = this.props.lifetimeIncomeVariableState.fromAge; age < this.props.lifetimeIncomeVariableState.toAge; age++ ) {
          this.props.setIncome(age, name, financialValue, rangeBarValue, rangeBarProps.contributeToCPP)
        }
        const cppStartAge = this.props.lifetimeIncomeVariableState.pensionAges.cppStartAge.rangeBarValue
        const oasStartAge = this.props.lifetimeIncomeVariableState.pensionAges.oasStartAge.rangeBarValue
         this.calculateCPP(cppStartAge, oasStartAge)
         console.log(this.props.lifetimeIncomeYearListState);
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
            newItem.contributeToCpp)
        }
    }

    setParentDualRangeValues = (lower, higher) => {
       if (lower >= 18) {
        this.props.setAgeRange(lower, higher)
       }
       
    }

    calculateCPP = (cppStartAge, oasStartAge) => {

        const pensionableEarningsArray = Object.values(this.props.lifetimeIncomeYearListState).map(d => d.adjustedPensionableEarningsMethod())
        const pensionableEarningsArrayAfterDropout = pensionableEarningsArray.sort().slice(8,47)
        const totalAdustedPensionableEarnings = pensionableEarningsArrayAfterDropout.reduce((acc, num) => acc + num)
        const averagePensionableEarnings = totalAdustedPensionableEarnings / 39
        const annualCPPPayment = averagePensionableEarnings * .25
        const adjustedCPPPayment = Math.round(adjustCPP(annualCPPPayment, this.props.lifetimeIncomeVariableState.pensionAges.cppStartAge.rangeBarValue)/100)*100
        const adjustedOASPayment = Math.round(adjustOAS(7000, this.props.lifetimeIncomeVariableState.pensionAges.oasStartAge.rangeBarValue)/100)*100

        this.props.setAverageLifetimeEarnings(averagePensionableEarnings)

         for (let age = this.props.lifetimeIncomeVariableState.pensionAges.cppStartAge.rangeBarValue; age <= 95; age++ ) {
            this.props.setIncome(age, "cppIncome", adjustedCPPPayment)
          }
         for (let age = 60; age < this.props.lifetimeIncomeVariableState.pensionAges.cppStartAge.rangeBarValue; age++ ) {
            this.props.setIncome(age, "cppIncome", 0)
          }
         for (let age = this.props.lifetimeIncomeVariableState.pensionAges.oasStartAge.rangeBarValue; age <= 95; age++ ) {
            this.props.setIncome(age, "oasIncome", adjustedOASPayment)
          }
         for (let age = 60; age < this.props.lifetimeIncomeVariableState.pensionAges.oasStartAge.rangeBarValue; age++ ) {
            this.props.setIncome(age, "oasIncome", 0)
          }
    }
    render()
    {
        
        const incomeTypeArray = Object.values(this.props.lifetimeIncomeYearListState[this.props.lifetimeIncomeVariableState.fromAge]
                    .incomeType).filter(d => d.name !== "oasIncome")
                                .filter(d => d.name !== "cppIncome")
                                .filter(d => d.name !== "rrifIncome") 

        
        const totalAnnualIncome = incomeTypeArray.length > 0 ? incomeTypeArray.map(d => Number(d.financialValue)).reduce((acc, num) => acc + num) : 0

        const rrspDetailsRangeBarArray = Object.values(this.props.lifetimeIncomeVariableState.rrspDetails).slice(0,2)
        const rrspDetailsMiniRangeBarArray = Object.values(this.props.lifetimeIncomeVariableState.rrspDetails).slice(2)
        

        return (
           
            
            <ControlPanelWrapper>
            <Header>Income Streams</Header>
                <EarningYearsSelector 
                    lower={this.props.lifetimeIncomeVariableState.fromAge}
                    higher={this.props.lifetimeIncomeVariableState.toAge}
                    setParentDualRangeValues={this.setParentDualRangeValues}
                />
               
                <IncomeInput
                    handleSetParentRangeBarAndFinancialValue = {this.handleSetParentRangeBarAndFinancialValue}
                    handleChangeLabel = {this.handleChangeLabel}
                    incomeTypeArray={incomeTypeArray}
                    handleRemoveItem={this.handleRemoveItem}
                    addItemToList={this.addItemToList}
                    fromAge={this.props.lifetimeIncomeVariableState.fromAge}
                    toAge={this.props.lifetimeIncomeVariableState.toAge}
                    totalAnnualIncome={totalAnnualIncome}
                    sectionOpen={this.state.incomeSectionOpen}
                    toggleOpenAndClosed={this.toggleOpenAndClosed}
                    
                />
              
                <PensionIncomeStartAges
                    lifetimeIncomeVariableState={this.props.lifetimeIncomeVariableState}
                    setPensionStartAge={this.props.setPensionStartAge}
                    calculateCPP={this.calculateCPP}
                    
                />
                <RRSPDetails
    
                    handleSetRRSPDetails={this.handleSetRRSPDetails}
                    rrspDetailsRangeBarArray ={rrspDetailsRangeBarArray}
                    rrspDetailsMiniRangeBarArray ={rrspDetailsMiniRangeBarArray}
                    lifetimeIncomeVariableState={this.props.lifetimeIncomeVariableState}
                    setIncome={this.props.setIncome}
                    setFutureRRSPValue={this.props.setFutureRRSPValue}
                    sectionOpen={this.state.rrspSectionOpen}
                    toggleOpenAndClosed={this.toggleOpenAndClosed}

            />
            </ControlPanelWrapper>
        )
    }
}

const mapStateToProps = (state) => {

    return {
        lifetimeIncomeVariableState: state.lifetimeIncomeVariableState,
        lifetimeIncomeYearListState: state.lifetimeIncomeYearListState
    }
}

export default connect(mapStateToProps, {setIncome, changeLabel, removeItem, addItem, setRRSPDetails, setAgeRange, setFutureRRSPValue, setPensionStartAge, setAverageLifetimeEarnings})(ControlPanel )



//-----------------------------------------------STYLES-----------------------------------------------//

const ControlPanelWrapper = styled.div`
    grid-area: p;
    border: 1px solid ${props => props.theme.color.contrastBackground1};
    border-radius: 5px;
    overflow: scroll;
    height: 80rem;
`

const Header = styled.div`
    width: 100%;
    text-align: center;
    width: 100%;
    background-color: ${props => props.theme.color.contrastBackground1};
    border-bottom: 1px solid white;
    padding: 1rem;
    font-size: ${props => props.theme.fontSize.medium};
    color: ${props => props.theme.color.text1};
    cursor: pointer;
    transition: all .2s ease-in-out;
    &:hover {
        background-color: ${props => props.theme.color.contrastBackground1};
    }
`

//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
// 