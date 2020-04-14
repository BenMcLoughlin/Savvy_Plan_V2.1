import React from 'react'
import styled from "styled-components"
import SelectorButtonVertical from "UI/buttons/SelectorButtonVertical"
import {totalAssets_selector, totalLiabilities_selector} from "redux/netWorth/netWorth_selectors"
import {connect} from "react-redux"
import {setKeyValue_action} from "redux/actions"

//diplays the values at the top
const Header = ({ui_reducer, totalAssets_selector, totalLiabilities_selector, setKeyValue_action}) => {                                                                    //receives the set netWorthDisplay prop so it can pass it to the toggle button
    const {netWorthDisplay}  = ui_reducer
    
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
                         <SelectorButtonVertical visible={netWorthDisplay === "assets"} 
                                                 onClick={() => setKeyValue_action("netWorthDisplay", "ui_reducer", "liabilities")}
                         />   
                    </SelectorWrapper>
                    <Catagories>
                        <Catagory netWorthDisplay={"assets"} 
                                  onClick={() => setKeyValue_action("netWorthDisplay", "ui_reducer", "assets")}
                         >
                            <h2>Assets</h2>
                            <span>
                            {totalAssets > 1000000 ? `${totalAssets/1000000} M` :  `${totalAssets/1000} K`}
                            </span>
                        </Catagory>         
                        <Catagory netWorthDisplay={"liabilities"}
                                  onClick={() => setKeyValue_action("netWorthDisplay", "ui_reducer", "liabilities")} style={{color: "#F29278"}}
                        >                               
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

const mapStateToProps = (state) => ({
    totalAssets_selector: totalAssets_selector(state),                                                         
    totalLiabilities_selector: totalLiabilities_selector(state),
    ui_reducer: state.ui_reducer
})
export default connect(mapStateToProps, {setKeyValue_action})(Header)


//-----------------------------------------------STYLES-----------------------------------------------//


const HeaderWrapper = styled.div`
    grid-area: a;                                                                                             {/*Grid-area set in Income, "a" positions it at the top */}
    netWorthDisplay: flex;
    flex-direction: row;
    color: ${props => props.theme.color.slate};
    padding: 2rem;
    netWorthDisplay: flex;
    justify-content: space-between;
`
const Title = styled.div`
    netWorthDisplay: flex;
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
    netWorthDisplay: flex;
    flex-direction: row;
    position: relative;
    width: 20rem;
    & span {
        position: absolute;
        right: 1rem;
    }

`
const Catagories = styled.div`
    netWorthDisplay: flex;
    flex-direction: column;
    cursor: pointer;
    width: 25rem;
    height: 10rem;

  
`
const CatagorySelection = styled.div`
    netWorthDisplay: flex;
    flex-direction: row;
    width: 25rem;
    margin-right: 3rem;
`
const SelectorWrapper = styled.div`
    netWorthDisplay: flex;
    flex-direction: row;
    width: 3rem;
    height: 10rem;

`
