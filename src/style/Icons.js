import styled from "styled-components"
import {CloseO} from "styled-icons/evil/CloseO"
import {PlusCircle} from "styled-icons/boxicons-solid/PlusCircle"
import {ChevronsRight} from "styled-icons/feather/ChevronsRight"
import {KeyboardArrowDown} from "styled-icons/material/KeyboardArrowDown"
import {Navicon} from "styled-icons/evil/Navicon"
import {NavigateBefore} from "styled-icons/material/NavigateBefore"
import {Edit3} from "styled-icons/feather/Edit3"

const sharedIconAttributes = `
    height: 2.4rem;
    width: 2.4rem;
    color: lightGrey;
`

export const Close = styled(CloseO)`
    ${sharedIconAttributes}
    color: ${props => props.theme.color.slate}
`
export const PlusIcon = styled(PlusCircle)`
    ${sharedIconAttributes}
    color: ${props => props.theme.color.turquoise}
`
export const ChevronIcon = styled(ChevronsRight)`
    ${sharedIconAttributes}
    color: ${props => props.theme.color.turquoise}
`

export const ArrowDown = styled(KeyboardArrowDown)`
    height: 3.2rem;
    width: 3.2rem;
    color: ${props => props.theme.color.turquoise}
`
export const ArrowLeft = styled(NavigateBefore)`
    height: 3.2rem;
    width: 3.2rem;
    color: ${props => props.theme.color.onyx}
`
export const NavIcon = styled(Navicon)`
    height: 4.2rem;
    width: 4.2rem;
    color: ${props => props.theme.color.onyx}
`
export const Edit = styled(Edit3)`
    height: 2.2rem;
    width: 2.2rem;
    color: ${props => props.theme.color.lightGrey}
`
