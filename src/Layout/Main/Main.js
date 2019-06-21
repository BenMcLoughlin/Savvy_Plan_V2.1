import React from 'react'
import styled from "styled-components"
import Dashboard from "../../Containers/Dashboard/Dashboard"

export default function Header() {
    return (
        <MainStyled>
            <Dashboard/>
        </MainStyled>
    )
}

//--------STYLES----------------------------------------------------------------------------------------------------//


export const MainStyled = styled.div`
    grid-area: m;
    display: grid;
    height: 100%;
    width: 100%;
`