import React, { Component } from 'react'
import ControlPanel from "./ControlPanel/ControlPanel"
import TileDisplay from "./TileDisplay"
import DualRangeBarSlider from "../Components/DualRangeSlider"
import styled from "styled-components"
import {connect} from "react-redux"

 class UserInterface extends Component {
    render() {
        return (
            <UserInterfaceWrapper>
            Lifetime Income Bar Chart

                <ControlPanel/>
                <TileDisplay/>
                <ChartPlaceHolder>Chart</ChartPlaceHolder>
               
            </UserInterfaceWrapper>
        )
    }
}

const mapStateToProps = (state) => {

    return {
        netWorthState: state.lifetimeIncomeYearListState
    }
}

export default connect(mapStateToProps)(UserInterface)

//-----------------------------------------------STYLES-----------------------------------------------//

const UserInterfaceWrapper = styled.div`
    background: light-grey; 
    display: grid;
    grid-gap: 18px;
    grid-template-columns: repeat(16, minmax(5rem, 10rem));
    grid-template-rows: 4rem minmax(12rem, 14rem) 4rem repeat(2, minmax(12rem, 24rem));
    grid-template-areas:
    "h h h h h h h h h h h h h h h h"
    "p p p p p t t t t t t t t t t t"
    "p p p p p t t t t t t t t t t t"
    "p p p p p c c c c c c c c c c c"
    "p p p p p c c c c c c c c c c c"
    "p p p p p c c c c c c c c c c c"
    "p p p p p c c c c c c c c c c c"
`
const ChartPlaceHolder = styled.div`
    grid-area: c;
    background: #D4D4D4; 
`
const Header = styled.div`
    grid-area: h;
`

//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
// Shows the user the control panel, the tile pane and the chart of the LifeTime Income Calculator. 