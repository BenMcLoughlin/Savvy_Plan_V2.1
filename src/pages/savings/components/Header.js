import React from 'react'
import styled from "styled-components"
import {connect} from "react-redux"
import {tfsaPeakValue_selector, tfsaContributions_selector, tfsaInterest_selector, rrspContributions_selector, rrspinterest_selector, rrspInterest_selector, rrspPeakValue_selector} from "redux/savings/savings_selectors"

const Header = ({reg, tfsaPeakValue_selector, tfsaContributions_selector, tfsaInterest_selector, rrspInterest_selector, rrspPeakValue_selector, rrspContributions_selector}) => {

    console.log(reg);
     const contributions_selector = reg === "TFSA" ? tfsaContributions_selector : rrspContributions_selector
     const interest_selector = reg === "TFSA" ? tfsaInterest_selector : rrspInterest_selector
     const peakValue_selector = reg === "TFSA" ? tfsaPeakValue_selector : rrspPeakValue_selector
return (
            <Wrapper>
            <Left >                                                                                         {/* Displays the total shortfall, the value determines the color of the number negative for red or  positive for lightGrey */}
                <h2>
                    {`${reg} Savings & Income Plan`}
                </h2>
            </Left>
            <Right>
            <Container >
                    <Summary>
                    {`${(contributions_selector)/1000}k`}  
                        <h4>Contributions</h4>
                        <Circle color={"#3B7B8E"}/>
                    </Summary>
                    <Vr/>
                    <Summary>
                    {`${(interest_selector)/1000}k`}
                    <h4 >Interest</h4>
                         <Circle color={"#7898a1"}/>
                    </Summary>
            </Container>
            <Summary>
             {`${(peakValue_selector/1000)}k`}
            <h4>Peak Value</h4>
            </Summary>
            </Right>
            
            </Wrapper>
        )
}

const mapStateToProps = (state) => ({
    tfsaPeakValue_selector: tfsaPeakValue_selector(state),
    tfsaContributions_selector: tfsaContributions_selector(state),
    tfsaInterest_selector: tfsaInterest_selector(state),
    rrspContributions_selector: rrspContributions_selector(state),
    rrspInterest_selector: rrspInterest_selector(state),
    rrspPeakValue_selector: rrspPeakValue_selector(state),
})

export default connect(mapStateToProps, {})(Header )

//-----------------------------------------------style-----------------------------------------------//


const Wrapper = styled.div`
    grid-area: a;                                                                                             {/*Grid-area set in Income, "a" positions it at the top */}
    height: 100%;
    width: 100%;
    display: flex;
    margin-top: 6.3rem;
    margin-left: 3.9rem;
    position: relative;
    color: ${props => props.theme.color.slate};
`

const Left = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    margin-top: -3rem;
`

const Summary = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    margin-top: 1rem;
    cursor: pointer;
    font-size: ${props => props.theme.fontSize.medium};
    align-items: center;
    justify-content: center;

  
`

const Vr = styled.div`
    height: 60%;
    width: 1%;
    margin-top: 2rem;
    flex-basis: 0.1;
    flex: 1 0.1 1;
    border-left: ${props => props.theme.border.primary};
`

const Right = styled.div`
    width: 45%;
    margin-top: -4rem;
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
`
const Circle = styled.div`
   border-radius: 50%;
   height: 1rem;
   width: 1rem;
   margin-top: .5rem;
   background: ${props => props.color}
   display: flex;
   align-items: center;
`


const Container = styled.div`
    display: flex;
    width: 60%;
    border-bottom: ${props => props.theme.border.primary};
`




