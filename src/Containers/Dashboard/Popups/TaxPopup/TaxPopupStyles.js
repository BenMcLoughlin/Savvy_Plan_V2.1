import styled from "styled-components"
import {fontSize, color, backgroundColor} from "../../../../Shared/Styles"

export const PopupStyled = styled.div`
position: relative;
grid-area: m;
display: grid;
margin: 0 auto;
padding: 1rem;
height: 100%;
width: 100%;
${backgroundColor.lightBlueGrey}
grid-template-columns: repeat(12, minmax(10rem, 30rem));
grid-template-rows: 6rem repeat(4, minmax(8rem, 14rem));
grid-gap: 1rem;
grid-template-areas: 
"h h h h h h h h h h h h"
"i i i d d d r r r r r r"
"i i i d d d r r r r r r"
"i i i d d d r r r r r r"
"i i i d d d r r r r r r"
`
export const PopupHeaderStyled = styled.div`
font-weight: 400;
grid-area: h;
display: grid;
`
export const MainText = styled.div`
${fontSize.large}
`
export const MainSubText = styled.div`
padding-top: 1rem;
padding-left: 1rem;
${fontSize.small}
`
export const IncomeSliders = styled.div`
grid-area: i;
padding-top: 1rem;
padding-left: 1rem;
${backgroundColor.navyDark}
${fontSize.small}
border-radius: 3px;
color: white;
`
 
export const DeductionSliders = styled.div`
grid-area: d;
padding-top: 1rem;
padding-left: 1rem;
background-color: yellow;
${fontSize.small}
`
export const Results = styled.div`
grid-area: r;
padding-top: 1rem;
padding-left: 1rem;
background-color: Green;
${fontSize.small}
`
 