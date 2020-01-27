import React from 'react'
import styled from "styled-components"
import {buttonStyles} from "style/Themes"

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

//-----------------------------------------------style-----------------------------------------------//


const ButtonComponent = styled.button`
    ${buttonStyles};
    background: ${props => props.theme.color.ice};
    color: ${props => props.theme.color.slate};
`
