import styled from "styled-components"
import {fontSizeSmallest, fontSizeMedium, fontSizeLargest} from "../../../../Shared/Styles"
import {BackgroundLightBlueGrey,BackgroundColorNavyDark, colorGreyLight, fontSizeLarge, colorSlateBlueGrey, ShadowLight, ShadowLifted} from "../../../../Shared/Styles"

export const TileTheme = styled.div`
    height: 100%;
    border-radius: 6px
    ${ShadowLight}; 
    &:hover {
        cursor: pointer;
        transform: scale(1.0008);
        transition: all .3s ease;
        ${ShadowLifted}
    }
`


export const TinyTileStyled = styled(TileTheme)`
display: flex;
flex-direction: column;
height: 100%;
width: 100%;
background-color: #f7b032;
`
export const TileSubHeadingStyled = styled.div`
display: block;
float: left;
font-weight: 400;
${fontSizeSmallest}
${colorGreyLight}
margin-bottom: 1rem;
`
export const TileMainStyled = styled.div`
display: flex;
flex-direction: column;
padding-top: 1rem;
align-items: center;
float: left;
${fontSizeLarge}
${colorGreyLight}
font-weight: 800;
justify-content: center;
`
