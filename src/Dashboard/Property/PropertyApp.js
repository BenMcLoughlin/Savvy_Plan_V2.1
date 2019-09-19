import React, { Component } from 'react'
import styled from "styled-components"

export default class PropertyApp extends Component {
    render() {
        return (
            <Property>
                PROPERTY DETAILS GO HERE
            </Property>
        )
    }
}

//-----------------------------------------------STYLES-----------------------------------------------//

export const Property = styled.div`
grid-area: m;
background-color: red;
display: grid;
`

//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
//blank slate