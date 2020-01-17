import React, {useState} from 'react'
import styled from "styled-components"


const Checkbox = ({handleChange, value})  => {

    const [checked, setChecked] = useState(value)
   
    const handleClick = () => {
        setChecked(!checked)
        handleChange(!checked)
    }
    return (
        <Wrapper>
               <Label>
             {
                    checked ? "Yes" : "No"
                }
            </Label>
            <Background onClick={() => handleClick()}>
                <Circle checked={checked} onClick={() => handleClick()}/>
            </Background>
        </Wrapper>
    )
}


export default Checkbox

//-----------------------------------------------style-----------------------------------------------//

const Wrapper = styled.div`
    width: 10rem;
    height: 7rem;
    display: flex;
    align-items: center;
    flex-direction: column;
`

const Background = styled.div`
    height: 4rem;
    width: 8rem;
    background: #84A7B7;
    border-radius: 20px;
    position: relative;
    cursor: pointer;
`
const Circle = styled.div`
    height: 3rem;
    width: 3rem;
    background: white;
    border-radius: 50%;
    border: .7px solid ${props => props.theme.color.grey};
    position: absolute;
    transition: all .2s ease-in;
    top: .3rem;
    left: 2.3rem;
    transform: ${props => props.checked ? 'translateX(2.2rem)' : 'translateX(-2rem)'};
    cursor: pointer;
`

const Label = styled.label`
    font-size: 2rem;
    font-weight: normal;
    height: 4rem;
    pointer-events: none;
    text-align: center;
    color: ${props => props.theme.color.grey};
`
