import React, { Component } from 'react'
import styled from "styled-components"
import {connect} from "react-redux"

 class CreditScore extends Component {
     
    render() {

        return (
            <CreditScoreWrapper>
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

//-----------------------------------------------STYLES-----------------------------------------------//

const CreditScoreWrapper = styled.div`
  grid-area: c;
  display: flex;
  justify-content: center;
  color: ${props => props.theme.color.contrastText1};
  cursor: pointer;

`

const LargeTotal = styled.div`
    font-size: 11rem;
    font-weight: 250;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: -1rem;
    & span {
        font-size: ${props => props.theme.fontSize.smallMedium};
        text-align: center;
        margin-top: -1rem;
        font-weight: 300;
}
`