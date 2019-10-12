import React, { Component } from 'react'
import EarningYearsSelector from "./EarningYearsSelector"
import IncomeInput from "./IncomeInput"
import RRSPDetails from "./RRSPDetails"
import PensionIncomeStartAges from "./PensionIncomeStartAges"
import styled from "styled-components"
import {connect} from "react-redux"
import {setIncome, changeLabel, removeItem, addItem} from "../../actions"


class ControlPanel extends Component {

    state = {
        birthYear: 1988, 
        data: null,
        lifeSpan: 95,
        retirementAge: 65,
        employmentIncome: 0,
        selfEmploymentIncome: 0,
        businessIncome: 0,
        cppIncome: 0, 
        oasIncome: 0,
        fromAge: 18, 
        toAge: 65,
        cppStartAge: 65,
        oasStartAge: 65,
        label: "Employment Income",
    }

    
                                //This grabs the types of income and creates an array that will be used to render the rangebars
                                //The filtering removes both oas and cpp Income from the array as they don't need rangeBars


    handleSetParentRangeBarAndFinancialValue = (name, financialValue, rangeBarValue, rangeBarProps) => {
        for (let age = this.state.fromAge; age < this.state.toAge; age++ ) {
          this.props.setIncome(age, name, financialValue, rangeBarValue, rangeBarProps.contributeToCPP)
        }
    }



    handleChangeLabel = (e, rangeBarProps) => {
     
        for (let age = this.state.fromAge; age < this.state.toAge; age++ ) {
            this.props.changeLabel(age, e.target.value, e.target.name)
          }
    }

    handleRemoveItem = (rangeBarProps) => {

          for (let age = this.state.fromAge; age < this.state.toAge; age++ ) {
            this.props.removeItem(age, rangeBarProps.name)
          }
    }

    addItemToList = (newItem, listNewItemWillBeAddedToo) => {
        for (let age = this.state.fromAge; age < this.state.toAge; age++ ) {
        this.props.addItem(
            age,
            newItem.name,
            newItem.label,
            newItem.financialValue,
            newItem.rangeBarValue,
            newItem.contributeToCpp)
        }
    }

   

    render()
    {
        const incomeTypeArray = Object.values(this.props.lifetimeIncomeYearListState[this.state.fromAge].incomeType).filter(d => d.name !== "oasIncome").filter(d => d.name !== "cppIncome")
                                //This grabs the types of income and creates an array that will be used to render the rangebars
                                //The filtering removes both oas and cpp Income from the array as they don't need rangeBars

       
       
        return (
            <ControlPanelWrapper>
            <Header>Income Streams</Header>
                <EarningYearsSelector />
                <IncomeInput
                    handleSetParentRangeBarAndFinancialValue = {this.handleSetParentRangeBarAndFinancialValue}
                    handleChangeValueFromTextInput={this.handleChangeValueFromTextInput}
                    handleChangeLabel = {this.handleChangeLabel}
                    handleChangeValueFromTextInput = {this.handleChangeValueFromTextInput}
                    incomeTypeArray={incomeTypeArray}
                    handleRemoveItem={this.handleRemoveItem}
                    addItemToList={this.addItemToList}
                    fromAge={this.state.fromAge}
                    toAge={this.state.toAge}
                />
                <RRSPDetails/>
                <PensionIncomeStartAges/>
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

export default connect(mapStateToProps, {setIncome, changeLabel, removeItem, addItem})(ControlPanel )



//-----------------------------------------------STYLES-----------------------------------------------//

const ControlPanelWrapper = styled.div`
    grid-area: p;
    border: 1px solid ${props => props.theme.color.contrastBackground1};
    border-radius: 5px;
    overflow: scroll;
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