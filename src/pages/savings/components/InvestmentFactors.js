import React, {useState} from "react"
import styled from "styled-components"
import {connect} from "react-redux"
import MiniRangeBar  from "UI/miniRangeBar/MiniRangeBar"
import ButtonLight from "UI/buttons/ButtonLight"
import {investmentReturns_selector} from "redux/assumptions/assumptions_selectors"
import {setInvestmentFactor_action} from "redux/assumptions/assumptions_actions"



const InvestmentFactor = ({setInvestmentFactor_action, investmentReturns_selector, assumptions_reducer}) => {    

    const setInvestmentFactor = (value, nothing, {name}) => {
        setInvestmentFactor_action(name, value) 

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
})

export default connect(mapStateToProps, {setInvestmentFactor_action})(InvestmentFactor )


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
    width: 40rem;
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
