import React, { Component } from 'react'
import styled from "styled-components"
import {connect} from "react-redux"
import { TaxTilePhoto } from "../../../assets/images/Tax_Tile_Position_Holder.png"
import { NavLink} from "react-router-dom"

class TaxTileTile extends Component {
     
    render() {

        return (
            <TaxTileTileWrapper to="/Tax">
            
            <img src={require("../../../assets/images/Tax_Tile_Position_Holder.png")} style={{height: "260px"}}/>
            </TaxTileTileWrapper>
        )
    }
}

const mapStateToProps = (state) => {

    return {
        lifetimeIncomeVariableState: state.lifetimeIncomeVariableState,
    }
}

export default connect(mapStateToProps)(TaxTileTile)

//-----------------------------------------------STYLES-----------------------------------------------//

const TaxTileTileWrapper = styled(NavLink)`
  text-decoration: none;
  grid-area: d;
  background: purple;
`
