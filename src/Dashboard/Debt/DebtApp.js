import React, { Component } from 'react'

import styled from "styled-components"

export default class DebtApp extends Component {
    render() {
        return (
            <Debt>
                Debt details go here
            </Debt>
        )
    }
}





//-----------------------------------------------STYLES-----------------------------------------------/
export const Debt = styled.div`
grid-area: m;
background-color: yellow;
display: grid;
`
//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
//blank slate