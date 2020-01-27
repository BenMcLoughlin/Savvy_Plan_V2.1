import React from 'react'
import styled from "styled-components"


const NumberInput = ({label, type, value, name, required, handleChange})  => {

    return (
        <Wrapper>
            <Input
                name={name}
                onChange={e => handleChange(e)}
                value={value}
                type="number"
                required={required}
            ></Input>
            <Label>{label}</Label>
  
        </Wrapper>
    )
}


export default NumberInput

//-----------------------------------------------style-----------------------------------------------//

const Wrapper = styled.div`
    width: 10rem;
    height: 7rem;
    margin: 1.5rem;
    position: relative;
`
const Label = styled.label`
    font-size: 16px;
    font-weight: normal;
    position: absolute;
    width: 14rem;
    pointer-events: none;
    left: 5px;
    top: 1.7rem;
    transition: 200ms ease all;
    color: ${props => props.theme.color.lightGrey};

}

`
const Input = styled.input`
    background: none;
    background-color: white;
    color: ${props => props.theme.color.drab};
    font-size: 18px;
    padding: 1.4rem;
    display: block;
    width: 14rem;
    border: none;
    border-radius: 3px;
    margin: 1.2rem 0;
    border: .7px solid ${props => props.theme.color.lightGrey};

    &:focus {
    outline: none;

    &:focus ~ Label {
        transform: translateY(-3.4rem);
        font-size: 1.6rem;
        color: ${props => props.theme.color.lightGrey};
        font-weight: 700;
    }
    }

    &:valid ~ Label {
        transform: translateY(-3.4rem);
        font-size: 1.6rem;
        color: ${props => props.theme.color.lightGrey};
        font-weight: 700;
    }

`
