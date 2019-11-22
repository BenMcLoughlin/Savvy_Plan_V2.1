import React, { Component } from 'react'
import styled from "styled-components"
import {connect} from "react-redux"
import { NavLink} from "react-router-dom"

 class HomePurchaseTile extends Component {

    render() {

        return (
            <HomePurchaseTileWrapper to="/Property">
            <img alt ="#" src={require("../../../assets/images/Home_Purchase_Plan.png")} style={{height: "200px", }}/>
            </HomePurchaseTileWrapper>
        )
    }
}

const mapStateToProps = (state) => {

    return {
        lifetimeIncomeVariableState: state.lifetimeIncomeVariableState,
    }
}

export default connect(mapStateToProps)(HomePurchaseTile)

//-----------------------------------------------STYLES-----------------------------------------------//

const HomePurchaseTileWrapper = styled(NavLink)`
  text-decoration: none;
  grid-area: f;
  background: blue;
`
