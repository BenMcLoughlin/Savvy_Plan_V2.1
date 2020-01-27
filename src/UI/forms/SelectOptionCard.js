import React, { useState} from 'react';
import styled from "styled-components"
import _ from "lodash"

const SelectOptionCard = ({label, value, setValue})  => {

    const [selected, select] = useState(value)
    const handleSelect = (value) => {
        select(value)
        setValue(label, value)
    }


    return (
                    <Card selected={selected} onClick={() => handleSelect(!selected)}>
                        {_.startCase(label)}
                    </Card>

    )
}


export default SelectOptionCard

//-----------------------------------------------style-----------------------------------------------//


const Card = styled.div`
    margin: 1rem;
    padding: 2rem;
    min-height: 10rem;
    width: 30rem;
    color: ${props => props.selected ? "white" :  props.theme.color.slate}
    font-size: 2rem;
    border-radius: 5px;
    background: ${props => props.selected ? props.theme.color.blue : "white"}
    border: .7px solid ${props => props.theme.color.lightGrey};
    cursor: pointer;

`