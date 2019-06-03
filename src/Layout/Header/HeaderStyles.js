import styled from "styled-components"
import {BackgroundLight, fontSizeLargest} from "../../Shared/Styles"

export const HeaderStyled = styled.div`
    grid-area: h;
    ${BackgroundLight};
    border-bottom: 1px solid grey;
    padding: 2rem;
    ${fontSizeLargest};
    text-align: center;
`