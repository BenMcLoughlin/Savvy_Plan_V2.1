import React, { Component } from 'pages/property/node_modules/react'
import styled from "pages/property/node_modules/styled-components"
import {connect} from "pages/property/node_modules/react-redux"
import { NavLink} from "pages/property/node_modules/react-router-dom"

 class HomePurchaseTile extends Component {

    render() {

        return (
            <HomePurchaseTileWrapper to="/Property">
                <LargeTotal>
                    282 K
                    <span>
                   Est. Property Qualification
                    </span>
                </LargeTotal>
            </HomePurchaseTileWrapper>
        )
    }
}

const mapStateToProps = (state) => {

    return {
        lifetimeIncomeVariableState: state.lifetimeIncomeVariableState,
    }
}

export default connect(mapStateToProps)(HomePurchaseTile)

//-----------------------------------------------STYLES-----------------------------------------------//

const HomePurchaseTileWrapper = styled( NavLink)`
  text-decoration: none;
  grid-area: x;
  display: flex;
  justify-content: center;
  background: white;
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
    font-size: 4rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-weight: 300;
    color: ${props => props.theme.color.drab};;
    margin-top: -1rem;
    & span {
        font-size: ${props => props.theme.fontSize.smallMedium};
        text-align: center;
        font-weight: 300;
}

`