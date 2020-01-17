import React, { Component } from 'react'
import styled from "styled-components"
import {connect} from "react-redux"
import { NavLink} from "react-router-dom"

 class NetWorthTile extends Component {
     
    render() {

        return (
            <NetWorthTileWrapper to="/NetWorth">
                <LargeTotal>
                    140 k
                    <span>
                    Net Worth
                    </span>
                </LargeTotal>
            </NetWorthTileWrapper>
        )
    }
}

const mapStateToProps = (state) => {

    return {
        lifetimeIncomeVariableState: state.lifetimeIncomeVariableState,
    }
}

export default connect(mapStateToProps)(NetWorthTile)

//-----------------------------------------------style-----------------------------------------------//

const NetWorthTileWrapper = styled(NavLink)`
  text-decoration: none;
  grid-area: a;
  display: flex;
  justify-content: center;
  color: ${props => props.theme.color.slate};
  cursor: pointer;
  border-radius: 5px;
  border: ${props => props.theme.border.primary};
  transition: all .2s ease-in-out;
  background: ${props => props.theme.color.ice};
  &:hover {
    transform: scale(1.001);
    box-shadow: 0px 3px 3px 2px rgba(219,206,219,0.33);
  }

`

const LargeTotal = styled.div`
    font-size: 7rem};
    font-weight: 300;
    text-align: center;
    margin-top: 3rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    & span {
        font-size: ${props => props.theme.fontSize.smallMedium};
        text-align: center;
}
`