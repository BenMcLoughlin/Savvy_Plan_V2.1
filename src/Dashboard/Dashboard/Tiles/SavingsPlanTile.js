import React, { Component } from 'react'
import styled from "styled-components"
import {connect} from "react-redux"


 class SavingsPlanTile extends Component {
     
    render() {

        return (
            <SavingsPlanTileWrapper>
            <img src={require("../../../assets/images/Savings_plan.png")} style={{height: "290px", marginLeft: "10rem"}}/>
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

const SavingsPlanTileWrapper = styled.div`
  grid-area: g;
  background: orange;
  border-left: ${props => props.theme.border.primary};
`
