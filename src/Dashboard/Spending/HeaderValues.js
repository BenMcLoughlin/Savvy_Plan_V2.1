import React, { Component } from 'react'
import styled from "styled-components"
import calculateMarginalTaxRate from "../../services/taxCalculationServices/taxCalculator"
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
             rrifIncome: {financialValue: rrifIncome }
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

        const averageWorkingEarnings = Math.round((workingLifetimeEarnings/47)/1000)*1000                                        //calculate average working annual income, then round

        const shortFall =  totalRetirementIncome - averageWorkingEarnings                                                         //determine retirement income shortfall to be displayed 

// //RETIRMENT INCOME TAX RATE
//         const retirementTaxRate = totalRetirementIncome > 72000 && totalRetirementIncome < 122000 ?                            //calculate tax rate in retirement 
//                                                 calculateMarginalTaxRate(totalRetirementIncome) + 15                           //if income is above 72000, OAS is clawed backed by adding an additional 15% on the tax
//                                                 : calculateMarginalTaxRate(totalRetirementIncome) || 0

return (
            <HeaderValuesWrapper onMouseMove={(e) => this.handleMouseMove(e)}>
            <Left >
            
            <LargeTotal >                                                                                                        {/* Displays the total shortfall, the value determines the color of the number negative for red or  positive for grey */}
                <Title>
                Average Income vs Pension Income
                </Title>
                <ShortFallValue value={shortFall}> 
                {`${shortFall/1000}k`}                                                                                            {/*Values translated from 120,000 to 120 K */}
                </ShortFallValue>                                                                                                 {/*Tooltip imported from UI, passes location of users mouse and text content */}
                    <Tooltip     
                        x={this.state.x} 
                        y={this.state.y} 
                        text={ `Your average annual income is
                                    ${averageWorkingEarnings/1000}k before retirement. Your esitmated
                                    pension income is ${totalRetirementIncome/1000}k.  The difference is the
                                    amount that you  need to fund yourself with investment savings.`
                        }
                        header= "bananas"
                        className="shortfallTooltip"
                    />
            </LargeTotal>
            
            </Left>
            <Right>
            <Title>Estimated Pension Income</Title>
            <PensionIncomeWrapper onMouseMove={(e) => this.handleMouseMove(e) }>
                    <CPPSummary>
                    {`${(cppIncome)/1000}k`}  
                        <span>CPP</span>
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
                        <span >OAS</span>
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
                    {`${(rrifIncome)/1000}k`}
                    <span >RRIF</span>
                        <Tooltip 
                        x={this.state.x} 
                        y={this.state.y} 
                        text=   "A Registered Retirement Income Fund (RRIF) is an account registered with the government that 
                                 pays you income in retirement. Before, you were putting money into your RRSP to accumulate
                                 savings for retirement. Now, you withdraw that money from your RRIF as retirement income."
                        header= "Registered Retirement Income Fund"
                        className="rrifTooltip"
                    />
                    </RRIFSummary>
                    <Vr/>
                    <TaxSummary>
                    {`${22}%`}
                    <span>Tax Rate</span>
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
             {`${(cppIncome + oasIncome + rrifIncome)/1000}k`}
            <span>Total</span>
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
    color: ${props => props.theme.color.contrastText1};
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
    span {
        font-size: ${props => props.theme.fontSize.small};
        font-style: italic;
    }

  
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

const ShortFallValue = styled.div`
display: inline-block;
cursor: pointer;
transition: all .3s ease-in;
color: ${props => props.value < 0 ? props.theme.color.salmon : props.theme.color.contrastText1}};
`


const LeftBottom = styled.div`
    flex: 1;
    display: flex;
    flex-direction: row;
    color: ${props => props.theme.color.salmon};
    margin-top: -1.5rem;
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

const LargeTotal = styled.div`
    font-size: ${props => props.theme.fontSize.large2};
    font-weight: 300;
    text-align: center;
    &:hover .shortfallTooltip {
        opacity: 1;
        visibility: visible;
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




