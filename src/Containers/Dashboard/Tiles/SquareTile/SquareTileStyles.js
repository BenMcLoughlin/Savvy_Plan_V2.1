import styled from "styled-components"
import {fontSizeSmallest, fontSizeMedium, fontSizeLargest, fontSize, color, backgroundColor,boxShadow} from "../../../../Shared/Styles"


export const TileTheme = styled.div`
    border-radius: 6px
    ${color.slateBlueGrey}
    ${backgroundColor.greyLight}
    ${boxShadow.light}; 
    &:hover {
        cursor: pointer;
        transform: scale(1.0008);
        transition: all .3s ease;
        ${boxShadow.lifted}
    }
`


export const SquareTileStyled = styled(TileTheme)`
display: flex;
flex-direction: column;
height: 100%;
width: 100%;

${fontSize.medium}
`
export const TileHeadingStyled = styled.div`
display: block;
float: left;
padding: 1rem;
${fontSize.medium}
`
export const TileSubHeadingStyled = styled.div`
display: block;
float: left;
font-weight: 300;
${fontSize.smallest}
margin-bottom: 1rem;
`
export const TileMainStyled = styled.div`
display: flex;
flex-direction: column;
align-items: center;
float: left;
${fontSize.largest}
font-weight: 800;
justify-content: center;
border-bottom: 1px solid white;
`
export const TileChartStyled = styled.div`
display: flex;
flex-direction: column;
height: 100%;
align-items: center;
float: left;
${fontSize.largest}
font-weight: 800;
justify-content: center;
`