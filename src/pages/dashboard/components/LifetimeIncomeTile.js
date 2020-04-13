import React from 'react'
import styled from "styled-components"
import {connect} from "react-redux"
import IncomeBarChart 
from "charts/income/IncomeBarChart"
import { NavLink} from "react-router-dom"
import Header from "pages/income/components/Header"

const LifetimeIncomeTile = ({progress_reducer}) => {



   

        return (
            <LifetimeIncomeTileWrapper to="/income" count={progress_reducer.dashboard} >
            <Header/>   
            <ChartPlaceHolder>
                    <IncomeBarChart/>
                </ChartPlaceHolder>  
            </LifetimeIncomeTileWrapper>
        )

}

const mapStateToProps = (state) => {

    return {
        lifetimeIncomeVariableState: state.lifetimeIncomeVariableState,
        main_reducer: state.main_reducer
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


const ChartPlaceHolder = styled.div`
    grid-area: b;
    width: 100rem;
    margin-left: 7rem;
    margin-top: -6rem;
    height: 100%;

`