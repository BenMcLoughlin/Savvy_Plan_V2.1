import React, { Component } from 'react'
import Tile from "./Tile"
import styled from "styled-components"
import {connect} from "react-redux"
import {Link} from "react-router-dom"


class TilePane extends Component {

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

    render() {
        return (
            <StyledTilePane>
                {this.renderData()}
            </StyledTilePane>
        )
    }
}


const mapStateToProps = (state) => {
    
   return { tilePaneData: state.tilePaneData }
}

export default connect(mapStateToProps)(TilePane)

//-----------------STYLES--------------------------------------------------//

const StyledTilePane = styled.div`
    margin: 0 auto;
    width: 90vw;
    height: 100vh;
    display: grid;
    grid-gap: 5px;
    grid-template-columns: repeat(16, minmax(5rem, 10rem));
    grid-template-rows: 4rem minmax(12rem, 14rem) 4rem minmax(12rem, 14rem) 4rem;
    grid-template-areas: 
    "a a a a a a a a a a a a a a a a"
    "b b b b c c c c c d d d d e e e"
    "f f f f f f f f f f f f f f f f"
    "g g g g h h h h h h i i i i i i"
    "j j j j j j j j j j j j j j j j"
    "k k k k l l l l l l l l l l l l"
    "m m m m n n n n n n n n n n n n"
`
