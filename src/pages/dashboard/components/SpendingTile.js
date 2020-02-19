import React, { Component } from 'react'
import styled from "styled-components"
import {connect} from "react-redux"
import { NavLink} from "react-router-dom"

 class Spending extends Component {
     
    render() {

        return (
            <CreditScoreWrapper to="/Spending">
                <LargeTotal>
                    46 - 57K 
                    <span>
                    Annual Spending
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

export default connect(mapStateToProps)(Spending)

//-----------------------------------------------style-----------------------------------------------//

const CreditScoreWrapper = styled( NavLink)`
  text-decoration: none;
  grid-area: c;
  display: flex;
  justify-content: center;
  background:${props => props.theme.color.drab};
  cursor: pointer;
  border-radius: 5px;
  border: ${props => props.theme.border.primary};

`

const LargeTotal = styled.div`
    font-size: 4rem;
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
        font-weight: 300;
}
`