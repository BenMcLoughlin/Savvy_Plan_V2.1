import React, { Component } from 'react'
import styled from "styled-components"
import IncomeInput from "./Components/IncomeInput"
import RRSPDetails from "./Components/RRSPDetails"
import PensionIncomeStartAges from "./Components/PensionIncomeStartAges"

export default class ControlPanel extends Component {
    render() {
        return (
            <ControlPanelWrapper>
                <Left>
                    <IncomeInput
                        lower={this.props.lower}
                        higher={this.props.higher}
                        setParentDualRangeValues={this.props.setParentDualRangeValues}
                        setValueInReducer = {this.props.setValueInReducer}
                        handleChangeLabel = {this.props.handleChangeLabel}
                        incomePerYear={this.props.incomePerYear}
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