import React from 'react'
import styled from "styled-components"
import {connect} from "react-redux"
import CreditScoreTile from "pages/dashboard/components/CreditScoreTile"
import NetWorthTile from "./components/NetWorthTile"
import SavingsPlanTile from "./components/SavingsPlanTile"
import LifetimeIncomeTile from "./components/LifetimeIncomeTile"
import TaxTile from "./components/TaxTile"
import HomePurchaseTile from "./components/HomePurchaseTile"
import VerticalTimeline from "charts/assumptions/VerticalTimeline"

const Dashboard = () =>  {
        return (
            <Page>
                   <NetWorthTile/>
                   <LifetimeIncomeTile/>
                   <TaxTile/>
                   <SavingsPlanTile/>
                   <ChartWrapper>
                        <VerticalTimeline />
                   </ChartWrapper>
            </Page>
        )
}

const mapStateToProps = (state) => {

}

export default connect(mapStateToProps)(Dashboard)

//-----------------style--------------------------------------------------//

const Page = styled.div`
  ${props => props.theme.pageBaseStyles}
   display: grid;
   margin: 1rem;
   grid-gap: 1rem;
   grid-template-columns: repeat(24, 1fr);
   grid-template-rows: repeat(16, minmax(3rem, 4rem)) ;
   grid-template-areas:
   "a a a a a a b b b b b b c c c c c c h h h h h"
   "a a a a a a b b b b b b c c c c c c h h h h h"
   "a a a a a a b b b b b b c c c c c c h h h h h"
   "a a a a a a b b b b b b c c c c c c h h h h h"
   "e e e e e e e e e e e e e e e e e e h h h h h"
   "e e e e e e e e e e e e e e e e e e h h h h h"
   "e e e e e e e e e e e e e e e e e e h h h h h"
   "e e e e e e e e e e e e e e e e e e h h h h h"
   "e e e e e e e e e e e e e e e e e e h h h h h"
   "e e e e e e e e e e e e e e e e e e h h h h h"
   "g g g g g g g g g g g g g g g g g g h h h h h"
   "g g g g g g g g g g g g g g g g g g h h h h h"
   "g g g g g g g g g g g g g g g g g g h h h h h"
   "g g g g g g g g g g g g g g g g g g h h h h h"
   "g g g g g g g g g g g g g g g g g g h h h h h"
   "g g g g g g g g g g g g g g g g g g h h h h h"
`



const ChartWrapper = styled.div`
    height: 70rem;
    width: 35rem;
    display: flex;
    grid-area: h;
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

/*

<ContributionPlanTile/>
 <GoalsTile/>
*/