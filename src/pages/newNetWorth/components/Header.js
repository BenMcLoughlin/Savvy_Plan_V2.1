import React from 'react'
import styled from "styled-components"
import SelectorButton from "UI/buttons/SelectorButton"
import {totalAssets_selector, totalLiabilities_selector} from "redux/netWorth/netWorth_selectors"
import {createStructuredSelector} from "reselect"
import {connect} from "react-redux"

const Header = ({display, setDisplay, totalAssets_selector, totalLiabilities_selector}) => {                                                                    //receives the set display prop so it can pass it to the toggle button

    console.log(totalAssets_selector);
    return (
    <HeaderWrapper>

                <Title>
                    <h1>
                        Net Worth
                    </h1>
                    <span>
                        {(totalAssets_selector - totalLiabilities_selector)/1000}K
                    </span>
                </Title>                                                                   


                <CatagorySelection>
                
                    <SelectorButton visible={display} onClick={() => setDisplay(!display)}/>                             {/*when clicked it sets the display to the opposite enabling it to toggle back and forth*/}
                    <Catagories>
                        <Catagory display={display} onClick={() => setDisplay(!display)}>
                            <h2>Assets</h2>
                            <span>{totalAssets_selector/1000}K</span>
                        </Catagory>
                        <Catagory display={!display} onClick={() => setDisplay(!display)} style={{color: "#F29278"}}>
                            <h2>Liabilities</h2>
                            <span>{totalLiabilities_selector/1000}K</span>
                        </Catagory>
                    </Catagories>
                </CatagorySelection>

    </HeaderWrapper>
   )
}

const mapStateToProps = createStructuredSelector({
    totalAssets_selector, 
    totalLiabilities_selector

})
export default connect(mapStateToProps)(Header)


//-----------------------------------------------style-----------------------------------------------//


const HeaderWrapper = styled.div`
    grid-area: a;                                                                                             {/*Grid-area set in Income, "a" positions it at the top */}
    display: flex;
    flex-direction: column;
    color: ${props => props.theme.color.slate};
    padding: 2rem;
`
const Title = styled.div`
    display: flex;
    flex-direction: row;
    position: relative;
    width: 30rem;
    & span {
        position: absolute;
        right: 1rem;
        font-size: 3rem;
    }
`

const Hr = styled.hr`
    height: 1rem;
    width: 30%;
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
