import React from "react"
import styled from "styled-components"
import SelectorButtonVertical from "UI/buttons/SelectorButtonVertical"


const Header = ({monthly, toggleMonthly}) => {
    return (
        <Container>
            <Left>
                <h1>
                    Lifetime Spending
                </h1>
            </Left>
            <Right>
                <CatagorySelection>
                    <SelectorButtonVertical visible={monthly} onClick={() => toggleMonthly(!monthly)} />
                    <Catagories>
                        <Catagory display={monthly} onClick={() => toggleMonthly(!monthly)}>
                            <h2>Monthly</h2>
                        </Catagory>
                        <Catagory display={!monthly} onClick={() => toggleMonthly(!monthly)}>
                            <h2>Annually</h2>
                        </Catagory>
                    </Catagories>
                </CatagorySelection>
            </Right>
        </Container>
    )
}

export default Header


//-----------------------------------------------style-----------------------------------------------//

const Left = styled.div`
    padding: 2rem;
    width: 60%;

`
const Right = styled.div`
    padding-top: 2rem;
    width: 40%;

`
const Container = styled.div`
    grid-area: a;
    display: flex;
`

const Catagory = styled.div`
    border-bottom: ${props => props.display ? "1px solid grey" : 0}
    cursor: pointer;
    padding: 1rem;
    text-align: left;
    display: flex;
    flex-direction: row;
    position: relative;
    width: 20rem;
    & span {
        position: absolute;
        right: 1rem;
    }

`
const Catagories = styled.div`
    display: flex;
    flex-direction: column;
    cursor: pointer;
`
const CatagorySelection = styled.div`
    display: flex;
`
