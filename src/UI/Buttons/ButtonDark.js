import React from 'react'
import styled from "styled-components"

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

//-----------------------------------------------STYLES-----------------------------------------------//


const ButtonComponent = styled.button`
    padding: 1rem;
    min-width: 165px;
    width: auto;
    height: 5rem;
    margin: 1rem;
    background: ${props => props.theme.color.slate};
    color: ${props => props.theme.color.ice};
    cursor: pointer;
    outline: none;
    border-radius: 5rem;
    text-transform: uppercase;
    position: relative;
    font-size: 1.6rem;
`

//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
/* Used to open the AddNewItem container or submit the details gathered to the reducer. 
Currently this button is local to the NetWorth App but it could be placed in the UI 
folder and be global to the entire app.  */