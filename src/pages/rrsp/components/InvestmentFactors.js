import React, {useState} from "react"
import styled from "styled-components"
import {connect} from "react-redux"
import MiniRangeBar  from "UI/miniRangeBar/MiniRangeBar"
import ButtonLight from "UI/buttons/ButtonLight"
import {investmentReturns_selector} from "redux/assumptions/assumptions_selectors"
import {setNestedKeyValue_action} from "redux/actions"
import {setPensionAge_action} from "redux/pensionStartAges/pensionStartAges_actions"



const InvestmentFactor = ({setNestedKeyValue_action, pensionStartAges_reducer, investmentReturns_selector, setPensionAge_action}) => {    

    const setInvestmentFactor = (value, nothing, {name}) => {
        setNestedKeyValue_action("rangeBarValue", name, "assumptions_reducer", value) 

    }
    const setRrifStartAge = (value, nothing, {name}) => {
        setPensionAge_action(name, value) 
    }

        const [visible, setVisible] = useState(false)
    return (
        <>
        {
            visible ? 
            <Wrapper>                                                                     

            <Header>
            <h2>Investment Factors</h2> 
            </Header>
            <Container> 
            <MiniRangeBarWrapper>
                {
                    investmentReturns_selector.slice(0,4).map(d =>   <MiniRangeBar 
                                key={d.name}
                                setValue={setInvestmentFactor}                                                      
                                rangeBarProps={d}   
                        />
                )
                }
                <MiniRangeBar 
                                setValue={setRrifStartAge}                                                      
                                rangeBarProps={pensionStartAges_reducer.rrspStartAge}   
                        />

            </MiniRangeBarWrapper>
            </Container>
      
            </Wrapper>
            :
            <ButtonRightWrapper>
                <ButtonLight text="Investment Factors" onClick={() => setVisible(true)}></ButtonLight>
            </ButtonRightWrapper>
        }
    </>
       
    )

}

const mapStateToProps = (state) => ({
    investmentReturns_selector: investmentReturns_selector(state),
    assumptions_reducer: state.assumptions_reducer,
    pensionStartAges_reducer: state.pensionStartAges_reducer,
})

export default connect(mapStateToProps, {setNestedKeyValue_action, setPensionAge_action})(InvestmentFactor )


//-----------------------------------------------STYLES-----------------------------------------------//


const ButtonLeftWrapper = styled.div`
    position: absolute;
    bottom: 9rem;
    left: 2rem;
`
const ButtonRightWrapper = styled.div`
    position: absolute;
    bottom: 5rem;
    left: 95rem;
`
const MiniRangeBarWrapper = styled.div`
    height: 28rem;
    width: 65rem;
    display: flex;
    flex-wrap: wrap;
`
const Wrapper = styled.div`
    width: 77rem;
    border-radius: 5px;
    overflow: hidden;
    height: 33rem;                                                    
    border: ${props => props.theme.border.primary};
    position: absolute;
    top: 36rem;
    left: 40rem;
    display: flex;
    z-index: 700;
    background: ${props => props.theme.color.ice};
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Header = styled.div`
    width: 100%;
    background: ${props => props.theme.color.turquoise};
    height: 4rem;
    color: ${props => props.theme.color.ice};

`
const Container = styled.div`
    display: flex;
    align-content: center;
`
