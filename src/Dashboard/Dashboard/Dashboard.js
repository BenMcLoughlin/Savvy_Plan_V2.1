import React, { Component } from 'react'
import Tile from "../../UI/Dashboard/Tile"
import styled from "styled-components"
import {connect} from "react-redux"
import CreditScoreTile from "./Tiles/CreditScoreTile"
import HomePurchaseTile from "./Tiles/HomePurchaseTile"
import LifetimeIncomeTile from "./Tiles/LifetimeIncomeTile"
import NetWorthTile from "./Tiles/NetWorthTile"
import SavingsPlanTile from "./Tiles/SavingsPlanTile"
import SpendingTile from "./Tiles/SpendingTile"
import TaxTile from "./Tiles/TaxTile"


class Dashboard extends Component {


    render() {
        return (
            <DashboardContainer>
                <StyledTilePane>
                    <CreditScoreTile/>
                    <HomePurchaseTile/>
                    <LifetimeIncomeTile/>
                    <HorizontalLine />
                    <NetWorthTile/>
                    <SavingsPlanTile/>
                    <SpendingTile/>
                    <TaxTile/>
                </StyledTilePane>
            </DashboardContainer>


        )
    }
}

const mapStateToProps = (state) => {
    
   return { tilePaneData: state.tilePaneData }
}

export default connect(mapStateToProps)(Dashboard)

//-----------------STYLES--------------------------------------------------//

const DashboardContainer = styled.div`
    grid-area: m;
    background: ${props => props.theme.color.background1};
    display: grid;
    height: 100%;
    width: 100%;
`

const StyledTilePane = styled.div`
    margin: 0 auto;
    width: 90vw;
    height: 100vh;
    display: grid;
    grid-template-columns: repeat(12, minmax(5rem, 100%));
    grid-template-rows: minmax(12rem, 14rem) 1rem repeat(2, minmax(18rem, 32rem));
    grid-template-areas:
    "a a a a a b b b b c c c"
    "h h h h h h h h h h h h"
    "d d d e e e e e e e e e"
    "f f f g g g g g g g g g";
    & > * {
        background: ${props => props.theme.color.background2};
    }
`
const HorizontalLine = styled.div`
    grid-area: h;
    border-top: ${props => props.theme.border.primary};
`

//This is the grid container that positions each of the tiles in the dashboard.


//
//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//

/* 
The dashboard renders a TilePane which is the container that holds all the individual 
Tiles which display data to the use. Rather than writing out and building each individual 
tile I built one that has different functionality according to the props that are passed 
to it. Then I created tilePaneData which contains the data for each tile as an array. 
I map through the array and render a new Tile with the data presented. CSS grid is used 
to place the tiles in the correct position and their locations are set using grid-template-areas.  
*/