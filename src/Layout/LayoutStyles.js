import styled from "styled-components"

export const LayoutStyled = styled.div`
    margin: 0 auto;
    height: 100vh;
    width: 95vw;
    display: grid
    background-color: blue
    grid-template-rows: 10rem 1fr 5rem;
    grid-template-columns: repeat(12, 1fr);
    grid-template-areas: 
    "h h h h h h h h h h h h h"
    "m m m m m m m m m m m m m"
    "f f f f f f f f f f f f f";
`