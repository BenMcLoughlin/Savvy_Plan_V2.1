import React, {useState} from "react"
import styled from "styled-components"


const LeftNavBar = () => {

    const [visible, setVisible] = useState(false)

    return (
        <LeftNavBarWrapper>
            {
                visible ? "hi" : <Hamburger/>
            }

        </LeftNavBarWrapper>
    )
}

export default LeftNavBar 


const LeftNavBarWrapper = styled.div`
    position: absolute;
    top: 10rem;
    left: 2rem;
`

const Hamburger = styled.div`

    width: 2.4rem;
    height: .2rem;
    border-radius: 3px;
    background: ${props => props.theme.color.slate};
    position: absolute;
    cursor: pointer;

    &:before {
        content: "";
        width: 2.4rem;
        border-radius: 3px;
        height: .3rem;
        background: ${props => props.theme.color.slate};
        position: absolute;
        top: -.6rem;
    }
    &::after {
        content: "";
        width: 2.4rem;
        height: .3rem;
        position: absolute;
        border-radius: 3px;
        background: ${props => props.theme.color.slate};
        position: absolute;
        top: .5rem;
    }
`