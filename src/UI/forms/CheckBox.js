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
               <Label checked={checked}>
             {
                    checked ? "Yes" : "No"
                }
            </Label>
            <Background checked={checked} onClick={() => handleClick()}>
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
    position: relative;
`

const Background = styled.div`
    height: 4rem;
    width: 8rem;
    background: ${props => props.checked ?  props.theme.color.slate : props.theme.color.lightGrey};
    border-radius: 20px;
    position: relative;
    cursor: pointer;
`
const Circle = styled.div`
    height: 3rem;
    width: 3rem;
    background: white;
    border-radius: 50%;
    border: .7px solid ${props => props.theme.color.lightGrey};
    position: absolute;
    transition: all .2s ease-in;
    top: .5rem;
    left: 2.3rem;
    transform: ${props => props.checked ? 'translateX(2.2rem)' : 'translateX(-2rem)' };
    cursor: pointer;
`

const Label = styled.label`
    font-size: 1.6rem;
    position: absolute;
    top: .8rem;
    font-weight: normal;
    height: 4rem;
    z-index: 10;
    pointer-events: none;
    text-align: center;
    color:  ${props => props.checked ?  props.theme.color.ice : props.theme.color.slate};
    transform: ${props => props.checked ?  'translateX(-1.4rem)' : 'translateX(1.2rem)'};
`
