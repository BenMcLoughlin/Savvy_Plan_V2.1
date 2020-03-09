import React from 'react'
import styled from "styled-components"
import {connect} from "react-redux"
import LifetimeIncomeBarChart from "charts/income/LifetimeIncomeBarChart"
import { NavLink} from "react-router-dom"

const LifetimeIncomeTile = ({progress_reducer}) => {



   

        return (
            <LifetimeIncomeTileWrapper to="/income" count={progress_reducer.dashboard} >
            <Top>
                    <Left>

                </Left>
                <Right>

                    </Right>
            
            </Top>

            <ChartWrapper>
                    <LifetimeIncomeBarChart/>
            </ChartWrapper>
            </LifetimeIncomeTileWrapper>
        )

}

const mapStateToProps = (state) => {

    return {
        lifetimeIncomeVariableState: state.lifetimeIncomeVariableState,
        income_reducer: state.income_reducer
    }
}

export default connect(mapStateToProps)(LifetimeIncomeTile)

//-----------------------------------------------style-----------------------------------------------//

const LifetimeIncomeTileWrapper = styled(NavLink)`
  text-decoration: none;
  grid-area: e;
  color: ${props => props.theme.color.slate};
  border-radius: 5px;
  border: ${props => props.theme.border.primary};
  cursor: pointer;
  display: flex;
  z-index: ${props => props.count === 4 ? 900 : 0}
  flex-direction: column;
  transition: all .2s ease-in-out;
  background: ${props => props.theme.color.ice};
  &:hover {
    transform: scale(1.001);
    box-shadow: 0px 3px 3px 2px rgba(219,206,219,0.33);
  }
`

const Top = styled.div`
    display: flex;
    flex: 30%;
    margin-top: 4rem;

`
const Left = styled.div`
    display: flex;
    flex-direction: column;
    font-size: ${props => props.theme.fontSize.medium};
    flex: 1;
`
const Right = styled.div`
    width: 45%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    align-items: center;
`

const ChartWrapper = styled.div`
    margin-top: -5rem;
    margin-bottom: 1rem;
    width: 100%;
    height: 70%;
    font-size: 1.2rem;
`

