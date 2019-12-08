import React, { Component } from 'react'
import styled from "styled-components"
//import calculateMarginalTaxRate from "../../services/taxCalculationServices/taxCalculator"
import Tooltip from "../../UI/Tooltip/Tooltip"
export default class HeaderValues extends Component {

//GRAB MOUSE COORDINATES FOR TOOLTIP
    state = { 
              x: 0,                                                                                                              //These coordinates are set onMouseMove placing the tootip beside the mouse
              y: 0,                                                                                                              //They are passed as props to the Tooltip componnent 
            }
   handleMouseMove(e) {
                this.setState({ x: e.clientX -120, y: e.clientY -140 })                                                          //Sets the state according to mouse position
              }                                                                                                                  //They are passed as props to the Tooltip componnent                                                                                             //They are passed as props to the Tooltip componnent 

    render() {

//DESTRUCTURE REDUCERS TO ASSIGN VARIABLES
        const {
             cppIncome : {financialValue: cppIncome },                                                                          //Grabs and assigns variable names from reducer
             oasIncome : {financialValue: oasIncome },
             rrsp: {financialValue: rrsp }
        } = this.props.incomePerYear_reducer[75]            

// //CALCULATE RETIREMENT INCOME SHORTFALL - AVERAGE INCOME - RETIREMENT INCOME
        const totalRetirementIncome = Object.values(this.props.incomePerYear_reducer[75])                                        //Determines total income in retirement
                                                    .map(d => d.financialValue)
                                                    .reduce((acc, num) => acc + num)

        const workingLifetimeEarnings = Object.values(this.props.incomePerYear_reducer)                                          // turn object into array
                                               .map(d => Object.values(d)
                                                 .map(a => a.financialValue)                                                     // make sub arrays just show financial value
                                                 .reduce((acc, num) => acc + num))                                               // sum the earned value for each year. 
                                                .slice(0,47)                                                                     // Grab Only working years 
                                                .reduce((acc, num) => acc + num)                                                 // determine sum total of working years income

        const averageWorkingEarnings = workingLifetimeEarnings/47                                       //calculate average working annual income, then round

        const shortFall =  Math.round((totalRetirementIncome - averageWorkingEarnings)/1000)*1000                                                         //determine retirement income shortfall to be displayed                                               : calculateMarginalTaxRate(totalRetirementIncome) || 0

return (
            <HeaderValuesWrapper onMouseMove={(e) => this.handleMouseMove(e)}>
            <Left >
                                                                                                                 {/* Displays the total shortfall, the value determines the color of the number negative for red or  positive for grey */}
                <h1>
                    Lifetime Income Chart
                </h1>
            </Left>
            <Right>
            <h2>Estimated Pension Income</h2>
            <PensionIncomeWrapper onMouseMove={(e) => this.handleMouseMove(e) }>
                    <CPPSummary>
                    {`${(cppIncome)/1000}k`}  
                        <h4>CPP</h4>
                        <Tooltip 
                            x={this.state.x} 
                            y={this.state.y} 
                            text="  A monthly, taxable benefit that replaces part of your income when you retire. 
                                    If you qualify, you’ll receive the CPP retirement pension for the rest of your life. 
                                    To qualify you must:
                                    be at least 60 years old
                                    have made at least one valid contribution to the CPP"
                            header= "Canada Pension Plan"
                            className="cppTooltip"
                        />
                    </CPPSummary>
                    <OASSummary >
                    {`${(oasIncome)/1000}k`}
                        <h4 >OAS</h4>
                        <Tooltip 
                        x={this.state.x} 
                        y={this.state.y} 
                        text=   " The OAS pension is a monthly payment available to seniors aged 65 and older who 
                                  meet the Canadian legal status and residence requirements. It is not based on 
                                  contributions, every Canadian is elgible."
                        header= "Old Age Security"
                        className="oasTooltip"
                         />
                    </OASSummary>
                    <RRIFSummary>
                    {`${(rrsp)/1000}k`}
                    <h4 >rrsp</h4>
                        <Tooltip 
                        x={this.state.x} 
                        y={this.state.y} 
                        text=   "A Registered Retirement Income Fund (rrsp) is an account registered with the government that 
                                 pays you income in retirement. Before, you were putting money into your RRSP to accumulate
                                 savings for retirement. Now, you withdraw that money from your rrsp as retirement income."
                        header= "Registered Retirement Income Fund"
                        className="rrifTooltip"
                    />
                    </RRIFSummary>
                    <Vr/>
                    <TaxSummary>
                    {`${22}%`}
                    <h4>Tax Rate</h4>
                    <Tooltip 
                    x={this.state.x} 
                    y={this.state.y} 
                    text="      Marginal tax is the amount of tax paid on an additional dollar of income. As income rises, so does the tax rate. 
                                If retirement, if you earn over $78,000 you're Old Age Security will be clawed back
                                at a rate of 15% on every additional dollar earned. "
                    header= "Canada Pension Plan"
                    className="taxTooltip"
                />
                    </TaxSummary>
            </PensionIncomeWrapper>
            <Summary>
             {`${(cppIncome + oasIncome + rrsp)/1000}k`}
            <h4>Total</h4>
            </Summary>
            </Right>
            
            </HeaderValuesWrapper>
        )
    }
}

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
const CPPSummary = styled(Summary)`
    &:hover .cppTooltip {
        opacity: 1;
        visibility: visible;
    }
`
const OASSummary = styled(Summary)`
    &:hover .oasTooltip {
        opacity: 1;
        visibility: visible;
    }
`
const RRIFSummary = styled(Summary)`
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




