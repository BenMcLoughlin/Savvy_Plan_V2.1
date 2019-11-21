import React, { Component } from 'react'
import styled from "styled-components"
import calculateMarginalTaxRate from "../../../services/taxCalculationServices/taxCalculator"

export default class HeaderValues extends Component {
    
    render() {
        // beforeTaxIncome={beforeTaxIncome.toLocaleString()}
        // federalTaxPayable={Number(federalTaxPayableWithRRSP).toLocaleString()}
        // afterTaxIncome={afterTaxIncomeWithRRSP.toLocaleString()}
        // provincialTaxPayable={Number(provincialTaxPayableWithRRSP).toLocaleString()}
        // CPPandEI={CPPandEI.toLocaleString()}
        // totalTaxLiability={TotalTaxLiability.toLocaleString()}
        // marginalRate={(TotalMarginalTaxBracket * 100).toFixed(2)}
        // averageRate={(AverageTaxRate * 100).toFixed(2)}
        // contributeToCpp={this.contributeToCPPHandler}
        // RRSPSavings = {Number(RRSPSavings).toLocaleString()}

        return (
            <HeaderValuesWrapper>
            <Left>
                <LargeTotal>
                {Math.round(this.props.beforeTaxIncome/1000)}k
                    <Title>
                    Before Tax Income
                    </Title>
                </LargeTotal>
                <LargeTotal style={{color: "#F29278"}}>
                {Math.round(this.props.totalTaxLiability/1000)}k
                    <Title>
                    Total Taxes
                    </Title>
                </LargeTotal>
                <LargeTotal>
                {Math.round(this.props.afterTaxIncome/1000)}k
                    <Title>
                    After Tax Income
                    </Title>
                </LargeTotal>
        </Left>

            </HeaderValuesWrapper>
        )
    }
}

//-----------------------------------------------STYLES-----------------------------------------------//

const HeaderValuesWrapper = styled.div`
    grid-area: b;
    height: 100%;
    width: 100%;
    display: flex;
    color: ${props => props.theme.color.contrastText1};
`

const Left = styled.div`
    display: flex;
    flex-direction: row;
    flex: 1;
    justify-content: left;
`


const Summary = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    padding: 1rem;
    margin-top: 1rem;
    font-size: ${props => props.theme.fontSize.medium};
    span {
        font-size: ${props => props.theme.fontSize.small};
        font-style: italic;
    }
    
`
const Hr = styled.hr`
    border-top: ${props => props.theme.border.primary};
    width: 80%;
    margin: 0 auto;
    fill: red;
`


const LeftBottom = styled.div`
    flex: 1;
    display: flex;
    flex-direction: row;
    color: ${props => props.theme.color.salmon};
    margin-top: -1.5rem;
`
const Vr = styled.div`
    height: 80%;
    width: 1%;
    margin-top: 2rem;
    flex-basis: 0.1;
    flex: 1 0.1 1;
    border-left: ${props => props.theme.border.primary};
`

const Right = styled.div`
    width: 45%;
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
`
const LargeTotal = styled.div`
    font-size: ${props => props.theme.fontSize.large};
    font-weight: 300;
    text-align: center;
    padding: 3rem;
    color: ${props => props.color === "red" ? props.theme.color.salmon : props.theme.color.contrastText1}};
   
`
const Title = styled.div `
    font-size: ${props => props.theme.fontSize.small};
    font-style: italic;
    text-align: center;
    font-weight: 300;
   
` 

const PensionIncomeWrapper = styled.div`
    display: flex;
    width: 70%;
    border-bottom: ${props => props.theme.border.primary};
`
