import styled from "styled-components"
import {BackgroundLightBlueGrey, border, BackgroundDarkerLightBlueGrey, fontSizeMedium, colorSlateBlueGrey, ShadowLight, ShadowLifted} from "../../Shared/Styles"


//----------------SHARED THEMES-------------------------------------------------------------------------------

export const TileTheme = `
    border-radius: 6px
    background-color: #D6E2EC;
    ${colorSlateBlueGrey}
    ${ShadowLight}; 
    height: 100%;
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
    grid-template-rows: 2rem repeat(2, minmax(5rem, 8rem)) 3rem repeat(6, 1fr);
    grid-gap: 1rem;
    grid-template-areas: 
    "h h h h h h h h h h h h h h h h "
    "t t t t n n n n s s s s g g g g"
    "t t t t n n n n s s s s c c c c"
    "w w w w w w w w w w w w w w w w"
    "p p p p p p p p p p p p r r r r"
    "p p p p p p p p p p p p r r r r"
    "p p p p p p p p p p p p r r r r"
    "l l l l l l l l l l l l l l l l"
    "l l l l l l l l l l l l l l l l"
    "l l l l l l l l l l l l l l l l"
    ;
    
`

export const TilePaneFirstHeaderStyled = styled.div`
    grid-area: h;
   ${fontSizeMedium}
   margin-left: 3rem;
   ${colorSlateBlueGrey}
   ${border}

`
export const TilePaneSecondHeaderStyled = styled(TilePaneFirstHeaderStyled)`
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
export const FinancialGradeTileStyled = styled.div`
    grid-area: g;
    ${TileTheme}
`
export const SavingsTileStyled = styled.div`
    grid-area: s;
    ${TileTheme}
    height: 100%;
`
export const CashflowTileStyled = styled.div`
    grid-area: c;
    ${TileTheme}
`
export const RetirementIncomeTileStyled = styled.div`
    grid-area: r;
    ${TileTheme}
    height: 100%;
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