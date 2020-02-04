import React from 'react'
import styled from "styled-components"
import _  from "lodash"

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
                autoComplete="off"
                required={required}
            ></Input>
            <Label>{_.startCase(label)}</Label>
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
    width: 35rem;
    height: 7rem;
    margin: 2rem 0 2rem 0;
    position: relative;
    display: flex;
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
