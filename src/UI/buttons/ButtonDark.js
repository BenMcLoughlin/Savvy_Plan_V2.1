import React from 'react'
import styled from "styled-components"
import {buttonStyles} from "style/Themes"

const ButtonDark = ({onClick, text}) => {
    return (
        <ButtonComponent
            onClick={onClick}
        >
            {text}
        </ButtonComponent>
    )
}



export default ButtonDark

//-----------------------------------------------style-----------------------------------------------//


const ButtonComponent = styled.button`
    ${buttonStyles};
    color: ${props => props.theme.color.ice};
    background: ${props => props.theme.color.slate};
`

//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
/* Used to open the AddNewItem container or submit the details gathered to the reducer. 
Currently this button is local to the NetWorth App but it could be placed in the UI 
folder and be global to the entire app.  */