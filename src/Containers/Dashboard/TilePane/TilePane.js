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
    height: 95vh;
    display: grid;
    grid-gap: 5px;
    grid-template-columns: repeat(16, 1fr);
    grid-template-rows: 4rem 1fr 4rem repeat(3, 1fr);
    grid-template-areas: 
    "h h h h h h h h h h h h h h h h"
    "n n n n c c c c c t t t t s s s"
    "r r r r r r r r r r r r r r r r"
    "p p p p e e e e e e e e e e e e"
    "q q q q l l l l l l l l l l l l"
    "z z z z l l l l l l l l l l l l"
`
