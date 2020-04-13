import React from 'react'
import styled from "styled-components"
import {connect} from "react-redux"
import { NavLink} from "react-router-dom"
import SavingsAreaChart from "charts/savings/SavingsAreaChart"
import SavingsBarChart from "charts/savings/SavingsBarChart"
import Header from "pages/savings/components/Header"

const SavingsPlanTile = ({progress_reducer}) => {



        return (
            <Wrapper to="/Savings" count={progress_reducer.dashboard}>
          <Charts>
                    <ChartPlaceHolder>
                        <SavingsAreaChart reg={"RRSP"} />
                    </ChartPlaceHolder>
                    <BarChartPlaceHolder >
                        <SavingsBarChart reg={"RRSP"}/>
                    </BarChartPlaceHolder>
                </Charts>
            </Wrapper>
        )
}


const mapStateToProps = (state) => {

    return {
        main_reducer: state.main_reducer,
    }
}

export default connect(mapStateToProps)(SavingsPlanTile)

//-----------------------------------------------style-----------------------------------------------//

const Wrapper = styled(NavLink)`
  text-decoration: none;
  grid-area: g;
  color: ${props => props.theme.color.slate};
  border-radius: 5px;
  border: ${props => props.theme.border.primary};
  cursor: pointer;
  display: flex;
  z-index: ${props => props.count === 5 ? 900 : 0};
  flex-direction: column;
  transition: all .2s ease-in-out;
  background: ${props => props.theme.color.ice};
  &:hover {
    transform: scale(1.001);
    box-shadow: 0px 3px 3px 2px rgba(219,206,219,0.33);
  }
`

const Charts = styled.div`
    width: 100%;
    height: 90%;
`
const ChartPlaceHolder = styled.div`
    margin-left: 4%;
    height: 60%;
`
const BarChartPlaceHolder = styled.div`
    margin-left: 4%;
    height: 40%;
`