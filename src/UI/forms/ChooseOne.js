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
            <Label>
                 Choose One
            </Label>
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
    width: 25rem;
    height: 25rem;
    background: white;
    font-size: 1.4rem;
    overflow: scroll;
    display: flex;
    flex-direction: column;
    margin-top: -2rem;


`
const SelectWrapper = styled.div`
    min-height: 20rem;
    max-height: 23rem;
    background: white;
    font-size: 1.4rem;
    overflow: scroll;
    background: white;
    border-radius: 5px;
    border: .7px solid ${props => props.theme.color.lightGrey};
    display: flex;
    flex-direction: column;
    align-items:center;
    justify-content: center;

`
const Label = styled.label`
    font-size: 1.6rem;
    font-weight: normal;
    color: ${props => props.theme.color.lightGrey};
    width: 25rem;
    padding: 1rem;
    font-weight: 700;
    text-align: left;
`

const SelectValue = styled.div`
    padding: 2rem;
    hieght: 3rem;
    width: 98%;
    color: ${props => props.selected ? "white" :  props.theme.color.slate}
    font-size: 1.6rem;
    background: ${props => props.selected ? props.theme.color.blue : "white"}
    text-align: center;
    &:hover {
        background: ${props => props.selected ? props.theme.color.blue : props.theme.color.ice}
        color: ${props => props.selected ? "white" :  props.theme.color.slate}
        cursor: pointer;
    }
`