import React from 'react'
import styled from "styled-components"
import {connect} from "react-redux"
import TaxBracketsBar from "charts/tax/TaxBracketsBar"
import {taxDisplayDetails_selector} from "redux/tax/tax_selectors"

const Header = ({ui_reducer, taxDisplayDetails_selector}) => {
const {taxAge} = ui_reducer
return (
            <Wrapper>
            <Left >                                                                                     
                <h1> Tax Breakdown </h1>
                <Chart>
                    <ChartTitle>{`Age ${taxAge} Taxes Per Bracket`}</ChartTitle>
                    <TaxBracketsBar/>
                </Chart>
            </Left>
            <Right>
                {
                    taxDisplayDetails_selector.map(d =>  <Row>
                                                            <Summary>
                                                                <Title>{d.label1}</Title>
                                                                <Value>{Math.round(d.value1/1000)}k</Value>
                                                            </Summary>
                                                            <Summary>
                                                                <Title>{d.label2}</Title>
                                                                <Value>{Math.round(d.value2/1000)}k</Value>
                                                            </Summary>
                                                         </Row>
                    )
                }
            </Right>
            </Wrapper>
        )

}

const mapStateToProps = (state) => ({
    ui_reducer: state.ui_reducer,
    taxDisplayDetails_selector: taxDisplayDetails_selector(state)
})

export default connect(mapStateToProps, {})(Header )

//-----------------------------------------------style-----------------------------------------------//


const Wrapper = styled.div`                                                                                      
    height: 100%;
    width: 100%;
    display: flex;
    margin-top: 4rem;
    position: relative;
    color: ${props => props.theme.color.slate};
    grid-area: a;
`

const Left = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
`
const Right = styled.div`
    display: flex;
    height: 100%;
    width: 80%;
    padding: 0rem 4rem 0rem 4rem;
    flex-direction: column;
    text-align: center;
    align-items: center;
    margin-top: 3rem;
    margin-right: 6rem;
`

const Summary = styled.div`
    flex: 1;
    display: flex;
    width: 40%;
    flex-direction: row;
    padding: 1rem;
    margin-top: .3rem;
    font-size: ${props => props.theme.fontSize.medium};
    align-items: center;
    justify-content: space-between;
    border-bottom: ${props => props.theme.border.primary};

`
const Row = styled.div`
    width: 100%;
    height: 3.2rem;
    display: flex;
    justify-content: space-between;
`

const Vr = styled.div`
    height: 60%;
    width: 1%;
    margin-top: 2rem;
    flex-basis: 0.1;
    flex: 1 0.1 1;
    border-left: ${props => props.theme.border.primary};
`


const Title = styled.div`
  font-size: ${props => props.theme.fontSize.small};
  font-weight: 200;
`
const ChartTitle = styled.div`
  font-size: ${props => props.theme.fontSize.small};
  font-weight: 500;
  position: absolute;
  top: 1rem;
  left: 10rem;
`
const Value = styled.div`
  font-size: ${props => props.theme.fontSize.small};
  font-weight: bold;
  text-align: left;
`

const Chart = styled.div`
    text-align: center;
    margin-top: 3rem;
    height: 15rem;
    width: 50rem;
    margin-left: 2rem;
    position: relative;

`



