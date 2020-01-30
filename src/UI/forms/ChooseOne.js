import React, {useState} from "react"
import styled from "styled-components"
import _ from "lodash"

const ChooseOne = ({value, setValue, array}) => {

    const [selected, select] = useState(value)
    const handleSelect = (value) => {
        select(value)
        setValue(value)
    }

    return (
        <Container>
            Choose One
            <SelectWrapper>
                {
                    array.map(d =>  <SelectValue selected={selected === d} onClick={() => handleSelect(d)}>
                        {d === "tfsa" || d === "rrsp" ? d.toUpperCase()
                        : _.startCase(d) 
                    }


                        </SelectValue>)
                }
            </SelectWrapper>
        </Container>
    )
}

export default ChooseOne

//-----------------------------------------------style-----------------------------------------------//

const Container = styled.div`
 width: 30rem;
 min-height: 20rem;
 background: white;
 font-size: 1.4rem;

`
const SelectWrapper = styled.div`
    width: 30rem;
    height: 23rem;
    background: white;
    border-radius: 5px;
    border: .7px solid ${props => props.theme.color.lightGrey};
    display: flex;
    flex-direction: column;
    align-items:center;
    justify-content: center;

`

const SelectValue = styled.div`
    padding: 2rem
    width: 98%;
    color: ${props => props.selected ? "white" :  props.theme.color.slate}
    font-size: 2rem;
    background: ${props => props.selected ? props.theme.color.blue : "white"}
    text-align: center;
    &:hover {
        background: ${props => props.selected ? props.theme.color.blue : props.theme.color.ice}
        color: ${props => props.selected ? "white" :  props.theme.color.slate}
        cursor: pointer;
        overflow: hidden;
    }
`