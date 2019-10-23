import React from 'react'
import styled from 'styled-components'


const Checkbox = ({ className, checked, ...props }) => (
    <CheckboxContainer className={className}>
    <Label>
        <HiddenCheckbox checked={checked} {...props} />
        <StyledCheckbox checked={checked}>
        <FillCircle/>
        </StyledCheckbox>
        <span>{props.labelText}</span>
    </Label>

    </CheckboxContainer>
  )


  //-----------------------------------------------STYLES-----------------------------------------------//

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`
const Label = styled.label`
    cursor: pointer;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    & span {
        margin-left: 1rem;
        font-size: ${props =>props.theme.fontSize.small};
        color: ${props => props.theme.color.background3};
    }
`

const FillCircle = styled.div`
   background: ${props => props.theme.color.salmon};
  height: 1rem;
  width: 1rem;
  border-radius: 50%;
  position: absolute; 
  top: .3rem;
  left: .3rem;
`
// Hide checkbox visually but remain accessible to screen readers.
// Source: https://polished.js.org/docs/#hidevisually
const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`

const StyledCheckbox = styled.div`
  position: relative; 
  display: inline-block;
  width: 1.6rem;
  height: 1.6rem;
  background: ${props => props.theme.color.brightPopBlue};
  border-radius: 50%;
  transition: all 50ms;
  cursor: pointer;
  ${FillCircle} {
    visibility: ${props => (props.checked ? 'visible' : 'hidden')}
  }
`

export default Checkbox
