import styled from "styled-components"
import {BackgroundLightBlueGrey,BackgroundDarkerLightBlueGrey, colorSlateBlueGrey, ShadowLight, ShadowLifted} from "../../Shared/Styles"


//----------------SHARED THEMES-------------------------------------------------------------------------------

export const TileTheme = `
    border-radius: 6px
    background-color: #D6E2EC;
    ${colorSlateBlueGrey}
    ${ShadowLight}; 
    &:hover {
        cursor: pointer;
        transform: scale(1.0008);
        transition: all .3s ease;
        ${ShadowLifted}
    }
`

export const TilePaneStyled = styled.div`
    margin: 0 auto;
    padding: 1rem;
    height: 100vh;
    width: 100%;
    display: grid;
    ${BackgroundLightBlueGrey}
    grid-template-columns: repeat(16, 1fr);
    grid-template-rows: 2rem 1fr 3rem repeat(4, 1fr);
    grid-gap: 1rem;
    grid-template-areas: 
    "h h h h h h h h h h h h h h h h "
    "t t t t n n n n s s s s c c c c"
    "w w w w w w w w w w w w w w w w"
    "p p p p p p p p p p p p r r r r"
    "p p p p p p p p p p p p r r r r"
    "l l l l l l l l l l l l l l l l"
    "l l l l l l l l l l l l l l l l"
    ;
    
`

export const TilePaneFirstHeaderStyled = styled.div`
    grid-area: h;

`
export const TilePaneSecondHeaderStyled = styled.div`
    grid-area: w;

`
export const TaxTileStyled = styled.div`
    grid-area: t;
    ${TileTheme}
`
export const NetWorthTileStyled = styled.div`
    grid-area: n;
    ${TileTheme}
`
export const SavingsTileStyled = styled.div`
    grid-area: s;
    ${TileTheme}
`
export const CashflowTileStyled = styled.div`
    grid-area: c;
    ${TileTheme}
`
export const RetirementIncomeTileStyled = styled.div`
    grid-area: r;
    ${TileTheme}
`
export const LifetimeIncomeTileStyled = styled.div`
    grid-area: l;
    ${TileTheme}
`
export const SavingsPlanTileStyled = styled.div`
    grid-area: p;
    ${TileTheme}
`

// "h h h h h h h h h h h h h h h h h h h h"
// "t t t t t n n n n n s s s s s c c c c c"
// "p p p p p p p p p p p p p p r r r r r r"
// "l l l l l l l l l l l l l l l l l l l";