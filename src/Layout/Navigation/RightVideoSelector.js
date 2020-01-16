import React from "react"
import styled from "styled-components"
import {ArrowLeft} from "styles/Icons"

const RightVideoSelector = () => {

 return (
        <RightVideoSelectorWrapper>
            <ArrowLeft/>

        </RightVideoSelectorWrapper>
    )
}

export default RightVideoSelector


const RightVideoSelectorWrapper = styled.div`
    position: absolute;
    top: 10rem;
    right: 5rem;
    cursor: pointer;
`

