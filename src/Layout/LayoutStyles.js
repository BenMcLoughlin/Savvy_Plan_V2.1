import styled from "styled-components"

export const GridContainer = styled.div`
    margin: 0 auto;
    height: 100vh;
    width: 100vw;
    display: grid;
    ${props => props.theme.linearGradient.backGround};
    grid-template-rows: 1fr 5rem;
    grid-template-columns: repeat(12, 1fr);
    grid-template-areas: 
    "m m m m m m m m m m m m m"
    "f f f f f f f f f f f f f";
`
