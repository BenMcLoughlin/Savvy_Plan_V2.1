import styled from "styled-components"
import {CloseO} from "styled-icons/evil/CloseO"
import {PlusCircle} from "styled-icons/boxicons-solid/PlusCircle"
import {ChevronsRight} from "styled-icons/feather/ChevronsRight"


const sharedIconAttributes = `
    height: 2.2rem;
    width: 2.2rem;
    color: grey;
`

export const CloseIcon = styled(CloseO)`
    ${sharedIconAttributes}
    color: ${props => props.theme.color.dullSteelBlue}
`
export const PlusIcon = styled(PlusCircle)`
    ${sharedIconAttributes}
    color: ${props => props.theme.color.brightPopBlue}
`
export const ChevronIcon = styled(ChevronsRight)`
    ${sharedIconAttributes}
    color: ${props => props.theme.color.brightPopBlue}
`
