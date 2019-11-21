import React, { Component } from 'react'
import styled from "styled-components"

import RegularIncome from "./RegularIncome"
import TaxAdvantagedIncome from "./TaxAdvantagedIncome"
import TaxCredits from "./TaxCredits"


export default class ControlPanel extends Component {
    render() {
        return (
            <ControlPanelWrapper>
                <Left>
                <Title>Regular Income</Title>
                    <RegularIncome
                        regularIncomeRangeBarValues={this.props.regularIncomeRangeBarValues}
                        setIncome={this.props.setIncome}
                    />
                </Left>
                <Center>
                     <Title>Tax Advantaged Income</Title>
                     <TaxAdvantagedIncome  
                       taxAdvantagedIncomeRangeBarValues={this.props.taxAdvantagedIncomeRangeBarValues}
                       setIncome={this.props.setIncome}
                     />
                </Center>
                <Right>
                     <Title>Tax Credits & Deductions</Title>
                     <TaxCredits
                         creditsRangeBarValues={this.props.creditsRangeBarValues}
                         setIncome={this.props.setIncome}
                     />
                </Right>
            </ControlPanelWrapper>
        )
    }
}

//-----------------------------------------------STYLES-----------------------------------------------//

const ControlPanelWrapper = styled.div`
    margin-top: 4rem;
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