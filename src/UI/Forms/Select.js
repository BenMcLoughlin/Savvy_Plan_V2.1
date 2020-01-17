import React from 'react';
import styled from "styled-components"
import {ArrowDown} from "styles/Icons"
import {useComponentVisible} from "services/ui/ui_functions"


const Select = ({label, selectType, type, value, name, required, handleChange, setValue})  => {

    const handleSelect = (name, year) => {
        setIsComponentVisible(!isComponentVisible)
        setValue(name, year)
    }

    const renderYears = () => {
        const yearArray = []
        for (let i = 2010; i > 1930; i--) {
           yearArray.push(i)
        }
       return yearArray.map(year => <SelectValue selectType={selectType} onClick={() => handleSelect(name, year)}>{year}</SelectValue>)
    }

    const renderProvinces = () => {
       return provinceArray.map(province => <SelectValue selectType={selectType} onClick={() => handleSelect(name, province)}>{province}</SelectValue>)
    }
    
    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false)

    return (
        <Wrapper >
             <Input
                name={name}
                onChange={e => handleChange(e)}
                value={value}
                type={type}
                required={required}
                onClick={() => setIsComponentVisible(!isComponentVisible)}
            ></Input>
            <Label>{label}</Label>
            <ArrowPositioner onClick={() => setIsComponentVisible(!isComponentVisible)} >
                 <ArrowDown/>
            </ArrowPositioner>
            <div ref={ref}>
                {isComponentVisible && (<DropDown >{selectType === "year" ? renderYears() : renderProvinces()}</DropDown>)}
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
    width: ${props => props.selectType === "year" ? "20%" : "100%"};
    color: ${props => props.theme.color.slate};
    font-size: 2rem;
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