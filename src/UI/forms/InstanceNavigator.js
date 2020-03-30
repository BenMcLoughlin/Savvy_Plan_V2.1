import React, {useState} from "react"
import styled from "styled-components"
import _ from "lodash"
import {Close, PlusIcon} from "style/Icons"

const PhaseSelector = ({itemList, id, setId, deleteInstance, color, addSection}) => {

    const [selected, select] = useState(id)
    const handleSelect = (value) => {
        select(value)
        setId(value)
    }
    console.log(itemList);

    return (
        <Container>
            <Label>
                Earning Phases
            </Label>
            <SelectWrapper>
                {
                    itemList.map(d =>  <SelectValue 
                        color={color}
                            key={d.id}
                            selected={selected === d.id} 
                            >
                                <Text onClick={() => handleSelect(d.id)}>
                                {`${d.age1} "-" ${d.age2}`}
                                </Text>
                 
                        <Exit onClick={() =>  deleteInstance(d)}/>
                     </SelectValue>)
                }
                <Add
                onClick={addSection}
                />
            </SelectWrapper>
        </Container>
    )
}

export default PhaseSelector

//-----------------------------------------------style-----------------------------------------------//

const Container = styled.div`
    width: 100%;
    height: 5rem;
    font-size: 1.4rem;
    display: flex;
    align-content: center;
    border-radius: 5px;
    border: ${props => props.theme.border.primary}

`
const SelectWrapper = styled.div`
    height: 5rem;
    width: 100%;
    background: white;
    font-size: 1.4rem;
    overflow: scroll;
    background: white;
    border-radius: 5px;
    display: flex;
    flex-direction: row;

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
const Text = styled.label`
    font-size: 1.6rem;
    font-weight: normal;
    color: ${props => props.selected ? "white" :  props.theme.color.slate}
    text-align: center;
    cursor: pointer;
`

const SelectValue = styled.div`
    padding: 1rem;
    margin: 0.5rem;
    height: 4rem;
    max-width: 15rem;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    color: ${props => props.selected ? "white" :  props.theme.color.slate}
    font-size: 1.6rem;
    background: ${props => props.selected ? props.color : "white"}
    text-align: center;
    &:hover {
        background: ${props => props.selected ? props.color : props.theme.color.ice}
        color: ${props => props.selected ? "white" :  props.theme.color.slate}
    }
`

const Exit = styled(Close)`
    width: 1.3rem;
    height: 1.3rem;
    color: ${props => props.theme.color.grey};
    display: flex;
    position: absolute;
    top: .2rem;
    right: .2rem;
    z-index: 500;
    cursor: pointer;
`
const Add = styled(PlusIcon)`
    width: 4rem;
    color: white;
    display: flex;
    position: relative;
    color: grey;
    cursor: pointer;
`