import React, { Component } from 'react'
import Tile from "../UI/Dashboard/Tile"
import styled from "styled-components"
import {connect} from "react-redux"


class Dashboard extends Component {

    renderData() {
        return this.props.tilePaneData.map(tile => {
            return (
                  <Tile 
                  tileType={tile.tileType}
                  link={tile.link}
                  icon={tile.icon}
                  title={tile.title}
                  value={tile.value}
                  subTitle={tile.subTitle}
                  abbreviation={tile.abbreviation}
                  chart={tile.chart}
                  gridArea={tile.gridArea}      
              />
            )
        })
    }
    // this is the function that takes the props from tilePaneData and maps through them rendering a new tile
    // for each section. The gridArea is used to place them in the correct position. 

    render() {
        return (
            <DashboardContainer>
                <StyledTilePane>
                    {this.renderData()}
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
    grid-gap: 18px;
    grid-template-columns: repeat(16, minmax(5rem, 10rem));
    grid-template-rows: 4rem minmax(12rem, 14rem) 4rem repeat(2, minmax(12rem, 24rem));
    grid-template-areas:
    "a a a a a a a a a a a a a a a a"
    "b b b b c c c c c d d d d e e e"
    "f f f f f f f f f f f f f f f f"
    "g g g g h h h h h h h h h h h h"
    "i i i i j j j j j j j j j j j j"
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