import React, { Component } from 'react'
import styled from "styled-components"

import Tooltip from "UI/toolTip/Tooltip"
import {connect} from "react-redux"
import {createStructuredSelector} from "reselect"


class Header extends Component {

    
//GRAB MOUSE COORDINATES FOR TOOLTIP
    state = { 
              x: 0,                                                                                                              //These coordinates are set onMouseMove placing the tootip beside the mouse
              y: 0,                                                                                                              //They are passed as props to the Tooltip componnent 
            }
   handleMouseMove(e) {
                this.setState({ x: e.clientX -120, y: e.clientY -140 })                                                          //Sets the state according to mouse position
              }                                                                                                                  //They are passed as props to the Tooltip componnent                                                                                             //They are passed as props to the Tooltip componnent 

    render() {


return (
            <HeaderValuesWrapper onMouseMove={(e) => this.handleMouseMove(e)}>
            <Left >

                   <h1>
                  Your Financial Plan Assumptions
                  </h1>
            </Left>

            </HeaderValuesWrapper>
        )
    }
}

const mapStateToProps = createStructuredSelector({
 
})

export default connect(mapStateToProps)(Header)

//-----------------------------------------------style-----------------------------------------------//


const HeaderValuesWrapper = styled.div`
    grid-area: a;                                                                                             {/*Grid-area set in Income, "a" positions it at the top */}
    height: 100%;
    width: 100%;
    display: flex;
    margin-top: 4rem;
    position: relative;
    color: ${props => props.theme.color.slate};
`

const Left = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`
