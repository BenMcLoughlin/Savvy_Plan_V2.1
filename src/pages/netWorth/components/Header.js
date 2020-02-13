import React from 'react'
import styled from "styled-components"
import SelectorButtonVertical from "UI/buttons/SelectorButtonVertical"
import {totalAssets_selector, totalLiabilities_selector} from "redux/netWorth/netWorth_selectors"
import {createStructuredSelector} from "reselect"
import {connect} from "react-redux"

//diplays the values at the top
const Header = ({display, setDisplay, totalAssets_selector, totalLiabilities_selector}) => {                                                                    //receives the set display prop so it can pass it to the toggle button
const totalAssets = totalAssets_selector
const totalLiabilities = totalLiabilities_selector
const netWorth = totalAssets - totalLiabilities
    return (
    <HeaderWrapper>
                <Title>
                    <h1>
                        Net Worth
                    </h1>
                    <span>
                        {netWorth > 1000000 ? `${netWorth/1000000} M` :  `${netWorth/1000} K`}
                    </span>
                </Title>                                                                   
                <CatagorySelection>
                    <SelectorWrapper>
                         <SelectorButtonVertical visible={display === "assets"} onClick={() => setDisplay("liabilities")}/>   
                    </SelectorWrapper>
                    <Catagories>
                        <Catagory display={"assets"} onClick={() => setDisplay("assets")}>
                            <h2>Assets</h2>
                            <span>
                            {totalAssets > 1000000 ? `${totalAssets/1000000} M` :  `${totalAssets/1000} K`}
                            </span>
                        </Catagory>         
                        <Catagory display={"liabilities"} onClick={() => setDisplay("liabilities")} style={{color: "#F29278"}}>                                 {/* Values are reduced down by 1000 to make it visually easier to understand*/}
                            <h2>Liabilities</h2>
                            <span>
                            {totalLiabilities > 1000000 ? `${totalLiabilities/1000000} M` :  `${totalLiabilities/1000} K`}
                            </span>
                        </Catagory>
                    </Catagories>
                </CatagorySelection>
    </HeaderWrapper>
   )
}

const mapStateToProps = createStructuredSelector({                                                                                                           //the header pulls these values from the selector so they can be displayed
    totalAssets_selector,                                                                  
    totalLiabilities_selector

})
export default connect(mapStateToProps)(Header)


//-----------------------------------------------STYLES-----------------------------------------------//


const HeaderWrapper = styled.div`
    grid-area: a;                                                                                             {/*Grid-area set in Income, "a" positions it at the top */}
    display: flex;
    flex-direction: row;
    color: ${props => props.theme.color.slate};
    padding: 2rem;
    display: flex;
    justify-content: space-between;
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
    width: 25rem;
    height: 10rem;

  
`
const CatagorySelection = styled.div`
    display: flex;
    flex-direction: row;
    width: 25rem;
    margin-right: 3rem;
`
const SelectorWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 3rem;
    height: 10rem;

`
