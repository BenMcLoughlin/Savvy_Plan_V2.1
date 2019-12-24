import React, { Component } from 'react'
import styled from "styled-components"
import {connect} from "react-redux"
import CreditScoreTile from "./CreditScore/CreditScoreTile"
import NetWorthTile from "./NetWorth/NetWorthTile"
import SavingsPlanTile from "./SavingsPlan/SavingsPlanTile"
import ContributionPlanTile from "./SavingsPlan/ContributionPlanTile"
import GoalsTile from "./Goals/GoalsTile"
import LifetimeIncomeTile from "./LifetimeIncome/LifetimeIncomeTile"
import TaxTile from "./Tax/TaxTile"
import HomePurchaseTile from "./Property/HomePurchaseTile"

class Dashboard extends Component {


    render() {
        return (
            <DashboardContainer>
                <StyledTilePane>
                   <NetWorthTile/>
                   <LifetimeIncomeTile/>
                   <TaxTile/>
                   <CreditScoreTile/>
                   <HomePurchaseTile/>
                   <SavingsPlanTile/>
                   <ContributionPlanTile/>
                   <GoalsTile/>
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
    background: white;
    display: grid;
    height: 100%;
    width: 100%;
`

const StyledTilePane = styled.div` 
    height: 95vh;
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: repeat(24, 1fr);
    grid-template-rows: repeat(14, 1fr) ;
    grid-template-areas:
    "a a a a a a b b b b b b c c c c c c d d d d d"
    "a a a a a a b b b b b b c c c c c c d d d d d"
    "a a a a a a b b b b b b c c c c c c x x x x x"
    "e e e e e e e e e e e e e e e e e e f f f f f"
    "e e e e e e e e e e e e e e e e e e f f f f f"
    "e e e e e e e e e e e e e e e e e e f f f f f"
    "e e e e e e e e e e e e e e e e e e f f f f f"
    "e e e e e e e e e e e e e e e e e e f f f f f"
    "e e e e e e e e e e e e e e e e e e f f f f f"
    "g g g g g g g g g g g g g g g g g g h h h h h"
    "g g g g g g g g g g g g g g g g g g h h h h h"
    "g g g g g g g g g g g g g g g g g g h h h h h"
    "g g g g g g g g g g g g g g g g g g h h h h h"
    "g g g g g g g g g g g g g g g g g g h h h h h"
    "g g g g g g g g g g g g g g g g g g h h h h h"
`
const HorizontalLine = styled.div`
    height: 1px;
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