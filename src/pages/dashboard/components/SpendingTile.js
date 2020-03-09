import React from 'react'
import styled from "styled-components"
import {connect} from "react-redux"
import { NavLink} from "react-router-dom"

const Spending = ({progress_reducer}) => {
     
        return (
            <Wrapper to="/Spending" progress_reducer={progress_reducer}>
                <LargeTotal>
                    46 - 57K 
                    <span>
                    Annual Spending
                    </span>
                </LargeTotal>
            </Wrapper>
        )

}

const mapStateToProps = (state) => {

    return {
        lifetimeIncomeVariableState: state.lifetimeIncomeVariableState,
    }
}

export default connect(mapStateToProps)(Spending)

//-----------------------------------------------style-----------------------------------------------//

const Wrapper = styled( NavLink)`
  text-decoration: none;
  grid-area: c;
  display: flex;
  justify-content: center;
  background:${props => props.theme.color.drab};
  cursor: pointer;
  border-radius: 5px;
  border: ${props => props.theme.border.primary};
  z-index: ${props => props.progress_reducer.dashboard === 3 ? 900 : 0}

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