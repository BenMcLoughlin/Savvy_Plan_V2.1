import React, {useState} from 'react'
import styled from "styled-components"
import ButtonLight from "UI/Buttons/ButtonLight"
import {connect} from "react-redux"
import FirstName from "pages/onboarding/components/FirstName"
import BirthYear from "pages/onboarding/components/BirthYear"
import Province from "pages/onboarding/components/Province"
import Spouse from "pages/onboarding/components/Spouse"
import Children from "pages/onboarding/components/Children"


function OnboardingProcess(props) {

    const [count, setCount] = useState(4);

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
    min-height: 30rem;
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
