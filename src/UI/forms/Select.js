import React from 'react';
import styled from "styled-components"
import {ArrowDown} from "style/Icons"
import {useComponentVisible} from "services/ui/ui_functions"


const Select = ({label, selectType, type, value, name, required, handleChange, setValue})  => {

    const handleSelect = (name, year) => {
        setIsComponentVisible(!isComponentVisible)
        setValue(name, year)
    }

    const renderYears = () => {
        const yearArray = []
        for (let i = 2030; i > 1930; i--) {
           yearArray.push(i)
        }
       return yearArray.map(year => <SelectValue selectType={selectType} onClick={() => handleSelect(name, year)}>{year}</SelectValue>)
    }

    const renderText = () => {
       return provinceArray.map(province => <SelectValue selectType={selectType} onClick={() => handleSelect(name, province)}>{province}</SelectValue>)
    }
    
    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false)

    return (
        <Wrapper >
             <Input
                name={name}
                onChange={e => handleChange(e)}
                type="text" 
                autoComplete="off"
                value={value}
                required={required}
                onClick={() => setIsComponentVisible(!isComponentVisible)}
            ></Input>
            <Label>{label}</Label>
            <ArrowPositioner onClick={() => setIsComponentVisible(!isComponentVisible)} >
                 <ArrowDown/>
            </ArrowPositioner>
            <div ref={ref}>
                {isComponentVisible && (<DropDown >{selectType === "year" ? renderYears() : renderText()}</DropDown>)}
            </div>

            
        </Wrapper>
    )
}


export default Select

//-----------------------------------------------style-----------------------------------------------//

const Wrapper = styled.div`
    width: 35rem;
    height: 7rem;
    margin: 2rem 0 2rem 0;
    position: relative;
`

const Label = styled.label`
    font-size: 1.6rem;
    font-weight: normal;
    position: absolute;
    pointer-events: none;
    left: 1rem;
    top: 1.2rem;
    transition: 200ms ease all;
    color: ${props => props.theme.color.lightGrey};

}

`
const Input = styled.input`
    background: none;
    background-color: white;
    color: ${props => props.theme.color.darkGrey};
    font-size: 14px;
    padding: 1.2rem;
    display: block;
    width: 35rem;
    height: 5rem;
    border: none;
    border-radius: 3px;
    border: .7px solid ${props => props.theme.color.lightGrey};

    &:focus {
    outline: none;
    border: .7px solid ${props => props.theme.color.turquoise};

    &:focus ~ Label {
        transform: translateY(-4rem);
        font-size: 1.6rem;
        color: ${props => props.theme.color.lightGrey};
        font-weight: 700;
    }
    }

    &:valid ~ Label {
        transform: translateY(-4rem);
        font-size: 1.6rem;
        color: ${props => props.theme.color.lightGrey};
        font-weight: 700;
    }

`
const ArrowPositioner = styled.div`
    position: absolute;
    top: 1rem;
    left: 30rem;
    cursor: pointer;
`

const DropDown = styled.div`
    position: absolute;
    top: 5rem;
    height: 20rem;
    width: 35rem;
    background: white;
    z-index: 250000;
    overflow: hidden;
    border-radius: 5px;
    border: .7px solid ${props => props.theme.color.lightGrey};
    display: flex;
    flex-wrap: wrap;
    overflow: scroll;
    box-shadow: 1px 2px 4px rgba(0, 0, 0, .5);
    padding: 2rem;
`

const SelectValue = styled.div`
    padding: 2rem
    width: ${props => props.selectType === "year" ? "20%" : "100%"};
    color: ${props => props.theme.color.slate};
    font-size: 1.4rem;
    boz-sizing: border-box;
    &:hover {
        background: ${props => props.theme.color.ice};
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
