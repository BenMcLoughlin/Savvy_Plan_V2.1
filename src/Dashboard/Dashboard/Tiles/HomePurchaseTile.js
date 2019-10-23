import React, { Component } from 'react'
import styled from "styled-components"
import {connect} from "react-redux"

 class HomePurchaseTile extends Component {

    render() {

        return (
            <HomePurchaseTileWrapper>
            <img src={require("../../../assets/images/Home_Purchase_Plan.png")} style={{height: "290px", }}/>
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

const HomePurchaseTileWrapper = styled.div`
  grid-area: f;
  background: blue;
`
