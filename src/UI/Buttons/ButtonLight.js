import React from 'react'
import styled from "styled-components"

const Button = ({text, backward, forward, onClick}) => {
    return (

        text ?
        <ButtonComponent
             onClick={onClick}
        >
          {text}

        </ButtonComponent>
        :
        backward ?
        <ButtonComponent
        onClick={onClick}
         >
            &#10094;
            &#10094;
        </ButtonComponent>
        :
        forward ?
        <ButtonComponent
        onClick={onClick}
            >
            &#10095;
            &#10095;
        </ButtonComponent>
        :
        null


    )
}



export default Button

//-----------------------------------------------STYLES-----------------------------------------------//


const ButtonComponent = styled.button`
    padding: 1rem;
    min-width: 8rem;
    width: auto;
    height: 5rem;
    margin: 1rem;
    background: ${props => props.theme.color.ice};
    color: ${props => props.theme.color.slate};
    cursor: pointer;
    outline: none;
    border-radius: 5rem;
    text-transform: uppercase;
    position: relative;
    font-size: 1.6rem;
`
