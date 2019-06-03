import styled from "styled-components"
import {fontSizeSmallest, fontSizeMedium, fontSizeLargest} from "../../../Shared/Styles"

export const SquareTileStyled = styled.div`
display: flex;
flex-direction: column;
height: 100%;

${fontSizeMedium}
`
export const TileHeadingStyled = styled.div`
display: block;
float: left;
padding: 1rem;
${fontSizeMedium}
`
export const TileSubHeadingStyled = styled.div`
display: block;
float: left;
font-weight: 300;
${fontSizeSmallest}
margin-bottom: 1rem;
`
export const TileMainStyled = styled.div`
display: flex;
flex-direction: column;
align-items: center;
float: left;
${fontSizeLargest}
font-weight: 800;
justify-content: center;
border-bottom: 1px solid white;
`
export const TileChartStyled = styled.div`
display: flex;
flex-direction: column;
align-items: center;
float: left;
${fontSizeLargest}
font-weight: 800;
justify-content: center;
`