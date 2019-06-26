import React from 'react'
import TilePane from "./TilePane/TilePane"
import styled from "styled-components"



export default function () {
    return (
        <Dashboard>
            <TilePane/>
        </Dashboard>
    )
}



//--------STYLES---------------------------------------------------------------//



const Dashboard = styled.div`
    grid-area: m;
    background: ${props => props.theme.color.primaryBackground1};
    display: grid;
    height: 100%;
    width: 100%;
`
