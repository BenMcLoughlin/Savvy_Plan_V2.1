import React from 'react'
import TilePane from "./TilePane/TilePane"
import styled from "styled-components"

const Dashboard = styled.div`
    grid-area: m;
`


export default function () {
    return (
        <Dashboard>
            <TilePane/>
        </Dashboard>
    )
}
