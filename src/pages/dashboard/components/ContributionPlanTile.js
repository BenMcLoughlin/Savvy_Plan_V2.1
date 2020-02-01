import React, { Component } from 'react'
import styled from "styled-components"
import {connect} from "react-redux"
import { NavLink} from "react-router-dom"

 class ContributionPlanTile extends Component {
     
    render() {

        return (
            <ContributionPlanTileWrapper to="/SavingsPlan">
            <img alt ="#"  src={require("asset/images/contribution_plan.png")} style={{height: "160px", marginLeft: "2rem"}}/>
            </ContributionPlanTileWrapper>
        )
    }
}

const mapStateToProps = (state) => {

    return {
        lifetimeIncomeVariableState: state.lifetimeIncomeVariableState,
    }
}

export default connect(mapStateToProps)(ContributionPlanTile)

//-----------------------------------------------style-----------------------------------------------//

const ContributionPlanTileWrapper = styled(NavLink)`
  text-decoration: none;
  grid-area: h;
  border-radius: 5px;
  border: ${props => props.theme.border.primary};
  transition: all .2s ease-in-out;
  background: ${props => props.theme.color.ice};
  &:hover {
    transform: scale(1.001);
    box-shadow: 0px 3px 3px 2px rgba(219,206,219,0.33);
  }
`
