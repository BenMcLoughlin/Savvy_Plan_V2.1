import React, { Component } from 'react'
import styled from "styled-components"
import {connect} from "react-redux"
import { NavLink} from "react-router-dom"

 class SavingsPlanTile extends Component {
     
    render() {

        return (
            <SavingsPlanTileWrapper to="/SavingsPlan">
            <img alt ="#"  src={require("../../assets/images/savings_plan.png")} style={{height: "18rem",}}/>
            </SavingsPlanTileWrapper>
        )
    }
}

const mapStateToProps = (state) => {

    return {
        lifetimeIncomeVariableState: state.lifetimeIncomeVariableState,
    }
}

export default connect(mapStateToProps)(SavingsPlanTile)

//-----------------------------------------------STYLES-----------------------------------------------//

const SavingsPlanTileWrapper = styled(NavLink)`
  text-decoration: none;
  grid-area: g;
  border-radius: 5px;
  border: ${props => props.theme.border.primary};
  transition: all .2s ease-in-out;
  background: ${props => props.theme.color.ice};
  &:hover {
    transform: scale(1.001);
    box-shadow: 0px 3px 3px 2px rgba(219,206,219,0.33);
  }
`
