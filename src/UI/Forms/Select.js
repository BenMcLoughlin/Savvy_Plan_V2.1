import React, { useState, useEffect, useRef } from 'react';
import styled from "styled-components"
import {ArrowDown} from "styles/Icons"
import {useComponentVisible} from "services/ui/ui_functions"


const Select = ({label, type, value, name, required, handleChange, setYear})  => {

    const renderYears = () => {
        const yearArray = []
        for (let i = 2010; i > 1930; i--) {
            yearArray.push(i)
            }
        type === "year" ? 
            yearArray.map(year => <SelectValue type={"type"} onClick={() => setYear(year)}>{year}</SelectValue>)
        : 
            provinceArray.map(year => <SelectValue type={"type"} onClick={() => setYear(year)}>{year}</SelectValue>
        )

    }
    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(true)
    return (
        <Wrapper >
             <Input
                name={name}
                onChange={e => handleChange(e)}
                value={value}
                type={type}
                required={required}

            ></Input>
            <Label>{label}</Label>
            <ArrowPositioner onClick={() => setIsComponentVisible(!isComponentVisible)} >
                 <ArrowDown/>
            </ArrowPositioner>
            <div ref={ref}>
                {isComponentVisible && (<DropDown>{renderYears()}</DropDown>)}
            </div>

            
        </Wrapper>
    )
}


export default Select

//-----------------------------------------------STYLES-----------------------------------------------//

const Wrapper = styled.div`
    width: 45rem;
    height: 7rem;
    margin: 1.5rem;
    position: relative;
`
const Label = styled.label`
    font-size: 16px;
    font-weight: normal;
    position: absolute;
    pointer-events: none;
    left: 5px;
    top: 1.7rem;
    transition: 200ms ease all;
    color: ${props => props.theme.color.grey};

}

`
const Input = styled.input`
    background: none;
    background-color: white;
    color:${props => props.theme.color.drab};
    font-size: 18px;
    padding: 1.4rem;
    display: block;
    width: 50rem;
    border: none;
    border-radius: 3px;
    margin: 1.2rem 0;
    border: .7px solid ${props => props.theme.color.grey};

    &:focus {
    outline: none;

    &:focus ~ Label {
        transform: translateY(-3.4rem);
        font-size: 1.6rem;
        color: ${props => props.theme.color.grey};
        font-weight: 700;
    }
    }

    &:valid ~ Label {
        transform: translateY(-3.4rem);
        font-size: 1.6rem;
        color: ${props => props.theme.color.grey};
        font-weight: 700;
    }

`
const ArrowPositioner = styled.div`
    position: relative;
    top: -5rem;
    left: 45rem;
    cursor: pointer;
`

const DropDown = styled.div`
    position: absolute;
    top: 7rem;
    height: 30rem;
    width: 50rem;
    background: white;
    z-index: 500;
    overflow: hidden;
    border-radius: 5px;
    border: .7px solid ${props => props.theme.color.grey};
    display: flex;
    flex-wrap: wrap;
    overflow: scroll;
    box-shadow: 1px 2px 4px rgba(0, 0, 0, .5);
    padding: 2rem;
`

const SelectValue = styled.div`
    padding: 2rem
    width: ${props => props.type === "province" ? "100%" : "20%"};
    color: ${props => props.theme.color.slate};
    font-size: 2rem;
    &:hover {
        background: ${props => props.theme.color.ice};
        border-bottom: .7px solid ${props => props.theme.color.grey};
        cursor: pointer;
    }
`

const provinceArray = [
    "Alberta",
    "British Columbia",
    "Manitoba",
    "New Brunswick",
    "Newfoundland and Labrador",
    "Nova Scotia",
    "Ontario",
    "Prince Edward Island",
    "Quebec",
    "Saskatchewan",
    "Northwest Territories",
    "Nunavut",
    "Yukon",
]