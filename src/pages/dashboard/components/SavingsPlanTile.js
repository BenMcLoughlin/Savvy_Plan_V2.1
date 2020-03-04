import React, { Component } from 'react'
import styled from "styled-components"
import {connect} from "react-redux"
import { NavLink} from "react-router-dom"

const SavingsPlanTile = ({progress_reducer}) => {



        return (
            <Wrapper to="/Savings" count={progress_reducer.dashboard}>

            </Wrapper>
        )
}


const mapStateToProps = (state) => {

    return {
        income_reducer: state.income_reducer,
    }
}

export default connect(mapStateToProps)(SavingsPlanTile)

//-----------------------------------------------style-----------------------------------------------//

const Wrapper = styled(NavLink)`
  text-decoration: none;
  grid-area: g;
  color: ${props => props.theme.color.slate};
  border-radius: 5px;
  border: ${props => props.theme.border.primary};
  cursor: pointer;
  display: flex;
  z-index: ${props => props.count === 5 ? 900 : 0};
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


const TitleMain = styled.div `
    font-size: ${props => props.theme.fontSize.medium};
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