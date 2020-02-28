import React, { Component } from 'react'
import styled from "styled-components"
import {connect} from "react-redux"
import LifetimeIncomeBarChart from "charts/income/LifetimeIncomeBarChart"
import { NavLink} from "react-router-dom"

const LifetimeIncomeTile = ({progress_reducer}) => {



   

        return (
            <LifetimeIncomeTileWrapper to="/income" count={progress_reducer.dashboard} >
            <Top>
                    <Left>

                </Left>
                <Right>

                    </Right>
            
            </Top>

            <ChartWrapper>
                    <LifetimeIncomeBarChart/>
            </ChartWrapper>
            </LifetimeIncomeTileWrapper>
        )

}

const mapStateToProps = (state) => {

    return {
        lifetimeIncomeVariableState: state.lifetimeIncomeVariableState,
        income_reducer: state.income_reducer
    }
}

export default connect(mapStateToProps)(LifetimeIncomeTile)

//-----------------------------------------------style-----------------------------------------------//

const LifetimeIncomeTileWrapper = styled(NavLink)`
  text-decoration: none;
  grid-area: e;
  color: ${props => props.theme.color.slate};
  border-radius: 5px;
  border: ${props => props.theme.border.primary};
  cursor: pointer;
  display: flex;
  z-index: ${props => props.count === 4 ? 900 : 0}
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

`
const Left = styled.div`
    display: flex;
    flex-direction: column;
    font-size: ${props => props.theme.fontSize.medium};
    flex: 1;
`
const Right = styled.div`
    width: 45%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    align-items: center;
`
const LargeTotal = styled.div`
    font-size: ${props => props.theme.fontSize.large};
    font-weight: 300;
    text-align: center;


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
    margin-top: -5rem;
    margin-bottom: 1rem;
    width: 100%;
    height: 70%;
    font-size: 1.2rem;
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