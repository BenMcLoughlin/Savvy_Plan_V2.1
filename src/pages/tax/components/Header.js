import React from 'react'
import styled from "styled-components"
import {connect} from "react-redux"
import TaxBracketsBar from "charts/tax/TaxBracketsBar"

const Header = ({user_reducer}) => {

const {taxAge} = user_reducer


return (
            <Wrapper>
            <Left >                                                                                     
                <h1> Tax Breakdown </h1>
                <Chart>
                    <ChartTitle>Taxes By Bracket</ChartTitle>
                    <TaxBracketsBar/>
                </Chart>
            </Left>
            <Right>
                <Row>
                    <Summary>
                        <Title>Taxable Income</Title>
                        <Value>{47}k</Value>
                    </Summary>
                    <Summary>
                        <Title>Non-Taxable Income</Title>
                        <Value>{2}k</Value>
                    </Summary>
                </Row>
                <Row>
                    <Summary>
                        <Title>Deductions</Title>
                        <Value>{5}k</Value>
                    </Summary>
                    <Summary>
                        <Title>Taxes Saved</Title>
                        <Value>{3}k</Value>
                    </Summary>
                </Row>
                <Row>
                    <Summary>
                        <Title>Credits</Title>
                        <Value>{17}k</Value>
                    </Summary>
                    <Summary>
                        <Title>Taxes Saved</Title>
                        <Value>{3}k</Value>
                    </Summary>
                </Row>
                <Row>
                    <Summary>
                        <Title>Total Taxes</Title>
                        <Value>{17}k</Value>
                    </Summary>
                    <Summary>
                        <Title>Average Rate</Title>
                        <Value>{23}%</Value>
                    </Summary>
                </Row>
                <Row>
                    <Summary>
                        <Title>After Tax Income</Title>
                        <Value>{47}k</Value>
                    </Summary>
                </Row>
            </Right>
            </Wrapper>
        )

}

const mapStateToProps = (state) => ({
    user_reducer: state.user_reducer,
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
    width: 100%;
    padding: 0rem 4rem 0rem 4rem;
    flex-direction: column;
    text-align: center;
    align-items: center;
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
    height: 4rem;
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
  font-weight: 200;
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
    margin-top: 1rem;
    height: 17rem;
    width: 50rem;
    margin-left: 7rem;
    position: relative;

`



