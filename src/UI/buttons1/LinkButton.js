// file: /components/LinkButton.jsx
import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import styled from "styled-components"

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
    padding: 1rem;
    min-width: 165px;
    width: auto;
    height: 4rem;
    margin: 1rem;
    background: ${props => props.theme.color.ice};
    color: ${props => props.theme.color.slate};
    cursor: pointer;
    outline: none;
    border-radius: 5rem;
    text-transform: uppercase;
    position: relative
`