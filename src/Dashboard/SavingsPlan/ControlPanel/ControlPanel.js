import React, {useState} from 'react'
import styled from "styled-components"
import Withdrawals from "./Components/Withdrawals"
import Contributions from"./Components/Contributions"
import InvestmentFactors from "./Components/InvestmentFactors"
import ButtonDark from "../../../UI/Buttons/ButtonDark"
import ButtonLight from "../../../UI/Buttons/ButtonLight"
import { NavLink} from "react-router-dom"
import {connect} from "react-redux"
import {rate1 , rate2} from "../reducers/savingsPlan_selectors"
import {reccomendedNestEgg} from "../services/localFunctions"

const ControlPanel = ({incomePerYear_reducer, pensionStartAges_reducer, rate1})  =>{

   
    const [count, setCount] = useState(1);

    const reccomendedRrspIncome = incomePerYear_reducer[72].rrsp.financialValue
    const {pensionStartAges_reducer: {rrifStartAge: {rangeBarValue: rrifStartAge}}} = {pensionStartAges_reducer}
    const {pensionStartAges_reducer: {tfsaStartAge: {rangeBarValue: tfsaStartAge}}} = {pensionStartAges_reducer}
   
    const nestEgg = reccomendedNestEgg(rate1, rrifStartAge, reccomendedRrspIncome)
        return (
                    <ControlPanelWrapper>
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
                                                        <DialogueHeader>In this section we determine how much you need saved for Retirement </DialogueHeader>  
                                                        <DialogueHeader>Five factors will influence your plan </DialogueHeader>
                                                        <List>
                                                           <li>When and how much you contribute</li>
                                                           <li>Income in Retirement</li>
                                                           <li>Management Fees</li>
                                                           <li>Rate of Return</li>
                                                           <li>Inflation</li>
                                                        </List>
                                                   </DialogueWrapper>
  
                                     : 
                                     count === 1 ?   <div>
                                                         <DialogueHeader>{`If you want $${reccomendedRrspIncome/1000}k in income from your RRSPs you'll need to save $${nestEgg}`}</DialogueHeader>  
                                                         <DialogueHeader>Change these dials to see how that can shift.</DialogueHeader>  
                                                    </div>
                                     : 
                                     count === 2 ?  <div>
                                                        <h5>Input your past earnings per year and estimate your future earnings. </h5>  
                                                        <span>Your contributions to CPP are based on how much you earn. Old Age Security, OAS, is paid to all Canadian Citizens regardless or earnings. </span> 
                                                    </div>
                                      : 
                                     count === 3 ?   <div>
                                                        <h5>You can add as many income steams as you like. </h5>  
                                                        <span>CPP contributions are not made on interest or business income. Ignore inflation and use todays dollars. </span> 
                                                    </div>
                                     :
                                     count === 4 ?   <div>
                                                        <h5>Your CPP and OAS payments either increase or decrease depending when you decide to start.</h5>  
                                                        <span>You can begin collecting from your RRSP or TFSA at any age.</span> 
                                                    </div>
                                    :
                                     count === 5 ?   <div>
                                                        <h5>Input the amount of income you'd like in retirement.</h5>  
                                                        <span>Knowing this we can determine your reccomended mix of income streams in retirement.</span> 
                                                    </div>
                                    :
                                     count === 6 ?   <div>
                                         {
                                            100 > 1000 ? 
                                                     <h5>{`By drawing $${100}k from your RRSP, $${100}k from your TFSA and  $${100}k from your Non-Registered accounts you'll minimuze your taxes both before and after retirement.`}</h5>  
                                                    :
                                                     <h5>{`By drawing $${100}k from your RRSP and $${100}k from your TFSA you'll minimuze your taxes both before and after retirement.`}</h5>  
                                         }
   
                                                    </div>
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
     <Sections>
                            <Section>

  
                             <Contributions count={count}/>
                            </Section>
                    
                            <Section>
   
                               <Withdrawals count={count}/>
                            </Section>
                            <Section>

                             <InvestmentFactors count={count}/>  
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
        incomePerYear_reducer: state.incomePerYear_reducer,
        pensionStartAges_reducer: state.pensionStartAges_reducer,
        rate1: rate1(state)
   })

   export default connect(mapStateToProps)(ControlPanel)
//-----------------------------------------------STYLES-----------------------------------------------//

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

