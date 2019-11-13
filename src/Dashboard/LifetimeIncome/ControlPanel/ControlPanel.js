import React, { Component } from 'react'
import styled from "styled-components"
import DualRangeBar from "../../../UI/DualRangeBar"
import EarningYearsSelector from "./EarningYearsSelector"
import InputIncomePanel from "./InputIncomePanel"
import RRSPDetails from "./components/RRSPDetails"
import PensionIncomeStartAges from "./components/PensionIncomeStartAges"

export default class ControlPanel extends Component {
    render() {
        return (
            <ControlPanelWrapper>
                <Left>
                    <InputIncomePanel
                        lower={this.props.lower}
                        higher={this.props.higher}
                        setParentDualRangeValues={this.props.setParentDualRangeValues}
                        setValueInReducer = {this.props.setValueInReducer}
                        handleChangeLabel = {this.props.handleChangeLabel}
                        incomeTypeArray={this.props.incomeTypeArray}
                        handleRemoveItem={this.props.handleRemoveItem}
                        addItemToList={this.props.addItemToList}
                    />
                </Left>
                <Center>
                     <Title>Estimate Future RRSP Value</Title>
                     <RRSPDetails
                        rrspDetailsRangeBarArray ={this.props.rrspDetailsRangeBarArray}
                        lifetimeIncomeVariables={this.props.lifetimeIncomeVariables}
                        setIncome={this.props.setIncome}
                        setFutureRRSPValue={this.props.setFutureRRSPValue}
                        toggleOpenAndClosed={this.toggleOpenAndClosed}
                        clearIncomeBeforeStartAge = {this.props.clearIncomeBeforeStartAge}
                        setValue={this.props.setValue}
                     />
                </Center>
                <Right>
                     <Title>Select Retirement Age</Title>
                     <PensionIncomeStartAges
                        lifetimeIncomeVariables={this.props.lifetimeIncomeVariables}
                        calculateCPP={this.props.calculateCPP}
                        clearIncomeBeforeStartAge = {this.props.clearIncomeBeforeStartAge}
                        calculateOAS={this.props.calculateOAS}
                        setIncome={this.props.setIncome}
                        setValue={this.props.setValue}
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