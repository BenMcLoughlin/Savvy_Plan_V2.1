import React, { Component } from 'react'
import styled from "styled-components"

export default class TileDisplay extends Component {
    render() {
        return (
            <TileDisplayWrapper>
                Hi I'm the Tile Display
            </TileDisplayWrapper>
        )
    }
}

//-----------------------------------------------STYLES-----------------------------------------------//

const TileDisplayWrapper = styled.div`
    grid-area: t;
    background: #D4D4D4;
`

//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
// 