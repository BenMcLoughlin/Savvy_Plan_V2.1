import React from 'react'
import styled from "styled-components"
import {PlusIcon} from "../../Styles/Icons"

export const AddButton = (props) => {
    return (
        <Button1
            onClick={props.handleClickToAddNewItem}
        >
        <PlusIconButton/>
            Add
        </Button1>
    )
}
export const NewButton = (props) => {
    return (
        <Button
            onClick={props.handleClickToAddNewItem}
        >
        <PlusIconButton/>
            New Item
        </Button>
    )
}




//-----------------------------------------------STYLES-----------------------------------------------//


const Button = styled.button`
    padding: 1rem;
    width: 12rem;
    height: 4rem;
    margin: 1rem;
    background: ${props => props.theme.color.dullSteelBlue};
    color: white;
    cursor: pointer;
    outline: none;
    border-radius: 10rem;
    text-transform: uppercase;
    position: relative
`
const Button1 = styled(Button)`
    position: absolute;
    bottom: -.4rem;
    left: .2rem;
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