import React, {useState} from 'react'
import styled from "styled-components"
import Withdrawals from "page/savings/components/Withdrawals"
import Contributions from"page/savings/components/Contributions"
import InvestmentFactors from "page/savings/components/InvestmentFactors"
import ButtonDark from "UI/Buttons/ButtonDark"
import ButtonLight from "UI/Buttons/ButtonLight"
import { NavLink} from "react-router-dom"
import {connect} from "react-redux"
import {rate1 , rate2} from "redux/assumptions/assumptions_selectors"
import {reccomendedNestEgg, reccomendedSavingsPerYear} from "services/savings/savings_functions"

const ControlPanel = ({income_reducer, initializeSavingsAndWithdrawals, pensionStartAges_reducer, rate1, rate2, transaction_action, landingPage})  =>{

   
    const [count, setCount] = useState(0);

    const {income_reducer: {72: {rrsp: {financialValue: rrspIncome}}}} = {income_reducer}
    const {income_reducer: {72: {tfsa: {financialValue: tfsaIncome}}}} = {income_reducer}
    const {income_reducer: {72: {nonRegistered: {financialValue: nonRegisteredIncome}}}} = {income_reducer}

    const totalRetirementIncome = rrspIncome + tfsaIncome + nonRegisteredIncome
    //const reccomendedRrspIncome = income_reducer[72].rrsp.financialValue
    const reccomendedTfsaIncome = income_reducer[72].tfsa.financialValue
    const reccomendedNonRegisteredIncome = income_reducer[72].nonRegistered.financialValue
    const {pensionStartAges_reducer: {rrspStartAge: {rangeBarValue: rrspStartAge}}} = {pensionStartAges_reducer}
    const {pensionStartAges_reducer: {tfsaStartAge: {rangeBarValue: tfsaStartAge}}} = {pensionStartAges_reducer}
   
    const totalNestEgg = reccomendedNestEgg(rate2, 65, totalRetirementIncome)
   // const tfsaNestEgg = reccomendedNestEgg(rate2, tfsaStartAge, reccomendedTfsaIncome)
   //const nonRegisteredNestEgg = reccomendedNestEgg(rate2, tfsaStartAge, reccomendedNonRegisteredIncome)

    const reccomendedPayment = reccomendedSavingsPerYear(1988, rate1, rrspStartAge, totalRetirementIncome )

    
        return (
                    <ControlPanelWrapper>
                        {landingPage ? null :
                            <Dialogue>
                            {
                                count > 7 ? 
                               null
                                :
                                < ButtonLight backward onClick={() => setCount(count > 0 ? count - 1 : 0)}/>
                            }
                                <Text>
                                    {
                                     count === 0 ?  <DialogueWrapper>
                                                        <h5>In this section we determine how much you need saved to fund your Retirement </h5>  
                                                        <span>The Dark color represents your contributions - money you worked hard for. </span>  
                                                        <span>The light color represents your interest earned on investing - money you earned while watching Netflix and sleeping.</span>  
                                     
                                                   </DialogueWrapper>
  
                                     : 
                                     count > 0 && count < 3 ?  
                                                 <DialogueWrapper>
                                                    <NestEggTotals>
                                                                < NestEggTotalColumn>
                                                                    <h5>
                                                                        If you Want
                                                                    </h5>
                                                                    <Summary>{totalRetirementIncome/1000}k</Summary>
                                                                        <h4>Target Retirement Income</h4>  
                                                                </NestEggTotalColumn>
                                                                < NestEggTotalColumn>
                                                                    <h5>
                                                                        You will need
                                                                    </h5>
                                                                    <Summary>{totalNestEgg}</Summary>
                                                                        <h4>Total Savings</h4>  
                                                                </NestEggTotalColumn>
                                                                < NestEggTotalColumn>
                                                                    <h5>
                                                                        You must save
                                                                    </h5>
                                                                    <Summary>{reccomendedPayment}</Summary>
                                                                        <h4>Annual Contributions</h4>  
                                                                </NestEggTotalColumn>
                                                    </NestEggTotals>
                                                    {count === 2 ?   <span>See how your rate of return changes everything </span>  
                                                   : null}
                                                   </DialogueWrapper>

                                     : 
                                     count === 3 ?    <DialogueWrapper>
                                                            <h5>But life happens, not many people can save the same amount every year. </h5>  
                                                            <span>See how contributing different amounts at different times changes the outcome. </span>  
                                                        </DialogueWrapper>
                                     : 
                                     count === 4 ?   <DialogueWrapper>
                                                            <h5>Finally, you can play with withdrawals to see how they would impact your plan.  </h5>  
                                                        </DialogueWrapper>
                                      : 
                          
                                     count === 7 ?   <div>
                                                        Next, we build your savings plan.
                                                        <ButtonWrapper to="/SavingsPlan">
                                                            <ButtonDark text={'Next'} onClick={() => setCount(0)}/>
                                                        </ButtonWrapper>
                                                    </div>
                                     : null

                                }
                                </Text>
                                {
                                count > 7 ? 
                                null
                                :
                                < ButtonLight forward onClick={() => setCount(count  < 10 ? count + 1 : 0)}/>
                            }
                          
                        </Dialogue>
                        }
     <Sections>
                            <Section>
                             <Contributions 
                                    count={count}
                                    rrspStartAge={rrspStartAge}
                                    tfsaStartAge={tfsaStartAge}
                                    />
                            </Section>
                    
                            <Section>
   
                               <Withdrawals count={count}
                                  rrspStartAge={rrspStartAge}
                                  tfsaStartAge={tfsaStartAge}
                               />
                            </Section>
                            <Section>
                             <InvestmentFactors count={count}
                             />  

                        </Section>
                        {
                            count > 7 ? 
                            <TutorialButtonWrapper>
                                < ButtonLight text = {"Tutorial"} onClick={() => setCount(0)}/>
                                <ButtonWrapper to="/SavingsPlan">
                                                            <ButtonDark text={'Next Section'} onClick={() => setCount(0)}/>
                                                        </ButtonWrapper>
                            </TutorialButtonWrapper>
                         
                            : null
                        }
                        </Sections> 

                
                </ControlPanelWrapper>
        )
          
    }

   const mapStateToProps = state => ({
        income_reducer: state.income_reducer,
        pensionStartAges_reducer: state.pensionStartAges_reducer,
        rate1: rate1(state),
        rate2: rate2(state),
   })

   export default connect(mapStateToProps)(ControlPanel)
//-----------------------------------------------style-----------------------------------------------//

const ControlPanelWrapper = styled.div`
    grid-area: d;
    display: flex;
    flex-direction: column;
    color: ${props => props.theme.color.slate};
    border-top: ${props => props.theme.border.primary};
    padding-top: 2rem;
    margin-left: 3rem;
    margin-right: 3rem;
    position: relative;
`

const Dialogue = styled.div`
    display: flex;
    justify-content: space-around;
    font-size: ${props => props.theme.fontSize.smallMedium};
    height: 5rem;
    width: 100%;
    margin-bottom: 1rem;
`
const DialogueHeader = styled.div`
    display: flex;
    justify-content: space-around;
    height: 5rem;
    width: 100%;
    margin-bottom: 1rem;
`


const NestEggTotals = styled.div`
   display: flex;
   justify-content: space-around;
   width: 60%;
   align-self: center;
   padding: 0.5rem;
`
const NestEggTotalColumn = styled.div`

`
const NestEggTotalHeader = styled.div`

`

const Sections = styled.div`
    display: flex;
`
const Section = styled.div`
    flex: 1;
`
const Text = styled.div`
    flex: 1;
    font-size: 2.4rem;
    text-align: center;
    font-weight: 700;
    & span {
        margin-top: 1rem;
        font-size: 1.6rem;
        font-weight: 400;
        font-style: italic;
    }
`

const TutorialButtonWrapper = styled.div`
position: absolute;
top: 30rem;
right: 3rem;

`

const Summary = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    display: inline-block;
    padding: 1rem;
    margin-top: 1rem;
    cursor: pointer;
    font-size: ${props => props.theme.fontSize.medium};

  
`

const List= styled.ol `
    text-align: left;
    align-self: center;
    font-size: ${props => props.theme.fontSize.smallMedium};

   & li {
       padding: 0.3rem;
   }
` 
const DialogueWrapper= styled.div `
  display: flex;
    flex-direction: column;
    align-content: center;
   
` 

const ButtonWrapper = styled(NavLink)`

    position: absolute;
    bottom: -10rem;
    right: 2rem;
`

const LargeTotal = styled.div`
    font-size: ${props => props.theme.fontSize.medium};
    font-weight: 300;
    text-align: center;
    padding: 1rem;
    margin-top: 1.5rem;
    color: ${props => props.theme.color.slate};
 

`