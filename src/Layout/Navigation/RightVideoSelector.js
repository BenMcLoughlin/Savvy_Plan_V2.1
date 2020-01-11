import React, {useState} from "react"
import styled from "styled-components"

const RightVideoSelector = () => {

    const [visible, setVisible] = useState(false)

    return (
        <RightVideoSelectorWrapper>
            {
                visible ? "hi" : <Arrow/>
            }

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

const Arrow = styled.div`

    width: 2.4rem;
    height: .2rem;
    border-radius: 3px;
    background: ${props => props.theme.color.slate};
    position: absolute;

    transform: rotate(45deg);

    &:before {
        content: "";
        width: 2.4rem;
        border-radius: 3px;
        height: .2rem;
        background: ${props => props.theme.color.slate};
        position: absolute;
        top: -10px;
        left: -12px;
        transform: rotate(-90deg);
    }

`