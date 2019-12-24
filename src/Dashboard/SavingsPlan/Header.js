import React, { Component } from 'react'
import styled from "styled-components"
//import calculateMarginalTaxRate from "../../services/taxCalculationServices/taxCalculator"
import Tooltip from "../../UI/Tooltip/Tooltip"
import {connect} from "react-redux"
import {createStructuredSelector} from "reselect"
import {rrspDisplayValue, tfsaDisplayValue, nonRegisteredDisplayValue, totalNestEgg} from "./reducers/savingsPlan_selectors"

class Header extends Component {

    
//GRAB MOUSE COORDINATES FOR TOOLTIP
    state = { 
              x: 0,                                                                                                              //These coordinates are set onMouseMove placing the tootip beside the mouse
              y: 0,                                                                                                              //They are passed as props to the Tooltip componnent 
            }
   handleMouseMove(e) {
                this.setState({ x: e.clientX -120, y: e.clientY -140 })                                                          //Sets the state according to mouse position
              }                                                                                                                  //They are passed as props to the Tooltip componnent                                                                                             //They are passed as props to the Tooltip componnent 

    render() {
const {rrspDisplayValue, tfsaDisplayValue, nonRegisteredDisplayValue, totalNestEgg} = this.props


        // //const rrspDisplayValue = rrspValue > 1000000 ?  `${Math.round(rrspValue/1000000)*1000000/1000000} M` : `${Math.round(rrspValue/1000)*1000/1000} k` 
        // const tfsaDisplayValue = tfsaValue > 1000000 ?  `${Math.round(tfsaValue/1000000)*1000000/1000000} M` : `${Math.round(tfsaValue/1000)*1000/1000} k` 
        // const nonRegisteredDisplayValue = nonRegisteredValue > 1000000 ?  `${Math.round(nonRegisteredValue/1000000)*1000000/1000000} M` : `${Math.round(nonRegisteredValue/1000)*1000/1000} k` 
        // const total = tfsaValue + nonRegisteredValue
        const totalDisplayValue = totalNestEgg


return (
            <HeaderValuesWrapper onMouseMove={(e) => this.handleMouseMove(e)}>
            <Left >
                                                                                                                 {/* Displays the total shortfall, the value determines the color of the number negative for red or  positive for grey */}
                <h1>
                   Savings and Withdrawal Plan
                </h1>
            </Left>
            <Right>
            <h2>Account Values at Retirement</h2>
            <PensionIncomeWrapper onMouseMove={(e) => this.handleMouseMove(e) }>
                    <RRSPSummary>
                    {rrspDisplayValue}  
                        <h4>RRSP</h4>
                        <Tooltip 
                            x={this.state.x} 
                            y={this.state.y} 
                            text="Earnings in a Registered Retirement Savings Plan are tax-free and amounts paid out to you are taxable.
                                  Since there is a minimum that you must take out in retirement, our planning goal is to ensure that you aren't forced to withdraw
                                  so much that you are heavily taxed.
                            
                            "
                            header= "Canada Pension Plan"
                            className="cppTooltip"
                        />
                    </RRSPSummary>
                    <TFSASummary >
                    {tfsaDisplayValue}
                        <h4 >TFSA</h4>
                        <Tooltip 
                        x={this.state.x} 
                        y={this.state.y} 
                        text=   " Contributions to a Tax Free Savings Account are not deductible for income tax purposes. 
                        Any amount contributed as well as any income earned in the account (for example, investment income and capital gains) is generally tax-free, even when it is withdrawn. "
                        header= "Old Age Security"
                        className="oasTooltip"
                         />
                    </TFSASummary>
                    {nonRegisteredDisplayValue > 0 ?
                   <NRegSummary>
                   {nonRegisteredDisplayValue}
                   <h4 >N-Reg</h4>
                       <Tooltip 
                       x={this.state.x} 
                       y={this.state.y} 
                       text=   "A Registered Retirement Income Fund (nonRegisteredValue) is an account registered with the government that 
                                pays you income in retirement. Before, you were putting money into your RRSP to accumulate
                                savings for retirement. Now, you withdraw that money from your nonRegisteredValue as retirement income."
                       header= "Registered Retirement Income Fund"
                       className="rrifTooltip"
                   />
                   </NRegSummary>
                   : null
                    }
 
            </PensionIncomeWrapper>
            <Summary>
             {totalNestEgg}
            <h4>Total</h4>
            </Summary>
            </Right>
            
            </HeaderValuesWrapper>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    rrspDisplayValue,
    tfsaDisplayValue,
    nonRegisteredDisplayValue,
    totalNestEgg
})

export default connect(mapStateToProps)(Header)

//-----------------------------------------------STYLES-----------------------------------------------//


const HeaderValuesWrapper = styled.div`
    grid-area: a;                                                                                             {/*Grid-area set in LifeTimeIncomeApp, "a" positions it at the top */}
    height: 100%;
    width: 100%;
    display: flex;
    margin-top: 4rem;
    position: relative;
    color: ${props => props.theme.color.slate};
`

const Left = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`

const Summary = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    display: inline-block;
    padding: 1rem;
    margin-top: 1rem;
    cursor: pointer;
    font-size: ${props => props.theme.fontSize.medium};

  
`
const RRSPSummary = styled(Summary)`
    &:hover .cppTooltip {
        opacity: 1;
        visibility: visible;
    }
`
const TFSASummary = styled(Summary)`
    &:hover .oasTooltip {
        opacity: 1;
        visibility: visible;
    }
`
const NRegSummary = styled(Summary)`
    &:hover .rrifTooltip {
        opacity: 1;
        visibility: visible;
    }
`
const TaxSummary = styled(Summary)`
    &:hover .taxTooltip {
        opacity: 1;
        visibility: visible;
    }
`

const Vr = styled.div`
    height: 60%;
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


const PensionIncomeWrapper = styled.div`
    display: flex;
    width: 60%;
    border-bottom: ${props => props.theme.border.primary};
`




