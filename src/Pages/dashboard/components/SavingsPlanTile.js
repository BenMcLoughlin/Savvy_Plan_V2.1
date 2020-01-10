import React, { Component } from 'react'
import styled from "styled-components"
import {connect} from "react-redux"
import SavingsStackedChart from "../../../charts/savings/SavingsStackedChart"
import SavingsAreaChart from "../../../charts/savings/SavingsAreaChart"
import {rrspDisplayValue, tfsaDisplayValue, nonRegisteredDisplayValue, totalNestEgg} from "../../../redux/savings/savings_selectors"
import { NavLink} from "react-router-dom"

 class SavingsPlanTile extends Component {

    render() {

        const {rrspDisplayValue, tfsaDisplayValue, nonRegisteredDisplayValue, totalNestEgg} = this.props

        return (
            <LifetimeIncomeTileWrapper to="/SavingsPlan">
            <Top>
                    <Left>
                    <LargeTotal>
                    <TitleMain>Savings & Withdrawal Plan</TitleMain>
                    {/* {`${(cppIncome + oasIncome + rrsp + tfsa + nonRegistered)/1000}k`} */}
                    </LargeTotal>
                </Left>
                <Right>
                       <PensionIncomeWrapper>
                            <Summary>
                            {rrspDisplayValue}  
                                <h4>RRSP</h4>
                            </Summary>
                            <Summary >
                            {tfsaDisplayValue}
                                <h4 >TFSA</h4>
                            </Summary>
                            {nonRegisteredDisplayValue > 0 ?
                        <Summary>
                        {nonRegisteredDisplayValue}
                        <h4 >N-Reg</h4>
                        </Summary>
                        : null
                            }
                          </PensionIncomeWrapper>
                             <Summary>
                        {totalNestEgg}
                        <h4>Total</h4>
                        </Summary>
                    </Right>
            
            </Top>

            <ChartWrapper>
            <AreaChartPlaceHolder>   
                    <SavingsAreaChart  />
                </AreaChartPlaceHolder>  
                <BarChartPlaceHolder>   
                    <SavingsStackedChart/>
                </BarChartPlaceHolder>   
            </ChartWrapper>
            </LifetimeIncomeTileWrapper>
        )
    }
}


const mapStateToProps = (state) => {

    return {
        lifetimeIncomeVariableState: state.lifetimeIncomeVariableState,
        income_reducer: state.income_reducer,
        rrspDisplayValue: rrspDisplayValue(state),
        tfsaDisplayValue: tfsaDisplayValue(state),
        nonRegisteredDisplayValue: nonRegisteredDisplayValue(state),
        totalNestEgg: totalNestEgg(state),
    }
}

export default connect(mapStateToProps)(SavingsPlanTile)

//-----------------------------------------------STYLES-----------------------------------------------//

const LifetimeIncomeTileWrapper = styled(NavLink)`
  text-decoration: none;
  grid-area: g;
  color: ${props => props.theme.color.slate};
  border-radius: 5px;
  border: ${props => props.theme.border.primary};
  cursor: pointer;
  display: flex;

  flex-direction: column;
  transition: all .2s ease-in-out;
  background: ${props => props.theme.color.ice};
  &:hover {
    transform: scale(1.001);
    box-shadow: 0px 3px 3px 2px rgba(219,206,219,0.33);
  }
`

const Top = styled.div`
    display: flex;
    flex: 30%;
    margin-top: 4rem;
    justify-content: space-between;

`
const Left = styled.div`
    display: flex;
    margin-left: 14%;
    font-size: ${props => props.theme.fontSize.medium};
    flex: 1;
`
const Right = styled.div`
    width: 25%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    align-items: center;
    margin-top: -4rem;
`
const LargeTotal = styled.div`
    font-size: ${props => props.theme.fontSize.large};
    font-weight: 300;
    text-align: center;


`
const ToolTip = styled.div`
    background: red;
    opacity: 0;
`


const TitleMain = styled.div `
    font-size: ${props => props.theme.fontSize.medium};
    text-align: center;
    color: ${props => props.theme.color.slate};
    font-weight: 300;
   
` 
const Title = styled.div `
    font-size: ${props => props.theme.fontSize.smallMedium};
    text-align: center;
    color: ${props => props.theme.color.slate};
    font-weight: 300;
   
` 
const ChartWrapper = styled.div`
    margin-top: -7rem;
    margin-bottom: 1rem;
    width: 100%;
    height: 90%;

`
const Summary = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    margin-top: 1rem;
    cursor: pointer;
    font-size: ${props => props.theme.fontSize.small};
    align-items: center;
    justify-content: center;
    & h4 {
        font-size: ${props => props.theme.fontSize.smallest};
    }

    
`
const PensionIncomeWrapper = styled.div`
    display: flex;
    width: 60%;
    border-bottom: ${props => props.theme.border.primary};
`

const Circle = styled.div`
   border-radius: 50%;
   height: .7rem;
   width: .7rem;
   margin-top: .5rem;
   background: ${props => props.color}
   display: flex;
   align-items: center;
`
const Vr = styled.div`
    height: 60%;
    width: 1%;
    margin-top: 2rem;
    flex-basis: 0.1;
    flex: 1 0.1 1;
    border-left: ${props => props.theme.border.primary};
`

const AreaChartPlaceHolder = styled.div`
    width: 100%;

    height: 70%;
    position: relative;
`
const BarChartPlaceHolder = styled.div`
    margin-top: -3rem;
    width: 100%;
    height: 60%;
    position: relative;

`