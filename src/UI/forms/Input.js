import React from 'react'
import styled from "styled-components"


const FormInput = ({label, type, value, name, required, handleChange})  => {
//const [error, showError] = useState(false)


    // const validate = text => {

    //    return label === "Email" ? 
    //           (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(text)) ? showError(false) : showError(true) 
    //     : 
    //     label === "Password" ? 
    //         text.length > 6 ? showError(false) : showError(true) 
    //     :
    //     null
    // }

    return (
        <Wrapper>
            <Input
                name={name}
                onChange={e => handleChange(e)}
                value={value}
                type={type}
                required={required}
            ></Input>
            <Label>{label}</Label>
            {/* {
                error ? 
                   <Error>{`Please Enter a valid ${label}`}</Error>
                : null
            } */}
          
        </Wrapper>
    )
}


export default FormInput

//-----------------------------------------------style-----------------------------------------------//

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
    color: ${props => props.theme.color.drab};
    font-size: 18px;
    padding: 1.4rem;
    display: block;
    width: 50rem;
    border: none;
    border-radius: 3px;
    margin: 1.2rem 0;
    border: .7px solid ${props => props.theme.color.drab};

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
