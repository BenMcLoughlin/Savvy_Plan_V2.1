import React, { Component } from 'react'
import styled from "styled-components"

export default class HeaderValues extends Component {
    
    render() {

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
    color: ${props => props.theme.color.slate};
`

const Left = styled.div`
    display: flex;
    flex-direction: row;
    flex: 1;
    justify-content: left;
`
const LargeTotal = styled.div`
    font-size: ${props => props.theme.fontSize.large};
    font-weight: 300;
    text-align: center;
    padding: 3rem;
    color: ${props => props.color === "red" ? props.theme.color.salmon : props.theme.color.slate}};
   
`
const Title = styled.div `
    font-size: ${props => props.theme.fontSize.small};
    font-style: italic;
    text-align: center;
    font-weight: 300;
   
` 
