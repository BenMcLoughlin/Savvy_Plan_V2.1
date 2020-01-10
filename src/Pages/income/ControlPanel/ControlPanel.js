import React, {useState} from 'react'
import styled from "styled-components"
import IncomeInput from "./Components/IncomeInput"
import PensionIncomeStartAges from "./Components/PensionIncomeStartAges"
import DesiredRetirementIncome from "./Components/DesiredRetirementIncome"
import ButtonDark from "../../../UI/Buttons/ButtonDark"
import ButtonLight from "../../../UI/Buttons/ButtonLight"
import { NavLink} from "react-router-dom"

export default function ControlPanel(props) {

    const {
        rrsp: {financialValue: rrsp },
        tfsa: {financialValue: tfsa },
        oasIncome: {financialValue: oasIncome },
        nonRegistered: {financialValue: nonRegistered },
   } = props.income_reducer[75]            

   
    const [count, setCount] = useState(oasIncome > 0 ? 8 : 0);

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
                                     count === 0 ?  <div>
                                                        <h5>We're going to estimate your pension income by reviewing your lifetime earnings. </h5>  
                                                        <span>Use the arrow buttons to move through the tutorial</span> 
                                                   </div>
  
                                     : 
                                     count === 1 ?   <div>
                                                         <h5>This selector enables you to choose the age range in which you'd like to input income </h5>  
                                                         <span>To calculate CPP we will need income estimates from ages 18 - 65.</span> 
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
                                             nonRegistered > 1000 ? 
                                                     <h5>{`By drawing $${rrsp/1000}k from your RRSP, $${tfsa/1000}k from your TFSA and  $${nonRegistered/1000}k from your Non-Registered accounts you'll minimuze your taxes both before and after retirement.`}</h5>  
                                                    :
                                                     <h5>{`By drawing $${rrsp/1000}k from your RRSP and $${tfsa/1000}k from your TFSA you'll minimize your taxes both before and after retirement.`}</h5>  
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

                            <IncomeInput
                                {...props}     
                                count={count}                                                                                     //  All props are passed through to the child component
                                />
                            </Section>
                    
                            <Section>
                                <DesiredRetirementIncome
                                {...props}
                                count={count}      
                                />
                            </Section>
                            <Section>
            
                                <PensionIncomeStartAges
                                {...props}
                                count={count}      
                                />
                        </Section>
                        {
                            count > 7 ? 
                            <TutorialButtonWrapper>
                                < ButtonLight text = {"Tutorial"} onClick={() => setCount(0)}/>
                                <ButtonWrapper to="/SavingsPlan">
                                                            <ButtonDark text={'Next'} onClick={() => setCount(0)}/>
                                                        </ButtonWrapper>
                            </TutorialButtonWrapper>
                         
                            : null
                        }
                        </Sections> 

                
                </ControlPanelWrapper>
        )
          
    }


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

const ButtonWrapper = styled(NavLink)`

`
const TutorialButtonWrapper = styled.div`
position: absolute;
top: 30rem;
right: 3rem;

`

/*

headers

                            <h2>Estimate Lifetime Earnings</h2>
                                        <h2>Desired Retirement Income</h2>
                                                        <h2>Select Retirement Age</h2>
*/