import React from "react"
import {connect} from "react-redux"
import styled from "styled-components"
import { NavLink} from "react-router-dom"
import TaxBracketsBar from "charts/tax/TaxBracketsBar"
import {setKeyValue_action} from "redux/actions"

const TaxTile = ({setKeyValue_action, ui_reducer}) => {

const {currentAge} = ui_reducer  
console.log("currentAge", currentAge);
    return (
        <Wrapper to="/Income" >
                      <Chart  onClick={() =>  console.log('setKeyValue_action("taxAge", "ui_reducer", currentAge)')}>
                    <ChartTitle>{`Your Taxes Per Bracket`}</ChartTitle>
                    <TaxBracketsBar/>
                </Chart>
        </Wrapper>
    )
}

const mapStateToProps = (state) => ({
  ui_reducer: state.ui_reducer
  })
export default connect(mapStateToProps, {setKeyValue_action})(TaxTile)

//-----------------------------------------------style-----------------------------------------------//

const Wrapper = styled(NavLink)`
  text-decoration: none;
  grid-area: b;
  position: relative;
  width: 100%;
  height: 100%;  
  z-index: ${props => props.count === 6 ? 900 : 0}
  border-radius: 5px;
  border: ${props => props.theme.border.primary};
  transition: all .2s ease-in-out;
  background: ${props => props.theme.color.ice};
  &:hover {
    transform: scale(1.001);
    box-shadow: 0px 3px 3px 2px rgba(219,206,219,0.33);
  }
`

const StackedBarChartPlaceHolder = styled.div`
    z-index: 100;
    width: 25rem;
    height: 25rem;  
`

const Chart = styled.div`
    text-align: center;
    margin-top: 1rem;
    margin-left: 6.5rem;
    height: 13rem;
    width: 50rem;
    position: relative;

`


const ChartTitle = styled.div`
  font-size: ${props => props.theme.fontSize.small};
  font-weight: 500;
  position: absolute;
  top: 1rem;
  left: 10rem;
`