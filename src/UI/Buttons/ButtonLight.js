import React from 'react'
import styled from "styled-components"
import {PlusIcon} from "../../Styles/Icons"

const Button = (props) => {
    return (
        <ButtonComponent
            onClick={props.handleClick}
        >
            {props.text}
        </ButtonComponent>
    )
}



export default Button

//-----------------------------------------------STYLES-----------------------------------------------//


const ButtonComponent = styled.button`
    padding: 1rem;
    width: 10rem;
    height: 4rem;
    margin: 1rem;
    background: ${props => props.theme.color.background2};
    color: ${props => props.theme.color.dullSteelBlueDark};
    cursor: pointer;
    outline: none;
    border-radius: 5rem;
    text-transform: uppercase;
    position: relative
`

const PlusIconButton = styled(PlusIcon)`
    position: absolute;
    left: .8rem;
    bottom: .8rem;
`

//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
/* Used to open the AddNewItem container or submit the details gathered to the reducer. 
Currently this button is local to the NetWorth App but it could be placed in the UI 
folder and be global to the entire app.  */