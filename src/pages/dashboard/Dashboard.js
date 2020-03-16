import React, {useState} from 'react'
import styled from "styled-components"
import {connect} from "react-redux"
import SpendingTile from "pages/dashboard/components/SpendingTile"
import NetWorthTile from "./components/NetWorthTile"
import SavingsPlanTile from "./components/SavingsPlanTile"
import LifetimeIncomeTile from "./components/LifetimeIncomeTile"
import TaxTile from "./components/TaxTile"
import HomePurchaseTile from "./components/HomePurchaseTile"
import ContributionPlanTile from "./components/ContributionPlanTile"
import Wizard from "./components/Wizard"
import {setKeyValue_action} from "redux/actions"

const Dashboard = ({progress_reducer, setKeyValue_action}) =>  {
    const [count, setCount] = useState(progress_reducer.dashboard)
console.log(progress_reducer.dashboard);
    const setCountAndProgress = (section, number) => {
        setKeyValue_action(section, "progress_reducer", number)
        setCount(number)
    }

    console.log(count);
        return (
            <Page>
                 {
                  count < 7 ?  <Blackout/> : null
                }
              
                <Wizard 
                    count={count}
                    setCountAndProgress={setCountAndProgress}
                    progress_reducer={progress_reducer}
                    />
                   <NetWorthTile 
                        progress_reducer={progress_reducer}
                        onClick = {() => count === 2 ? setCountAndProgress(count + 1) : null}
                        />
                   <LifetimeIncomeTile
                        progress_reducer={progress_reducer}
                        onClick = {() => count === 2 ? setCountAndProgress(count + 1) : null}
                   />
                   <TaxTile
                     progress_reducer={progress_reducer}
                     onClick = {() => count === 2 ? setCountAndProgress(count + 1) : null}
                   />
                   <HomePurchaseTile/>
                   <SpendingTile
                     progress_reducer={progress_reducer}
                   />
                   <SavingsPlanTile
                       progress_reducer={progress_reducer}
                       onClick = {() => count === 2 ? setCountAndProgress(count + 1) : null}
                   />
                   <ContributionPlanTile/>
            </Page>
        )
}

const mapStateToProps = (state) => ({
    progress_reducer: state. progress_reducer
})

export default connect(mapStateToProps, {setKeyValue_action})(Dashboard)

//-----------------style--------------------------------------------------//

const Page = styled.div`
  ${props => props.theme.pageBaseStyles}
   display: grid;
   margin: 1rem;
   grid-gap: 1rem;
   grid-template-columns: repeat(24, 1fr);
   grid-template-rows: repeat(16, minmax(3rem, 4rem)) ;
   grid-template-areas:
   "a a a a a a b b b b b b b b b b b b c c c c c"
   "a a a a a a b b b b b b b b b b b b c c c c c"
   "a a a a a a b b b b b b b b b b b b d d d d d"
   "a a a a a a b b b b b b b b b b b b d d d d d"
   "e e e e e e e e e e e e e e e e e e e e e e e"
   "e e e e e e e e e e e e e e e e e e e e e e e"
   "e e e e e e e e e e e e e e e e e e e e e e e"
   "e e e e e e e e e e e e e e e e e e e e e e e"
   "e e e e e e e e e e e e e e e e e e e e e e e"
   "e e e e e e e e e e e e e e e e e e e e e e e"
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
const Blackout = styled.div`
    background: black;
    opacity: .5;
    position: absolute;
    top: -44rem;
    left: -30rem;
    height: 300rem;
    width: 200rem;
    z-index: 500;
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