import React, { Component } from 'react'
import styled from "styled-components"
import calculateMarginalTaxRate from "../../../services/taxCalculationServices/taxCalculator"

export default class HeaderValues extends Component {
    state = { 
              x: 0, 
              y: 0 
            }

            handleMouseMove(e) {
                this.setState({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
              }
    
    render() {

        const cppIncome = this.props.lifetimeIncomeYearListState[75].incomeType.cppIncome.financialValue
        const oasIncome = this.props.lifetimeIncomeYearListState[75].incomeType.oasIncome.financialValue
        const rrifIncome = this.props.lifetimeIncomeYearListState[75].incomeType.rrifIncome.financialValue
        const totalRetirementIncome = Object.values(this.props.lifetimeIncomeYearListState[75].incomeType).map(d => d.financialValue).reduce((acc, num) => acc + num)
        const retirementTaxRate = totalRetirementIncome > 72000 && totalRetirementIncome < 122000 ? calculateMarginalTaxRate(totalRetirementIncome) + 15 : calculateMarginalTaxRate(totalRetirementIncome) || 0

        //Calculate AVERAGE Earnings
        const lifetimeEarningsArray = Object.values(this.props.lifetimeIncomeYearListState) // turn object into array
                                                .map(d => Object.values(d.incomeType) // create array of income types for each year
                                                .map(d => d.financialValue) // turn the sub arrays into just showing financial value
                                                .reduce((acc, num) => acc + num)) // sum the earned value for each year. 

        const lifetimeEarnings = lifetimeEarningsArray.reduce((acc, num) => acc + num)
        const workingLifeEarningsArray = lifetimeEarningsArray.slice(0,47)
        const workingLifetimeEarnings = workingLifeEarningsArray.reduce((acc, num) => acc + num)
     
        const averageWorkingEarnings = Math.round((workingLifetimeEarnings/47)/1000)*1000

        const shortFall =  totalRetirementIncome - averageWorkingEarnings
       

        return (
            <HeaderValuesWrapper>
            <Left>
            
            {
                shortFall <= 0 ?
                <LargeTotal color={"red"} onMouseMove={(e) => this.handleMouseMove(e) }>
                    <Title>
                    Average Income vs Pension Income
                    </Title>
                {`${shortFall/1000}k`}
                    <ShortfallToolTip style={{top: this.state.y + 5, left: this.state.x + 15}}>
                        <ToolTipHeader>Shortfall</ToolTipHeader>
                        <ToolTipText>
                        Your average annual income is
                        ${averageWorkingEarnings/1000}k before retirement. Your esitmated
                         pension income is ${totalRetirementIncome/1000}k.  The difference is the
                         amount that you  need to fund yourself with investment savings.
                        </ToolTipText>
                    </ShortfallToolTip>
                </LargeTotal>
             
                :
                <LargeTotal>
                <Title>
                     Retirement Income Surplus
                    </Title>
                {`${shortFall/1000}k`}
              

                </LargeTotal>
            }
            
        </Left>
        <Right>
            <Title>Estimated Pension Income</Title>
                <PensionIncomeWrapper>
                        <CPPSummary  onMouseMove={(e) => this.handleMouseMove(e) }>
                        {`${(cppIncome)/1000}k`}
                            <span>CPP</span>
                            <CPPToolTip>
                                <ToolTipHeader>Shortfall</ToolTipHeader>
                                <ToolTipText>
                                Your average annual income is
                                ${averageWorkingEarnings/1000}k before retirement. Your esitmated
                                pension income is ${totalRetirementIncome/1000}k.  The difference is the
                                amount that you  need to fund yourself with investment savings.
                                </ToolTipText>
                             </CPPToolTip>
                        </CPPSummary>
                        <OASSummary >
                        {`${(oasIncome)/1000}k`}
                            <span >OAS</span>
                            <OASToolTip style={{top: this.state.y + 5, left: this.state.x + 15}}>
                                <ToolTipHeader>Shortfall</ToolTipHeader>
                                <ToolTipText>
                           
                                </ToolTipText>
                         </OASToolTip>
                        </OASSummary>
                        <RRIFSummary>
                        {`${(rrifIncome)/1000}k`}
                        <span >RRIF</span>
                        <RRIFToolTip >
                                <ToolTipHeader>Shortfall</ToolTipHeader>
                                <ToolTipText>
                               
                                </ToolTipText>
                            </RRIFToolTip>
                        </RRIFSummary>
                        <TaxSummary 
                       
                        style={{borderLeft: ".2px solid #DCDCDC"}}>
                        {`${retirementTaxRate}%`}
                        <span>Tax Rate</span>
                                <TaxToolTip>
                                <ToolTipHeader>Shortfall</ToolTipHeader>
                                <ToolTipText>
                               
                                </ToolTipText>
                            </TaxToolTip>
                        </TaxSummary>
                </PensionIncomeWrapper>
                <Summary>
                 {`${(cppIncome + oasIncome + rrifIncome)/1000}k`}
                <span>Total</span>
              </Summary>
        </Right>
            </HeaderValuesWrapper>
        )
    }
}

//-----------------------------------------------STYLES-----------------------------------------------//

//ToolTips
const ToolTip = styled.div`
    background: #F7F7F5;
    position: absolute;
    height: 18rem;
    width: 24rem;
    border-radius: 5px;
    color:#556976;
    z-index: 20;
    border: 1px solid #556976;
    text-align: left;
    opacity: 0;
    font-size: ${props => props.theme.fontSize.small};
    top: 10rem;
    left: 5rem;

`
const ToolTipHeader = styled.div`
    width: 100%;
    height: 18%;
    background: #556976;
    display: flex;
    justify-content: space-between;
    color: #F7F7F5;
    font-size: 1.2rem;
    padding: .6rem;
    font-weight: bold;
`
const ToolTipText = styled.div`
    padding: 1rem;
`


const ShortfallToolTip = styled(ToolTip)`

`
const CPPToolTip = styled(ToolTip)`

`
const OASToolTip = styled(ToolTip)`

`
const RRIFToolTip = styled(ToolTip)`

`
const TaxToolTip = styled(ToolTip)`

`



const HeaderValuesWrapper = styled.div`
    grid-area: a;
    height: 100%;
    width: 100%;
    display: flex;
    margin-top: 4rem;
    color: ${props => props.theme.color.contrastText1};
`

const Left = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`

const Total = styled.div`
    flex: .6;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: -.5rem;
    font-size: ${props => props.theme.fontSize.medium};
    
    font-weight: 300;
`
const Summary = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    padding: 1rem;
    margin-top: 1rem;
    cursor: pointer;
    position: relative;
    font-size: ${props => props.theme.fontSize.medium};
    span {
        font-size: ${props => props.theme.fontSize.small};
        font-style: italic;
    }
  
    
`
const CPPSummary = styled(Summary)`
        &:hover ${CPPToolTip} {
                opacity: 1;
            }
`
const OASSummary = styled(Summary)`
        &:hover ${OASToolTip} {
                opacity: 1;
            }
`
const RRIFSummary = styled(Summary)`
        &:hover ${RRIFToolTip} {
                opacity: 1;
            }
`
const TaxSummary = styled(Summary)`
        &:hover ${TaxToolTip} {
                opacity: 1;
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
    font-size: ${props => props.theme.fontSize.large2};
    position: relative;
    font-weight: 300;
    cursor: pointer;
    text-align: center;
    color: ${props => props.color === "red" ? props.theme.color.salmon : props.theme.color.contrastText1}};
    &:hover ${ShortfallToolTip} {
        opacity: 1;
    }
`
const Title = styled.div `
    font-size: ${props => props.theme.fontSize.medium};
    text-align: center;
    font-weight: 300;
   
` 

const PensionIncomeWrapper = styled.div`
    display: flex;
    width: 60%;
    border-bottom: ${props => props.theme.border.primary};
`

