import React, {useState} from 'react'
import styled from "styled-components"
import ButtonLight from "UI/Buttons/ButtonLight"
import {connect} from "react-redux"
import FirstName from "pages/onboarding/components/FirstName"
import BirthYear from "pages/onboarding/components/BirthYear"
import Province from "pages/onboarding/components/Province"
import Spouse from "pages/onboarding/components/Spouse"
import Children from "pages/onboarding/components/Children"
import Priorities from "pages/onboarding/components/Priorities"
import RatesOfReturn from "pages/onboarding/components/RatesOfReturn"
import RetirementAge from "pages/onboarding/components/RetirementAge"
import LifeSpan from "pages/onboarding/components/LifeSpan"
import { Redirect} from "react-router-dom"

function OnboardingProcess(props) {

    const [count, setCount] = useState(0);

    if (count > 11) return <Redirect to="/assumptions"/>

        return (
                 <Wrapper>
                    <Form>
                       {
                            count === 0 ? 
                            <FirstName/>
                            :
                            count === 1 ? 
                            <BirthYear/>
                            :
                            count === 2 ? 
                            <Province/>
                            :
                            count === 3 ? 
                            <Spouse/>
                            :
                            count === 4 ? 
                            <Children/>
                            :
                            count === 5 ? 
                            <Priorities/>
                            :
                            count > 5 && count < 10 ? 
                            <RatesOfReturn count={count}/>
                            :
                            count === 10 ? 
                            <RetirementAge/>
                            :
                            count === 11 ? 
                            <LifeSpan/>
                            :
                            null
                        }
                    </Form>


                   <Buttons>
                                < ButtonLight backward onClick={() => setCount(count > 0 ? count - 1 : 0)}/>
                                < ButtonLight forward onClick={() => setCount(count + 1)}/>
                    </Buttons>
                </Wrapper>
        )
          
    }


const mapStateToProps = (state) => ({
    user_reducer: state.user_reducer
})   

export default connect(mapStateToProps)(OnboardingProcess)
//-----------------------------------------------STYLES-----------------------------------------------//

const Wrapper = styled.div`
    grid-area: m;
    display: grid;
    height: 100%;
    width: 100%;
   display: flex;
   flex-direction: column;
   align-items: center;

`
const Form = styled.form`
    min-height: 45rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20rem;
    margin: 0 auto;
`

const Buttons = styled.div`
    width: 50%;
    display: flex;
    justify-content: center;
`
