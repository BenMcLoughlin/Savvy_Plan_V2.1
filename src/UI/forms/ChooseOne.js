import React, {useState} from "react"
import styled from "styled-components"
import _ from "lodash"

const ChooseOne = ({value, setValue, array, subCategory, title}) => {

    const [selected, select] = useState(value)
    const handleSelect = (value) => {
        select(value)
        setValue(value)
    }

    return (
        <Container>
            <Label>
                 {title ? `${title}` : "Choose One"}
            </Label>
            <SelectWrapper>
                {
                    array.map(d =>  <SelectValue 
                            key={d}
                            selected={selected === d} 
                            subCategory={subCategory}
                            onClick={() => handleSelect(d)}>
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
    height: 28rem;
    font-size: 1.4rem;
    display: flex;
    flex-direction: column;
    margin-top: -1.6rem;

`
const SelectWrapper = styled.div`
    height: 18rem;
    background: white;
    font-size: 1.4rem;
    overflow: scroll;
    background: white;
    border-radius: 5px;
    border: .7px solid ${props => props.theme.color.lightGrey};
    display: flex;
    flex-direction: column;

`
const Label = styled.label`
    font-size: 1.6rem;
    font-weight: normal;
    color: ${props => props.theme.color.darkGrey};
    width: 25rem;
    height: 4rem;
    padding: 1rem;
    font-weight: 700;
    text-align: left;
`

const SelectValue = styled.div`
    padding: 2rem;
    height: 10rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    color: ${props => props.selected ? "white" :  props.theme.color.slate}
    font-size: 1.6rem;
    background: ${props => props.selected ? (
        props => props.subCategory === "investmentAssets" ? props.theme.color.steelBlue : 
        props => props.subCategory === "propertyAssets" ? props.theme.color.green : 
        props => props.subCategory === "unsecuredDebt" ? props.theme.color.salmon : 
        props => props.subCategory === "securedDebt" ? props.theme.color.darkSalmon : 
        props.theme.color.blue ) : "white"}
    text-align: center;
    &:hover {
        background: ${props => props.selected ? (
                                                props => props.subCategory === "investmentAssets" ? props.theme.color.steelBlue : 
                                                props => props.subCategory === "propertyAssets" ? props.theme.color.green : 
                                                props => props.subCategory === "unsecuredDebt" ? props.theme.color.salmon : 
                                                props => props.subCategory === "securedDebt" ? props.theme.color.darkSalmon : 
                                                props.theme.color.blue ) : props.theme.color.ice}
        color: ${props => props.selected ? "white" :  props.theme.color.slate}
        cursor: pointer;
    }
`
