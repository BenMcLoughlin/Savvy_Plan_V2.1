// file: /components/LinkButton.jsx
import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import styled from "styled-components"
import {buttonStyles} from "style/Themes"

const LinkButton = (props) => {
  const {
    history,
    location,
    match,
    staticContext,
    to,
    onClick,
    ...rest
  } = props
  return (
    <ButtonComponent
    color={props.color}
      {...rest} // `children` is just another prop!
      onClick={(event) => {
        onClick && onClick(event)
        history.push(to)
      }}
    />
  )
}

LinkButton.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}

export default withRouter(LinkButton)


const ButtonComponent = styled.button`
  ${buttonStyles};
  background: ${props => props.color === "blue" ? props.theme.color.blue : props.theme.color.ice};
  color: ${props => props.color === "blue" ? props.theme.color.ice : props.theme.color.slate};
`