import React, { Component } from 'react'
import styled from "styled-components"

export default class SpendingApp extends Component {
    render() {
        return (
            <Spending>
                SPENDING DETAILS GO HERE
            </Spending>
        )
    }
}



//-----------------------------------------------STYLES-----------------------------------------------//

export const Spending = styled.div`
grid-area: m;
background-color: purple;
display: grid;
`

//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
//blank slate