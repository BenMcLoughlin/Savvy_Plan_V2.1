import React from 'react'
import styled from "styled-components"
import {connect} from "react-redux"
import {income_selector} from "redux/income/income_selectors"
import {rrspMinWithdrawal_selector} from "redux/savings/savings_selectors"

const Header = ({income_selector, rrspMinWithdrawal_selector}) => {

    const cppIncome = income_selector.cpp_selector.value.financialValue
    const oasIncome =  income_selector.oas_selector.value.financialValue
    const tfsaIncome = income_selector["TFSAwithdrawal"].value.financialValue

return (
            <Wrapper>
            <Left >                                                                                         {/* Displays the total shortfall, the value determines the color of the number negative for red or  positive for lightGrey */}
                <h1>
                    Lifetime Income Chart
                </h1>
            </Left>
            <Right>
            <h2>Optimized Retirement Income Plan</h2>
            <Container >
                    <Summary>
                    {`${(cppIncome)/1000}k`}  
                        <h4>CPP</h4>
                    </Summary>
                    <Summary >
                    {`${(oasIncome)/1000}k`}
                        <h4 >OAS</h4>
                    </Summary>
                    <Vr/>
                    <Summary>
                    {`${(rrspMinWithdrawal_selector)/1000}k`}
                    <h4 >RRSP</h4>
                    </Summary>
                    <Summary>
                    {`${tfsaIncome/1000}k`}
                    <h4>TFSA</h4>
                    </Summary>
            </Container>
            <Summary>
             {`${(cppIncome + oasIncome + rrspMinWithdrawal_selector + tfsaIncome)/1000}k`}
            <h4>Total</h4>
            </Summary>
            </Right>
            
            </Wrapper>
        )

}

const mapStateToProps = (state) => ({
    income_selector: income_selector(state),
    rrspMinWithdrawal_selector: rrspMinWithdrawal_selector(state)
})

export default connect(mapStateToProps, {})(Header )

//-----------------------------------------------style-----------------------------------------------//


const Wrapper = styled.div`
    grid-area: a;                                                                                             {/*Grid-area set in Income, "a" positions it at the top */}
    height: 100%;
    width: 100%;
    display: flex;
    margin-top: 4rem;
    position: relative;
    color: ${props => props.theme.color.slate};
`

const Left = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
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
const Container = styled.div`
    display: flex;
    width: 60%;
    border-bottom: ${props => props.theme.border.primary};
`




