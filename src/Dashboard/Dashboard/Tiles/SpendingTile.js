import React, { Component } from 'react'
import styled from "styled-components"
import {connect} from "react-redux"
import { NavLink} from "react-router-dom"

 class NetWorthTile extends Component {
     
    render() {

        return (
            <NetWorthTileWrapper to="/Spending">
                <Left>
                <LargeTotal>
                    140 k
                    <span>
                    Net Worth
                    </span>
                </LargeTotal>
               </Left>
               <Vr/>
                <Right>
                    <LeftTop>
                        <Total>
                            242 k
                        </Total>
                        <Summary>
                            Assets
                            <span>What you own</span>
                        </Summary>
                    </LeftTop>
                    <Hr></Hr>
                    <LeftBottom>
                        <Total>
                            102 k
                        </Total>
                        <Summary y>
                            Liabilities
                            <span>What you owe</span>
                        </Summary>
                    </LeftBottom>
                </Right>
             
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

//-----------------------------------------------STYLES-----------------------------------------------//

const NetWorthTileWrapper = styled(NavLink)`
  text-decoration: none;
  grid-area: b;
  display: flex;
  justify-content: center;
  color: ${props => props.theme.color.contrastText1};
  cursor: pointer;
  border-radius: 5px;
  border-right: ${props => props.theme.border.primary};
  &:hover {

  }

`
const Right = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`
const LeftTop = styled.div`
    flex: 1;
    display: flex;
    flex-direction: row;

`
const Total = styled.div`
    flex: .6;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: -.5rem;
    font-size: ${props => props.theme.fontSize.smallMedium};
    
    font-weight: 300;
`
const Summary = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: left;
    padding: 1rem;
    margin-top: 1rem;
    font-size: ${props => props.theme.fontSize.smallMedium};
    span {
        font-size: ${props => props.theme.fontSize.small};
        font-style: italic;
    }
    
`
const Hr = styled.hr`
    border-top: ${props => props.theme.border.primary};
    width: 80%;
    margin: 0 auto;
    fill: red;
`


const LeftBottom = styled.div`
    flex: 1;
    display: flex;
    flex-direction: row;
    color: ${props => props.theme.color.salmon};
    margin-top: -1.5rem;
`
const Vr = styled.div`
    height: 80%;
    width: 1%;
    margin-top: 2rem;
    flex-basis: 0.1;
    flex: 1 0.1 1;
    border-left: ${props => props.theme.border.primary};
`

const Left = styled.div`
    width: 45%;
`
const LargeTotal = styled.div`
    font-size: ${props => props.theme.fontSize.large};
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