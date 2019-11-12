import React, { Component } from 'react'
import styled from "styled-components"


export default class PropertyApp extends Component {
    state = { 
        x: 0,                                                                                             //These coordinates are set onMouseMove placing the tootip beside the mouse
        y: 0 
      }
handleMouseMove(e) {
          this.setState({ x: e.clientX -120, y: e.clientY -140 })                                         //Sets the state according to mouse position
        }
    render() {
        return (
            <Property onMouseMove={(e) => this.handleMouseMove(e)}>
            hello
          
            </Property>
        )
    }
}

//-----------------------------------------------STYLES-----------------------------------------------//

export const Property = styled.div`
grid-area: m;
display: grid;
`

//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
//blank slate