import React, { Component } from 'react'
import styled from "styled-components"
import {connect} from "react-redux"
import { NavLink} from "react-router-dom"

 class SavingsPlanTile extends Component {
     
    render() {

        return (
            <SavingsPlanTileWrapper to="/SavingsPlan">
            <img src={require("../../../assets/images/Savings_plan.png")} style={{height: "220px", marginLeft: "10rem"}}/>
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
  background: orange;
  border-left: ${props => props.theme.border.primary};
`
