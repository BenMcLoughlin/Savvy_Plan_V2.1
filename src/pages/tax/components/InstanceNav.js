import React, {useState,  useEffect} from "react"
import styled from "styled-components"
import _ from "lodash"
import {Close, PlusIcon} from "style/Icons"

const PhaseSelector = ({itemList, id, setId, onClick, color, addSection}) => {

    const [selected, select] = useState(id)
    const handleSelect = (value) => {
        select(value)
        setId(value)
    }
  
    useEffect(()=> {
        select(id)
     }, [id])

     console.log(itemList);
    return (
        <Container>
            <SelectWrapper>
                {
                    itemList.map(d =>  <SelectValue 
                            color={color}
                            key={d.id}
                            selected={selected === d.id} 
                            >
                                <TextAndValueWrapper>
   
                                    <Text onClick={() => handleSelect(d.id)}  selected={selected === d.id} >
                                    {`Ages ${d.age1} to ${d.age2}`}
                                    </Text>
                                </TextAndValueWrapper>

                 
                        <Delete onClick={onClick}/>
                     </SelectValue>)
                }
                {/* <Add
                onClick={() => addSection()}
                /> */}
            </SelectWrapper>
        </Container>
    )
}

export default PhaseSelector

//-----------------------------------------------style-----------------------------------------------//

const Container = styled.div`
    width: 100%;
    height: 4rem;
    font-size: 1.4rem;
    display: flex;
    align-items: center;
    border-radius: 5px;


`
const SelectWrapper = styled.div`
    height: 4rem;
    width: 100%;
    background: white;
    font-size: 1.4rem;
    background: white;
    border-radius: 5px;
    display: flex;
    flex-direction: row;

`
const TextAndValueWrapper = styled.div`
    display: flex;
    height: 4rem;
    flex-direction: column;

`

const Text = styled.label`
    font-size: 1.6rem;
    font-weight: normal;
    color: ${props => props.theme.color.slate}
    text-align: center;
    cursor: pointer;
`

const SelectValue = styled.div`
    padding: 1rem;
    margin: 0.7rem;
    height: 4rem;
    max-width: 15rem;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-right: ${props => props.selected ?  null : props.theme.border.primary};
    width: 100%;
    color: ${props => props.theme.color.slate}
    font-size: 1.6rem;
    border-radius: 5px;
    background: ${props => props.selected ? props.theme.color.ice : "white"}
    text-align: center;
`

const Delete = styled(Close)`
    width: 1.3rem;
    height: 4.3rem;
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
    margin-top: 1.2rem;
    color: white;
    display: flex;
    position: relative;
    color: grey;
    cursor: pointer;
`