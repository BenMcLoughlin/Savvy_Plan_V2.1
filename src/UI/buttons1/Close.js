import React from 'react'
import styled from "styled-components"


const CloseButton = ({rangeBarProps, handleRemoveItem}) => {

    return (

            <Cross onClick={() => handleRemoveItem(rangeBarProps)}/>
    )

}

export default CloseButton

const Cross = styled.div`
position: relative;
height: 2rem; /* this can be anything */
width: 2rem;  /* ...but maintain 1:1 aspect ratio */
display: flex;
flex-direction: column;
justify-content: center;
align-items:center;
text-align: center;
cursor: pointer;
border: 1px solid grey;
border-radius: 50%;
   &::before,
   &::after {
    position: absolute;
    content: '';
    width: 50%;
    border-radius: 3px;
    height: 1px; /* cross thickness */
    background-color: ${props => props.theme.color.slate};
}

&::before {
    transform: rotate(45deg);
}

&::after {
    transform: rotate(-45deg);
}
`