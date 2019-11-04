import React, { Component } from 'react'
import styled from "styled-components"
import DualRangeBar from "../../../UI/DualRangeBar"
import EarningYearsSelector from "./EarningYearsSelector"
import IncomeInput from "./IncomeInput"
import RRSPDetails from "./RRSPDetails"
import PensionIncomeStartAges from "./PensionIncomeStartAges"

export default class ControlPanel extends Component {
    render() {
        return (
            <ControlPanelWrapper>
                <Left>
                    <EarningYearsSelector
                        lower={this.props.lower}
                        higher={this.props.higher}
                        setParentDualRangeValues={this.props.setParentDualRangeValues}
                    />
                    <IncomeInput
                        handleSetParentRangeBarAndFinancialValue = {this.props.handleSetParentRangeBarAndFinancialValue}
                        handleChangeLabel = {this.props.handleChangeLabel}
                        incomeTypeArray={this.props.incomeTypeArray}
                        handleRemoveItem={this.props.handleRemoveItem}
                        addItemToList={this.props.addItemToList}
                    />
                </Left>
                <Center>
                     <Title>Estimate Future RRSP Value</Title>
                     <RRSPDetails
                        handleSetRRSPDetails={this.props.handleSetRRSPDetails}
                        rrspDetailsRangeBarArray ={this.props.rrspDetailsRangeBarArray}
                        lifetimeIncomeVariableState={this.props.lifetimeIncomeVariableState}
                        setIncome={this.props.setIncome}
                        setFutureRRSPValue={this.props.setFutureRRSPValue}
                        toggleOpenAndClosed={this.toggleOpenAndClosed}
   
                     />
                </Center>
                <Right>
                     <Title>Select Retirement Age</Title>
                     <PensionIncomeStartAges
                        lifetimeIncomeVariableState={this.props.lifetimeIncomeVariableState}
                        setPensionStartAge={this.props.setPensionStartAge}
                        calculateCPP={this.props.calculateCPP}
                        clearCPPIncomeBeforeStartAge = {this.props.clearCPPIncomeBeforeStartAge}
                        calculateOAS={this.props.calculateOAS}
                        clearOASIncomeBeforeStartAge = {this.props.clearOASIncomeBeforeStartAge}
                        lifetimeIncomeYearListState={this.props.lifetimeIncomeYearListState}
                        rrspDetailsMiniRangeBarArray ={this.props.rrspDetailsMiniRangeBarArray}
                        handleSetRRSPDetails={this.props.handleSetRRSPDetails}
                        setFutureRRSPValue={this.props.setFutureRRSPValue}
                        setIncome={this.props.setIncome}
                     />
                </Right>
            </ControlPanelWrapper>
        )
    }
}

//-----------------------------------------------STYLES-----------------------------------------------//

const ControlPanelWrapper = styled.div`
    grid-area: d;
    display: flex;
    color: ${props => props.theme.color.contrastText1};
    border-top: ${props => props.theme.border.primary};
    padding-top: 2rem;
`

const Left = styled.div`
    flex: 1;
`
const Center = styled.div`
    flex: 1;
`
const Right = styled.div`
    flex: 1;
`
const Title = styled.div `
    font-size: ${props => props.theme.fontSize.medium};
    text-align: center;
    font-weight: 300;
   
` 