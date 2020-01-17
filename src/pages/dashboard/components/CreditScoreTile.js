import React, { Component } from 'react'
import styled from "styled-components"
import {connect} from "react-redux"
import { NavLink} from "react-router-dom"

 class CreditScore extends Component {
     
    render() {

        return (
            <CreditScoreWrapper to="/CreditScore">
                <LargeTotal>
                    782 
                    <span>
                    Credit Score
                    </span>
                </LargeTotal>
            </CreditScoreWrapper>
        )
    }
}

const mapStateToProps = (state) => {

    return {
        lifetimeIncomeVariableState: state.lifetimeIncomeVariableState,
    }
}

export default connect(mapStateToProps)(CreditScore)

//-----------------------------------------------style-----------------------------------------------//

const CreditScoreWrapper = styled( NavLink)`
  text-decoration: none;
  grid-area: d;
  display: flex;
  justify-content: center;
  background:${props => props.theme.color.drab};
  cursor: pointer;
  border-radius: 5px;
  border: ${props => props.theme.border.primary};

`

const LargeTotal = styled.div`
    font-size: 5rem;
    font-weight: 250;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: white;
    margin-top: -1rem;
    & span {
        font-size: ${props => props.theme.fontSize.smallMedium};
        text-align: center;
        margin-top: -1rem;
        font-weight: 300;
}
`