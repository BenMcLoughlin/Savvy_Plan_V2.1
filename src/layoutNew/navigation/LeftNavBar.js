import React from "react"
import styled from "styled-components"
import {NavIcon} from "style/Icons"

const LeftNavBar = () => {


    return (
        <LeftNavBarWrapper>
            <NavIcon/>
        </LeftNavBarWrapper>
    )
}

export default LeftNavBar 


const LeftNavBarWrapper = styled.div`
    position: absolute;
    top: 10rem;
    left: 2rem;
`
