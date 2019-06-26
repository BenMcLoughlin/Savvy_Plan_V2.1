import React from 'react'
import styled from "styled-components"


export default function Learn() {
    return (
        <LearnWrapper>
            Learning Page
        </LearnWrapper>
    )
}



export const LearnWrapper = styled.div`
    grid-area: m;
    background: ${props => props.theme.linearGradient.primary};
    display: grid;
    height: 100%;
    width: 100%;
`

